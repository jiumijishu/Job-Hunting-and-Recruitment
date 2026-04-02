<template>
	<page-area :isScroll="false">
		<view class="online-resume">
			<view class="resume-card">
				<view class="top-nav-bar" :style="{width: `${left}px`, height: `${height}px`, marginTop: `${top}px`}">
					<image class="go-back" src="/static/mine/vip/left.svg" mode="widthFix" @tap="goBack" />
					<image class="icon" src="/static/resume/onlineResume/icon01.svg" mode="heightFix" />
					<image class="title" src="/static/resume/onlineResume/title.svg" mode="widthFix" />
				</view>
				<image class="decoration" src="/static/resume/onlineResume/decoration.png" mode="widthFix" />
				<view class="personal-info">
					<image class="info-bg" src="/static/resume/onlineResume/info-bg.png" mode="aspectFill" />
					<view class="info-left">
					    <view class="name">程凯乐</view>
					    <view class="details">
							<text class="txt">22岁</text>
							<text class="txt">中专/中级</text>
							<text class="txt">5年工作经验</text>
						</view>
					</view>
					<view class="avatar-box">
						<view class="avatar">
							<image class="avatar-icon" src="/static/test/test4.jpg" mode="aspectFill" />
						</view>
						<image class="sex" src="/static/resume/male.svg" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="job-intention">
			    <view class="section-title">
					<text class="txt">求职意向</text>
				</view>
			    <view class="intention-tag">在职-考虑机会</view>
			</view>
			<scroll-view class="container-box" scroll-y :style="{height: `calc(100vh - 708rpx)`}">
				<view class="job-list" :style="{paddingBottom: `${bottomSafeArea || 15}px`}">
					<view class="job-item" v-for="item in 10" :key="item">
						<view class="job-item-l">
							<view class="job-title">商务专员</view>
							<view class="job-location">【北京市--东城区】</view>
						</view>
						<view class="job-salary">3000-5000元</view>
					</view>
				</view>
				<view style="height: 100rpx;"></view>
			</scroll-view>
		</view>
	</page-area>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'
import { getSafeArea } from '@/utils/safeArea.js'

const { height, top, left } = getMenuButtonInfo()
const { bottomSafeArea } = getSafeArea()

const goBack = () => {
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.online-resume{
	min-height: 100vh;
	background: #F7F7F7;
	
	.resume-card{
		overflow: hidden;
		position: relative;
		height: 588rpx;
		background: linear-gradient(180deg, #19C9D1 47.47%, rgba(164, 234, 237, 0.6) 88.18%, rgba(255, 255, 255, 0) 103.74%);
		
		.top-nav-bar{
			position: relative;
			display: flex;
			align-items: center;
			padding-left: 30rpx;
			z-index: 2;
			
			.go-back{
				position: relative;
				width: 20rpx;
				z-index: 2;
			}
			
			.icon{
				height: 100%;
				margin-left: 42rpx;
			}
			
			.title{
				position: absolute;
				top: -16rpx;
				left: 150rpx;
				width: 240rpx;
			}
		}
		
		.decoration{
			position: absolute;
			top: 82rpx;
			right: 106rpx;
			width: 280rpx;
			z-index: 1;
		}
		
		.personal-info{
			position: absolute;
			bottom: 0;
			left: 12rpx;
			display: flex;
			justify-content: space-between;
			width: 718rpx;
			height: 382rpx;
			padding: 80rpx 62rpx 0 86rpx;
			z-index: 2;
			
			.info-bg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			
			.info-left{
				position: relative;
				z-index: 2;
				
				.name{
					line-height: 62rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #040404;
				}
				
				.details{
					line-height: 34rpx;
					font-size: 24rpx;
					color: #86909C;
					
					.txt{
						& + .txt{
							position: relative;
							margin-left: 30rpx;
							
							&:before{
								content: '';
								position: absolute;
								top: 6rpx;
								left: -14rpx;
								width: 2rpx;
								height: 20rpx;
								background: #86909C;
							}
						}
					}
				}
			}
			
			.avatar-box{
				position: relative;
				width: 132rpx;
				height: 132rpx;
				z-index: 2;
				
				.avatar{
					overflow: hidden;
					width: 100%;
					height: 100%;
					border: 6rpx solid #FFFFFF;
					border-radius: 50%;
					
					.avatar-icon{
						width: 100%;
						height: 100%;
					}
				}
				
				.sex{
					position: absolute;
					bottom: 6rpx;
					right: 6rpx;
					width: 32rpx;
				}
			}
		}
	}
	
	.job-intention{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 36rpx;
		margin-top: 36rpx;
		
		.section-title{
			position: relative;
			height: 44rpx;
			line-height: 44rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #040404;
			margin-left: 18rpx;
			
			.txt{
				position: relative;
				z-index: 2;
			}
			
			&::after{
				content: '';
				position: absolute;
				bottom: -4rpx;
				left: 0;
				width: 106rpx;
				height: 16rpx;
				border-radius: 12rpx;
				background: linear-gradient(90deg, rgba(6, 206, 221, 0.6) 0%, rgba(169, 233, 239, 0.6) 100%);
			}
		}
		
		.intention-tag{
			display: flex;
			align-items: center;
			height: 36rpx;
			font-size: 26rpx;
			color: #86909C;
			
			&:before{
				content: '';
				width: 12rpx;
				height: 12rpx;
				background: #FF9508;
				margin-right: 14rpx;
			}
		}
	}

	.container-box{
		margin-top: 40rpx;
		
		.job-list{
			overflow: hidden;
			width: 678rpx;
			border-radius: 20rpx;
			background: #FBFDFD;
			padding: 4rpx 24rpx 0;
			margin: 0 auto;

			.job-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-radius: 16rpx;
				background: #F4F5F8;
				padding: 34rpx 36rpx 24rpx 32rpx;
				margin-top: 24rpx;
				
				.job-item-l{
					.job-title{
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #3D4653;
					}
					
					.job-location{
						line-height: 44rpx;
						font-size: 32rpx;
						color: #86909C;
						margin-top: 10rpx;
					}
				}
				
				.job-salary{
					line-height: 36rpx;
					font-size: 26rpx;
					color: #FF586C;
				}
			}
		}
	}
}
</style>