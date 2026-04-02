<template>
	<tab-bar-page>
		<view class="mine-page">
			<image class="bg" src="/static/mine/bg.png" mode="widthFix" />
			<view class="content-center">
				<view class="user-section" :style="{marginTop: `calc(${height + top}px + 56rpx)`}">
					<image class="avatar" src="/static/common/default-avatar.png" mode="widthFix" />
					<view class="login-section">
						<view class="login-text">登录/注册</view>
						<view class="login-tip">登录后可查看</view>
					</view>
				</view>
				<view class="stats-section">
					<view class="stat-item">
						<view class="stat-number">0</view>
						<view class="stat-label">已投递</view>
					</view>
					<view class="stat-item">
						<view class="stat-number">0</view>
						<view class="stat-label">被查看</view>
					</view>
					<view class="stat-item">
						<view class="stat-number">0</view>
						<view class="stat-label">面试</view>
					</view>
					<view class="stat-item">
						<view class="stat-number">0</view>
						<view class="stat-label">不合适</view>
					</view>
				</view>
				<view class="member-banner" @tap="goPage">
					<view class="member-left">
						<image class="crown" src="/static/mine/crown.png" mode="widthFix" />
						<view class="member-txt">
							<view class="member-title">开通会员</view>
							<view class="member-desc">尊享会员特权</view>
						</view>
					</view>
					<view class="my-benefits">我的权益</view>
				</view>
				<view class="resume-actions">
					<view class="action-item">
						<view class="action-txt">
							<view class="action-title">完善简历</view>
							<view class="action-desc">提高竞争力</view>
						</view>
						<image class="action-icon" src="/static/mine/icon01.svg" mode="widthFix" />
					</view>
					<view class="action-item">
						<view class="action-txt">
							<view class="action-title">刷新简历</view>
							<view class="action-desc">提升活跃度</view>
						</view>
						<image class="action-icon" src="/static/mine/icon02.svg" mode="widthFix" />
					</view>
					<view class="action-item">
						<view class="action-txt">
							<view class="action-title">置顶简历</view>
							<view class="action-desc">提高入职率</view>
						</view>
						<image class="action-icon" src="/static/mine/icon03.svg" mode="widthFix" />
					</view>
					<view class="action-item">
						<view class="action-txt">
							<view class="action-title">简历模板</view>
							<view class="action-desc">让简历更出彩</view>
						</view>
						<image class="action-icon" src="/static/mine/icon04.svg" mode="widthFix" />
					</view>
				</view>
				<view class="other-functions">
					<view class="section-title">其他功能</view>
					<view class="function-grid">
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon05.svg" mode="widthFix" />
							<view class="function-label">求职状态</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon06.svg" mode="widthFix" />
							<view class="function-label">账号管理</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon07.svg" mode="widthFix" />
							<view class="function-label">简历附件</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon08.svg" mode="widthFix" />
							<view class="function-label">浏览记录</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon09.svg" mode="widthFix" />
							<view class="function-label">我的订单</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon10.svg" mode="widthFix" />
							<view class="function-label">我的收藏</view>
						</view>
						<view class="function-item">
							<image class="function-icon" src="/static/mine/icon11.svg" mode="widthFix" />
							<view class="function-label">屏蔽企业</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</tab-bar-page>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()

const goPage = () => {
	uni.navigateTo({url: '/pages/mine/vip/index'})
}
</script>

<style lang="scss" scoped>
.mine-page{
	overflow: hidden;
	min-height: 100vh;
	background: #FFFFFF;
	
	.bg{
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		z-index: 1;
	}
	
	.content-center{
		position: relative;
		padding: 0 30rpx 40rpx;
		z-index: 2;
		
		.user-section{
			display: flex;
			padding: 0 26rpx;
			
			.avatar{
				width: 168rpx;
			}
			
			.login-section{
				margin: 24rpx 0 0 64rpx;
				
				.login-text{
					line-height: 62rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #040404;
				}
				
				.login-tip{
					line-height: 40rpx;
					font-size: 28rpx;
					color: #86909C;
					margin-top: 16rpx;
				}
			}
		}
		
		.stats-section{
			display: flex;
			justify-content: space-around;
			background: #FFFFFF;
			border: 4rpx solid #DCF9F5;
			border-radius: 16px;
			margin-top: 40rpx;
			
			.stat-item{
				text-align: center;
				margin: 38rpx 0 52rpx;
				
				.stat-number{
					line-height: 68rpx;
					font-size: 48rpx;
					font-weight: bold;
					color: #000000;
					margin-bottom: 6rpx;
				}
				
				.stat-label{
					line-height: 40rpx;
					font-size: 28rpx;
					color: #86909C;
				}
			}
		}
	
		.member-banner{
			overflow: hidden;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 690rpx;
			height: 174rpx;
			padding: 0 48rpx 0 30rpx;
			margin-top: 40rpx;
			background: url(/static/mine/rights-interests.png) no-repeat center / 100%;
			
			.member-left{
				display: flex;
				margin-top: 20rpx;
				
				.crown{
					width: 148rpx;
				}
				
				.member-txt{
					color: #F4C381;
					
					.member-title{
						line-height: 44rpx;
						font-size: 32rpx;
						font-weight: bold;
						margin-top: 14rpx;
					}
					
					.member-desc{
						line-height: 34rpx;
						font-size: 24rpx;
						margin-top: 2rpx;
					}
				}
			}
			
			.my-benefits{
				width: 196rpx;
				height: 76rpx;
				line-height: 76rpx;
				text-align: center;
				border-radius: 46rpx;
				font-size: 24rpx;
				color: #7B4D14;
				background: linear-gradient(269.63deg, #F3BF76 0.32%, #F8DDBF 100.52%);
			}
		}
	
		.resume-actions{
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			grid-template-rows: repeat(2, 128rpx);
			gap: 14rpx 18rpx;
			width: 100%;
			margin-top: 40rpx;
			
			.action-item{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 40rpx;
				border-radius: 8rpx;
				
				.action-txt{
					.action-title{
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #4F322E;
					}
					
					.action-desc{
						line-height: 34rpx;
						font-size: 24rpx;
						color: #BABCBE;
						margin-top: 4rpx;
					}
				}
				
				.action-icon{
					width: 84rpx;
				}
				
				&:nth-child(1){
					background: #FEF6F2;
				}
				
				&:nth-child(2){
					background: #E8F2FF;
				}
				
				&:nth-child(3){
					background: #EEFFFC;
				}
				
				&:nth-child(4){
					background: #FFF6F7;
				}
			}
		}
		
		.other-functions{
			border-radius: 16rpx;
			border: 2rpx solid #F0F6F6;
			padding: 0 24rpx;
			background: linear-gradient(180deg, #C0F8F7 -10.57%, #FFFFFF 11.54%);
			padding-bottom: 88rpx;
			margin-top: 40rpx;

			.section-title{
				position: relative;
				height: 44rpx;
				line-height: 44rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #040404;
				padding-left: 16rpx;
				margin: 26rpx 0 62rpx;
				
				&::after{
					content: '';
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					margin: auto;
					width: 6rpx;
					height: 28rpx;
					background: #16B3B2;
				}
			}
		
			.function-grid{
				display: flex;
				flex-wrap: wrap;
				gap: 52rpx 60rpx;
				
				.function-item{
					text-align: center;
					
					.function-icon{
						width: 56rpx;
					}
					
					.function-label{
						line-height: 40rpx;
						font-size: 28rpx;
						color: #86909C;
					}
				}
			}
		}
	}
}
</style>