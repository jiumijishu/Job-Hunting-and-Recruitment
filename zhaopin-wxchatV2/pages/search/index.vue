<template>
	<!-- 求职意向 -->
	<view class="expected">
		<view class="tree-select">
			<scroll-view class="tree-select__nav" scroll-y>
				<view
					class="sidebar-item"
					:class="{active: mainActiveIndex === index}"
					v-for="(item, index) in items" :key="index"
					@tap="onClickNav(index)"
				>{{ item.text }}</view>
			</scroll-view>
			<scroll-view class="tree-select__content" scroll-y>
				<view
					class="ellipsis"
					v-for="(item, index) in itemsContent" :key="index"
					@tap="onClickItem"
				>{{ item.text }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"

const mainActiveIndex = ref(0)
const items = ref([])
const itemsContent = ref([])

const onClickNav = (index) => {
	mainActiveIndex.value = index
	if(items.value[index].children){
		itemsContent.value = items.value[index].children
	}
}
</script>

<style lang="scss" scoped>
.expected{
	height:100vh;
	width:100%;
	background-color: #fff;
	
	.tree-select{
		display: flex;
		
		.tree-select__nav{
			width: 34%;
			height:100vh;
			background: #f7f8fa;
			
			.sidebar-item{
				line-height: 40rpx;
				color: #323233;
				font-weight: 500;
				font-size: 28rpx;
				border-left: 6rpx solid transparent;
				padding: 24rpx 16rpx 24rpx 24rpx;
				
				&.active{
					border-left: 6rpx solid #4684FC;
					background: #ffffff;
				}
			}
		}
		
		.tree-select__content{
			width: 66%;
			height:100vh;
			background: #ffffff;
			
			.ellipsis{
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				width: 100%;
				line-height: 88rpx;
				font-size: 28rpx;
				font-weight: 700;
				padding: 0 64rpx 0 32rpx;
			}
		}
	}
}
</style>