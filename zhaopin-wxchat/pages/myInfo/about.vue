<template>
	<view class="about">
		<view class="abo-style">
			<view class="">
				<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/logo.png" mode="widthFix"
					style="width:100rpx;"></image>
			</view>
			<view class="">
				<rich-text :nodes="about"></rich-text>
			</view>
		</view>
		<view class="phone">
			<view class="">
				商务合作
			</view>
			<view class=""  @click='contact(phone1)' style="display: flex;align-items: center;">
				{{phone1}}
				<van-icon name="arrow" color="#969799"  />
			</view>
		</view>
		<view class="phone">
			<view class="">
				联系我们

			</view>
			<view class=""  @click='contact(phone2)' style="display: flex;align-items: center;">
				{{phone2}}
				<van-icon name="arrow" color="#969799"  />
			</view>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default {
		data(){
			return {
				phone1:123,
				phone2:13,
				about:""
			}
		},
		onShow() {
			this.getProtocolDetail()
			this.getRelationPhone()
		},
		
		methods: {
			// 调手机号
			contact(phone) {
				let p=String(phone)
				uni.makePhoneCall({
					// 手机号
					phoneNumber: p,
					// 成功回调
					success: (res) => {
					},

					// 失败回调
					fail: (res) => {
						console.log('调用失败!')
					}

				});
			},
			// 关于我们
			getProtocolDetail(){
				// 公司id
				let data={
					id:5
				}
				$api.getProtocolDetail(data).then(res=>{
					this.about=res.data.data.content?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
				})
			},
			// 商务号码
			getRelationPhone(){
				
				$api.getRelationPhone().then(res=>{
					if(res.data.code=="200"){
						this.phone1=res.data.businessPhone
						this.phone2=res.data.relationPhone
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.about {
		height: 100%;
		width: 100%;

		.abo-style {
			margin: 20rpx 0;
			padding: 20px 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #fff;
		}
	}

	.phone {
		height: 48px;
		padding: 0 40rpx;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}
</style>
