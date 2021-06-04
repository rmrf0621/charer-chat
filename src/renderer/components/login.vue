<template>
	<div class="login" id="loginbtn" >
		<div class="title">
			<span>微聊</span>
			<i class="el-icon-close" @click="exit"></i>
		</div>
		<div class="body">
			<div class="logo" style="text-align:center;margin-top: 20px;">
				<transition name="fade">
					<img src="../assets/image/logo.png" width="90" height="80" v-show="showLogo"/>
				</transition>
			</div>
			<transition name="fade">
				<div v-show="showFont" class="ft">微聊，是一种生活方式</div>
			</transition>
			<transition name="fade">
				<div v-show="showForm">
					<div style="margin-top: 50px">
						<el-input v-model="user.username" placeholder="请输入账号"></el-input>
						<el-input v-model="user.password" placeholder="请输入密码" type="password"></el-input>
						<el-checkbox  v-model="remember">下次直接登录</el-checkbox>
						<el-button  type="primary" class="submit" @click="login">登 录</el-button>
					</div>
					<div class="option">
						<el-button type="text" size="mini">注册账号</el-button>
						<el-button type="text" size="mini">忘记密码</el-button>
						<el-button type="text" size="mini">扫码登录</el-button>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
    import {remote, app, ipcRenderer} from 'electron'
	import { login } from '@/request/api.js'
    export default {
        name: "login",
        data() {
            return {
                remember:false,
                showLogo: false,
                showForm: false,
                showFont: false,
                user: {
                    username: 'charlie',
                    password: '123456',
					devideType:'web'
                }
            }
        },
        beforeCreate() {
            remote.getCurrentWebContents().closeDevTools()
            remote.getCurrentWindow().setSize(350, 500, false)
        },
        mounted() {
			let g = this;
            remote.getCurrentWindow().setSize(350, 500, false)
            this.showLogo = true;
            let that = this;
            setTimeout(() => {
                that.showFont = true
            }, 300)
            setTimeout(() => {
                that.showFont = false
                that.showForm = true
            }, 2500)
			document.addEventListener('keydown',this.call)

        },
        methods: {
            exit() {
                //remote.app.quit()
	            remote.getCurrentWindow().hide()
            },
			call(e){
				//console.log(this.$route)
				if(e.keyCode == 13 && this.$route.name == 'login'){
				 	this.login()
					document.removeEventListener('keydown',this.call)
				}
				 
			},
            login(e) {
                //console.log(this.$router)
                //ipcRenderer.send('new-msg','xxx发来一一条消息')
				login(this.user).then(res=>{
					//debugger;
					if(res.code == 200){
						this.$store.commit('SET_TOKEN', res.data); 
						//this.$store.commit('CLEAR_TOKEN');
						//this.$store.dispatch("AsyncSetToken",res.data);
						if(this.$store.state.Token){
							this.$router.push('/index')
						}
					}else {
						Message.error({
							showClose: true,
							duration: 1500,
							message: error.response.data.message,
                    	})
					}
					 friendlist.then(res=>{
						console.log(res)
						res.data.forEach(t=>{
							this.contacts.push(t)
						})
               		 })
				})
            }
        }
    }
</script>

<style scoped lang="less">
	@import '@/assets/style/theme';
	
	.login {
		height: 100%;
		min-width: 340px;
		overflow: hidden;
	}
	.ft{
		position: fixed;
		top: 250px;
		left: 85px;
		font-size: large;
		color: #7f7f7f;
		text-align:center;
	}
	/deep/ .body {
		display: inline-block;
		padding: 0 20px;
		min-width: 310px;
		height: 100%;
		background-color: @grayBgc;
		.el-checkbox__label{
			font-size: 12px;
		}
		.el-checkbox{
			font-size: small;
		}
		.el-checkbox__input.is-checked+.el-checkbox__label{
			color: @primary;
		}
		.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
			color: @primary;
			background-color: @primary;
			border-color: @primary;
		}
		.submit {
			background-color: @primary;
			border-color: @primary;
			
			&:hover {
				background-color: @primary;
				border-color:@primary;
			}
			
			margin-top: 5px;
			width: 100%;
		}
		
		.option {
			text-align: center;
			
			.el-button--text {
				color: #07C160;
			}
		}
		
		.el-input {
			margin: 10px 0;
			
			.el-input__inner {
				outline: none;
				height: 45px;
			}
		}
		
		.el-button {
			height: 45px;
		}
	}
	
	.title {
		text-align: left;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background-color: @grayBgc;
		-webkit-app-region: drag;
		span{
			color: @icoHc;
			margin-left: 20px;
		}
		i {
			cursor: pointer;
			float: right;
			margin-right: 15px;
			margin-top: 15px;
			-webkit-app-region: no-drag;
		}
		
		i:hover {
			color: #07C160;
		}
	}
	
	.el-input.is-active .el-input__inner, .el-input__inner:focus {
		border-color: @primary !important;
	}
	
	.fade-enter-active, .fade-leave-active {
		transition: opacity 3s;
	}
	
	.fade-enter, .fade-leave-to {
		opacity: 0;
	}
</style>
