<template>
	<view class="">
		<view class="my1" >
			<view class="my-info">
				<van-image
				  round
				  width="152rpx"
				  height="152rpx"
				  fit="cover"
					use-loading-slot
				  :src="userInfo.avatar?userInfo.avatar:'https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/2022/12/30/微信图片_20221230134924.png'"
				    @click="goInfo()"
				>
				  <van-loading slot="loading" type="spinner" size="20" vertical />
				</van-image>
				<view class="my-text">
					<view class="">
						{{userInfo.userName?userInfo.userName:'微信用户'}}
					</view>
					<view class="my-text-2"  @click="goUserInfo()">
						在线简历
					</view>
				</view>
				
			</view>
			<view class="edit"  @click="goUserInfo()">
				<text>编辑</text>
				<van-icon name="arrow" size="18px" />
			</view>
		</view>
	</view>

	
</template>

<script>
	const $api = require('../../api/login.js').Api;
	const api = require('../../api/my.js').Api;
	export default{
		data(){
			return{
				userInfo:{}
			}
		},
		created() {
			api.getUserResumeDetal().then(res=>{
				this.userInfo=res.data.data
			})
		},
		  onPullDownRefresh:function(){
		    this.onRefresh();
		  },
		methods:{
			// 用户完善信息
			goUserInfo(){
				uni.navigateTo({
					url: "/pages/myInfo/online-resume",
					fail(err) {
					}
				});
			},
			goInfo(){
				uni.navigateTo({
					url:"/pages/myInfo/info?type=基本信息"
				})
			},
			onRefresh:function(){
			    //导航条加载动画
			    wx.showNavigationBarLoading()
			    //loading 提示框
			    wx.showLoading({
			      title: 'Loading...',
			    })
			    setTimeout(function () {
			      wx.hideLoading();
			      wx.hideNavigationBarLoading();
			      //停止下拉刷新
			      wx.stopPullDownRefresh();
			    }, 2000)
			  },

		}
	}
</script>

<style lang="scss" scoped>
		.my{
			padding:0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
		}
		.my1{
			padding:0 40rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.my-info{
			display:flex;
			align-items: center;
			.photoimage{
				height:152rpx;
				width:152rpx;
				border-radius:76px;
				overflow: hidden;
			}
			.my-text{
				padding-left: 20rpx;
				.my-text-1{
					font-size: 38rpx;
					font-weight: 600;
					margin-top:-22rpx;
				}
				.my-text-2{
					font-size: 30rpx;
					margin-top:20rpx;
				}
			}
				
		}
		.edit{
			display: flex;
			align-items: center;
		}
		.btn{
			    height: 30px;
			    line-height: 30px;
			    font-size: 15px;
				margin-bottom: 11px;
		}
</style>