<template lang="html">
	<div class="content">
		<div class="content-left">
			<div class="logo">
				<img src="../assets/logo.png" width="100%">
			</div>
			<mu-flat-button class="add-button" icon="add" label="新增" primary backgroundColor="#2ee2b9" @click="addScp"/>
			<mu-list>
				<mu-list-item v-for="item in scpList" :title="item.id + ' ' + item.name" :key="item.id" @click="setIdChosed(item.id)"></mu-list-item>
			</mu-list>
		</div>
		<detail-scp :id="idChosed" @refreshList="refresh"></detail-scp>
	</div>
</template>

<script>
import Detail from './Detail'

export default {
	created() {
		this.$http.get('/api/list')
				.then(res => {
					this.scpList = res.data;
				})
				.catch(err => {
					console.log(err);
				});
	},
	components: {
		'detail-scp': Detail
	},
	data() {
		return {
			scpList: [],
			idChosed: ''
		}
	},
	methods: {
		// 点击增加按钮
		addScp: function() {
			this.idChosed = '-1';
		},
		// 点击列表各项
		setIdChosed: function(val) {
			this.idChosed = val;
			console.log('setid' + val);
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


</style>