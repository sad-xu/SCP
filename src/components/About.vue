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
				<mu-list-item title="首页" @click="jumpTo('')"/>
				<mu-list-item title="随便看看"/>
				<mu-list-item title="我的收藏" />
				<mu-list-item title="关于"/>
				<mu-list-item title="在线聊天"/>
			</mu-list>		
		</mu-drawer>
	</div>	
</template>

<script>
export default {
	data() {
		return {
			open: false,
			docked: false
		}
	},
	methods: {
		// 侧边栏切换
		toggle(flag) {
			this.open = !this.open;
		},
		// 跳转到其他页面
		jumpTo(where) {
			this.$router.push(`/${where}`)
		}
	}
}
</script>