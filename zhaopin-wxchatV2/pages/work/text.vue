<template>
	<view class="text">
		<view :style="{marginTop: `${top}px`}">
			<uni-nav-bar
				:title="title"
				color="#1989fa"
				left-icon="left"
				leftText="返回"
				@clickLeft="onClickLeft"
			/>
		</view>
		<view class="rich">
			<rich-text :nodes="privacy"></rich-text>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()

const title = ref('')
const privacy = ref('')

const onClickLeft = () => {
	uni.navigateBack({ delta: 1 })
}
</script>

<style lang="scss" scoped>
.text{
	overflow: hidden;
	height:100vh;
	width:100%;
	background-color: #FFFFFF;
}

.rich{
	padding:40rpx;
}

::v-deep .uni-nav-bar-text{
	color: #323233 !important;
}

::v-deep .uni-navbar--border{
	border-bottom-color: #F9F9F9 !important;
}
</style>