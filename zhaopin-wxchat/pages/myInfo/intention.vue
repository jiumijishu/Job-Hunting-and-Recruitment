<template>
	<view class="intention">

		<view class="int-style">
					求职意向
		</view>
	</view>
</template>

<script>
	const $api = require('../../api/resume.js').Api;
	export default{
		data(){
			return {
				
			}
		},
		onShow() {
			this.getUserIntention()
		},
		methods:{
			getUserIntention(){
				$api.getUserIntention().then(res=>{
				})
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.intention{
		height:100%;
		width:100%;
		background-color: #fff;
		.int-style{
			padding:0 40rpx;
		}
	}
</style>