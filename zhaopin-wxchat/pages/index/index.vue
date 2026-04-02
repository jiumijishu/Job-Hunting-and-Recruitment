<template>
	<view class="index index-add">

		<view class="home-top">
			<!-- 轮播 -->
			<view class="">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration" indicator-color="#fff" indicator-active-color='#4684FC'>
					<swiper-item v-for="(item,index) in bannar" :key="index"  indicator-color="#fff" indicator-active-color='#4684FC'>
						<view class="swiper-item uni-bg-red">
							<image :src="item.image" mode="heightFix" style="height:200rpx;" lazy-load="true" @click="bannars(item.linkType,item.itemId)"></image>
						</view>
					</swiper-item>

				</swiper>
			</view>
			<!-- 列表 -->
			<view class="list-5">

				<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll">
					<view class="scroll">
						<view class="list-5-style" v-for="(item,index) in list" :key="index" @click="industry(item.id)">
							<image :src="item.iconImg?item.iconImg:'https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/file.png'" mode="scaleToFill" style="width:50px;height:50px;border-radius: 8rpx;"  lazy-load="true"></image>
							<view class="list-5-name">
								{{item.name}}
							</view>
						</view>
					</view>

				</scroll-view>
			</view>
		</view>
		<!-- 最新职位 -->
		<view class="post">
			<view class="post-list">
				<view class="post-4" v-for="(item,index) in postList" :key="index" @click="click(item.path)">
					<view class="post-text">
						<view class="post-title">
							{{item.title}}
						</view>
						<view class="post-news">
							{{item.news}}
						</view>
					</view>
					<view class="">
						<image :src="item.url" mode="widthFix" style="width:56px;"  lazy-load="true"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 企业标杆 -->
		<view class="ent-text">
			标杆企业
			<view class="enterprise">
				<view class="ent-list">
					<company :comList="benchmark"></company>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	// 组件
	import company from "../../components/list/company.vue"
	import local from "../../utils/local.js"
	// 接口
		const $api = require('../../api/home.js').Api;
		const _api = require('../../api/resume.js').Api;
	export default {
		components: {
			company
		},

		data() {
			return {
				// 轮播数据
				indicatorDots: true,
				autoplay: true,
				interval: 3000,
				duration: 500,
				// 轮播列表
				bannar: [],
				// 生物药
				list: [],
				// 最新职位
				postList: [{
						path:"new-job",
						title: "最新职位",
						news: "最新发布的职位",
						url: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/post.png",
					},
					{	path:"info-list",
						title: "资讯动态",
						news: "求职信息汇总",
						url: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/info.png",
					},
					{	path:"career-direction",
						title: "职业方向",
						news: "医药职业大全",
						url: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/direction.png",
					},
					{	path:"directories",
						title: "企业名录",
						news: "招聘企业展示",
						url: "https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/com.png",
					},
				],
				// 标杆企业：
				benchmark:[]
			}
		},
		onShow() {
			this.init()
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
			getUserResumeList(){
				_api.getUserResumeList().then(res=>{
						this.$store.state.onLineId=res.data.data[0].id
				})
			},
			// 获取轮播图
			getBannerList(){
				$api.getBannerList().then(res=>{
					this.bannar=res.data.data
				})
			},
			// 获取行业列表
			queryIndustryData(){
				$api.queryIndustryData().then(res=>{
					this.list=res.data.data
				})
			},
			// 获取标杆企业
			queryBrenchmarkCompany(){
				$api.queryBrenchmarkCompany().then(res=>{
					this.benchmark=res.data.rows
				})
			},
			// 点击轮播图
			bannars(id,i){
				if(id=='01'){
					uni.navigateTo({
						url:`/pages/details/news?id=${i}`
					})
				}
				if(id=='02'){
					uni.navigateTo({
						url:`/pages/details/company-details?id=${i}`
					})
				}

			},
			// 点击最新职位等
			click(path){
				// 提示
					uni.navigateTo({
						url: `/pages/details/${path}`,
					});
			},
			// 点击行业跳转
			industry(id){
					uni.navigateTo({
						url: `/pages/details/industry?id=${id}`,
					});
			},
			// 初始化
			init(){
				this.queryIndustryData()
				this.getBannerList()
				this.queryBrenchmarkCompany()
				this.getUserResumeList()
			}
		}

	}
</script>

<style lang="scss" scoped>
	.index-add {
		overflow-x: hidden;
	}
	.home-top,
	.post,
	.enterprise {
		background-color: white;
		padding: 0 40rpx;
	}
	.home-top {
		height: 464rpx;
	}
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}
	.swiper {
		height: 204rpx;
		padding: 11px 0;
	}
	.swiper-item {
		display: block;
		height: 200rpx;
		border-radius: 4px;
		line-height: 300rpx;
		text-align: center;
		background-color: #F3F3F3;
	}
	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}
	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}
	.info {
		position: absolute;
		right: 20rpx;
	}
	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
	.list-5 {
		width: 100%;
		margin-top: 20rpx;
		.scroll-view_H{
				white-space: nowrap;
					width: 100%;
					.scroll{
						display: flex;
						.list-5-style {
							display: flex;
							flex-direction: column;
							align-items: center;
							padding-top: 10rpx;
						padding-right: 37rpx;
							.list-5-name {
								 width:60px;
								height: 40rpx;
								text-align: center;
								padding-top: 8rpx;
								line-height: 40rpx;
								font-size: 28rpx;
								   white-space:nowrap;
								   overflow:hidden;
								   text-overflow:ellipsis;
							}
						}
					}
		}
	}
	.post {
		margin-top: 16rpx;
		height: 348rpx;
		.post-list {
			width: 100%;
			height: 100%;
			padding: 20rpx 0;
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			justify-content: space-evenly;
			align-items: center;
			flex-wrap: wrap;
			.post-4 {
				width: 326rpx;
				height: 142rpx;
				border-radius: 20rpx;
				display: flex;
				justify-content: space-evenly;
				align-items: center;
				background-color: #F7F9FA;
				.post-text {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
					.post-title {
						margin: 10rpx 0;
						font-size: 32rpx;
						font-weight: 500;
					}
					.post-news {
						font-size: 25rpx;
						margin: 2rpx 0;
						color: #A3A3A3;
					}
				}
			}
		}
	}
	.ent-text {
		font-size: 38rpx;
		font-weight: 500;
		height: 80rpx;
		// width:100%;
		padding: 40rpx 0 0 40rpx;
		margin-top: 16rpx;
		background-color: white;
	}
	.enterprise {
		margin-left: -80rpx;
		width:105%;
		.ent-list{
			background-color: #fff;
		}
	}
</style>
