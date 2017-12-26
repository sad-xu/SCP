<template lang="html">
	<div>
		<my-nav navName="SCP资料库"></my-nav>
		<!-- 项目列表 -->
		<mu-list>
			<mu-list-item v-for="list of lists" :key="list.from" :title="list.name"  :open="list.open" @click="getList(list)">
				<mu-list-item v-for="scp of list.scps" :key="scp.id" :title="scp.id + ' - ' +scp.name" slot="nested" @click="showDetail(scp)">
					<span class="watched-num">{{scp.watched}}</span>
					<mu-icon class="eye-icon" slot="right" value="remove_red_eye"/>
					
				</mu-list-item>
			</mu-list-item>
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

	},
	data() {
		return {
			showList: false,  // 初始时是否展示子项
			lists: [
								{from: 1, to: 10, name: 'SCP 1 ~ 10', scps: [], open: false},
								{from: 11, to: 20, name: 'SCP 11 ~ 20', scps: [], open: false},
								{from: 21, to: 30, name: 'SCP 21 ~ 30', scps: [], open: false},
								{from: 31, to: 40, name: 'SCP 31 ~ 40', scps: [], open: false},
								{from: 41, to: 50, name: 'SCP 41 ~ 50', scps: [], open: false}
							] 
		}
	},
	methods: {
		getList(list) {  // 获取子列表
			if (list.scps.length) {
				list.open = !list.open;
				return;
			} else {
				this.$http.get('/api/list', {
										params: {
											from: list.from,
											to: list.to
										}
									})
									.then(res => {
										list.scps = res.data;
										list.open = true;
									})
									.catch(err => {
										console.log(err);
									})
			}
		},
		// 跳转到详情页
		showDetail(scp) {
			scp.watched++;
			this.$router.push(`/scp/${scp.numid}`)
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