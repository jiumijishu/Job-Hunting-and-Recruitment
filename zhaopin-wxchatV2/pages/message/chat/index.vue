<template>
	<page-area title="徐女士" :isScroll="false" navBar>
		<view class="header">
		    <view class="action-item">
				<image class="action-icon" src="/static/message/chat/icon01.svg" mode="widthFix" />
		        <view class="txt">换电话</view>
		    </view>
		    <view class="action-item">
				<image class="action-icon" src="/static/message/chat/icon02.svg" mode="widthFix" />
		        <view class="txt">换微信</view>
		    </view>
		    <view class="action-item">
				<image class="action-icon" src="/static/message/chat/icon03.svg" mode="widthFix" />
		        <view class="txt">发简历</view>
		    </view>
		    <view class="action-item">
				<image class="action-icon" src="/static/message/chat/icon04.svg" mode="widthFix" />
		        <view class="txt">不合适</view>
		    </view>
		</view>
		<view class="chat-container">
			<scroll-view class="chat-content" scroll-y :style="{height: `calc(100vh - ${top}px - ${height}px - 298rpx - ${bottomSafeArea || 15}px)`}">
				<view class="job-info">
					<image class="bg" src="/static/message/chat/bg.png" mode="aspectFill" />
					<view class="job-title">
						<text class="title">仓库协管及配送员（包中餐）</text>
						<text class="salary">面议</text>
					</view>
					<view class="company-info">
						<text class="company-name">湖北黄商网络科技有限公司</text>
						<text class="company-size">20-99人</text>
					</view>
					<view class="job-details">
						<text class="job-box">鄂州市-鄂州区</text>
						<text class="job-box">经验不限</text>
						<text class="job-box">学历不限</text>
					</view>
					<view class="recruiter">
						<image class="recruiter-icon" src="/static/common/company.png" mode="widthFix" />
						<text>彭女士·招聘者</text>
					</view>
					<view class="initiation-time">07月23日 16：45  由您发起的沟通</view>
				</view>
				<view class="position-info">沟通职位：<text style="color: #16B3B2;">小时工</text></view>
				<view class="message recruiter-message">
					<image class="recruiter-icon" src="/static/common/hr.png" mode="widthFix" />
				    <view class="txt">我觉得你很适合这个岗位，有时间吗？</view>
				</view>
				<view class="message user-message">
					<image class="recruiter-icon" src="/static/common/default-avatar.png" mode="widthFix" />
					<view class="txt">有时间，明天过去看看</view>
				</view>
				<view class="message recruiter-message">
					<image class="recruiter-icon" src="/static/common/hr.png" mode="widthFix" />
					<view class="txt">好的，等你来</view>
				</view>
				<view class="message user-message">
					<image class="recruiter-icon" src="/static/common/default-avatar.png" mode="widthFix" />
					<view class="txt">好的</view>
				</view>
				<view class="message recruiter-message">
					<image class="recruiter-icon" src="/static/common/hr.png" mode="widthFix" />
				    <view class="txt">我觉得你很适合这个岗位，有时间吗？</view>
				</view>
				<view class="message user-message">
					<image class="recruiter-icon" src="/static/common/default-avatar.png" mode="widthFix" />
					<view class="txt">有时间，明天过去看看</view>
				</view>
				<view class="message recruiter-message">
					<image class="recruiter-icon" src="/static/common/hr.png" mode="widthFix" />
					<view class="txt">好的，等你来</view>
				</view>
				<view class="message user-message">
					<image class="recruiter-icon" src="/static/common/default-avatar.png" mode="widthFix" />
					<view class="txt">好的</view>
				</view>
				<view style="height: 40rpx;"></view>
			</scroll-view>
		</view>
		<template #bottomNavBar>
			<view class="input-area">
				<view class="common-phrases">常用语</view>
			    <input class="message-input" v-model="inputMessage" />
				<image class="expression" src="/static/message/chat/expression.svg" mode="widthFix" />
				<image class="more" src="/static/message/chat/more.svg" mode="widthFix" />
			</view>
		</template>
	</page-area>
</template>

<script setup>
import { ref } from 'vue'
import { getMenuButtonInfo } from '@/utils/menuButton'
import { getSafeArea } from '@/utils/safeArea.js'

const { height, top, left } = getMenuButtonInfo()
const { bottomSafeArea } = getSafeArea()

const inputMessage = ref('')
</script>

<style lang="scss" scoped>
.header{
	display: flex;
	justify-content: space-between;
	width: 670rpx;
	background: #FFFFFF;
	padding-bottom: 24rpx;
	margin: 26rpx auto 0;
	
	.action-item{
		width: 112rpx;
		height: 112rpx;
		text-align: center;
		
		.txt{
			line-height: 28rpx;
			font-size: 20rpx;
			color: #686E8B;
			margin-top: 10rpx;
		}
		
		&:nth-child(1){
			.action-icon{
				width: 50rpx;
				margin-top: 18rpx;
			}
		}
		
		&:nth-child(2){
			.action-icon{
				width: 56rpx;
				margin-top: 14rpx;
			}
		}
		
		&:nth-child(3){
			.action-icon{
				width: 56rpx;
				margin-top: 14rpx;
			}
		}
		
		&:nth-child(4){
			.action-icon{
				width: 48rpx;
				margin-top: 20rpx;
			}
		}
	}
}

.chat-container{
	overflow: hidden;
	background: #F5F5F5;

	.chat-content{
		margin-top: 28rpx;
		
		.job-info{
			position: relative;
			width: 686rpx;
			height: 412rpx;
			padding: 28rpx 12rpx 0;
			margin: 0 auto;
			
			.bg{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
			
			.job-title{
				position: relative;
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 18rpx 0 16rpx;
				z-index: 2;
				
				.title{
					line-height: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #1D2129;
				}
				
				.salary{
					line-height: 50rpx;
					font-size: 36rpx;
					font-weight: bold;
					color: #16B3B2;
				}
			}
		
			.company-info{
				position: relative;
				line-height: 36rpx;
				font-size: 26rpx;
				color: #86909C;
				margin: 18rpx 0 0 16rpx;
				z-index: 2;
				
				.company-size{
					margin-left: 38rpx;
				}
			}
			
			.job-details{
				position: relative;
				display: flex;
				gap: 16rpx;
				margin: 24rpx 0 0 16rpx;
				z-index: 2;
				
				.job-box{
					line-height: 48rpx;
					font-size: 26rpx;
					color: #4E5969;
					padding: 0 14rpx;
					background: #F5F5F5;
				}
			}
			
			.recruiter{
				position: relative;
				display: flex;
				align-items: center;
				height: 56rpx;
				font-size: 28rpx;
				color: #1D2129;
				margin: 32rpx 0 0 16rpx;
				z-index: 2;
				
				.recruiter-icon{
					width: 56rpx;
					margin-right: 18rpx;
				}
			}
			
			.initiation-time{
				position: relative;
				line-height: 34rpx;
				font-size: 24rpx;
				color: #86909C;
				border-top: 2rpx solid #D9D9D9;
				padding: 28rpx 0 0 16rpx;
				margin-top: 34rpx;
				z-index: 2;
			}
		}
		
		.position-info{
			line-height: 40rpx;
			font-size: 28rpx;
			color: #86909C;
			text-align: center;
			margin-top: 28rpx;
		}
		
		.message{
			display: flex;
			padding: 0 32rpx;
			margin-top: 40rpx;
			
			.recruiter-icon{
				width: 68rpx;
			}
			
			.txt{
				max-width: calc(100% - 88rpx);
				line-height: 40rpx;
				font-size: 28rpx;
				text-align: justify;
				padding: 20rpx 24rpx;
				margin-left: 20rpx;
			}
			
			&.recruiter-message{
				.txt{
					color: #1D2129;
					border-radius: 20rpx 20rpx 20rpx 0;
					background: #FFFFFF;
				}
			}
			
			&.user-message{
				flex-direction: row-reverse;
				
				.txt{
					color: #FFFFFF;
					border-radius: 20rpx 20rpx 0 20rpx;
					background: #00A1A2;
					margin-right: 20rpx;
				}
			}
		}
	}
}


.input-area{
	display: flex;
	align-items: center;
	height: 76rpx;
	
	.common-phrases{
		height: 100%;
		line-height: 76rpx;
		font-size: 20rpx;
		color: #FFFFFF;
		padding: 0 22rpx;
		border-radius: 26rpx;
		background: #00A1A2;
		margin-left: 20rpx;
	}
	
	.message-input{
		width: 422rpx;
		height: 100%;
		border-radius: 16rpx;
		background: #F5F5F5;
		padding: 0 20rpx;
		margin-left: 20rpx;
		box-sizing: border-box;
	}
	
	.expression,
	.more{
		width: 48rpx;
	}
	
	.expression{
		margin-left: 16rpx;
	}
	
	.more{
		margin-left: 32rpx;
	}
}
</style>