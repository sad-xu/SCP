<template lang="html">
	<div class="content">
		<!-- 左侧列表 -->
		<div class="content-left">
			<div class="logo">
				<img src="../assets/logo.png" width="100%">
			</div>
			<mu-flat-button class="add-button" icon="add" label="新增" primary backgroundColor="#2ee2b9" @click="addScp"/>
			<mu-list>
				<mu-list-item v-for="item in scpList" :title="item.id + ' ' + item.name" :key="item.id" @click="setIdChosed(item.numid)"></mu-list-item>
			</mu-list>
			<mu-raised-button class="logout-button" label="退出登录" icon="cancel" backgroundColor="blueGrey" @click="logout()"/>
		</div>
		<!-- 右侧详情 -->
		<detail-scp :numid="idChosed" @refreshList="refresh"></detail-scp>
		<!-- 登陆中 -->
		<transition name="loadfade">
			<div class="loading-wrapper" v-if="status !== 0">
				<mu-circular-progress :size="90" color="red" />
			</div>
	 </transition>
	</div>
</template>

<script>
import Detail from './Detail'

export default {
	beforeCreate() { // 先验证账号
		let userName = localStorage.getItem('userName'),
				passWord = localStorage.getItem('passWord');
		if (userName === null || passWord === null) {
			window.location.href = 'login.html';
		} else {
			this.$http.post('/api/login', {name:userName,password:passWord})
								.then(res => {
									if (res.data.err === 0) {
										this.userName = userName;
										this.status = 0;
									} else {
										window.location.href = 'login.html'
									}
								})
								.catch(e => {
									window.location.href = 'login.html';
								})
		}
	},
	created() { 
		
	},
	components: {
		'detail-scp': Detail
	},
	data() {
		return {
			scpList: [],
			idChosed: 0,
			userName: '',
			status: 1
		}
	},
	watch: {
		status: function() {
			if (this.status === 0) {
				this.$http.get('/api/list')
				.then(res => {
					this.scpList = res.data;
				})
				.catch(err => {
					console.log(err);
				});
			}
		}
	},
	methods: {
		// 点击增加按钮
		addScp: function() {
			this.idChosed = 0;
		},
		// 点击列表各项
		setIdChosed: function(val) {
			this.idChosed = val;
			console.log('setid' + typeof val);
		},
		// 刷新
		refresh: function() {
			this.$http.get('/api/list')
				.then(res => {
					this.scpList = res.data;
				})
				.catch(err => {
					console.log(err);
				});
		},
		// 退出登陆
		logout: function() {
			localStorage.removeItem('userName');
			localStorage.removeItem('passWord');
			window.location.href = 'login.html';
		}
	}
}	
</script>

<style lang="css" scoped>
.content {
	height: 100%;
	overflow: hidden;
}

.content-left {
	width: 190px;
	float: left;
	background-color: rgb(225,225,225);
	margin-bottom: -4000px;
	padding-bottom: 4000px;
}

.add-button {
	display: block;
	margin: 0 auto;
	width: 80%;
}

.loading-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	background-color: grey;
	z-index: 10;
}

.loadfade-enter-active, .loadfade-leave-active {
	transition: opacity .5s;
}
.loadfade-enter, .loadfade-leave-to {
	opacity: 0;
}

.logout-button {
	position: fixed;
	left: 20px;
	bottom: 25px;
	width: 150px;
}

</style>