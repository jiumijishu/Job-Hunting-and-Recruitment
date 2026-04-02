<template>
	<view class="newJob">
		<view class="job">
			<view class="job-bannar">
				<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/bannner1.png" mode="widthFix" style="width:100%;"></image>
			</view>
			<view class="">
				<post :list="list"></post>
			</view>
		</view>
	</view>
</template>

<script>
		import num from "../../utils/num.js"
	// 组件
	import post from "../../components/list/post.vue"
	// 接口
		const $api = require('../../api/work.js').Api;
	export default{
		components: {
			post
		},
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.getNewJobList()
		},
		methods:{
			// 获取最新岗位
			getNewJobList(){
				let data={
					cityName:""
				}
				$api.getNewJobList(data).then(res=>{	
					this.list=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.newJob{
		width:100%;
		height:100%;
		background-color: white;
		.job{
			// padding:0 40rpx;
			height:100%;
			.job-bannar{
				padding:0 40rpx;
				padding-top: 20rpx;
			}
		}
	}
</style>