<template>
	<tab-bar-page>
		<view class="enterprise-page">
			<image class="bg" src="/static/common/r-t-bg.png" mode="widthFix" />
			<view class="page-title" :style="{height: `${height}px`, lineHeight: `${height}px`, marginTop: `${top}px`}">职位详情</view>
			<view class="filter-box">
				<view class="search-bar" @tap="clickInput">
					<image class="search-icon" src="/static/common/search.svg" mode="widthFix" />
					<input class="uni-input" placeholder="搜索职位/公司" disabled />
				</view>
				<view class="filter-criteria">
					<view class="criteria">
						<text class="txt">所在区域</text>
						<image class="arrow" src="/static/common/drop-down-arrow.svg" mode="widthFix" />
					</view>
					<view class="criteria">
						<text class="txt">行业分类</text>
						<image class="arrow" src="/static/common/drop-down-arrow.svg" mode="widthFix" />
					</view>
					<view class="criteria">
						<text class="txt">企业福利</text>
						<image class="arrow" src="/static/common/drop-down-arrow.svg" mode="widthFix" />
					</view>
				</view>
			</view>
			<scroll-view class="job-list" scroll-y :style="{height: `calc(100vh - ${top}px - ${height}px - 226rpx)`}">
				<view class="job-card" v-for="(item, index) in 10" :key="index" @tap="goPage">
					<image class="company-icon" src="/static/common/company.png" mode="widthFix" />
					<view class="company-info">
						<view class="company-name">上海九盛餐饮管理有限公司</view>
						<view class="company-details">
							<text class="txt">20-99人</text>
							<text class="txt">文化/体育/娱乐</text>
						</view>
						<view class="benefits">
							<view class="benefit-tag">有提成</view>
							<view class="benefit-tag">包食宿</view>
							<view class="benefit-tag">环境好</view>
						</view>
						<view class="hot-jobs">
							<view class="job-title">热招：<text style="color: #16B3B2;">电竞陪练师</text> 等1个职位</view>
							<uni-icons type="right" size="16" color="#665E5E" />
						</view>
					</view>
				</view>
				<view style="height: 1rpx;"></view>
			</scroll-view>
		</view>
	</tab-bar-page>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()

const clickInput = () => {
	uni.navigateTo({
		url: '/pages/work/searchWork'
	})
}

const goPage = () => {
	uni.navigateTo({ url: '/pages/enterprise/company-profile/index' })
}
</script>

<style lang="scss" scoped>
.enterprise-page{
	overflow: hidden;
	background: #FFFFFF;
	
	.bg{
		position: fixed;
		top: 0;
		right: 0;
		width: 378rpx;
		z-index: 1;
	}
	
	.page-title{
		position: relative;
		font-size: 34rpx;
		color: #060606;
		font-weight: 500;
		text-align: center;
		z-index: 2;
	}
	
	.filter-box{
		overflow: hidden;
		position: relative;
		height: 206rpx;
		border-bottom: 1px solid #F4EFEF;
		background: #FFFFFF;
		padding: 0 32rpx;
		margin-top: 20rpx;
		z-index: 2;
		
		.search-bar{
			position: relative;
			height: 88rpx;
			border-radius: 12rpx;
			background: #F5F7FA;
			padding: 0 32rpx 0 84rpx;
			margin-top: 20rpx;
			
			.search-icon{
				position: absolute;
				top: 0;
				bottom: 0;
				left: 32rpx;
				margin: auto;
				width: 32rpx;
			}
			
			.uni-input{
				width: 100%;
				height: 100%;
				font-size: 28rpx;
				font-weight: 500;
				color: #686E8B;
			}
		}
	
		.filter-criteria{
			display: flex;
			justify-content: center;
			margin-top: 30rpx;
			
			.criteria{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 40rpx;
				font-size: 28rpx;
				color: #4E5969;
				
				& + .criteria{
					margin-left: 66rpx;
				}
				
				.txt{
					font-weight: 500;
				}
				
				.arrow{
					position: relative;
					top: 4rpx;
					width: 18rpx;
					margin-left: 16rpx;
				}
			}
		}
	}
	
	.job-list{
		position: relative;
		background: #F7F9FC;
		z-index: 2;
		
		.job-card{
			display: flex;
			width: 686rpx;
			border-radius: 20rpx;
			background: #FFFFFF;
			padding: 28rpx;
			margin: 28rpx auto;
			
			.company-icon{
				width: 92rpx;
				margin-right: 26rpx;
			}
			
			.company-info{
				flex: 1;
				
				.company-name{
					line-height: 50rpx;
					font-size: 36rpx;
					font-weight: 500;
					color: #1D2129;
					margin-top: 4rpx;
				}
				
				.company-details{
					line-height: 36rpx;
					font-size: 26rpx;
					color: #86909C;
					margin-top: 16rpx;
					
					.txt{
						& + .txt{
							margin-left: 38rpx;
						}
					}
				}
				
				.benefits{
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;
					margin: 16rpx 0 24rpx;
					
					.benefit-tag{
						height: 48rpx;
						line-height: 48rpx;
						font-size: 26rpx;
						color: #4E5969;
						padding: 0 22rpx;
						border-radius: 4rpx;
						background: #F5F5F5;
					}
				}
				
				.hot-jobs{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 40rpx;
					font-size: 28rpx;
					font-weight: 500;
					color: #1D2129;
				}
			}
		}
	}
}
</style>