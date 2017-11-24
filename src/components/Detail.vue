<template lang="html">
	<div class="detail">
		<!-- 上方标题栏 -->
		<mu-appbar class="bar">
			<h1 slot="default">{{scp.name}}</h1>
			<mu-icon-button class="left-menu" icon="menu" slot="left" @click="toggle()"/>
		</mu-appbar>
		<!-- 左侧抽屉栏 -->
		<mu-drawer width="35%" :open="open" :docked="docked" @close="toggle()">
			<mu-list @itemClick="toggle()">
				<mu-list-item title="随便看看"/>
				<mu-list-item title="我的收藏" />
				<mu-list-item title="关于"/>
				<mu-list-item title="在线聊天"/>
			</mu-list>		
		</mu-drawer>
		<!-- 项目详情 -->
		<div class="detail-content">
			{{scp.content}}
		</div>
	</div>
</template>

<script>
export default {
	created() {
		// this.getScp(this.$route.params.id);
	},
	data() {
			return {
				open: false,
				docked: false,
				scp: {id:'001',name:'scp-001',content:'12345'}
			}
		},
		methods: {
			// 侧边栏切换
			toggle(flag) {
				this.open = !this.open;
			},
			// 获取
			getScp(id) {
				
			}
		}
}
</script>