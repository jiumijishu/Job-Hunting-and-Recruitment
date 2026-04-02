<template>
	<view class="">	
		<!-- 筛选 -->
		<view  class="condition">
			<view v-if="loading" class="showF">
				<van-loading size="24px" vertical>加载中...</van-loading>
			</view>
			<view v-else  class="content">
				
				<view class="tags">
					<view class="title">
						月薪范围
					</view>
					<view class="van-button">
						<view class="buttons" 
						@click="choice1(index,item.minValue,item.maxValue)" 
						:class="num==index?'active-button':''"
						v-for="(item,index) in monthly"
						:key="index"
						style="font-size: 14px;"
						>
						{{item.rangeStr}}
						</view>
						
					</view>

				</view>
				<view class="tags">
					<view class="title">
						学历要求
					</view>

					<view class="van-button">
						<view class="buttons" 
						@click="choice2(index,item.dictLabel)" 
						:class="item.default?'active-button':''"
						v-for="(item,index) in education"
						:key="index">
						{{item.dictLabel}}
						</view>
						
					</view>
				</view>
				<view class="tags">
					<view class="title">
						经验要求
					</view>
				
					<view class="van-button">
						<view class="buttons" 
						@click="choice4(index,item.dictLabel)" 
						:class="item.default?'active-button':''"
						v-for="(item,index) in experience"
						:key="index">
						{{item.dictLabel}}
						</view>
						
					</view>
				</view>
				<view class="tags">
					<view class="title">
						职位类型
					</view>			
					<view class="van-button">
						<view class="buttons" 
						@click="choice5(index,item.categoryName)" 
						:class="item.default?'active-button':''"
						v-for="(item,index) in positionType"
						:key="index">
						{{item.categoryName}}
						</view>						
					</view>
				</view>
			</view>
			<view class="save safe-margin">
				<van-button plain round type="info" @click="empty">清空条件</van-button>
				<view class="btn" @click="savea">
					保存
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default {
		data() {
			return {
				num:-1,
				loading:true,
				// 月薪数据
				monthly:[],
				// 学历数据
				education:[],
				// 经验要求
				experience:[],
				// 职位类型
				positionType:[],
				requirement:{
					// 月薪
					minSalary:"",
					maxSalary:"",
					// 学历
					educationLabels:[],
					// 经验
					experienceLabels:[],
					// 职位类型
					jobTypeLabels:[]
					
				}
			}
		},
		onLoad(){
				this.queryJobFilterData()	
		},

		methods: {

			// 查询岗位筛选条件
			queryJobFilterData(){
				$api.queryJobFilterData().then(res=>{
					this.loading=false;
					this.monthly=res.data.data[1].data
					this.education=res.data.data[0].data
					this.experience=res.data.data[2].data
					this.positionType=res.data.data[3].data.map(item=>{
						item.default=false
						return item
					})
				})
			},

			//筛选
			// 月薪
			choice1(i,min,max){
				this.num=i;
				this.requirement.minSalary=min;
				this.requirement.maxSalary=max;
			},
			// 学历要求
			choice2(i,lable){
				this.education[i].default=!this.education[i].default;
				if(this.education[i].default){
					this.requirement.educationLabels=this.requirement.educationLabels.concat(lable);
				}else{
					this.requirement.educationLabels.splice(this.requirement.educationLabels.indexOf(lable));
				}
				
			},
			choice4(i,lable){
				this.experience[i].default=true;
				if(this.experience[i].default){
					this.requirement.experienceLabels=this.requirement.experienceLabels.concat(lable);
				}else{
					this.requirement.experienceLabels.splice(this.requirement.experienceLabels.indexOf(lable));
				}
				
			},
			
			choice5(i,lable){
				this.positionType[i].default=true;
			
			if(this.experience[i].default){
				this.requirement.jobTypeLabels=this.requirement.jobTypeLabels.concat(lable);
			}else{
				this.requirement.jobTypeLabels.splice(this.requirement.jobTypeLabels.indexOf(lable));
			}
			},
			// 保存
			savea(){
				wx.navigateBack({ //返回
						delta: 1
					});
				uni.$emit('requirement',this.requirement );
				
			},
			// 清空
			empty(){
				this.requirement={
					
						// 月薪
						minSalary:"",
						maxSalary:"",
						// 学历
						educationLabels:[],
						// 经验
						experienceLabels:[],
						// 职位类型
						jobTypeLabels:[]
						
					}
			
		
				wx.navigateBack({ //返回
						delta: 1
					});
				uni.$emit('requirement',this.requirement );
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.condition {
		width: 100%;
		height: 100%;
		padding-top: 40rpx;
		background-color: #fff;
		.showF{
			height:80px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content {
			background-color: #fff;
			padding: 0 40rpx;
			padding-bottom: 150px;
			.tags {
				min-height: 66px;
				
				.van-button {
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;
					// justify-content: space-between;
					.buttons{
						min-width:106px;
						height:48px;
						border:1px solid #F4F8F9;
						border-radius: 6px;
						font-size: 15px;
						background-color: #F4F8F9;
						color:black;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top:10px;
						margin-right: 3px;
					}
					.active-button{
						color:#4684FC;
						border:1px solid #4684FC;
						background-color: #F0F9FF;
					}
				}
			}

		}
	}
	.save{
		background-color: #fff;
		padding:0 40rpx;
		height:100px;
		z-index:1;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: -32px;
		
		.btn{
			width:226px;
			height:44px;
			margin-left: 16px;
			border-radius: 30px;
			background-color: #1473FA;
			display: flex;
			justify-content: center;
			align-items: center;
			color:white;
		}
	}
	.title{
		padding-top:10px;
	}
</style>
