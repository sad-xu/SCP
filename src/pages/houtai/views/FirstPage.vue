<template lang="html">
	<div class="content">
		<div class="content-left">
			<div class="logo">
				SCP List
			</div>
			<mu-float-button icon="add" nackgroundColor @click="addScp"/>
			<mu-list>
				<mu-list-item v-for="item in scpList" :title="item.name" :key="item.id" @click="setIdChosed(item.id)"></mu-list-item>
			</mu-list>
		</div>
		<detail-scp :id="idChosed"></detail-scp>
	</div>
</template>

<script>
import Detail from './Detail'

export default {
	components: {
		'detail-scp': Detail
	},
	data() {
		return {
			scpList: [{id:'001',name:'scp-001 xhc'},{id:'002',name:'scp-002 xhc'},{id:'003',name:'scp-003 喜欢吃'}],
			idChosed: ''
		}
	},
	methods: {
		// 点击增加按钮
		addScp: function() {
			this.idChosed = '-1';
			console.log('addScp ')
		},
		// 点击列表各项
		setIdChosed: function(val) {
			this.idChosed = val;
			console.log('setid' + val);
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


</style>