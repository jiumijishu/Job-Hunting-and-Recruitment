<template>
	<view class="index s-index">
		<view class="search">

			<!-- 搜索 -->
			<view>
				<van-search :value="value" @change="change" shape="round" placeholder="搜职位/公司"   show-action/>

			</view>
			<!-- 搜索时显示相关内容 -->
			<view class="">
				<view class="searchInfo" v-for="(item,index) in search" :key="index" @click="searchOne(item.name)">
						{{item.name}}
				</view>
			</view>
			<!-- 历史与推荐 -->
			<view class="s-style">
				<view class="history">
					<view class="">
					历史搜索
					</view>
					<view style="color: rgba(0, 0, 0, 0.3)" @click="clearHistory">
						清除
					</view>
				</view>
				<view class="tags">
					<view  class="tag" 
					color="#F5F5F7" size="large"
					 text-color="#7A7A7B" 
					 v-for="(item,index) in searchData" 
					 @click="historySearch(item.name)"
					 :key="index">{{item.name}}</view>
				</view>
			</view>
			<view class="h-style">

				<view class="">
					热门搜索
				</view>
				<view class="tags">
					<view class="tag" 
					color="#F5F5F7" size="large" 
					text-color="#7A7A7B"  
					v-for="(item,index) in hotData"
					 @click="historySearch(item.name)"
					 :key="index">{{item.name}}</view>
				</view>
			</view>
		</view>

		<view class="directories">
			<view class="c-style">
				<view style="width:100%;">
					<van-tabs active="1" @change="onChange">
						<van-tab title="搜职位" name='1'>
							
							<post :list="postList"></post>
						</van-tab>
						<van-tab title="搜公司" name='2'>
							<company :comList="comList"></company>
							</van-tab>
					</van-tabs>
				</view>

				<view class="dir-style">
					<view>
						<picker mode="region" @change="bindRegionChange" :value="region">
							<view class="choose-item">
								地区
							</view>
						</picker>
					</view>
					<view @click="screen">
						筛选
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import company from "../../components/list/company.vue"
	import post from "../../components/list/post.vue"
	// 接口
	const $api = require('../../api/home.js').Api;
	const api = require('../../api/company.js').Api;
	const _api = require('../../api/work.js').Api;
	export default {
		data() {
			return {
				value: "",
				// 点击查询到的列表
				name:'',
				show: false,
				region: ['请选择省市区/县', '', ''],
				active:1,
				 jobForm: {
					pageSize: "",
					pageNum: "",
					minSalary: "1000",
					maxSalary: "6000",
					jobName: "",
					jobTypeLabels: [],
					industry: "",
					intentionId: "",
					educationLabels: [],
					experienceLabels:[],
				
				},
				comForm:{
					companyName:"",
					cityName:"",
					industry:"",
					scaleLabels:[],
					province:"",
					city:"",
					area:"",
				},
				// 联想职位
				search:[],
				// 搜职位
				postList:[],
				// 搜公司
				comList:[],
				// 搜索记录
				searchData:[],
				// 热门搜索
				hotData:[],
				title:""
			}
		},
		components: {
			company,post
		},
		onLoad() {
			uni.$on("requirement",(res)=>{
				let {
					educationLabels,
					experienceLabels,
					jobTypeLabels,
					maxSalary,
					minSalary
				}=res
				this.jobForm.educationLabels=educationLabels;
				this.jobForm.experienceLabels=experienceLabels;
				this.jobForm.jobTypeLabels=jobTypeLabels;
				this.jobForm.maxSalary=maxSalary;
				this.jobForm.minSalary=minSalary;
				this.getJobListData()
			})
			uni.$on("comRequire",(res)=>{
				let {
					industry,
					scaleLabels
				}=res
				this.comForm.industry=industry
				this.comForm.scaleLabels=scaleLabels
				this.getCompanyList()
			})
		},
		//页面卸载
			onUnload() {
				//关闭监听
			uni.$off('requirement',()=>{
				console.log('关闭监听');
			})
		},
		onShow() {
			this.getSearchHistory()
		
		},
		methods: {			
			searchOne(name){
				// 添加历史记录
				let data={
					name
				}
				this.name=name
				this.search=[];
				$api.addSearchHistory(data).then(res=>{
				})
				this.getJobListData();
				this.getCompanyList()
			},
			// 历史搜索
			getSearchHistory(){
				$api.getSearchHistory({name:''}).then(res=>{
					this.hotData=res.data.hotData;
					this.searchData=res.data.searchData
				})
			},
			// 搜职位
			getJobListData(){
				// 查询岗位
				this.jobForm.jobName=this.name;
				_api.getJobListData(this.jobForm).then(res=>{
					this.postList=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			},
			// 搜公司
			getCompanyList(){
				this.comForm.companyName=this.name;
				api.getCompanyList(this.comForm).then(res => {
					this.comList=res.data.rows
				})
			},
			// 搜索框发生变化时触发
			change(e) {
				this.value=e.detail				
				if(this.value!=""){
					this.searchHistoryFilter(this.value)
				}
				if(this.value==''){
					this.search=[]
				}
				
			},
			// 搜索联想
			searchHistoryFilter(name) {				
				$api.searchHistoryFilter({name}).then(res => {
					this.search=res.data.data
				})
			},

			// 点击公司职位
			onChange(event) {
				this.title=event.detail.title
				let i=event.detail.title
				if(this.value!=''){
					let tactics={
						"搜公司":this.getCompanyList(),
						"搜职位":this.getJobListData()
					}
					tactics[i]
				}
			},
			// 点击历史搜索
			historySearch(name){
				this.name=name;
				this.value=name;
				this.getJobListData();
				this.getCompanyList();
			},
			// 清除历史
			clearHistory(){
				$api.clearSearchHistory().then(res=>{
					this.searchData=[]
				})
			},
			// 地区筛选
			bindRegionChange(e) {
				this.region = e.detail.value
				this.comForm.province=e.detail.value[0]
				this.comForm.city=e.detail.value[1]
				this.comForm.area=e.detail.value[2]
				this.getCompanyList()
			},
			// 跳转到筛选页面
			screen() {
				if(this.title=="搜职位"){
					uni.navigateTo({
						url:`/pages/search/screen`
					})
				}else{
					uni.navigateTo({
						url:`/pages/search/comScreen`
					})
				}
				
			},

		}
	}
</script>

<style lang="scss" scoped>
	.s-index {
		min-height: 800px;
		overflow-y: auto;
		background-color: #fff;
	}

	.s-style {
		padding: 10px 0;
		border-top: 1px solid #F2F2F2;
		border-bottom: 1px solid #F2F2F2;
	}

	.c-style {
		padding: 10px 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
	}

	.dir-style {

		display: flex;
		position: absolute;
		right:10px;
		top:22px;
		z-index:9;
		view {
			margin-right: 10px;
		}
	}

	.search {
		padding: 0 40rpx;

	}

	.h-style {
		padding-top: 50rpx;
	}

	.history {
		display: flex;
		justify-content: space-between;
	}

	.searchInfo {
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		border-bottom: 1px solid rgba(238, 238, 238, 1);
	}
	.tags{
		display: flex;
		flex-wrap: wrap;
	}
	.tag{
		font-size: 14px;
		height:24px;
		padding:3px 8px;
		border-radius: 2px;
		margin:4px 4px 0 0;
		background-color: #F5F5F7;
		color:#7A7A7B;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	 ::v-deep .van-tag--large{
		  border: 4px solid white;
	 }  
	::v-deep .van-tabs__line {
		width: 48px !important;
		left: -14px;
		background-color: #4684FC;
	}

	::v-deep .van-ellipsis {
		text-align: left;
		font-size: 16px;
	}

	::v-deep .van-tab {
		flex-basis: 22% !important;
	}

	::v-deep .van-sticky {
		padding-right: 25px;
	}
	::v-deep .van-tabs__nav{
		    display: flex;
		    width: 140px;
	}
	::v-deep .van-tabs__content{
		margin:0 -40rpx;
	}
	// ::v-deep .post{
	// 	padding:16px 0 !important;
	// }
	// ::v-deep .comStyle{
	// 	padding:0 !important;
	// }
</style>
