import protobuf from 'protobufjs'
import protoRoot from '@src/proto/proto.js'
// vuex的路径根据自己的路径去写
import store from '@/store/index';

if(!window.WebSocket){
    window.WebSocket = window.MozWebSocket; 
}

/*
    成功回调函数
*/
const CLIENT_VERSION = "1.0.0"
const SYSTEM_VERSION =  getBrowser()
const CLIENT_TYPE = "WEB"
const MESSAGE_CAGETORY = protoRoot.lookup('Request').Category

/*CIM服务器IP*/
const IM_URI = "ws://127.0.0.1:7003/chat"

let socket;
let manualStop = false;

const ProtoSocket = {}
// 建立socket连接
const onConnect = ProtoSocket.connect = callback => {
    socket = new WebSocket(IM_URI);
    socket.cookieEnabled = false;
    socket.binaryType = 'arraybuffer';
    socket.onopen = ProtoSocket.innerOnConnectFinished;
    socket.onmessage = ProtoSocket.innerOnMessageReceived;
    socket.onclose = ProtoSocket.innerOnConnectionClosed;
    // 接手到消息后的回调函数
    // debugger
    ProtoSocket.RECEVIED_CALL_BACK = callback;
    //ProtoSocket.MESSAGE_CAGETORY = protoRoot.lookup('Request').Category;

};

/**
 * 发送消息
 */
const sender = ProtoSocket.request = (data) =>{
    const request = protoRoot.lookup('Request').create()
    const message = protoRoot.lookup('Message').create()
    message.id = generateUUID()
    message.content = data.content;
    message.msgType = protoRoot.MsgType.TEXT
    message.from = store.state.Token.account
    message.to = "nicholas" // 设置当前对话的用户
    message.state = 1
    message.isread = 0
    request.message = message
    request.category = protoRoot.Request.Category.Message
    //console.log(request)
    this.socket.send(protoRoot.lookup('Request').encode(request).finish())

}

//ProtoSocket.SUCCESS_CALL_BACK

// websocket连接建立后，登录
ProtoSocket.innerOnConnectFinished = function () {
    //console.log('-----------------websocket连接建立后，登录-----------------------')
    let account = store.state.Token.token;
    if (account === '' || account === undefined) {
      //window.onConnectFinished();
      console.log('can not find account !')
    } else {
        // 延迟登录请求
        setTimeout(ProtoSocket.bindAccount(account),1000)
    }
};


// 设置用户账号相关信息，请求websocket登录
ProtoSocket.bindAccount = ()=>{
    //console.log('-----------------登录-----------------------')
    const timestamp = Math.round(new Date() / 1000)
    // 请求报文
    const request = protoRoot.lookup('Request').create()
    // 登录建立连接报文
    const login = protoRoot.lookup('Login').create()
    login.account= store.state.Token.account
    login.clientVersion= CLIENT_VERSION
    login.token= store.state.Token.token
    login.deviceModel= CLIENT_TYPE
    login.id= generateUUID()
    login.state= 1
    login.timestamp= timestamp
    login.systemVersion= SYSTEM_VERSION.name+'/'+SYSTEM_VERSION.version
    request.login = login
    request.category = protoRoot.Request.Category.Login
    socket.send(protoRoot.lookup('Request').encode(request).finish())
}

ProtoSocket.isArrayBuffer = (obj)=>{
    return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
}

/**
 *  消息处理
 * @param {*} e 
 * @returns 
 */
ProtoSocket.innerOnMessageReceived = function (response) {
    //let data = new Uint8Array(e.data);
    //let type = data[0];
    //let body = data.subarray(DATA_HEADER_LENGTH, data.length);

    const rawResponse = response.data
        // 判断response是否是arrayBuffer
    if (rawResponse == null || !ProtoSocket.isArrayBuffer(rawResponse)) {
        console.log('---------格式不对----------')
        return
    }
    //console.log('---------------接受到消息了------------------')
    const buf = protobuf.util.newBuffer(rawResponse)
    //console.log(protoRoot.lookup('Request'))
    //debugger
    // decode响应体
    const decodedResponse = protoRoot.lookup('Request').decode(buf)
    console.log(decodedResponse)
    if(decodedResponse.category === MESSAGE_CAGETORY.Login){// 登录

    }else if(decodedResponse.category === MESSAGE_CAGETORY.Message){// 正常消息
        console.log(decodedResponse)
        // 回调函数
        ProtoSocket.RECEVIED_CALL_BACK(decodedResponse)
    }else if (decodedResponse.category === MESSAGE_CAGETORY.HearBeat){// 心跳检测

    }else if(decodedResponse.category === MESSAGE_CAGETORY.Notification){

    }

    // // 心跳检测
    // if (type === PING) {
    //     ProtoSocket.pong();
    //     return;
    // }
    // if (type == MESSAGE) {
    //     let message = proto.com.farsunset.cim.sdk.web.model.Message.deserializeBinary(body);
    //     onInterceptMessageReceived(message.toObject(false));
    //     return;
    // }

    // if (type == REPLY_BODY) {
    //     let message = proto.com.farsunset.cim.sdk.web.model.ReplyBody.deserializeBinary(body);
    //     /**
    //      * 将proto对象转换成json对象，去除无用信息
    //      */
    //     let reply = {};
    //     reply.code = message.getCode();
    //     reply.key = message.getKey();
    //     reply.message = message.getMessage();
    //     reply.timestamp = message.getTimestamp();
    //     reply.data = {};

    //     /**
    
    //      * 注意，遍历map这里的参数 value在前key在后
    //      */
    //     message.getDataMap().forEach(function (v, k) {
    //         reply.data[k] = v;
    //     });

    //     window.onReplyReceived(reply);
    // }
};

// socket关闭
ProtoSocket.innerOnConnectionClosed = ()=>{
    if (!manualStop) {
        let time = Math.floor(Math.random() * (30 - 15 + 1) + 15);
        setTimeout(function () {
            ProtoSocket.connect();
        }, time);
    }
}

ProtoSocket.stop = function () {
    manualStop = true;
    socket.close();
};

/* socket重连 */
ProtoSocket.resume = function () {
    manualStop = false;
    ProtoSocket.connect();
};

/**
 * 强制下线
 * @param {*} message 
 */
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

/**
 * 心跳检测 -- 后续待处理
 */
ProtoSocket.pong = function () {
    let pong =  new Uint8Array(PONG_BODY.byteLength + 1);
    //pong[0] = PONG;
    //pong.set(PONG_BODY,1);
    socket.send(pong);
};


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
  sender
  //onbindAccount,
  //SUCCESS_CALL_BACK
}