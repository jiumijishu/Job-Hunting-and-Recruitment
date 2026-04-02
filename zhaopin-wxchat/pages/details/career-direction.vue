<template>
	<view class="occupation">
		<view class="direction">
			<view class="dropDown" @click="drop">
				<van-icon name="bars" size="20px"/>
			</view>
			<van-tabs :active="active">
				<view :class="project">
					<van-button plain 
					:type="active==item.categoryId?'info':'default'" 
					v-for="(item,index) in tags" 
					:key="index" 
					style="margin-right: 6px;margin-bottom: 4px; "
					@click="pick(item.categoryId)">{{item.categoryName}}</van-button>
				</view>
			  <van-tab v-for="(item,index) in category" :key="index" :title="item.categoryName"  :name="item.categoryId">
				 <occupation :occList='item.childList'></occupation>
			  </van-tab>			  
			</van-tabs>
		</view>
	</view>
</template>

<script>
	// 组件
	import occupation from "../../components/list/occupation.vue";
	// 接口
	const $api = require('../../api/home.js').Api;
	 export default {
		 components: {
		 	occupation
		 },
		data(){
			return{
				  active:1,
				  // 职业分类
				  category:[],
				  // 下拉框内容
				  tags:[],
				  // 控制下拉框出现
				  project:"pro",
				  // 控制下拉框图标
				  name:"arrow-down",
				  type:"default"
				  
			}
		},
		onLoad(options) {
			this.queryJobTypeData()
		},
		methods:{
			// 查询职业分类
			queryJobTypeData(){
				$api.queryJobTypeData().then(res=>{
					this.category=res.data.data
					this.tags=res.data.data.map(item=>{
						let categoryId=item.categoryId;
						let categoryName=item.categoryName;
						return {
							categoryId,
							categoryName
						}
					});
					this.active=this.category[0].categoryId
				})
			},
			
			// 下拉
			drop(){
				if(this.name=="arrow-down"){
					this.project="pros";
					this.name="arrow-up";
				}else{
					this.project="pro";
					this.name="arrow-down";
				}
				
			},
			// 控制选中项目
			pick(id){
				this.active=id
				this.project="pro"
				this.name="arrow-down";
			}
		}
	}
</script>

<style  lang="scss" scoped>
	.occupation{
		width:100%;
		height:100%;
		background-color: white;
		.direction{
			padding:0 40rpx;
			position: relative;
		}
	}
	::v-deep .van-tabs__line{
		
		left:-13px;
		background-color: #4684FC;
		width:40px;
	}
	::v-deep .van-ellipsis {
		text-align: left;
		font-size: 16px;
	}
	::v-deep .van-tab{
		flex-basis: 22% !important;
	}
	::v-deep .van-sticky{
		padding-right: 25px;
	}

	.dropDown{
		position: absolute;
		right: 18px;
		top: 13px;
		z-index: 2;
	}
	.pro{
		height:0;
		overflow: hidden;
	}
	.pros{
		padding:10px 0;
		height:auto;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	::v-deep button{
		height:30px;
	}
</style>