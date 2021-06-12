import { app, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
// import log from 'electron-log'
import fs from 'fs'
import cp from 'child_process'
import path from 'path'

// 设置最大监听数
require('events').EventEmitter.prototype._maxListeners = 100

// 创建日志文件目录
if (!fs.existsSync(process.env.USERPROFILE + '/Dynarose')) {
    fs.mkdir(process.env.USERPROFILE + '/Dynarose')
}
// fs.mkdir(process.env.USERPROFILE + '/Dynarose')
// 仅用于开发环境日志输出，生产环境下请注销所有日志输出
// log.transports.file.file = process.env.USERPROFILE + "/Dynarose/client.log"

let mainWindow
let cmdStr
let startMsg
let child
let tray = null
let isNotPassword = true

// 未登录菜单
const loginContextMenu = Menu.buildFromTemplate([{
    label: '退出',
    click: () => {

        console.log('----------------------------')
        exitExe()
    }
}])

// 登录后的菜单
const homeContentMenu = Menu.buildFromTemplate([{
        label: '修改密码',
        click: () => {
            console.log('================================')
                // 修改密码，调整窗口大小，并且切换主页面显示内容
            setWindowSize(400, 200)
            mainWindow.show()
            mainWindow.webContents.send("show-password")
        }
    },
    {
        type: 'separator',
    },
    {
        label: '注销',
        click: () => {
            logout()
        }
    },
    {
        type: 'separator',
    },
    {
        label: '退出',
        click: () => {
            exitExe()
        }
    }
])


// 生产环境 打包后exe文件放入到打包后可执行文件同一目录
if (process.env.NODE_ENV !== 'development') { //生成环境
    cmdStr = './main.exe'
} else { //研发环境
    cmdStr = `${__dirname}/main.exe`
}
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}


const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`


// 创建窗体
function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 530,
        useContentSize: false,
        width: 350,
        resizable: false,
        frame: false
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        console.log('22222222222222222222222222')
            //mainWindow = null
    })

    // 点击关闭时，并没有真正关闭，而是隐藏窗口
    mainWindow.on('close', (event) => {
        console.log('11111111111111111111111111')
            //mainWindow.hide();
            //mainWindow.setSkipTaskbar(true);
            //event.preventDefault();
    });
    mainWindow.on('show', () => {
        tray.setHighlightMode('always')
    })
    mainWindow.on('hide', () => {
        tray.setHighlightMode('never')
    })

    //创建系统通知区菜单
    if (process.env.NODE_ENV !== 'development') { //生成环境
        tray = new Tray(path.join(__static, './tray.png'))
    } else { //研发环境
        tray = new Tray(path.join(__dirname, './tray.png'))
    }
    tray.setToolTip('蔷薇灵动')
    tray.setContextMenu(loginContextMenu)
    tray.on('click', () => {
        mainWindow.show()
        mainWindow.setSkipTaskbar(false)
    })
}

// 实现electron单实例
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
    if (mainWindow) {
        if (mainWindow.isMinimized()) mainWindow.restore()
        mainWindow.focus()
    }
})
if (shouldQuit) {
    app.quit()
}

// 启动项目
function startExeFile() {
    child = cp.spawn(cmdStr)
    child.on('error', () => {})
    child.stdout.on('data', (data) => {
        startMsg = returnString(data)
            //log.info("启动服务", startMsg)
    })
}

app.on('ready', () => {
    createWindow();
    startExeFile();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit() // 显示调用quit才会退出,回调函数什么也不做也不会退出
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

// 监听窗口的最小化
ipcMain.on('window-min', () => {
    mainWindow.minimize()
})

// 监听窗口的关闭
ipcMain.on('window-close', () => {
    mainWindow.hide()
})

// 登录后改变窗口的大小
ipcMain.on('window-resize', (event, arg) => {
    setWindowSize(400, 120)
    event.sender.send('window-resize-message')
})

// 监听登录后，修改托盘菜单
ipcMain.on('window-menu', (event, arg) => {
    setWindowSize(400, 120)
    if (arg) {
        mainWindow.hide()
    } else {
        mainWindow.show()
    }
    setTrayMenu(homeContentMenu, './tray.png')
    event.sender.send('window-menu-message')
})

// 从修改密码切换回主页面信息
ipcMain.on('go-home', (event, arg) => {
    if (arg) {
        setWindowSize(400, 120)
        mainWindow.show()
        event.sender.send('home-message')
    }
    isNotPassword = true
})

// 切回登陆页面时，修改托盘菜单
ipcMain.on('change-menu', (event) => {
    setWindowSize(400, 350)
    mainWindow.show()
        //创建系统通知区菜单
    setTrayMenu(loginContextMenu, './tray.png')
    event.sender.send('change-menu-message')
})

// 定时监听需要去监听stderr而不是stdout，否则会占用stdout，导致其他操作无法正常获取数据的问题
ipcMain.on('keeplive', (event, arg) => {
    setInterval(() => {
        child.stdin.write('{"type":"keepalive"}\n')
    }, 1000);
    child.stderr.on('data', (data) => {
        event.sender.send('keeplive-result', returnString(data))
    })
})

// 处理系统异常
ipcMain.on('system-status', (event, arg) => {
    console.log('3333333333333333333333333')
        // 系统正常，未登录
    if (!arg.isLogin && arg.status) {
        setTrayMenu(loginContextMenu, './logo-gray.png')
    }
    // 系统正常，已登录
    if (arg.isLogin && arg.status) {
        setTrayMenu(homeContentMenu, './logo.png')
    }
    // 系统异常，未登录
    if (!arg.isLogin && !arg.status) {
        setTrayMenu(loginContextMenu, './logo-gray-error.png')
    }
    // 系统异常，已登录
    if (arg.isLogin && !arg.status) {
        setTrayMenu(homeContentMenu, './logo-error.png')
    }
    event.sender.send('system-status-message', arg.status)
})

// 监听渲染进程事件
ipcMain.on('start-exe', (event, arg) => {
    event.sender.send('start-result', startMsg)
})

// 监听登陆渲染进程事件
ipcMain.on("login", (event, arg) => {
    arg.port += ""
    let cmdStr = '' + JSON.stringify(arg) + ''
    child.stdin.write(cmdStr + '\n')
    child.stdout.on('data', (data) => {
        log.info('登陆', returnString(data))
        event.sender.send('login-message', returnString(data))
    })
})

// 监听修改密码进程事件
ipcMain.on("password", (event, arg) => {
    isNotPassword = false
    let cmdStr = '' + JSON.stringify(arg) + ''
    child.stdin.write(cmdStr + '\n')
    child.stdout.on('data', (data) => {
        //log.info('修改密码', returnString(data))
        event.sender.send('password-message', returnString(data))
    })
})

// 将buffer转为字符串
function returnString(buffer) {
    let message = ""
    let logs = buffer.toString().split('\n').filter(x => x)
    logs.forEach(el => {
        message = `${el}\n\n`
    });
    return message
}

// 退出函数
function exitExe() {
    child.stdin.write('{"type":"logout"}\n')
    child.stdout.on('data', (data) => {
        //log.info("退出程序", returnString(data))
        mainWindow.webContents.send('logout-exit', returnString(data))
    })
}

// 退出程序，销毁窗口
ipcMain.on('destroy', () => {
    child.stdin.write('{"type":"exit"}\n')
    app.exit()
})

// 设置window窗口大小
function setWindowSize(width, height) {
    mainWindow.setSize(width, height)
    mainWindow.setMaximumSize(width, height)
    mainWindow.setMinimumSize(width, height)
}

// 设置托盘菜单
function setTrayMenu(contentMenu, imgUrl) {
    //创建系统通知区菜单
    if (process.env.NODE_ENV !== 'development') { //生成环境
        tray.setImage(path.join(__static, imgUrl))
    } else { //研发环境
        tray.setImage(path.join(__dirname, imgUrl))
    }
    tray.setToolTip('蔷薇灵动')
    tray.setContextMenu(contentMenu)
    tray.on('click', () => {
        mainWindow.show()
        mainWindow.setSkipTaskbar(false)
    })
}

// 登出
function logout() {
    child.stdin.write('{"type":"logout"}\n')
    child.stdout.on('data', (data) => {
        //log.info("注销账户", returnString(data))
        if (isNotPassword) {
            mainWindow.webContents.send('logout', returnString(data))
            isNotPassword = true
        }
    })
}