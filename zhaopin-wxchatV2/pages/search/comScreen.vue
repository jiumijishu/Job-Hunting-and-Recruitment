<template>
	<view class="">	
		<!-- 筛选 -->
		<view  class="condition">
			<view v-if="loading" class="showF">
				<uni-load-more iconType="circle" status="loading" :content-text="contentText" />
			</view>
			<view v-else class="content">				
					<view class="tags">
						<view class="title">公司规模</view>
						<view class="van-button">
							<view
								class="buttons" 
								:class="item.default ? 'active-button' : ''"
								v-for="(item,index) in scale" :key="index"
								@tap="choice6(index, item.dictLabel)" 
							>
								{{item.dictLabel}}
							</view>
						</view>
					</view>
					<view class="tags">
						<view class="title">主营行业</view>
						<view class="van-button">
							<view
								class="buttons"
								:class="comNum == index ? 'active-button' : ''"
								@tap="choice7(index,item.name)" 
								v-for="(item,index) in industry" :key="index"
							>
								{{item.name}}
							</view>
						</view>
				</view>
			</view>
			<view class="save safe-margin">
				<view class="clear-the-conditions" @tap="empty">清空条件</view>
				<view class="btn" @tap="savea">保存</view>
			</view>
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
const scale = ref([]) // 公司
const comNum = ref(-1)
const industry = ref([])

const choice6 = (i,label) => {}
const choice7 = (i,label) => {}
const empty = () => {}
const savea = () => {}
</script>

<style lang="scss" scoped>
.condition {
	width: 100%;
	height: 100vh;
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
				
				.buttons{
					width:100px;
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
					margin-right: 6px;
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