<template>
	<!-- 筛选 -->
	<view  class="condition">
		<view v-if="loading" class="showF">
			<uni-load-more iconType="circle" status="loading" :content-text="contentText" />
		</view>
		<view v-else  class="content">
			<view class="tags">
				<view class="title">月薪范围</view>
				<view class="uni-button">
					<view
						class="buttons"
						:class="num == index ? 'active-button' : ''"
						@tap="choice1(index, item.minValue, item.maxValue)" 
						v-for="(item, index) in monthly" :key="index"
						style="font-size: 14px;"
					>
						{{item.rangeStr}}
					</view>
				</view>
			</view>
			<view class="tags">
				<view class="title">学历要求</view>
				<view class="uni-button">
					<view
						class="buttons"
						:class="item.default ? 'active-button' : ''"
						@tap="choice2(index, item.dictLabel)" 
						v-for="(item,index) in education" :key="index"
					>
						{{item.dictLabel}}
					</view>
				</view>
			</view>
			<view class="tags">
				<view class="title">经验要求</view>
				<view class="uni-button">
					<view
						class="buttons" 
						:class="item.default ? 'active-button' : ''"
						@tap="choice4(index,item.dictLabel)" 
						v-for="(item,index) in experience" :key="index"
					>
						{{item.dictLabel}}
					</view>
				</view>
			</view>
			<view class="tags">
				<view class="title">职位类型</view>			
				<view class="uni-button">
					<view
						class="buttons"
						:class="item.default ? 'active-button' : ''"
						@tap="choice5(index, item.categoryName)" 
						v-for="(item,index) in positionType" :key="index"
					>
						{{item.categoryName}}
					</view>						
				</view>
			</view>
		</view>
		<view class="save safe-margin">
			<view class="clear-the-conditions" @tap="empty">清空条件</view>
			<view class="btn" @tap="savea">保存</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"

const loading = ref(true)
const contentText =ref({
	contentdown: "",
	contentrefresh: "加载中...",
	contentnomore: "",
})
const num = ref(-1)
const monthly = ref([]) // 月薪数据
const education = ref([]) // 学历数据
const experience = ref([]) // 经验要求
const positionType = ref([]) // 职位类型

const choice1 = (i,min,max) => {}
const choice2 = (i,lable) => {}
const choice4 = (i,lable) => {}
const choice5 = (i,lable) => {}
const empty = () => {}
const savea = () => {}
</script>

<style lang="scss" scoped>
.condition {
	width: 100%;
	min-height: 100vh;
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
			
			.uni-button {
				display: flex;
				flex-wrap: wrap;
				align-content: space-between;

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
	
	.clear-the-conditions{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 88px;
		height:44px;
		color: #1989fa;
		border-radius: 999px;
		border: 1px solid #1989fa;
	}
	
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