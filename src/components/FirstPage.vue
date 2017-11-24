<template lang="html">
	<div class="list">
		<!-- 上方标题栏 -->
		<mu-appbar class="bar">
			<h1 slot="default">SCP</h1>
			<mu-icon-button class="left-menu" icon="menu" slot="left" @click="toggle()"/>
		</mu-appbar>
		<!-- 左侧抽屉栏 -->
		<mu-drawer width="35%" :open="open" :docked="docked" @close="toggle()">
			<mu-list @itemClick="toggle()">
				<mu-list-item title="首页" />
				<mu-list-item title="随便看看" @click="showRenderDetail()"/>
				<mu-list-item title="我的收藏" />
				<mu-list-item title="关于" @click="jumpTo('about')"/>
				<mu-list-item title="在线聊天"/>
			</mu-list>		
		</mu-drawer>
		<!-- 项目列表 -->
		<mu-list>
			<mu-list-item v-for="scp of scps" :key="scp.id" :title="scp.name" @click="showDetail(scp.id)"></mu-list-item>
		</mu-list>

	</div>
</template>

<script>
export default {
	data() {
		return {
			open: false,
			docked: false,
			scps: [{id:'001',name:'scp-001',level:'safe'},{id:'002',name:'scp-002',level:'killer'}]
		}
	},
	methods: {
		// 侧边栏切换
		toggle(flag) {
			this.open = !this.open;
		},
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
	* {
		margin: 0;
		padding: 0;
	}

	h1 {
		margin: 0;
		font-size: 20px;
		text-align: center;
	}
	
	.bar {
		position: relative;
	}
	.left-menu {
		position: absolute;
	}
</style>