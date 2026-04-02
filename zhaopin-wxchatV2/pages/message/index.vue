<template>
	<tab-bar-page>
		<view class="message-page">
			<image class="bg" src="/static/message/bg.png" mode="widthFix" />
			<view class="page-top" :style="{height: `calc(${top + height}px + 114rpx)`}">
				<view class="box">
					<view class="tabs">
						<text class="tab active">聊天</text>
						<text class="tab">通知</text>
					</view>
					<image class="menu-icon" src="/static/message/read.svg" mode="widthFix" />
				</view>
			</view>
			<view class="chat-box">
				<view class="search-bar">
					<image class="search-icon" src="/static/common/search.svg" mode="widthFix" />
					<input class="uni-input" placeholder="搜索联系人" />
				</view>
				<scroll-view class="chat-list" scroll-y :style="{height: `calc(100vh - ${top + height}px - 242rpx)`}">
					<view class="chat-item" v-for="(item, index) in 10" :key="index">
						<image class="avatar-img" src="/static/common/company.png" mode="widthFix" />
						<view class="content">
							<view class="top-line">
								<view>
									<text class="name">许女士</text>
									<text class="company">襄阳思源电子商务有限公司</text>
								</view>
								<text class="date">07月23日</text>
							</view>
							<view class="message">
								<text class="status">【送达】</text>
								<text class="text">您好</text>
							</view>
						</view>
					</view>
					<view style="height: 1rpx;"></view>
				</scroll-view>
			</view>
		</view>
	</tab-bar-page>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()
</script>

<style lang="scss" scoped>
.message-page{
	overflow: hidden;
	background: #F7F8FA;
	
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 1;
	}
	
	.page-top{
		position: relative;
		z-index: 2;
		
		.box{
			position: absolute;
			bottom:22rpx;
			left: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 62rpx;
			padding: 0 44rpx 0 62rpx;
			
			.tabs{
				display: flex;
				align-items: center;
				gap: 70rpx;
				height: 100%;
				
				.tab{
					height: 50rpx;
					line-height: 50rpx;
					font-size: 36rpx;
					color: #878788;
					
					&.active{
						position: relative;
						height: 62rpx;
						line-height: 62rpx;
						font-size: 44rpx;
						color: #1D2129;
						
						&::after{
							content: '';
							display: block;
							position: absolute;
							bottom: -20rpx;
							left: 0;
							right: 0;
							margin: auto;
							width: 46rpx;
							height: 10rpx;
							border-top-left-radius: 12rpx;
							border-bottom-right-radius: 12rpx;
							background: linear-gradient(90deg, #0CABB7 0%, #A9E9EF 100%);
						}
					}
				}
			}
			
			.menu-icon{
				width: 48rpx;
			}
		}
	}
	
	.chat-box{
		overflow: hidden;
		position: relative;
		background: #FFFFFF;
		z-index: 2;
		
		.search-bar{
			position: relative;
			width: 686rpx;
			height: 88rpx;
			border-radius: 12rpx;
			background: #F5F7FA;
			padding: 0 32rpx 0 84rpx;
			margin: 20rpx auto;
			
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
		
		.chat-list{
			.chat-item{
				display: flex;
				width: 664rpx;
				margin: 64rpx auto;
				
				&:nth-child(1){
					margin-top: 22rpx;
				}
				
				.avatar-img{
					width: 86rpx;
					margin-right: 20rpx;
				}
				
				.content{
					flex: 1;
					color: #86909C;
					
					.top-line{
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						height: 44rpx;
						font-size: 24rpx;
						
						.name{
							font-size: 32rpx;
							font-weight: 500;
							color: #1D2129;
							margin-right: 14rpx;
						}
					}
					
					.message{
						font-size: 26rpx;
						margin-top: 14rpx;
						
						.text{
							color: #1D2129;
						}
					}
				}
			}
		}
	}
}
</style>