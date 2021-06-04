<template>
	<div class="cp-contact">
		<group :contacts="contacts" class="group"></group>
		<div class="content">
			<group-view :select="$store.state.Session.selectSession"></group-view>
		</div>
	</div>
</template>

<script>
    import group from "./group";
    import groupView from './group-view'
    import { friendlist } from '@/request/api.js'

    export default {
        name: "contact",
        components: {group, groupView},
        data() {
            return {
                fixContacts: [
                    {
                        title: '新的朋友',
                        type: 'newFriend',
                        list: [{
                            portrait: require('../../../assets/image/group/newFriends.png'), name: '新的朋友',
	                        data:[
                                {portrait: require('../../../assets/image/group/mv1.jpg'), name: '妮妮', remark:'你好啊', status: 1},
                                {portrait: require('../../../assets/image/group/mv3.jpg'), name: '娜娜', remark:'好像在哪见过你', status: 2},
                                {portrait: require('../../../assets/image/group/mv2.jpg'), name: '婉婉', remark:'想跟你认识一下', status: 3},
	                        ]
                        }]
                    },
                    {
                        title: '订阅号',
                        type: 'subscribe',
                        list: [{
                            portrait: require('../../../assets/image/group/dyh.png'), name: '订阅号',
                            data:[
                                {portrait: require('../../../assets/image/group/gzh/rxkf.jpg'), name: '瑞幸咖啡'},
                                {portrait: require('../../../assets/image/group/gzh/sfkd.jpg'), name: '顺丰快递'},
                                {portrait: require('../../../assets/image/group/gzh/wps.jpg'), name: 'WPS'},
                                {portrait: require('../../../assets/image/group/gzh/wxzf.jpg'), name: '微信支付'},
                            ]
                        }]
                    },
                    {
                        title: '群聊',
                        type: 'group',
                        list: [
                            {portrait: require('../../../assets/image/group/img2.png'), name: '嗦泡大队',alias: '嗦泡大队',
                                data:[
                                    {portrait: require('../../../assets/image/group/mv1.jpg'), name: '妮妮',alias: '妮妮'},
                                    {portrait: require('../../../assets/image/group/mv3.jpg'), name: '娜娜',alias: '娜娜'},
                                    {portrait: require('../../../assets/image/group/mv2.jpg'), name: '婉婉',alias: '婉婉'},
                                ]},
                            {portrait: require('../../../assets/image/group/img2.png'), name: 'bugStack虫洞栈',alias: 'bugStack虫洞栈'},
                            {portrait: require('../../../assets/image/group/img2.png'), name: '相亲相爱一家人',alias: '相亲相爱一家人'},
                        ]
                    },
                ],
                select: null,
                contacts: [],
                test: [
                    // {
                    //     title: '群聊',
                    //     type: 'group',
                    //     list: [
                    //         {img: require('../../../assets/image/group/img2.png'), name: '嗦泡大队',
                    //             data:[
                    //                 {img: require('../../../assets/image/group/mv1.jpg'), name: '妮妮'},
                    //                 {img: require('../../../assets/image/group/mv3.jpg'), name: '娜娜'},
                    //                 {img: require('../../../assets/image/group/mv2.jpg'), name: '婉婉'},
                    //             ]},
                    //         {img: require('../../../assets/image/group/img2.png'), name: 'bugStack虫洞栈'},
                    //         {img: require('../../../assets/image/group/img2.png'), name: '相亲相爱一家人'},
                    //     ]
                    // },
                    // {
                    //     title: 'N',
                    //     type: 'friend',
                    //     list: [
                    //         {img: require('../../../assets/image/group/mv1.jpg'), name: '妮妮', sex:true,userid:'nini'},
                    //         {img: require('../../../assets/image/group/mv3.jpg'), name: '娜娜', sex:false,userid:'nana'}
                    //     ]
                    // }, {
                    //     title: 'W',
                    //     type: 'friend',
                    //     list: [
                    //         {img: require('../../../assets/image/group/mv2.jpg'), name: '婉婉',sex:false,userid:'wanwan'},
                    //         {img: require('../../../assets/image/group/ayi1.jpg'), name: '王阿姨',sex:false,userid:'wangayi'}
                    //     ]
                    // },

                ]
            }
        },
        mounted() {
            this.contacts.push(this.fixContacts[0], this.fixContacts[1],this.fixContacts[2])
            //this.test.forEach(t => this.contacts.push(t))
            this.init() 
            //console.log(this.fixContacts)
           
        },
        methods: {
            init(){ 
                friendlist().then(res=>{
                    if(res.code === 200 && res.data){
                      res.data.forEach(e => {
                        this.contacts.push(e)
                      }); 
                    }
                })
            },
            selects(s) {

            }
        }
    }
</script>

<style scoped lang="less">
	@import '@/assets/style/theme';
	
	.cp-contact {
		height: calc(100% - 64px);
		.group {
			overflow-y: auto;
		}
		.content{
			width: calc(100% - 250px);
			height: calc(100% - 2px);
			float: left;
		}
	}
</style>
