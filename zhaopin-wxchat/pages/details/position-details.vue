<template>
	<view class="post-details">
		<view class="post-info">
			<view class="post-name">
				<view  style="font-size: 22px;width:450rpx;">
					{{jobInfo.jobName}}
				</view>
				<view class="post-m" v-if="jobInfo.minSalary==0&& jobInfo.maxSalary==0">
					面议
				</view>
				<view class="post-m" v-else>
					{{jobInfo.minSalary/1000+'k'}}-{{jobInfo.maxSalary/1000+'k'}}
				</view>
			</view>
			<view class="education">
				{{jobInfo.workExperience?jobInfo.workExperience:"无"}} | {{jobInfo.education?jobInfo.education:"无"}}
			</view>
			<view class="education">
				<van-tag class="tag" color="#F7F8FA" text-color="#9EA3AE" size="large"
				 v-for="(i,ind) in jobInfo.jobLabels" :key="ind">{{i}}</van-tag>
			</view>
			<van-divider />
			<view class="map"  :key="index" @click="map (jobInfo.companyAddress.id,jobInfo.companyAddress.latitude,jobInfo.companyAddress.longitude,jobInfo.companyAddress.city,jobInfo.companyAddress.address)">
				<view  style="display: flex;align-items: center;">
					<van-icon name="location-o" />
					<test>{{jobInfo.companyAddress.province}}{{jobInfo.companyAddress.city}}{{jobInfo.companyAddress.area}}{{jobInfo.companyAddress.address}}
					</test>
					</view>
					<van-icon name="arrow" />
			</view>
			<van-divider />
			<view class="">
				<view class="job-description">
					职位描述
				</view>
				<view class="job-conent">
					<rich-text :nodes="rich"></rich-text>
				</view>
			</view>
			<view class="">
				<view class="enterprise" @click="comInfo">
					<!-- 企业头像 -->
					<view class="enterprise-image">
						<van-image width="60" height="60" fit="cover" class="entImg"
							:src="logo?logo:'https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/comPortrait.png'" />
					</view>
					<view class="entInfo">
						<!-- 企业名称 -->
						<view class="entName">
							{{jobInfo.companyName}}
						</view>
						<!-- 企业人数 -->
						<view class="entPeople">
							{{jobInfo.size?jobInfo.size:""}}
						</view>
						<!-- 招聘岗位 -->
						<view class="entPost">
							招聘
							<text style="color:#4684FC;">{{jobInfo.jobName}}</text>
							等{{jobNum}}个职位
						</view>
					</view>
				</view>
			</view>
			<view class="">
				<view class="other">
					该公司其他岗位：
				</view>
				<view style="border-radius: 18rpx;padding:20rpx;">
					<view class="showF" v-if="flag">
						<van-loading size="24px" vertical>加载中...</van-loading>
					</view>
					<view v-else class="post" v-for="(item,index) in postList" :key="index" @click="post(item.id)">
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
							<view class="postText" style="font-size:30rpx;">
								<text>{{item.companyName}}</text>
								<text class="ptext">{{item.cityName}}</text>
							</view>
							<view class="van-tag">
								<van-tag color="#F7F8FA" text-color="#9EA3AE" size="large"
								v-for="(i,ind) in item.jobLabels" :key="ind"
								style="margin-right: 6px;border-bottom: 3px solid white;">{{i}}</van-tag>
							</view>
					</view>
				</view>
			</view>
			<view style="bottom: constant(safe-area-inset-bottom);
				bottom: env(safe-area-inset-bottom);;
				height: 100px;">
			</view>
			<view class="deliver ">
				<button open-type="share" class="icon" @click="share">
					<van-icon name="share" size="46rpx" />
					<view class="">
						分享
					</view>
				</button>
				<view class="icon" @click="collection">
					<van-icon :name="names" size="46rpx"  :class="[names=='star'?'istar':'']"/>
					<view class="">
						收藏
					</view>
				</view>
				<button class="send-resume" :class="isDelivery?'deliverDis':''" @click="delivery">
					{{isDelivery?'已投递':'投递简历'}}
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/work.js').Api;
	const api = require('../../api/company.js').Api;
	const _api = require('../../api/my.js').Api;
	const qapi = require('../../api/login.js').Api;
	export default {
		data() {
			return {
				// 收藏
				name: "star-o",
				names: "star-o",
				// 岗位id
				id:0,
				// 岗位详情
				jobInfo:{},
				// 公司id
				companyId:0,
				// 公司logo
				logo:'',
				jobNum:0,
				// 岗位列表
				postList:null,
				flag:true,
				// 公司详情
				companyDetails:{},
				isDelivery:false,
				// 简历id
				resumeId:0,
				// 在线简历是否填写
				isResume:false,
				// 地址
				address:[],
				rich:''
			}
		},
		onLoad(options) {
			this.id=options.id;
			this.init()
		},
		onShow() {
			this.getUserDetal()
		},
		methods: {
			// 获取个人信息
			getUserDetal(){
				qapi.getUserDetal().then(res=>{
					this.isResume=res.data.onlineResumeFlag
					this.resumeId=res.data.defaultResumeId

				})

			},
			// 岗位详情
			getJobDetail(){
				let data={
					id:this.id
				}
				$api.getUserDetal(data).then(res=>{
					this.jobInfo=res.data.data
					this.rich=res.data.data.intro?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
					this.jobInfo.jobLabels=this.jobInfo.jobLabels.split(',')
					this.isDelivery=this.jobInfo.applyFlag
					this.companyId=res.data.data.companyId
					if(this.jobInfo.collectFlag){
						this.names="star"
					}

				})
			},
			// 查询该公司详情
			getCompanyDetail(){
				let data={
					id:this.companyId
				}
				api.getCompanyDetail(data).then(res=>{
					this.flag=false;
					this.companyDetails=res.data.data
					this.address=res.data.data.addressList
					this.logo=res.data.data.logo;
					this.jobNum=res.data.data.jobNum
					if(res.data.data.collectFlag){
						this.name="star"
					}
					this.postList=res.data.jobData.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			},
			// 跳转公司详情
			comInfo(){
				uni.navigateTo({
					url: `/pages/details/company-details?id=${this.companyId}`
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
			// 收藏
			collection(){
				let vm=this
				let data={
					id:this.id,
					type:"01"
				}
				_api.userCollectCompanyJobs(data).then(res=>{
					if(res.data.msg=="操作成功"){
						vm.names="star"
					}else{
						vm.names="star-o"
					}
						wx.showToast({
						    title: res.data.msg,
						    icon: 'success',
						    duration: 1500
						})
				})

			},
			// 投递简历
			delivery(){
				if(this.resumeId==null){
					wx.showToast({
					 title: "请选择默认简历",
					 icon: "none",
					 duration: 1500,
					 mask: true,
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: `/pages/myInfo/management`
						})
					},1000)
				}
				let flag=this.isResume
				if(flag){
					this.userApplyJob()
				}else{
					wx.showToast({
					 title: "请完善个人简历",
					 icon: "none",
					 duration: 1000,
					 mask: true,
					})
					setTimeout(()=>{
						uni.navigateTo({
							url: `/pages/myInfo/online-resume`
						})
					},1500)
				}
			},
			userApplyJob(){
				let params={
					jobId:parseInt(this.id) ,
					resumeId:JSON.stringify(this.resumeId)
				}
				$api.userApplyJob(params).then(res=>{
					if(res.data.code==200){
						this.isDelivery=true;
						this.message()
					}
				})
			},
			// 订阅消息
			message(){
			let v=wx.getStorageSync("request");
			if(v=="reject" || v==""){
				wx.requestSubscribeMessage({
					      tmplIds: [
					        'H2O4Gx-uR3BxbscqUY1hn5HeHLHg0tFNLrLWSyfItDM'
					      ],
					      success (res) {
							let r=res["H2O4Gx-uR3BxbscqUY1hn5HeHLHg0tFNLrLWSyfItDM"]
								  wx.setStorageSync("request",JSON.stringify(r));
					      }
				})
			}else{
				wx.showToast({
				    title:"投递成功，请注意微信消息",
				    icon: 'none',
				    duration: 1500
				})
			}
			},
			post(id){
				uni.redirectTo({
					url: `/pages/details/position-details?id=${id}`
				})
			},
			// 初始化
			init(){
				this.getJobDetail()
				setTimeout(()=>{
					this.getCompanyDetail();
				},1000)
				this.name="star-o"
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
			.post-name {
				font-size: 36rpx;
				display: flex;
				justify-content: space-between;
				padding: 20rpx 0;
				.post-m {
					color: #E33C64;
				}
			}
			.education {
				color: #808080;
				padding: 10rpx 0;
				.tag {
					margin-right: 6px;
				}
			}
			.map {
				height: 64rpx;
				width: 100%;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.job-description {
				// font-size: 18px;
				font-weight: 600;
				padding: 10rpx 0;
				word-wrap:break-word;
				word-break:break-all;
			}
			.job-conent {
				font-size: 30rpx;
			}
			.other {
				// font-size: 34rpx;
				font-weight: 600;
			}
			.showF{
				height:80px;
				display: flex;
				justify-content: center;
				align-items: center;
			}
			/deep/.van-tag{
				border-bottom: 4px solid white;
			}
			.enterprise {
				height: 90%;
				width: 100%;
				padding: 36px 0 52rpx 0;
				display: flex;
				justify-content: flex-start;
				.entInfo {
					height: 100%;
					margin-left: 8px;
					.entName {
						font-size: 34rpx;
						font-family: "黑体";
						font-weight: 600;
						color: rgba(34, 34, 34, 1);
					}
					.entPeople {
						font-size:30rpx;
						font-weight: 400;
						margin: 20rpx 0;
						color: rgba(166, 166, 166, 1);
					}
					.entPost {
						font-size: 30rpx;
						font-weight: 400;
						color: rgba(102, 102, 102, 1);
					}
				}
			}
			.post {
				// height: 106%;
				width: 100%;
				background-color: white;
				// padding:16px 0;
				border-bottom: 1px solid #E9EDF2;
				.postImg {
					display: flex;
					align-items: center;
					justify-content: space-between;
					height: 68rpx;
					.post-1 {
						display: flex;
						align-items: center;
					}
					.postName {
						width:450rpx;
						overflow: hidden;
						white-space: nowrap;
						 text-overflow: ellipsis;
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
			}

			.deliver {
				position: fixed;
				bottom: 0;
				width: 90%;
				padding-top:10px;
				padding-bottom:calc( constant(safe-area-inset-bottom) + 20rpx);
				padding-bottom:calc( env(safe-area-inset-bottom) + 20rpx);
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				background-color: #fff;

				.icon {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
				}

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
				.deliverDis{
					background-color: #A2C1FD;
					pointer-events: none;
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
		height: 40px;
		line-height: 18px;
		font-size: 16px;
		margin:0;
		background-color:rgba(0,0,0,0);
		text-align: left;
		padding: 0;
		padding-right: 10px;

	}
</style>
