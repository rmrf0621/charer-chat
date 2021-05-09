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
    import Login from '@/renderer/commponents/js/proto/login.js'
    
    export default {
        name: "chat",
	    components:{group, ChatView},
	    data(){
            return{
                soscket:null,
                ws:'ws://127.0.0.1:7003/chat',
                select:null,
	            haha:require('../../../assets/image/collect/haha.jpg'),
                groups: [{
                    img: require('../../../assets/image/group/img2.png'),
                    name: '嗦泡大队',
                    type: 'group',
                    msgs: [{
                        isMe: true,
                        content: '哈哈哈哈',
                        time: new Date().getTime()
                    }],
                    groupId: 1,
                    unRead: 20
                }, {
                    img: require('../../../assets/image/group/dyh.png'),
                    name: '订阅号',
                    groupId: 2,
                    msgs: [{
                        isMe: true,
                        content: ' bugstack: 哈哈哈',
                        time: new Date().getTime()
                    }],
                    type: 'public',
                    unRead: 0
                }, {
                    img: require('../../../assets/image/group/img3.png'),
                    name: '文件传输助手',
                    type: 'file',
                    groupId: 3,
                    unRead: 0
                }, {
                    img: require('../../../assets/image/group/mv1.jpg'),
                    name: '小芳',
                    type: 'user',
                    msgs: [{
                        isMe: false,
                        content: '天王盖地虎',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '宝塔镇河妖',
                        time: new Date().getTime()
                    }],
                    groupId: 4,
                    unRead: 5
                }, {
                    img: require('../../../assets/image/group/mv2.jpg'),
                    name: '婉婉',
                    msgs: [{
                        isMe: false,
                        content: '你不爱我了吗',
                        time: new Date().getTime()
                    }],
                    type: 'user',
                    groupId: 5,
                    unRead: 3
                }, {
                    img: require('../../../assets/image/group/mv3.jpg'),
                    name: '娜娜',
                    msgs: [{
                        isMe: false,
                        content: '亲爱的，我怀孕了',
                        time: new Date().getTime()
                    },{
                        isMe: true,
                        content: '<img src="https://s1.ax1x.com/2020/08/14/dC2uw9.jpg"/><p>孩子肯定不是我的</p>',
                        time: new Date().getTime()
                    }],
                    groupId: 6,
                    type: 'user',
                    unRead: 3
                }, {
                    img: require('../../../assets/image/group/ayi1.jpg'),
                    name: '王阿姨',
                    msgs: [{
                        isMe: false,
                        content: '想通了就给阿姨打电话',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '好',
                        time: new Date().getTime()
                    }, {
                        isMe: true,
                        content: '阿姨我不想努力了😭',
                        time: new Date().getTime()
                    }],
                    groupId: 7,
                    type: 'user',
                    unRead: 2
                }]
            }
	    },
        mounted(){
           //document.addEventListener('keydown',this.call)
           // 静态地址时
           // this.$socket.emit('connect', 1)
        //     var timerOne = window.setInterval(() => {
        //       if (this.$socket) {
        //         this.$socket.emit('connect', 1)
        //         window.clearInterval(timerOne)
        //         return;
        //       }
        //     }, 500)
            this.init()
        },
        // sockets: {
        //     connect: function () {
        //         console.log('兄弟,我来了来了,建立连接......')
        //     },
        //     customEmit: function (data) {
        //         console.log('断开连接......')
        //     },
        //     //客户端接收后台传输的socket事件
        //     message(data) {
        //     console.log("data", data);//接收的消息
        //     }
        // },
        destroyed () {
            // 销毁监听
            this.socket.onclose = this.close
        },
	    methods:{
            init(){
                if(typeof(WebSocket) === "undefined"){
                 alert("您的浏览器不支持socket")
                }else{
                    // 实例化socket
                    this.socket = new WebSocket(this.path)
                    // 监听socket连接
                    this.socket.onopen = this.open
                    // 监听socket错误信息
                    this.socket.onerror = this.error
                    // 监听socket消息
                    this.socket.onmessage = this.getMessage

                    this.wsLogin()
                }
            },
            wsLogin(){
                let request = new Login();
                request.setAccount("demo")
                request.serializeBinary();
                
            },
            open: function () {
                console.log("socket连接成功")
            },
            error: function () {
                console.log("连接错误")
            },
            getMessage: function (msg) {
                console.log(msg.data)
            },
            sends: function () {
                this.socket.send(params)
            },
            close: function () {
                console.log("socket已经关闭")
            },
            call(e){
				if(e.keyCode == 13 && this.$route.name == 'chat'){
					//console.log('-------------------')
				 	this.send()
					 
				}
            },
            send(content, groupId) {
                //console.log('=========')
                this.groups.forEach(group => {
                    if (group.groupId === groupId) {
                        group.msgs.push(content)
                    }
                })
                //this.$socket.emit("register","客户端需要帮助了" );
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
