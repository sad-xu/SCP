<template lang="html">
	<div>
		<!-- 登陆 -->
		<mu-paper v-if="showLogin" :zDepth="2">
			<mu-text-field hintText="请输入账号" icon="face" v-model="user.myName"/>
			<mu-text-field hintText="请输入密码" type="password" icon="fingerprint" v-model="user.myPassWord"/>
			<mu-flat-button label="注册" icon="check" backgroundColor="green" primary @click="showLogin = false;" />
			<mu-flat-button label="登陆" icon="check" backgroundColor="green" primary @click="login" />
		</mu-paper>
		<!-- 注册 -->
		<mu-paper v-if="!showLogin" :zDepth="2">
			<mu-text-field hintText="请输入账号" icon="face" v-model="user.myName"/>
			<mu-text-field hintText="请输入密码" type="password" icon="fingerprint" v-model="user.myPassWord"/>
			<mu-text-field hintText="请输入邮箱" icon="fingerprint" v-model="user.email"/>
			<mu-flat-button label="确认" icon="check" backgroundColor="green" primary @click="signup" />
		</mu-paper>
	</div>
</template>

<script>
export default {
	data() {
		return {
			showLogin: true,
			user: {
				myName: '',
				myPassWord: '',
				email: ''
			}
		}
	},
	methods: {
		login: function() {   // 登陆
			if (this.user.myName.length>0 && this.user.myPassWord.length>0) {
				this.$http.post('/api/user/login', {myname:this.user.myName, mypassword:this.user.myPassWord})
							.then(res => {
								if (res.data.err) {
									alert('login failed')
									console.log('登录失败')
								} else {
									this.user = res.data;
									localStorage.setItem('myname', res.data.myname);
									localStorage.setItem('mypassword', res.data.mypassword);
									localStorage.setItem('email', res.data.email);
									localStorage.setItem('collect', res.data.collect);
									localStorage.setItem('loginstatus', true);
									window.location.reload();
								}
							})
							.catch(e => {
								console.log(e)
							})
			}
		},
		signup: function() {  // 注册
			// 存入数据库
			if (this.user.myName.length>0 && this.user.myPassWord.length>0) {
				this.$http.post('/api/user/signup', {myname:this.user.myName, mypassword:this.user.myPassWord,email:this.user.email})
						.then(res => {
							if (res.data.myname) {
								console.log('注册成功!')
								localStorage.setItem('myname', res.data.myname);
								localStorage.setItem('mypassword', res.data.mypassword);
								localStorage.setItem('loginstatus', true);
								window.location.reload();
							} else {
								console.log('注册失败!')
							}
						})
						.catch(e => {
							console.log(e)
						})
			}	
		}
	}
}
	
</script>

<style lang="css" scoped>
	
</style>