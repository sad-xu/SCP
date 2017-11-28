<template lang="html">
	<div class="detail">
		<!-- 上方标题栏 -->
		<mu-appbar>
			<mu-icon-button icon="menu" slot="left" @click="collectIt(scp.id)"/>
			<h1 class="nav-name" solt="default">{{scp.name}}</h1>
			<mu-icon-button icon="close" slot="right" @click="closeIt()"/>
		</mu-appbar>
		<!-- 项目详情 -->
		<div class="detail-content" v-html="compiledMarkdown"></div>
	</div>
</template>

<script>
import marked from 'marked'

export default {
	created() {
		// this.getScp(this.$route.params.id);
	},
	data() {
		return {
			scp: {id:'001',name:'scp-001',content:`## SCP-012 未完乐章 

**项目编号：**[SCP-012](http://www.scp-wiki.net/scp-012|SCP-012)

**项目分类：**Euclid

**特殊收容措施：**SCP-012须全天置于一黑暗房间内。倘若SCP-012暴露于可见光下，或者被任何人员以红外光之外的光源观测，则立即将相关人员转移进行心理与生理健康检查。SCP-012须存入一铁盒内，吊放于天花板，并与地板、墙壁及任何空旷处保持至少2.5米(8英尺)距离。

**描述：**SCP-012在一次针对一座近期被风暴摧毁的意大利北部古墓的发掘中由考古学家K·M·桑多瓦尔回收。该物系一套完整乐曲的一部片段手稿，片段名为“在各各他(耶稣受难地)山上”，而该片段似乎尚未完成。手稿使用的红/黑色墨水最初被认为是某种浆果或其他天然染料，但之后被发现是人类血液，且来自多个供源。最早发现SCP-012的人员(19号站特殊回收队)有两名成员陷入疯狂，他们试图用自己的血完成乐章，这最终导致了大量失血和内伤。

随着初期调查的进行，多名测试对象得以接触该手稿。在每个案例中，测试对象均进行了自残，以使他们能够用自己的鲜血完成作品，随之而来的结果是精神分裂症状，及严重的创伤。得以写完一部分音乐的人在完成这部分后宣称它“不可能完成”并立即自尽。演奏该音乐的尝试产生了一片令人生厌的噪音——音乐本身并非以复调进行，而每个单独的器乐部都和其他声部缺乏关联。`}
		}
	},
	computed: {
		compiledMarkdown: function() {
			return marked(this.scp.content, {sanitize:true})
		}
	},
	methods: {
		// 获取
		getScp(id) {
			
		},
		// 收藏
		collectIt(id) {
			console.log('已收藏');
		},
		// 关闭  (后退)
		closeIt() {
			this.$router.back();
		}
	}
}
</script>

<style lang="css">
	.nav-name {
		margin: 0;
		font-size: 20px;
		text-align: center;
	}

</style>