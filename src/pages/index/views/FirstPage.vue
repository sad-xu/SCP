<template lang="html">
	<div>
		<my-nav navName="SCP资料库"></my-nav>
		<!-- 项目列表 -->
		<mu-list>
			<mu-list-item v-for="scp of scps" :key="scp.id" :title="scp.name" @click="showDetail(scp.numid)"></mu-list-item>
		</mu-list>
	</div>
</template>

<script>
import nav from './Nav.vue'

export default {
	components: {
		'my-nav': nav
	},
	created() {
		this.$http.get('/api/list')
				.then(res => {
					this.scps = res.data;
				})
				.catch(err => {
					console.log(err);
				})
	},
	data() {
		return {
			scps: []
		}
	},
	methods: {
		// 跳转到详情页
		showDetail(numid) {
			this.$router.push(`/scp/${numid}`)
		},
		// 随便看看
		showRenderDetail() {
			let id = Math.render() * 100;
			showDetail(id);
		},
		// 跳转到其他页面
		jumpTo(where) {
			this.$router.push(`/${where}`)
		}
	}
}	
</script>

<style lang="css">
	
</style>