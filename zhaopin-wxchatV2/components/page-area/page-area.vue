<template>
	<view class="page-area">
		<view class="top-nav-bar" :style="{width: `${left}px`, height: `${height}px`, marginTop: `${top}px`}" v-if="title">
			<image class="go-back" src="/static/common/left.svg" mode="widthFix" @tap="goBack" />
			<view class="title" :style="{lineHeight: `${height}px`}">{{ title }}</view>
		</view>
		<scroll-view class="content-center" scroll-y :style="{height: `calc(100vh - ${top}px - ${height}px - ${mTop + navBarHei + 32}rpx - ${bottomSafeArea || 15}px)`, marginTop: `${mTop}rpx`}" v-if="isScroll">
			<slot></slot>
		</scroll-view>
		<view v-else>
			<slot></slot>
		</view>
		<view class="bottom-nav-bar" :style="{paddingBottom: `${bottomSafeArea || 15}px`}" v-if="navBar">
			<slot name="bottomNavBar"></slot>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { getMenuButtonInfo } from '@/utils/menuButton'
import { getSafeArea } from '@/utils/safeArea.js'

const { height, top, left } = getMenuButtonInfo()
const { bottomSafeArea } = getSafeArea()

const prop = defineProps({
	title: String,
	isScroll: {
		type: Boolean,
		default: true
	},
	mTop: {
		type: Number,
		default: 0
	},
	navBarHei: {
		type: Number,
		default: 0
	},
	navBar: {
		type: Boolean,
		default: false
	}
})

const goBack = () => {
	const pages = getCurrentPages()
	if (pages.length > 1) {
	    uni.navigateBack()
	} else {
	    uni.switchTab({ url: '/pages/index/index'})
	}
}
</script>

<style lang="scss" scoped>
.page-area{
	overflow: hidden;
	position: relative;
	background: #FFFFFF;
	
	.top-nav-bar{
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		
		.go-back{
			position: relative;
			width: 20rpx;
			z-index: 2;
		}
		
		.title{
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100%;
			text-align: center;
		}
	}

	.bottom-nav-bar{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100vw;
		border-top: 2rpx solid #F2F2F2;
		padding-top: 30rpx;
		background: #FFFFFF;
		z-index: 99;
	}
}
</style>