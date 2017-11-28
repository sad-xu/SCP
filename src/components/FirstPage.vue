<template lang="html">
	<div>
		<my-nav navName="SCP基金会"></my-nav>
		<!-- 项目列表 -->
		<mu-list>
			<mu-list-item v-for="scp of scps" :key="scp.id" :title="scp.name" @click="showDetail(scp.id)"></mu-list-item>
		</mu-list>
	</div>
</template>

<script>
import nav from './Nav.vue'

export default {
	components: {
		'my-nav': nav
	},
	data() {
		return {
			scps: [{id:'001',name:'scp-001',level:'safe'},{id:'002',name:'scp-002',level:'killer'}]
		}
	},
	methods: {
		// 跳转到详情页
		showDetail(id) {
			this.$router.push(`/scp/${id}`)
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