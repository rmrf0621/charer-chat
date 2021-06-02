if(!window.WebSocket){
    window.WebSocket = window.MozWebSocket; 
}
 // 实例化socket
const socket = new WebSocket(this.path)
socket.binaryType = 'arraybuffer'
// 监听socket连接
socket.onopen = ()=>{console.log("socket连接成功!")}
// 监听socket错误信息
socket.onerror = ()=>{console.log("socket连接错误!")}
socket.onclose = ()=>{console.log("socket连接已关闭!")}
// 监听socket消息
socket.onmessage = this.getMessage


// // 建立服务器跟后台的连接,用户登录
// //this.wsLogin()
// setTimeout(() => {
//     this.wsLogin()
// }, 1000);

/*CIM服务器IP*/
const IM_HOST = 'localhost';
/**服务端 websocket端口*/
const IM_PORT = 7003;
const IM_URI = "ws://" + IM_HOST + ":" + CM_PORT + '/chat';

let socket;
let manualStop = false;

const IMSocket = {}
// 建立socket连接
const onConnect = IMSocket.connect = url => {
    socket = new WebSocket(IM_URI);
    socket.cookieEnabled = false;
    socket.binaryType = 'arraybuffer';
    socket.onopen = IMSocket.innerOnConnectFinished;
    socket.onmessage = IMSocket.innerOnMessageReceived;
    socket.onclose = IMSocket.innerOnConnectionClosed;
};

const onbindAccount = IMSocket.bindAccount = function (account) {
    window.localStorage.account = account;

    let deviceId = window.localStorage.deviceId;
    if (deviceId == '' || deviceId == undefined) {
        deviceId = generateUUID();
        window.localStorage.deviceId = deviceId;
    }

    let browser = getBrowser();
    console.log(proto)
    let body = new proto.com.farsunset.cim.sdk.web.model.SentBody();
    body.setKey("client_bind");
    body.setTimestamp(new Date().getTime());
    body.getDataMap().set("uid", account);
    body.getDataMap().set("channel", APP_CHANNEL);
    body.getDataMap().set("appVersion", APP_VERSION);
    body.getDataMap().set("osVersion", browser.version);
    body.getDataMap().set("packageName", APP_PACKAGE);
    body.getDataMap().set("deviceId", deviceId);
    body.getDataMap().set("deviceName", browser.name);
    IMSocket.sendRequest(body);
};

IMSocket.stop = function () {
    manualStop = true;
    socket.close();
};

IMSocket.resume = function () {
    manualStop = false;
    IMSocket.connect();
};

IMSocket.innerOnConnectFinished = function () {
    let account = window.localStorage.account;
    if (account === '' || account === undefined) {
      window.onConnectFinished();
    } else {
        IMSocket.bindAccount(account);
    }
};

IMSocket.innerOnMessageReceived = function (e) {
    let data = new Uint8Array(e.data);
    let type = data[0];
    let body = data.subarray(DATA_HEADER_LENGTH, data.length);

    if (type === PING) {
        IMSocket.pong();
        return;
    }
    if (type == MESSAGE) {
        let message = proto.com.farsunset.cim.sdk.web.model.Message.deserializeBinary(body);
        onInterceptMessageReceived(message.toObject(false));
        return;
    }

    if (type == REPLY_BODY) {
        let message = proto.com.farsunset.cim.sdk.web.model.ReplyBody.deserializeBinary(body);
        /**
         * 将proto对象转换成json对象，去除无用信息
         */
        let reply = {};
        reply.code = message.getCode();
        reply.key = message.getKey();
        reply.message = message.getMessage();
        reply.timestamp = message.getTimestamp();
        reply.data = {};

        /**
         * 注意，遍历map这里的参数 value在前key在后
         */
        message.getDataMap().forEach(function (v, k) {
            reply.data[k] = v;
        });

        window.onReplyReceived(reply);
    }
};


IMSocket.innerOnConnectionClosed = function (e) {
    if (!manualStop) {
        let time = Math.floor(Math.random() * (30 - 15 + 1) + 15);
        setTimeout(function () {
            IMSocket.connect();
        }, time);
    }
};

IMSocket.sendRequest = function (body) {
    let data = body.serializeBinary();
    let protobuf = new Uint8Array(data.length + 1);
    protobuf[0] = SENT_BODY;
    protobuf.set(data, 1);
    socket.send(protobuf);
};

IMSocket.pong = function () {
    let pong =  new Uint8Array(PONG_BODY.byteLength + 1);
    pong[0] = PONG;
    pong.set(PONG_BODY,1);
    socket.send(pong);
};
function onInterceptMessageReceived(message) {
    /*
     *被强制下线之后，不再继续连接服务端
     */
    if (message.action == ACTION_999) {
        manualStop = true;
    }
    /*
     *收到消息后，将消息发送给页面
     */
    if (onMessageReceived instanceof Function) {
        window.onMessageReceived(message);
    }
}

function getBrowser() {
    let explorer = window.navigator.userAgent.toLowerCase();
    if (explorer.indexOf("msie") >= 0) {
        let ver = explorer.match(/msie ([\d.]+)/)[1];
        return {name: "IE", version: ver};
    } else if (explorer.indexOf("firefox") >= 0) {
        let ver = explorer.match(/firefox\/([\d.]+)/)[1];
        return {name: "Firefox", version: ver};
    } else if (explorer.indexOf("chrome") >= 0) {
        let ver = explorer.match(/chrome\/([\d.]+)/)[1];
        return {name: "Chrome", version: ver};
    } else if (explorer.indexOf("opera") >= 0) {
        let ver = explorer.match(/opera.([\d.]+)/)[1];
        return {name: "Opera", version: ver};
    } else if (explorer.indexOf("Safari") >= 0) {
        let ver = explorer.match(/version\/([\d.]+)/)[1];
        return {name: "Safari", version: ver};
    }
    return {name: "Other", version: "1.0.0"};
}

function generateUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid.replace(/-/g, '');
}

export {
  onConnect,
  onbindAccount
}