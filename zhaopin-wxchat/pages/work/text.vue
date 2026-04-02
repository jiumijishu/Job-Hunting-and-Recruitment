<template>
	<view class="text">
		<van-nav-bar :title="title" left-text="返回" left-arrow fixed="true" placeholder="true" safe-area-inset-top
			@click-left="onClickLeft" />
		<view class="rich">
			<rich-text :nodes="privacy"></rich-text>
		</view>
		
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/my.js').Api;
	export default{
		data(){
			return {
				title:'',
				privacy:""
			}
		},
		onLoad(options) {
			let data={
				id:options.id
			}
			$api.getProtocolDetail(data).then(res=>{
				this.title=res.data.data.title
				this.privacy=res.data.data.content?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
			})
		},
		methods:{
			onClickLeft() {
				uni.navigateBack({
					delta: 1 // 返回上个页面
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.text{
		height:100%;
		width:100%;
		background-color: white;
		
	}
	.rich{
		padding:40rpx;
	}
</style>