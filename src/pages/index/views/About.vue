<template lang="html">
	<div>
		<my-nav navName="关于"></my-nav>
		<!-- 时间线 -->
		<mu-timeline class="time-line" lineColor="black" lineType="dashed">
			<mu-timeline-item>
				<span slot="time">2017年 12月 23日</span>
				<span slot="des">发布测试版</span>
			</mu-timeline-item>
			<mu-timeline-item iconColor="red" iconType="dotted">
				<span slot="time">待续 ......</span>
			</mu-timeline-item>	
		</mu-timeline>
		<!-- 未完事项 -->
		<mu-paper class="paper" :zDepth="2" v-html="compiledMarkdown"></mu-paper>
	</div>	
</template>

<script>
import nav from './Nav.vue'
import marked from 'marked'

export default {
	components: {
		'my-nav': nav
	},
	data() {
		return {
			data: `后台地址： [这里](sadxu.top/houtai)


待做：
-----
**移动端**  

- 注册、登陆，收藏功能未实现
- 在线聊天未移植
- 现有数据过少，随便看看功能做了一点

**后台**

- 登陆页面3D需要优化

**后端**

- 爬虫有未知缺陷，部分数据获取不到
- 用户模块没做,表没建


**共同**

- 原始数据格式过旧导致部分markdown语句无法解析，需要自定义解析格式`
		}
	},
	computed: {
		compiledMarkdown: function() {
			return marked(this.data, {sanitize:true})
		}
	},
	methods: {
		
	}
}
</script>

<style lang="css" scoped="scoped">
	.time-line {
		padding:  25px 0 0 15%;
	}

	.paper {
		width: 100%;
		padding: 10px;
	}
</style>