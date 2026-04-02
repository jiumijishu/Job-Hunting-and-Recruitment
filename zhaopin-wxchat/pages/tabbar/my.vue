<template>
	<view class="myInfo">
		<view class="my">
			<view class="my-1">
				个人中心
			</view>
			<!-- 个人信息 -->
			<view class="my-2">
				<my-info ></my-info>
			</view>

		</view>
		<!-- 简历管理 -->
		<view class="list">
			<view class="" v-for="(item,index) in list" :key="index" @click="click(item.title,item.url)">
				<view class="">
					<image :src="item.src" mode="aspectFit" style="height:110rpx;width:110rpx;"></image>
				</view>
				<view class="listText">
					{{item.title}}
				</view>

			</view>
		</view>
		<!--求职意向  -->
		<view class="path">
			<view class="path-list" v-for="(item,index) in list1" :key="index" @click="path(item.url)">
				<view class="path-text">
					<van-icon :name="item.name" size="50rpx"></van-icon>
					<text class="text">
						{{item.title}}
					</text>
				</view>

				<van-icon name="arrow" size="40rpx"></van-icon>

			</view>
		</view>
		<view style="margin-top: 40rpx;padding:0 32rpx;">
			<van-button type="default" block @click="logOut">退出登录</van-button>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/my.js').Api;
	import myInfo from "../../components/information/my.vue"
	export default {
		components: {
			myInfo
		},
		data() {
			return {
				list: [{
					url: "/pages/myInfo/management",
					src: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/order.png",
					title: "简历管理"
				}, {
					url: "/pages/myInfo/delivery-record",
					src: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/Collection.png",
					title: "投递记录"
				}, {
					url: "/pages/myInfo/coll",
					src: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/file.png",
					title: "我的收藏"
				}],
				list1: [{
						name: "label-o",
						title: "求职意向",
						url:"/pages/search/modifyIntention"
					},
					{
						name: "clock-o",
						title: "最近浏览",
						url:"/pages/myInfo/record"
					},
					{
						name: "friends-o",
						title: "关于我们",
						url:"/pages/myInfo/about"
					},
					{
						name: "question-o",
						title: "意见反馈",
						url:"/pages/myInfo/opinion"
					},
				],
				userInfo:{}
			}
		},
		onShareAppMessage: function (res) {
			return {
			  title: '直通车',
			  path: 'pages/index/index', // 显示的页面
			  success: function (res) {
				// 转发成功
			  },
			  fail: function (res) {
				// 转发失败
			  }
			}
		// }
		},
			onShareTimeline: function (res) {
				return {
				  title: '自定义标题',
				  path: 'pages/index/index', // 显示的页面
				  imageUrl: "自定义分享封面地址",
				  success: function (res) {
					// 转发成功
				  },
				  fail: function (res) {
					// 转发失败
				  }
				}
			// }
			},
		methods: {
			click(title,url) {
						uni.navigateTo({
							url: url,
							fail(err) {
								console.log(err)
							}
						});



			},
			path(url){
				uni.navigateTo({
					url: url,
					fail(err) {
						console.log(err)
					}
				});

			},
			logOut(){
				 wx.removeStorageSync('token');
				 let rst=wx.getStorageSync('token');
				 if(rst){
				     uni.showToast({
				     	title:"退出失败",
						icon:'none'
				     })
				 }else{
				    uni.showToast({
				    	title:"退出成功",
				    	icon:'none'
				    })
					setTimeout(()=>{
						uni.switchTab({
							url:'/pages/index/index'
						})
					},1500)
				 }
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
	}

	.myInfo {
		position: relative;

		.my {
			width: 100%;
			height: 478rpx;
			background-image: linear-gradient(90deg, #4484F7, #65CBFF);
			color: white;
			display: flex;
			flex-direction: column;
			justify-content: flex-start;

			.my-1 {
				margin-top: 108rpx;
				text-align: center;
			}

			.my-2 {
				margin-top: 60rpx;
			}

		}

		.list {
			width: 90%;
			height: 228rpx;
			background-color: rgba(255, 255, 255, 1);
			border: 1px solid #F3F3F3;
			border-radius: 8rpx;
			margin: 0 auto;
			margin-top: -78rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;

			.listText {
				font-size: 29rpx;
				padding-top: 10rpx;
			}
		}

		.path {
			width: 90%;

			margin: 0 auto;

			.path-list {
				height: 145rpx;
				border-bottom: 1rpx solid #EAEAEA;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.path-text {
					display: flex;
					align-items: center;

					.text {
						padding-left: 20rpx;
					}
				}
			}
		}
	}
</style>
