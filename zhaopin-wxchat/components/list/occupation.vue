<template>
	<view class="">
		<view class="dir-list" v-for="(i,ind) in occList" :key="ind" @click="godetails(i.id)">
			<view class="childrenList">

				<view class="title">
					{{i.typeName}}
				</view>
				<view class="money" v-if='i.minSalary&&i.maxSalary'>
					{{i.minSalary/1000+'k'}}~{{i.maxSalary/1000+'k'}}
				</view>
				<view class="noMoney" v-else>
					暂无薪资范围
				</view>
			</view>
			<view class="brief">
				{{i.introduction}}
			</view>
			<view class="childrenPost" v-if="i.jobNum">
				有 <text style="color:#4684FC">{{i.jobNum}}</text> 个相关职位
			</view>
			<view class="childrenPost">
				暂无相关职位
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
		  occList:{
					type:Array,
					value:[]
				}
		},
		data(){
			return {
				childList:[],
			}
		},
		methods:{
			// 查询岗位跳转
			godetails(id){
				uni.navigateTo({
					url:`/pages/details/career-direction-details?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.dir-list{
		padding: 10px 0;
		border-bottom: 1px solid #d8d8d8;
	}
	.childrenList{
		font-size: 18px;
		display: flex;
		justify-content: space-between;
	}
	.title{
		
		color: rgba(34, 34, 34, 1);
	}
	.money{
		color:rgba(227, 60, 100, 1)
	}
	.noMoney{
		color:#a6a6a6;
		font-size:30rpx;
	}
	.brief{
		font-size: 16px;
		font-weight: 400;
		margin: 10rpx 0;
		color: rgba(166, 166, 166, 1);
	}
	.childrenPost{
		font-size: 14px;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
	}
</style>
