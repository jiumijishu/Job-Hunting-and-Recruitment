<template>
	<view class="tabs">
		<!--顶部导航栏-->
		<!-- 搜索前 -->
		<view class="top">
			
			<scroll-view class="scroll-view_H" scroll-x="true">
				<view class="scroll-view-item_H" v-for="(tab,index) in tabsList" :key="index" :id="tab.id"
					:class="navIndex==index ? 'activite' : ''" @tap="checkIndex(index,tab.id )">
					{{tab.typeName}}
				</view>
			</scroll-view>
		
			<view class="">
				<van-icon class="icon" name="plus" size="36rpx"  @click="setUp"></van-icon>
				<van-icon name="filter-o" size="36rpx" @click="search"></van-icon>
			
			</view>
		</view>		
		<view class="text">
			<view class="textStyle">
				<view >设置求职意向，让推荐更准确 </view>
				<view class="t-style" @click="setUp">
					设置
					<van-icon name="arrow" size="30rpx" ></van-icon>
				</view>
			</view>
			
		</view>
		<!-- 内容 -->
		<view v-if="list.length>0">
			<post :list="list"></post>
		</view>
			<view v-else  class="imgNull">
				<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/null.png" mode="aspectFit"></image>
			</view>
		

	</view>
</template>

<script>
	// 列表
	import post from "@/components/list/post.vue"
	// 接口
	const $api = require('../../api/work.js').Api;
	// 接口
	const api = require('../../api/resume.js').Api;
	export default {
		components: {
			post
		},

		data() {
			return {
				// 意向岗位
				tabsList:[{
					typeName:"推荐",id:0
				}],
				// 推荐岗位
				list:[],
			
				navIndex: 0,
				tabBars: [{
					name: '设备信息',
					id: 'equipment'
				}],
				// 岗位要求
				lists:{
					pageSize:"",
					pageNum:"",
					minSalary:"",
					maxSalary:"",
					jobName:"",
					jobTypeLabels:[],
					pageSize:"",
					industry:"",
					intentionId:"",
					educationLabels:[],
					experienceLabels:[]
				}
				
			}
		},

		mounted(){
				uni.$on('requirement',(data)=>{
					this.lists.minSalary=data.minSalary
					this.lists.maxSalary=data.maxSalary
					this.lists.educationLabels=data.educationLabels
					this.lists.experienceLabels=data.experienceLabels
					this.lists.jobTypeLabels=data.jobTypeLabels
					this.getJobListData()
				})
				uni.$on('Detail',(data)=>{
					this.tabsList=data
				})
				this.getUserIntention()
		
			},
		methods: {
			// 求职意向
			getUserIntention(){	
					api.getUserIntention().then(res=>{
					if(res.data.data.length>0){
						this.tabsList=res.data.data
						// 意向id 
						this.lists.intentionId=this.tabsList[0].id;
					}else{
						this.lists.intentionId=0
					}
					this.getJobListData()
					})
			},
			
			// 切换岗位
			checkIndex(index,id) {
				this.navIndex = index;
				this.lists.intentionId=id;
				this.getJobListData()
			},
			//滑动切换swiper
			tabChange(e) {
				const navIndex = e.detail.current
				this.navIndex = navIndex
			},
			// 根据求职意向推荐岗位
			getJobListData(){
				$api.getJobListData(this.lists).then(res=>{
					this.list=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			},
			// 跳转到筛选页面
			search(){
				uni.navigateTo({
					url:"/pages/search/screen?type='岗位'"
				})
				
			},
			// 跳转到设置求职意向页面
			setUp(){
				uni.navigateTo({
					url:"/pages/search/modifyIntention"
				})
			},

		
		}
	}
</script>

<style lang="scss" scoped>

	.tabs{
		height:100%
	}
	.activite {
		color: #4684FC;
	}

	.content {
		height:80%;
		overflow-y: auto;

		color: black;
	}
	.top{
		padding:0 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	.scroll-view_H {
		height:116rpx;
		background-color: #fff;
		white-space: nowrap;
		width: 72%;
		color: #CCCCCC;
		
	}
	.icon{
		padding-right: 40rpx;
	}
	.text{
		height:40rpx;
		font-size: 28rpx;
		background-color: #F7F6F9;
		padding:20rpx 40rpx;
		.textStyle{
			display: flex;
			justify-content: space-between;
			.t-style{
				color:#4684FC;
				display: flex;
				align-items: center;
			}
		}
	}
	.scroll-view-item_H {
		display: inline-block;
		// width: 20%;
		height: 76rpx;
		line-height: 76rpx;
		text-align: center;
		padding: 10px 10px 10px 0;
		font-size: 35rpx;
	}
	.swiper_item{
		height:100%;
		overflow-y: auto;
	}
	.imgNull{
		display: flex;
		justify-content: center;
	}
</style>