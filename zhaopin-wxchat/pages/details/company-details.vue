<template>
	<view class="post-details">

		<view  v-if="flag" class="post-info">
			<view class="post-title">
				<view class="post-flex">
					<view class="post-name">
						{{company.companyName}}
					</view>
					<view class="post-people">
						{{company.size?company.size:'暂无数据'}}
					</view>
				</view>
				<view class="post-m">
					<van-image width="60" height="60" fit="cover" class="entImg"
						:src="company.logo" />
				</view>
			</view>
			<view class="education">
				<button open-type="share" class="icon" @click="share">
					<van-icon name="share" size="34rpx" />
					<view class="text">
						分享
					</view>
				</button>
				<view class="icon" :class="[name=='star'?'istar':'']"  @click="collection" >
					<van-icon :name="name" size="34rpx" />
					<view class="text">
						收藏
					</view>
				</view>
			</view>
			<van-divider />
			<view class="">
				<view class="adress">
					公司地址
				</view>
				<view class="map"v-for="(item,index) in company.addressList" :key="index"   @click="map (item.id,item.latitude,item.longitude,item.city,item.address)" >
				<view style="display: flex;align-items: center;">
					<van-icon name="location-o" />
					{{item.province}}{{item.city}}{{item.address}}
				</view>

						<van-icon name="arrow" />

				</view>

			</view>

			<van-divider />
			<view class="">
				<view class="job-description">
					公司简介
				</view>
				<rich-text :nodes="intro" class="job-conent"></rich-text>
			</view>
			<view class="">
				<view class="job-video">
					公司相册
				</view>
				<view v-if="company.photoList.length!=0">
					<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
						:duration="duration"  indicator-color="#fff" indicator-active-color='#4684FC'>
						<swiper-item v-for="(item,index) in company.photoList" class="swiper-item">
							<image mode='heightFix' :src="item.fileUrl" style="height: 180px;"/>
						</swiper-item>
					</swiper>
				</view>
				<view v-else>
					无
				</view>
			</view>
			<view class="" v-if='jobNum'>
				<view class="other">
					在招职位：{{jobNum}}
				</view>
					<view class="post">
						<view class="" @click="post(item.id)" v-for="(item,index) in jobData" :key="index">
							<view class="postImg">
								<view class="post-1">
									<text class="postName">{{item.jobName}}</text>
								</view>
								<view class="num" v-if='item.minSalary==0 && item.maxSalary==0'>
									面议
								</view>
								<view class="num" v-else>
									{{item.minSalary/1000+'k' }}-{{item.maxSalary/1000+'k'}}
								</view>
							</view>
							<view class="postText" style="font-size:26rpx;">
								<text>{{item.companyName}}</text>
								<text class="ptext">{{item.size?item.size:''}}</text>
							</view>
							<view class="van-tag">
								<van-tag
								color="#F7F8FA"
								text-color="#9EA3AE"
								size="large"
								v-for="(i,ind) in item.jobLabels"
								:key="ind"
								style="margin-right: 6px;"
								>{{i}}</van-tag>
							</view>
							<van-divider />
						</view>
					</view>
			</view>
			<view v-else>

			</view>
			<view class="deliver safe-padding">
			</view>
		</view>
		<view v-else class="uimage">
			<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/null.png" mode="" style="width:400rpx;height:560rpx;margin:0 auto;"></image>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/company.js').Api;
		const _api = require('../../api/my.js').Api;
	export default {
		data() {
			return {
				// 收藏
				name: "star-o",
				// 公司id
				id:0,
				company:{},
				// 在招职位
				jobData:[],
				// 职位数量
				jobNum:0,
				// tags
				tags:[],
				// 轮播图
				 indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				intro:'',
				flag:false
				}
		},
		onLoad(options) {
			this.id=options.id;
			if(this.id=='null'){
				this.flag=false
			}else{
				this.flag=true
				this.getCompanyDetail()
			}
			uni.$on('info',(data)=>{
			})

		},
		//页面卸载
			onUnload() {
				//关闭监听
			uni.$off('info',()=>{
			})
		},
		methods: {
			// 公司详情
			getCompanyDetail(){
				let data={
					id:this.id
				}
				$api.getCompanyDetail(data).then(res=>{
					this.company=res.data.data;
					this.intro=res.data.data.intro?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
					// 在招职位
					this.jobData=res.data.jobData
					this.jobNum=res.data.jobNum
					this.jobData=this.jobData.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
					if(this.company.collectFlag){
						this.name="star"
					}
				})
			},
			// 收藏
			collection(){
				let data={
					id:this.id,
					type:"02"
				}
				_api.userCollectCompanyJobs(data).then(res=>{
					if(res.data.msg=="操作成功"){
						this.name="star"
					}else{
						this.name="star-o"
					}
						wx.showToast({
						    title: res.data.msg,
						    icon: 'success',
						    duration: 1500
						})

				})

			},
			// 跳转地图
			map(id,latitude,longitude,city,address) {
				let info={
					id,
					latitude,
					longitude,
					city,
					address
				}
				info=JSON.stringify(info)
				uni.navigateTo({
					url: `/pages/details/map?info=${info}`
				})
			},
			// 分享
			share(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 5,
					path: '/pages/details/position-details',
					summary: "我正在使用直通车，赶紧跟我一起来体验！",
					 miniProgram: {
					        id: 'gh_abcdefg',
					        path: 'pages/index/index',
					        type: 1,
					        webUrl: 'http://uniapp.dcloud.io'
					    },
					success: function (res) {
					},
					fail: function (err) {
					}
				});
			},
			// 跳转职位
			post(id){
				uni.navigateTo({
					url: `/pages/details/position-details?id=${id}`
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.post-details {
		width: 100%;
		height: 100%;
		overflow-y: auto;
		background-color: #fff;

		.post-info {
			padding: 0 40rpx;

			.post-title {
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				.post-flex{
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					.post-name{
						font-size: 40rpx;
						// font-weight: 600;
					}
					.post-people{
						font-size: 26rpx;
						color:#B1B1B1;
					}
				}
			}

			.education {
				color: #808080;
				padding: 10rpx 0;
				display: flex;
				justify-content: flex-start;

				.icon {
					font-size: 28rpx;
					display: flex;
					align-items: center;
					padding-right: 30rpx;
					.text{
						padding-left: 6rpx;
					}
				}

			}
			.adress{
				height:68rpx;
				line-height: 50rpx;
				font-size: 34rpx;
				font-weight: 600;
			}
			.map {
				margin-bottom: 10px;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.job-description,.job-video ,.other{
				font-size: 34rpx;
				font-weight: 600;
				padding: 30rpx 0;

			}
			.swiper {
					height: 180px;
					.swiper-item {
						display: block;
						height: 300rpx;
						line-height: 300rpx;
						text-align: center;
						background-color: #fff;
					}
				}
			.job-conent {
				font-size: 30rpx;
				padding-bottom: 20rpx;
			}

			.other {
				// font-weight: 600;
				font-size: 34rpx;
			}

			.post {
				height: 106%;
				width: 100%;
				padding: 16px 16px 0 0;
				background-color: white;

				.postImg {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 68rpx;

					.post-1 {
						width:450rpx;
						overflow: hidden;
						white-space: nowrap;
						 text-overflow: ellipsis;
					}

					.postName {
						font-size: 34rpx;
						font-family: "黑体";
						font-weight: 600;
						color: rgba(34, 34, 34, 1);
					}

					.num {
						color: #E33C64;

					}
				}

				.postText {
					font-size: 28rpx;
					height: 50rpx;

					.ptext {
						color: #868686;
						padding-left: 20rpx;

					}
				}

				.van-tag {
					padding-bottom: 20rpx;
				}


			}

			.deliver {
				height: 110rpx;
				width: 100%;
				display: flex;
				justify-content: space-around;
				padding-top: 30rpx;



				.send-resume {
					width: 72%;
					height: 98rpx;
					border-radius: 8rpx;
					background-color: #4684FC;
					color: white;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
	.istar{
		color:#FFC300;
	}
	::v-deep button::after{
		border:none
	}
	::v-deep button{
		height: 24px;
		line-height: 18px;
		margin:0;
		color: #808080;
		background-color:rgba(0,0,0,0);
		text-align: left;
		padding: 0;
		padding-right: 10px;
		padding-top: 2px;

	}
	.uimage{
		width:400rpx;
		min-height: 540rpx;
		margin:0 auto;
	}
</style>
