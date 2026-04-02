<template>
	<view class="modifyIntention">
		<view class="modify">	
			<view class="modify-title">
				<view class="modift-g">管理求职意向</view>
				<view class="modift-num">（{{ num }}/3）</view>
			</view>
			<view class="modift-info">我们会根据你的"求职意向"在找工作页展示合适的职位</view>
			<view style="height: 1px; background: #e2e2e2; margin: 32rpx 0;"></view>
			<view class="modift-list" v-for="(item,index) in modifyList" :key="index">
				<view>
					<view class="modify-name">{{item.typeName}}</view>
					<view class="modify-money">{{item.lowSalary}}-{{item.highSalary}} | {{item.workCity}}</view>
				</view>
				<view>
					<uni-icons type="compose" size="26" color="#4684FC" @tap="addIntention(item.id)" />
				</view>
			</view>
			<view class="add" @tap="addIntention(-1)">添加求职意向</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"

const num = ref(0)
const modifyList = ref([])

const addIntention = (id) => {
	if( id == "-1" ){
		if(num.value > 3){
			uni.showToast({
				title: '最多添加3个求职意向，请删除后再上传',
				icon: "none",
				duration: 1500
			})
		}else{
			uni.navigateTo({
				url:`/pages/search/addIntention?id=${id}`
			})
		}
	}else{
		uni.navigateTo({
			url:`/pages/search/addIntention?id=${id}`
		})
	}
}
</script>

<style lang="scss" scoped>
.modifyIntention{
	width: 100%;
	min-height:100vh;
	background-color: #fff;
	
	.modify{
		padding:0 40rpx;
		
		.modify-title{
			height:98rpx;
			display: flex;
			align-items: center;
			
			.modift-g{
				font-size: 48rpx;
				font-family: "黑体";
				font-weight: 600;
			}
			
			.modift-num{
				font-size: 28rpx;
				padding-left: 15rpx;
			}
		}
		
		.modift-info{
			font-size: 26rpx;
			color: rgba(128, 128, 128, 1);
		}
		
		.line{
			height:80rpx;
			display: flex;
			align-items: center;
		}
		
		.modift-list{
			height:120rpx;
			padding-bottom: 40rpx;
			display: flex;
			justify-content: space-between;
			
			.modify-name{
				font-size: 36rpx;
				height:50rpx;
				font-family: "黑体";
				font-weight: 500;
			}
			
			.modify-money{
				font-size: 27rpx;
				color: rgba(128, 128, 128, 1);
			}
		}
	}
}

.add{
	height: 100rpx;
	line-height: 100rpx;
	font-size: 32rpx;
	text-align: center;
	color: #FFFFFF;
	background: #4684FC;
	border-radius: 4rpx;
}
</style>