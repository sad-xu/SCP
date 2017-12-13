<template lang="html">
	<div class="detail">
		<!-- 上方标题栏 -->
		<mu-appbar>
			<mu-icon-button :icon="collectIcon" slot="left" @click="collectIt(scp.numid)"/>
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
		this.getScp(this.$route.params.numid);
	},
	data() {
		return {
			collectIcon: 'star_border',
			scp: {id:'',numid:0,name:'',level:'',content:'',watched:0}
		}
	},
	computed: {
		compiledMarkdown: function() {
			return marked(this.scp.content, {sanitize:true})
		}
	},
	methods: {
		// 获取
		getScp(numid) {
			this.$http.get('/api/scp/' + numid)
					.then(res => {
						this.scp = res.data;
					})
					.catch(err => {
						console.log(err)
					})
		},
		// 收藏
		collectIt(id) {
			if (this.collectIcon === 'star_border') {
				this.collectIcon = 'star';
			} else {
				this.collectIcon = 'star_border';
			}
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