<template>
	<view class="record">
		<view class="rec-style">
			<post :list="list"></post>
		</view>
	</view>
</template>

<script>
	// 组件
	import post from "../../components/list/post.vue";
	// 接口
	const $api = require('../../api/my.js').Api;
	export default{
		components: {
			post
		},
		data(){
			return {
				list:[]
			}
		},
		onShow() {
			$api.userBrowserJobsList().then(res=>{
				this.list=res.data.rows.map(item=>{
					item.jobLabels=item.jobLabels.split(',')
					return item
				})
			})
		}
	}
</script>

<style lang="scss" scoped>
	.record{
		height:100%;
		width: 100%;
		background-color: #fff;
		.rec-style{
			// padding:0 40rpx;
		}
	}
</style>