<template>
	<view class="direction">
		<view class="dir-style">
			<view style="font-size: 22px;">
				{{info.typeName?info.typeName:""}}
			</view>
			<view style="margin-top: 10px;">
				<van-tag class="vanTab" plain round type="primary" size="medium" v-for="(item,index) in tags" :key="index">{{item}}
				</van-tag>
			</view>
			<view style="display: flex;">
				<button data-name="shareBtn" open-type="share">
				<view class="icon">
					<van-icon name="share" size="16px" class="icons"/>
					分享
				</view>
				</button>
				<button @click="collection">
					<view class="icon" :class="[name=='star'?'istar':'']">
						<van-icon :name="name" size="16px"  class="icons" />
						收藏
					</view>
				</button>
			</view>
			<van-divider />
			<view style="margin-bottom: 10px;font-weight: 600;">
				简介
			</view>
			<rich-text :nodes="details" style="font-size: 16px;"></rich-text>
			<!-- <view style="margin:20px 0;font-size: 18px;">
				常用标签
			</view> -->
			<view class="">

			</view>
			<van-divider />
			<view style="font-weight: 600;" v-if="listFlag">
				相关职位
			</view>
		</view>
		<post :list="list"></post>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	const _api = require('../../api/my.js').Api;
	import post from "@/components/list/post.vue";
	export default {
		data() {
			return {
				// 职业信息
				info: {},
				// 标签
				tags: [],
				// 收藏图标
				name: "star-o",
				// 相关职位
				list:[],
				listFlag:false,
				// 职位类型Id
				typeId:0,
				details:''
			}
		},
		components: {
			post
		},
		onLoad(options) {
			let data = {
				id: options.id
			}
			$api.queryJobTypeDetail(data).then(res => {
				this.info = res.data.data
				this.details=res.data.data.details?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
				this.tags = this.info.lables.split(",");
				this.typeId=res.data.data.id
				this.queryJobDataByType()
				if(this.info.collectFlag){
					this.name='star'
				}
			})
			wx.showShareMenu({
			withShareTicket:true,
			menus:["shareAppMessage","shareTimeline"]
			})

		},
		onShareAppMessage(res) {
			var that = this
						return {
							title:"直通车",
							path: '/pages/details/career-direction-details',
							imageUrl:"",
							success: function (res) {
							  if(res.errMsg == 'shareAppMessage:ok'){
							  }
							},
							fail:function(res){
							}
						}
		},
		methods: {
			// 分享
			shareInfo(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用直通车，赶紧跟我一起来体验！",
					success: function (res) {
					},
					fail: function (err) {
					}
				});
			},

			// 收藏
			collection(){
				let data={
					id:this.typeId,
					type:"03"
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
			// 根据职位类型查询岗位
			queryJobDataByType(){
				let data={
					typeId:this.typeId,
				}
				$api.queryJobDataByType(data).then(res=>{
					this.list=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
					if(this.list.length>0){

						this.listFlag=true
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.direction {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.dir-style {
		padding: 10px 20px 0 20px;
		background-color: #fff;
	}

	.icon {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: rgba(158, 163, 174, 1);
	}
	.icons{
		margin-right: 2px;
	}
	.istar{
		color:#FFC300;
	}
	::v-deep button::after{
		border:none
	}
	::v-deep button{
		margin:0;
		background-color:rgba(0,0,0,0);
		text-align: left;
		    padding: 0;
		    padding-right: 10px;
		    padding-top: 2px;

	}
	.vanTab{
		margin:0 4px 4px 0;
	}
</style>
