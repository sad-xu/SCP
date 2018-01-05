<template lang="html">
	<div class="detail">
		<!-- 上方标题栏 -->
		<mu-appbar>
			<mu-icon-button :icon="collectIcon" slot="left" @click="collectIt(scp.numid)"/>
			<h1 class="nav-name" solt="default">{{scp.name}}</h1>
			<mu-icon-button icon="close" slot="right" @click="closeIt()"/>
		</mu-appbar>
		<!-- 项目详情 -->
		<div class="detail-content" v-html="compiledMarkdown"></div>
	</div>
</template>

<script>
import marked from 'marked'

export default {
	name: 'detail',
	created() {
		// 判断该项目是否已被收藏
		let arr,
				numid = this.$route.params.numid;
		if (localStorage.getItem('collect')) {
			arr = localStorage.getItem('collect').split(',')
		} else {
			arr = [];
		}

		const that = this;
		arr.forEach(function(item,index) {
			if (numid === item) {
				that.collectIcon = 'star';
			}
			arr[index] = parseInt(item);
		})
		this.collect = arr;
		console.log(this.collect)
		// 获取该项目详细信息
		this.getScp(this.$route.params.numid);
	},
	data() {
		return {
			collectIcon: 'star_border',
			scp: {id:'',numid:0,name:'',level:'',content:'',watched:0},
			collect: []
		}
	},
	computed: {
		compiledMarkdown: function() {
			return marked(this.scp.content, {sanitize:true})
		}
	},
	methods: {
		// 获取
		getScp(numid) {
			this.$http.get('/api/scp/' + numid)
					.then(res => {
						this.scp = res.data;
					})
					.catch(err => {
						console.log(err)
					})
		},
		// 收藏
		collectIt(id) {
			if (localStorage.getItem('loginstatus') === 'true') {  // 是否登陆
				if (this.collectIcon === 'star_border') {  // 收藏
					if (this.collect.length === 0) {
						this.collect.push(id);
						this.collectIcon = 'star';
					} else {
						let flag = false;
						for (let i = 0; i < this.collect.length; i++) {
							if (id < this.collect[i]) {
								this.collect.splice(i,0,id);
								this.collectIcon = 'star';
								flag = true;
								break;
							}
						}
						if (!flag) {
							this.collect.push(id);
							this.collectIcon = 'star';
						}
					}					
					console.log(this.collect);	
				} else {  // 取消收藏
					for (let i = 0; i < this.collect.length; i++) {
						if (id === this.collect[i]) {
							this.collect.splice(i,1);
							this.collectIcon = 'star_border';
							break;
						}
					}
					console.log(this.collect);
				}
				let collectStr = this.collect.join(',');
				// send
				this.$http.post('/api/user/setcollect', {myname: localStorage.getItem('myname'), collect: collectStr})
						.then(res => {
							localStorage.setItem('collect', collectStr)
							console.log('update ok')
						})
						.catch(err => {
							console.log(err)
						})

			} else {
				console.log('未登录');
			}
		},
		// 关闭  (后退)
		closeIt() {
			this.$router.back();
		}
	}
}
</script>

<style lang="css">
	.nav-name {
		margin: 0;
		font-size: 20px;
		text-align: center;
	}

	.detail-content {
		padding: 0 5px 0;
	}

</style>