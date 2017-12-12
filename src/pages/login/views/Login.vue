<template lang="html">
	<div class="wrapper">
		<!-- 背景 -->
		<div class="background"></div>
		<!-- 登录框 -->
		<mu-paper class="login-box" :zDepth="2"> 
			<mu-text-field hintText="请输入账号" icon="face" v-model="userName"/>
			<mu-text-field hintText="请输入密码" type="password" icon="fingerprint" v-model="passWord" />
			<!-- 提示文字 -->
			<div class="tip" :style="{color:tip.tipColor}">
				<mu-icon class="tip-icon" value="info" :size="20"/>
				<p>{{tip.tipText}}</p>
			</div>
			<mu-flat-button label="登陆" icon="check" backgroundColor="green" primary @click="check" />
		</mu-paper>
	</div>
</template>

<script>
 import {Background} from '../assets/Background'
//var Background = require('../assets/Background')

export default {
	data() {
		return {
			userName: '',
			passWord: '',
			tip: {
				tipText: '默认保存30天',
				tipColor: 'grey'
			},
			status: 1
		}
	},
	mounted() {
		// 回车提交  无法使用按键修饰符
		let that = this;
		document.addEventListener('keyup', function(e) {
			if (e.keyCode === 13) {
				that.check();
			}
		}, false);
		Background.start(); // 
	},
	methods: {
		check: function(){
			this.$http.post('/api/login', { name:this.userName,password:this.passWord})
						.then(res => {
							if (res.data.err === 0) {
								this.status = 0;
							} else {
								this.status = 2;
							}
						})
						.catch(e => {
							this.status = 2;
						})
		}
	},
	watch: {
		// 监听登录状态
		status: function() {
			let nowStatus = this.status;
			if (nowStatus === 0) {   // 成功
				localStorage.setItem("userName", this.userName);
				localStorage.setItem("passWord", this.passWord);
				window.location.href = 'houtai.html';
			} else if (nowStatus === 2) {  // 失败
				this.tip = {tipText:'账号或密码错误！',tipColor:'red'};
			} else {  // 默认状态
				this.tip = {
					tipText: '默认保存30天',
					tipColor: 'grey'
				};
			}
		}
	}
	
}
</script>

<style lang="css">
	.wrapper {
		width: 100%;
		height: 100%;
		min-width: 900px;
		min-height: 700px;
		position: relative;
	}

	.background {
		width: 100%;
		height: 100%;
		background: grey;
	}

	.login-box {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: center;
		position: absolute;
		width: 400px;
		height: 200px;
		left: calc(50% - 200px);
		top: calc(40% - 100px);
		border: 1px solid grey;
		background-color: pink;
	}

	.tip {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		color: grey;
	}
	.tip-icon {
		margin-right: 5px;
	}
	.tip p {
		font-size: 13px;
		line-height: 20px;
		margin: 0;
	}
</style>