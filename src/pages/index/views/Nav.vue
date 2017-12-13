<template lang='html'>
	<div class="nav">
		<!-- 上方标题栏 -->
		<mu-appbar class="nav-bar">
			<h1 class="nav-name" slot="default">{{navName}}</h1>
			<mu-icon-button class="nav-menu" icon="menu" slot="left" @click="toggle()"/>
		</mu-appbar>
		<!-- 左侧抽屉栏 -->
		<mu-drawer width="35%" :open="open" :docked="docked" @close="toggle()">
			<mu-list @itemClick="toggle()">
				<mu-list-item title="首页" @click="jumpTo('')"/>
				<mu-list-item title="随便看看" @click="showRenderDetail()"/>
				<mu-list-item title="我的收藏"/>
				<mu-list-item title="关于" @click="jumpTo('about')" />
				<mu-list-item title="在线交流"/>
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
	props: {
		navName: {
			type: String,
			default: 'Default Name'
		}
	},
	methods: {
		// 侧边栏切换
		toggle(flag) {
			this.open = !this.open;
		},
		// 跳转到详情页
		showDetail(numid) {
			this.$router.push(`/scp/${numid}`);
		},
		// 随便看看
		showRenderDetail() {
			let numid = Math.floor(Math.random() * 100 + 1);
			this.showDetail(numid)
		},
		// 跳转到其他页面
		jumpTo(where) {
			this.$router.push({path: `/${where}`})
		}
	}
}
</script>

<style lang="css">
	.nav-bar {
		position: relative;
	}

	.nav-menu {
		position: absolute;
	}

	.nav-name {
		margin: 0;
		font-size: 20px;
		text-align: center;
	}
</style>
