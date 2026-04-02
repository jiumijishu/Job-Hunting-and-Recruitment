<template>
	<view class="collection">		
		<view class="colStyle">
			<view class="tabs">
			
				<van-tabs :active="active" @change="onChange">
				 <van-tab title="职位" name="01">
					 <post :list='list'></post>
					</van-tab>
				 <van-tab title="公司" name="02">
					 <company :comList="comList"></company>
				 </van-tab>
				  <van-tab title="职业" name="03">
					  <view style="padding:0 40rpx;">
					  	<occupation :occList='postList'></occupation>
					  </view>
					  
				  </van-tab>				  
				</van-tabs>
			</view>
		</view>
	</view>
</template>

<script>
		import company from "../../components/list/company.vue"
		import post from "../../components/list/post.vue"
		import occupation from "../../components/list/occupation.vue";
	// 接口
	const $api = require('../../api/my.js').Api;
	export default{
		components:{
			company,
			post,
			occupation
		},
		data(){
			return {
				 active:"01",
				 // 岗位列表
				 list:[],
				 // 公司列表
				 comList:[],
				 // 职业列表
				 postList:[]
				
			}
		},
		onLoad() {
			let data={
				type:"01"
			};
			this.collList(0,data)
		},
		methods:{
			onChange(event) {
				this.active=event.detail.name
				let data={
					type:this.active
				}
				let i=event.detail.index
				this.collList(i, data)
			 },
			 // 搜藏列表
			 collList(i,data){
				 let that=this;
				 const choose=[
					 function listColl (res){
						that.list=res.data.rows.map(item=>{
							item.jobLabels=item.jobLabels.split(',')
							return item
						})
					 },
					 function comColl (res){
						 that.comList=res.data.rows;
					 },
					 function postColl (res){
						 that.postList=res.data.rows.map(item=>{
							item.lables=item.lables.split(',')
							return item
						})
					 }
				 ]
				 $api.userCollectDataList(data).then(res=>{
					 choose[i](res)
				 })
			 }
		}
	}
</script>

<style lang="scss" scoped>
	.collection{
		height:100%;
		width:100%;
		background-color: #fff;
	}
	.colStyle{
		// padding:0 40rpx;
	}
	/deep/.van-tabs__line{
		    background-color: #4684FC !important;
	}

</style>