<template>
	<div class="content-right">
			<!-- 头部填写区 -->
			<div class="header">
				<p class="header-title">
					<mu-text-field hintText="项目名称" v-model="scpData.name"  class="header-title-input"/>
				</p>
				<p class="header-menu">
					<label>
						<span>项目编号：SCP -</span>
						<mu-text-field hintText="编号" v-model="scpData.id" class="header-id-input"/>
					</label>
					<label>
						<span style="position:relative;top:-9px;">项目等级：</span>
						<mu-select-field class="header-select" :value="scpData.level">
							<mu-menu-item v-for="level,index in levelList" :key="index" :value="level" :title="level" @click="scpData.level=level" />
						</mu-select-field>
					</label>
				</p>				
			</div>
			<!-- 主体内容 -->
			<div class="body">
				<textarea :value="scpData.content" @input="updateInput"></textarea>
				<div v-html="compiledMarkdown"></div>
			</div>
			<!-- 底部按钮区 -->
			<div class="footer">
				<mu-raised-button @click="removeButton" label="删除" icon="delete" secondary/>
				<mu-raised-button @click="saveButton" label="确定" icon="check" primary/>
			</div>
			<!-- toast -->
			<mu-toast class="toast" v-if="toast" :message="toastMsg" @close="hideToast"/>
		</div>
</template>

<script>
import debounce from 'lodash.debounce'
import marked from 'marked'

export default {
	mounted() {
		this.input = this.scpData.content;
		console.log('mounted')
	},
	props: {
		numid: {
			type: Number
		}
	},
	data() {
		return {
			levelList: ['Safe','Euclid','Killer'],
			scpData: {id:'',numid:0,name:'',level:'',watched:0,content:''},
			toast: false,
			toastMsg: ''
		}
	},
	computed: {
		// 监测到input变化，即解析markdown
		compiledMarkdown: function() {
			return marked(this.scpData.content, {sanitize: true});
		}
	},
	watch: {
		numid: function() {
			if (this.numid > 0) {  // 根据id,取数据 
				this.$http.get(`/api/scp/${this.numid}`)
						.then(res => {
							this.scpData = res.data;
							console.log(this.scpData)
						})
						.catch(err => {
							console.log(err);
						})
			} else {  // 清空
				this.clearData()
			}
		}
	},
	methods: {
		// 节流更新
		updateInput: debounce(function(e) {
			this.scpData.content = e.target.value;
		}, 300),
		// 添加/保存
		saveButton: function() {
			let saveData = this.scpData;
			if(saveData.id && saveData.name && saveData.content && saveData.level) {
				if (parseInt(saveData.id) > 0) {
					this.scpData.numid = parseInt(saveData.id);
					this.$http.post('/api/editscp', this.scpData)
						.then(res => {
							console.log(res.data)
							this.showToast('保存成功');
							this.$emit('refreshList');
						})
						.catch(e => {
							console.log(e)
						})
					} else {
						this.showToast('id错误')
					}
			} else {
				this.showToast('项目不完整')
			}
		},
		// 删除
		removeButton: function() {
			if (this.scpData.numid) {
				this.$http.delete(`/api/deletescp/${this.scpData.numid}`)
						.then(res => {
							this.clearData()
							this.showToast('删除成功');
							this.$emit('refreshList');
						})
			} else {
				this.showToast('请认真一点');
			}
		},
		// toast
		showToast(msg) {
			this.toastMsg = msg;
			this.toast = true;
			if (this.toastTimer) {
				clearTimeout(this.toastTimer);
			}
			this.toastTimer = setTimeout(() => {
				this.toast = false
			}, 1500);
		},
		hideToast() {
			this.toast = false;
			if (this.toastTimer) {
				clearTimeout(this.toastTimer);
			}
		},
		// 清空数据
		clearData() {
			this.scpData = {id:'',numid:0,name:'',level:'',watched:0,content:''};
		}
	}
}	
</script>

<style lang="css" scoped>
input {
	text-align: center;
}

.content-right {
	position: relative;
	width: calc(100% - 190px);
	height: 100%;
	display: inline-block;
	float: right;
	background-color: rgb(236,236,236);
}

.header {
	position: absolute;
	top: 0;
	width: 100%;
}
.header p {
	margin: 0;
	font-size: 16px;
}
.header-title {
	text-align: center;
}
.header-title-input {
	text-align: center !important;
}
.header-menu {
	display: flex;
	justify-content: space-around;
}
.header-id-input {
	text-align: center;
	width: 50px;
}
.header-select {
	text-align: center;
	width: 100px;
}


.body {
	position: absolute;
	display: flex;
	top: 112px;
	bottom: 80px;
	width: calc(100% - 40px);
	min-height: 300px;
	overflow: auto;
	background-color: white;
	margin: 10px 20px;
}
.body textarea, .body div {
	display: inline-block;
	width: 49%;
	height: 100%;
	box-sizing: border-box;
	padding: 0 20px;
}
.body textarea {
	border: none;
	border-right: 1px solid #ccc;
	resize: none;
}
.body div {
	overflow: auto;
}

.footer {
	position: absolute;
	display: flex;
	justify-content: space-around;
	bottom: 0;
	width: 100%;
	background-color: grey;
	padding: 10px 0;
	height: 80px;
	text-align: center;
}

.toast {
	position: absolute;
	top: 30%;
	width: 30%;
	right: 35%;
	text-align: center;
}
</style>