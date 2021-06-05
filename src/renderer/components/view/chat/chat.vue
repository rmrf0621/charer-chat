<template>
	<div class="body">
		<ul class="list">
			<li v-for="(g,index) in groups" @click="selects(g)" :key="index"
			    :style="(select !== null && g.groupId === select.groupId) ? 'background-color: rgb(201, 198, 198);':''">
				<group :group="g" :select="select"></group>
			</li>
		</ul>
		<div class="content">
			<chat-view :chat="select" @send="send"></chat-view>
		</div>
	</div>
</template>

<script>
    import group from './group'
    import ChatView from "./chat-view";
    import protobuf from 'protobufjs'
    import protoRoot from '@src/proto/proto.js'
    // import { login } from '@/request/api.js'
    export default {
        name: "chat",
	    components:{group, ChatView},
	    data(){
            return{
                soscket:null,
                path:'ws://127.0.0.1:7003/chat',
                select:null,
	            haha:require('../../../assets/image/collect/haha.jpg'),
                groups: [
                //     {
                //     uid:'g1',
                //     portrait: require('../../../assets/image/group/img2.png'),
                //     name: '嗦泡大队',
                //     type: 'group',
                //     msgs: [{
                //         isMe: true,
                //         content: '哈哈哈哈',
                //         time: new Date().getTime()
                //     }],
                //     groupId: 1,
                //     unRead: 20
                // }, {
                //     uid:'g2',
                //     portrait: require('../../../assets/image/group/dyh.png'),
                //     name: '订阅号',
                //     groupId: 2,
                //     msgs: [{
                //         isMe: true,
                //         content: ' bugstack: 哈哈哈',
                //         time: new Date().getTime()
                //     }],
                //     type: 'public',
                //     unRead: 0
                // }, {
                //     uid:'g3',
                //     portrait: require('../../../assets/image/group/img3.png'),
                //     name: '文件传输助手',
                //     type: 'file',
                //     groupId: 3,
                //     unRead: 0
                // },
                 {
                    portrait: 'https://pic4.zhimg.com/v2-ac785c4cf6be0cf23ac65e15a9f40b65_xl.jpg',
                    alias:'我是大卫啊',
                    name: '我是大卫啊',
                    type: 'friend',
                    uid:'3',
                    groupId: 4,
                    unRead: 5,
                    msgs: [{
                        isMe: false,
                        content: '天王盖地虎',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '宝塔镇河妖',
                        time: new Date().getTime()
                    }]
                }, 
                ]
            }
	    }, 
        mounted(){
               
           //this.init()
           this.choose()
            
        },
        destroyed () {
            // 销毁监听
            this.socket.onclose = this.close
        },
	    methods:{
            init(){
                if(!window.WebSocket){
                    window.WebSocket = window.MozWebSocket; 
                }
                 // 实例化socket
                this.socket = new WebSocket(this.path)
                this.socket.binaryType = 'arraybuffer'
                // 监听socket连接
                this.socket.onopen = ()=>{console.log("socket连接成功!")}
                // 监听socket错误信息
                this.socket.onerror = ()=>{console.log("socket连接错误!")}
                this.socket.onclose = ()=>{console.log("socket连接已关闭!")}
                // 监听socket消息
                this.socket.onmessage = this.getMessage
                // 建立服务器跟后台的连接,用户登录
                //this.wsLogin()
                setTimeout(() => {
                    this.wsLogin()
                }, 1000);
            },
            choose(){
                const uid = this.$route.params.uid
                if(uid){
                    let exist = false;
                    this.groups.map((e)=>{
                        if(e.uid === uid){
                        exist = true
                        this.selects(e)
                        }
                    })
                    // 当前会话列表没有
                    if(!exist){
                        const cu = this.$store.state.Session.selectSession
                        console.log(cu)
                        // 会话列表对象拼接
                        let talk = {
                            uid:cu.uid,
                            alias:cu.alias,
                            portrait:cu.portrait,
                            name :cu.name,
                            type:cu.type,
                            groupId: 66,
                            unRead:0,
                            msgs:[]
                        }
                        this.groups.unshift(talk)
                        this.selects(talk)
                    }
                }
            },
            wsLogin(){
                const request = protoRoot.lookup('Request').create()
                const login = protoRoot.lookup('Login').create()
                login.account='charlie'
                login.clientVersion='1'
                login.token='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MjMxMzg1MDQsInVzZXJpZCI6MTAwMCwiaWF0IjoxNjIyMjc0NTA0LCJ1c2VybmFtZSI6ImNoYXJsaWUifQ.cMK3S3fvSfNa9hKHDeYub5mrb1BPpmKpsK7RTuiazoU'
                login.deviceModel='android'
                login.id=Math.round(new Date() / 1000)
                login.state=1
                login.timestamp=Math.round(new Date() / 1000)
                login.systemVersion='aaaaaaa'
                request.login = login
                request.category = protoRoot.Request.Category.Login
                this.socket.send(protoRoot.lookup('Request').encode(request).finish())

            },
            getMessage: function (response) {
                //console.log(protoRoot.lookup('Request').decode(msg.data))
                const rawResponse = response.data
                 // 判断response是否是arrayBuffer
                if (rawResponse == null || !this.isArrayBuffer(rawResponse)) {
                    console.log('---------格式不对----------')
                    return
                }
                const buf = protobuf.util.newBuffer(rawResponse)
                 // decode响应体
                const decodedResponse = protoRoot.lookup('Request').decode(buf)

                console.log(decodedResponse)
            },
            isArrayBuffer (obj) {
                return Object.prototype.toString.call(obj) === '[object ArrayBuffer]'
            },
            call(e){
				if(e.keyCode == 13 && this.$route.name == 'chat'){
				 	this.send()		 
				}
            },
            send(content, groupId) {
                //this.dataGroup(content)
                this.groups.forEach(group => {
                    if (group.groupId === groupId) {
                        group.msgs.push(content)
                    }
                })
                //this.$socket.emit("register","客户端需要帮助了" );
            },
            dataGroup(data){
                const request = protoRoot.lookup('Request').create()
                const message = protoRoot.lookup('Message').create()
                message.id = 10001
                message.content = data.content;
                message.msgType = protoRoot.MsgType.TEXT
                message.from = "charlie"
                message.to = "root"
                message.state = 1
                message.isread = 1

                request.message = message
                request.category = protoRoot.Request.Category.Message
                console.log(request)
                this.socket.send(protoRoot.lookup('Request').encode(request).finish())
            },
            selects(s) {
                this.select = s
                this.$store.commit('setSelectSession', s)
            },
	    }
    }
</script>

<style scoped lang="less">
	@import '@/assets/style/theme';
	
	.body {
		height: calc(100% - 64px);
		//width: 500px;
		//margin-top: 64px;
		margin-left: 60px;
		
		.list {
			float: left;
			height: 100%;
			width: 250px;
			padding: 0;
			margin: 0 0;
			background-color: @groupBgc;
			overflow-y: auto;
			
			&::-webkit-scrollbar {
				background-color: @groupBgc;
			}
			
			li {
				font-family: @primaryFont;
				color: rgb(153, 153, 153);
				padding: 5px 10px;
				list-style-type: none;
				background-color: @groupBgc;
				
				&:hover {
					background-color: @hoverColor;
				}
			}
		}
		
		.content {
			width: calc(100% - 310px);
			height: calc(100% - 2px);
			float: left;
		}
	}
</style>
