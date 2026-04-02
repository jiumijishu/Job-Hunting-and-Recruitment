<template>
	<view>
		<view class="l">
			<view class="login" >
			<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/2023/01/13/20230113152524.png" mode="aspectFit" style="width:100px;height:140px"></image>
			<view @click="appLoginWx" class="btn">一键授权</view>
			</view>
			<view class="safe">
					登陆即代表同意直通车

				<text @click="toPage('/pages/work/text?id=1')" style="color:#422FE6">《用户协议》</text>
				<text @click="toPage('/pages/work/text?id=2')" style="color:#422FE6">《隐私政策》</text>
			</view>
		</view>
	</view>
</template>

<script>
	const $api = require('../../api/login.js').Api;

	export default {
		data() {
			return {
			radio:"0",
			}
		},
		computed: {

		},
		methods: {

				appLoginWx() {
					// #ifdef MP-WEIXIN
					let vm = this

					uni.getUserProfile({
						desc: '用以获取用户昵称、头像等',
						success: info => {
							let form=info.userInfo
							uni.login({
								provider: 'weixin',
								success: res => {
									$api.login({code:res.code}).then(res => {
										wx.setStorageSync("token",JSON.stringify(res.data.data.token));
										wx.setStorageSync("sessionKey",JSON.stringify(res.data.data.sessionKey));
										uni.switchTab({
											url: "/pages/index/index"
										})
									}).catch(err => {

									})
								}
							})
						}
					})

					//#endif
				},
			toPage(path){
				uni.navigateTo({
					url:path
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.l{
		height:100%;
		display: flex;
		flex-direction: column;
		align-items:center;
		justify-content: space-between;
	}
	.login{
		width:100%;
		height:280px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.btn{
		width:92%;
		    height: 40px;
		    border-radius: 6px;
			background-color: #4684FC;
		    color: white;
			margin-top: 40rpx;
		    display: flex;
		    justify-content: center;
		    align-items: center;
	}
	.safe{
		margin-bottom: 100px;
		padding:32rpx;
	}
</style>
