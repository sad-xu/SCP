<template>
	<div class="content-right">
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
							<mu-menu-item v-for="level,index in levelList" :key="index" :value="level" :title="level"/>
						</mu-select-field>
					</label>
				</p>				
			</div>
			<div class="body">
				<textarea :value="scpData.content" @input="updateInput"></textarea>
				<div v-html="compiledMarkdown"></div>
			</div>
			<div class="footer">
				<mu-raised-button @click="saveButton" label="确定" icon="check" primary/>
			</div>
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
		id: {
			type: String
		}
	},
	data() {
		return {
			levelList: ['Safe','Euclid','Killer'],
			scpData: {id:'001',name:'scp-001 xxx',level:'Safe',watched:99,content:`## SCP-012 未完乐章 

**项目编号：**[SCP-012](http://www.scp-wiki.net/scp-012|SCP-012)

**项目分类：**Euclid

**特殊收容措施：**SCP-012须全天置于一黑暗房间内。倘若SCP-012暴露于可见光下，或者被任何人员以红外光之外的光源观测，则立即将相关人员转移进行心理与生理健康检查。SCP-012须存入一铁盒内，吊放于天花板，并与地板、墙壁及任何空旷处保持至少2.5米(8英尺)距离。

**描述：**SCP-012在一次针对一座近期被风暴摧毁的意大利北部古墓的发掘中由考古学家K·M·桑多瓦尔回收。该物系一套完整乐曲的一部片段手稿，片段名为“在各各他(耶稣受难地)山上”，而该片段似乎尚未完成。手稿使用的红/黑色墨水最初被认为是某种浆果或其他天然染料，但之后被发现是人类血液，且来自多个供源。最早发现SCP-012的人员(19号站特殊回收队)有两名成员陷入疯狂，他们试图用自己的血完成乐章，这最终导致了大量失血和内伤。

随着初期调查的进行，多名测试对象得以接触该手稿。在每个案例中，测试对象均进行了自残，以使他们能够用自己的鲜血完成作品，随之而来的结果是精神分裂症状，及严重的创伤。得以写完一部分音乐的人在完成这部分后宣称它“不可能完成”并立即自尽。演奏该音乐的尝试产生了一片令人生厌的噪音——音乐本身并非以复调进行，而每个单独的器乐部都和其他声部缺乏关联。`}
		}
	},
	computed: {
		// 监测到input变化，即解析markdown
		compiledMarkdown: function() {
			return marked(this.scpData.content, {sanitize: true});
		}
	},
	watch: {
		id: function() {
			if (this.id != '-1') {  // 根据id,取数据 
				this.scpData = {id:'003',name:'scp003 ddd',level:'Safe',content:`## 123`};
				console.log(this.id);
			} else {  // 清空
				this.scpData = {content:''};
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
			this.$http.post('/api/addscp', {
				id: this.scpData.id,
				name: this.scpData.name,
				level: this.scpData.level,
				content: this.scpData.content
			})
			.then(res => {
				console.log(res.data)
			})
			.catch(e => {
				console.log(e)
			})
		}
	}
}	
</script>

<style lang="css" scoped>
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
	text-align: center;
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
	min-height: 500px;
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
	bottom: 0;
	width: 100%;
	background-color: grey;
	padding: 10px 0;
	height: 80px;
	text-align: center;
}
</style>