<template>
	<view class="directories">
		<!-- 企业名录-->
		<view class="dir-style">		
			<view>
				<picker mode="region" @change="bindRegionChange" :value="region" >
				     <view class="choose-item">
				      地区
				    </view>
				  </picker>
			</view>
			<view @click="screen">
						筛选
			</view>
		</view>
		<view class="">
			<company :comList="comList"></company>
		</view>
	</view>
</template>

<script>
	import company from "../../components/list/company.vue"
	// 接口
	const $api = require('../../api/home.js').Api;
	const api = require('../../api/company.js').Api;
	export default{
		components:{
			company
		},
		data(){
			return {
				show:false,
				 region: ['请选择省市区/县', '', ''],
				 active:1,
				 // 企业列表
				 comList:[],
				 // 筛选
				 searchInfo:{
					 companyName:'',
					 cityName:'',
					 industry:'',
					 scaleLabels:[],
					 province:'',
					 city:'',
					 area:''
				 }
			}
		},
		onLoad() {
			uni.$on("comRequire",(res)=>{
				this.searchInfo.scaleLabels=res.scaleLabels;
				this.searchInfo.industry=res.industry;
			})
		},
	//页面卸载
		onUnload() {
			//关闭监听
		uni.$off('comRequire',()=>{
		})
	},
		onShow() {
			this.getCompanyList()
		},
		methods:{
			// 企业名录列表
			getCompanyList(){
				api.getCompanyList(this.searchInfo).then(res=>{
					this.comList=res.data.rows
				})
			},
			bindRegionChange (e) {
			      this.region=e.detail.value
				  this.searchInfo.province=this.region[0]
				  this.searchInfo.city=this.region[1]
				  this.searchInfo.area=this.region[2]
				  this.getCompanyList()
			},
			// 跳转到筛选页面
			screen(){
				uni.navigateTo({
					url:"/pages/search/comScreen"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.directories{
		height:100%;
		width:100%;
		background-color: #fff;
	}
	.s-style{
		padding:10px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-top: 1px solid #F2F2F2;
		border-bottom: 1px solid #F2F2F2;
	}
	.dir-style{
	padding:0 40rpx;
		display: flex;
		align-items: center;
		border:1px solid #F0F0F0;
		border-left: none;
		border-right: none;
		height:50px;
		view{
			margin-right: 16px;
		}
	}

</style>