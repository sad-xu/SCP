<template lang="html">
	<div>
		<my-nav navName="我的收藏"></my-nav>
		<!-- 收藏列表 -->
		<mu-list>
			<mu-list-item v-for="data of collectData" :key="data.id" :title="data.id + '-' + data.name" @click="showDetail(data)">
				<span class="watched-num">{{data.watched}}</span>
				<mu-icon class="eye-icon" slot="right" value="remove_red_eye"/>
			</mu-list-item>
		</mu-list>
		<!-- 登陆窗 -->
		<my-login class="login" v-if="showWindow"></my-login>
	</div>
</template>

<script>
import nav from './Nav.vue'
import login from './Login.vue'

export default {
	name: 'collect',
	components: {
		'my-nav': nav,
		'my-login': login
	},
	data() {
		return {
			showWindow: false,
			collect: '',
			collectData: []
		}
		
	},
	created() {  
		// 登陆验证
		if (localStorage.getItem('loginstatus') === 'true') { // 已登录
			this.collect = localStorage.getItem('collect');
			this.showWindow = false;
		} else {
			this.showWindow = true;
		}
	},
	mounted() {
		// 请求收藏列表
		if (this.collect.length) {
			// send 
			this.$http.get('/api/user/getcollect?arr=' + this.collect)
					.then(res => {
						this.collectData = res.data;
						console.log(this.collectData)
					})
					.catch(err => {
						console.log(err)
					})
		} else {
			console.log('暂无数据')
		}
	},
	methods: {
		showDetail(scp) {
			scp.watched++;
			this.$router.push(`/scp/${scp.numid}`)
		}
	}
}
	
</script>

<style lang="css" scoped>
	.login {
		width: 90%;
		margin: 0 auto;
		margin-top: 20%;
	}

	.eye-icon {
		position: relative;
		right: 25px;
	}

	.watched-num {
		position: absolute;
		right: 20px;
		top: 10px;
		color: #989898;
	}
</style>