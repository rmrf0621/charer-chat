<template>
	<div class="body">
		<ul class="list">
			<li v-for="(g,index) in groups" @click="selects(g)" :key="index"
			    :style="(select !== null && g.friendUid === select.friendUid) ? 'background-color: rgb(201, 198, 198);':''">
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
    import { onConnect,sender} from '@/request/ProtoSocket.js'
    export default {
        name: "chat",
	    components:{group, ChatView},
	    data(){
            return{
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
                    portrait: 'https://pic2.zhimg.com/v2-5394c89fb122ef5732b4465e3fed7df0_xl.jpg',
                    alias:'这个是尼古拉斯',
                    nickname: '尼古拉斯',
                    type: 'friend',
                    account:'nicholas',
                    friendUid:"2",
                    //groupId: 4,
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
           onConnect(this.receivedCallback)
           this.choose()
            
        },
        destroyed () {
            // 销毁监听
            // this.socket.onclose()
        },
	    methods:{
            receivedCallback(data){
                let msg = {
                    isMe: false,
                    content: data.message.content,
                    time: new Date().getTime()
                }
                this.showmsg(msg,data.message.from)
            },
            choose(){
                const friendUid = this.$route.params.friendUid
                if(friendUid){
                    //debugger
                    let exist = false;
                    this.groups.map((e)=>{
                        if(e.friendUid === friendUid){
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
                            friendUid: cu.friendUid,
                            unRead:0,
                            msgs:[]
                        }
                        this.groups.unshift(talk)
                        this.selects(talk)
                    }
                }
            },
            call(e){
				if(e.keyCode == 13 && this.$route.name == 'chat'){
				 	this.send()		 
				}
            },
            send(content, friendUid) {
                this.groups.forEach(childs => {
                    if (childs.friendUid === friendUid) {
                        childs.msgs.push(content)
                    }
                })
                //console.log(content.content)
                sender(content.content)
                //this.$socket.emit("register","客户端需要帮助了" );
            },
            showmsg(msg, from){
                this.groups.forEach(childs => {
                    if (childs.account === from) {
                        childs.msgs.push(msg)
                    }
                })
                // 消息过多的时候,自动拉到最低部
				this.$nextTick(() => {
					var container = this.$el.querySelector("#msg");
                    if(container && container.scrollHeight){
                        container.scrollTop = container.scrollHeight;
                    }
				});
            },
            // dataGroup(data){
            //     const request = protoRoot.lookup('Request').create()
            //     const message = protoRoot.lookup('Message').create()
            //     message.id = 10001
            //     message.content = data.content;
            //     message.msgType = protoRoot.MsgType.TEXT
            //     message.from = "charlie"
            //     message.to = "nicholas"
            //     message.state = 1
            //     message.isread = 1

            //     request.message = message
            //     request.category = protoRoot.Request.Category.Message
            //     //console.log(request)
            //     this.socket.send(protoRoot.lookup('Request').encode(request).finish())
            // },
            selects(s) {
                this.select = s
                this.$store.commit('SET_SELECT_SESSION', s)
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
