<template>
	<page-area :isScroll="false" navBar :mTop="10" :navBarHei="92">
		<view class="vip-container">
			<view class="user-info-box">
				<image class="bg" src="/static/mine/vip/bg.jpg" mode="aspectFill" />
				<view class="top-nav-bar" :style="{width: `${left}px`, height: `${height}px`, marginTop: `${top}px`}">
					<image class="go-back" src="/static/mine/vip/left.svg" mode="widthFix" @tap="goBack" />
				</view>
				<view class="info-box" :style="{marginTop: `calc(240rpx - ${top}px - ${height}px)`}">
					<view class="user-avatar">
					    <image class="avatar-img" src="/static/test/test4.jpg" mode="aspectFill" />
					</view>
					<view class="user-detail">
					    <view class="user-name">程凯乐</view>
					    <view class="user-phone">136****5245</view>
					    <view class="vip-status">您当前未开通VIP会员</view>
					</view>
				</view>
			</view>
			<scroll-view class="container-box" scroll-y :style="{height: `calc(100vh - 510rpx - 112rpx - ${bottomSafeArea || 15}px)`}">
				<view style="padding: 0 36rpx 2rpx;">
					<view class="section-title">成为<text style="color: #E49D2E;">VIP企业</text>享受专属会员</view>
					<view class="package-list">
						<view class="package-item active">
							<view class="package-tag">低价尝鲜</view>
							<view class="package-name">会员体验卡</view>
							<view class="current-price">
								<text style="font-size: 28rpx; font-weight: 400;">￥</text>99
							</view>
							<view class="original-price">¥199</view>
							<view class="validity">10天</view>
						</view>
						<view class="package-item">
							<view class="package-tag">超值性价比</view>
							<view class="package-name">会员精选月卡</view>
							<view class="current-price">
								<text style="font-size: 28rpx; font-weight: 400;">￥</text>199
							</view>
							<view class="original-price">¥299</view>
							<view class="validity">30天</view>
						</view>
						<view class="package-item">
							<view class="package-tag">豪华权益</view>
							<view class="package-name">会员豪华季卡</view>
							<view class="current-price">
								<text style="font-size: 28rpx; font-weight: 400;">￥</text>299
							</view>
							<view class="original-price">¥399</view>
							<view class="validity">90天</view>
						</view>
					</view>
					<view class="benefits-table">
						<view class="current-arrow"></view>
						<view class="cover"></view>
					    <view class="table-title">会员体验卡权益</view>
						<view class="table-box">
							<view class="table-row header">
								<view class="table-cell">权益类型</view>
								<view class="table-cell">VIP权益</view>
							</view>
							<view class="table-row">
								<view class="table-cell">发布职位数</view>
								<view class="table-cell">5个</view>
							</view>
							<view class="table-row">
								<view class="table-cell">简历夹</view>
								<view class="table-cell">100份</view>
							</view>
							<view class="table-row">
								<view class="table-cell">赠送积分</view>
								<view class="table-cell">0分</view>
							</view>
							<view class="table-row">
								<view class="table-cell">有效期</view>
								<view class="table-cell">10天</view>
							</view>
							<view class="table-row">
								<view class="table-cell">直聊人数</view>
								<view class="table-cell">100人</view>
							</view>
						</view>
						<view class="toggle-row">
							展开/收起
							<image src="/static/mine/vip/arrow-b.png" mode="widthFix" style="width: 22rpx; margin-left: 20rpx;" />
						</view>
					</view>
					<view class="exclusive-benefits">
						<view class="section-title">VIP专属权益</view>
						<view class="benefit-icons">
							<view class="benefit-item">
								<view class="img-box">
									<image class="item-icon" src="/static/mine/vip/icon01.svg" mode="widthFix" />
								</view>
								<view class="benefit-txt">专属VIP会员标识</view>
							</view>
							<view class="benefit-item">
								<view class="img-box">
									<image class="item-icon" src="/static/mine/vip/icon02.svg" mode="widthFix" />
								</view>
								<view class="benefit-txt">专属客服服务</view>
							</view>
							<view class="benefit-item">
								<view class="img-box">
									<image class="item-icon" src="/static/mine/vip/icon03.svg" mode="widthFix" />
								</view>
								<view class="benefit-txt">更多曝光流量</view>
							</view>
						</view>
					</view>
					<view class="purchase-footer">
						<view class="coin-deduction">金币抵扣<text style="color: #797979;">（可用0金币）</text></view>
						<view class="coin-amount">
							-0金币<image class="coin-icon" src="/static/mine/vip/radio.png" mode="widthFix" />
						</view>
					</view>
					<view class="agreement">
					    付费即表示同意<text style="color: #BA8041;">《用户协议》</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<template #bottomNavBar>
			<view class="purchase-btn">
				<view class="price-box">
					<text class="currency">￥</text>
					<text class="price">99.00</text>
					<text class="duration">/10天</text>
				</view>
				<view class="btn-buy">立即购买</view>
			</view>
		</template>
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
.vip-container{
	min-height: 100vh;
	background: #F7F7F7;
	
	.user-info-box{
		overflow: hidden;
		position: relative;
		height: 510rpx;
		
		.bg{
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
		}
		
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
		}
	
		.info-box{
			position: relative;
			display: flex;
			margin-left: 44rpx;
			z-index: 2;
			
			.user-avatar{
				overflow: hidden;
				width: 112rpx;
				height: 112rpx;
				border: 4rpx solid #FFFFFF;
				box-shadow: 0 8rpx 8rpx 0 #29474733;
				border-radius: 50%;
				
				.avatar-img{
					width: 100%;
					height: 100%;
				}
			}
			
			.user-detail{
				color: #FFFFFF;
				margin-left: 22rpx;
				
				.user-name{
					line-height: 62rpx;
					font-size: 44rpx;
					font-weight: bold;
				}
				
				.user-phone{
					line-height: 34rpx;
					font-size: 24rpx;
				}
				
				.vip-status{
					line-height: 36rpx;
					font-size: 26rpx;
					background: linear-gradient(293.32deg, #FFE0BF 4.33%, #FEEEDB 97.45%);
					-webkit-background-clip: text;
					background-clip: text;
					-webkit-text-fill-color: transparent;
					text-fill-color: transparent;
					margin-top: 4rpx;
				}
			}
		}
	}

	.container-box{
		.section-title{
			line-height: 44rpx;
			font-size: 32rpx;
			color: #1D2127;
			margin-top: 20rpx;
		}
		
		.package-list{
			display: flex;
			gap: 28rpx;
			margin-top: 36rpx;
			
			.package-item{
				position: relative;
				flex: 1;
				box-shadow: 0 0 4px 0 #F2D8AD;
				padding: 48rpx 0 18rpx;
				border-radius: 20rpx;
				background: #FDFFFF;
				
				.package-tag{
					position: absolute;
					top: -18rpx;
					right: 0;
					height: 36rpx;
					line-height: 36rpx;
					font-size: 24rpx;
					color: #654418;
					padding: 0 8rpx;
					border-radius: 0 16rpx 0 16rpx;
					background: linear-gradient(180deg, #F3DAB7 0%, #F0BD76 100%);
				}
				
				.package-name{
					line-height: 40rpx;
					font-size: 28rpx;
					color: #654418;
					text-align: center;
				}
				
				.current-price{
					line-height: 54rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #673F00;
					text-align: center;
					margin-top: 18rpx;
				}
				
				.original-price{
					line-height: 28rpx;
					font-size: 20rpx;
					color: #C38F3C;
					text-align: center;
					text-decoration: line-through;
				}
				
				.validity{
					width: 88rpx;
					height: 32rpx;
					line-height: 32rpx;
					font-size: 20rpx;
					color: #FFFFFF;
					text-align: center;
					border-radius: 8rpx;
					background: #EFBE82;
					margin: 18rpx auto 0;
				}
				
				&.active{
					border: 4rpx solid #E6AE61;
					box-shadow: 0 8rpx 8rpx 0 #F5D7AF;
					background: #FBF7EF;
					
					.package-tag{
						right: -4rpx;
					}
				}
			}
		}
		
		.benefits-table{
			position: relative;
			box-shadow: 0 0 6px 0 #FEEED5;
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0 0;
			padding: 0 28rpx 38rpx;
			margin-top: 38rpx;
			
			.current-arrow{
				position: absolute;
				top: -10rpx;
				left: 14%;
				width: 20rpx;
				height: 20rpx;
				box-shadow: 0 0 6px 0 #FEEED5;
				background: #FFFFFF;
				transform: rotate(45deg);
				z-index: 1;
			}
			
			.cover{
				position: relative;
				height: 34rpx;
				background: #FFFFFF;
				z-index: 2;
			}
			
			.table-title{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40rpx;
				
				&::before{
					content: '';
					display: block;
					width: 100rpx;
					height: 16rpx;
					background: url(/static/mine/vip/decoration-l.png) no-repeat center / 100%;
					margin-right: 18rpx;
				}
				
				&::after{
					content: '';
					display: block;
					width: 100rpx;
					height: 16rpx;
					background: url(/static/mine/vip/decoration-r.png) no-repeat center / 100%;
					margin-left: 18rpx;
				}
			}
		
			.table-box{
				overflow: hidden;
				display: table;
				border-collapse: collapse;
				width: 100%;
				border-radius: 20rpx;
				margin-top: 34rpx;
				
				.table-row{
					display: table-row;
					
					.table-cell{
						display: table-cell;
						flex: 1;
						height: 80rpx;
						line-height: 80rpx;
						font-size: 28rpx;
						color: #C58C60;
						text-align: center;
						border: 2rpx solid #FAECD7;
					}
					
					&:nth-child(odd){
						background: #FFFBF5;
					}
					
					&.header{
						background: #FFF3E3;
						
						.table-cell{
							color: #373635;
						}
					}
				}
			}
		
			.toggle-row{
				height: 80rpx;
				line-height: 80rpx;
				font-size: 28rpx;
				color: #C58C60;
				text-align: center;
				border: 2rpx solid #FAECD7;
				border-top: none;
				border-radius: 0 0 20rpx 20rpx;
				background: #FFFBF5;
			}
		}
	
		.exclusive-benefits{
			box-shadow: 0 0 6px 0 #FEEED5;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 22rpx 0 52rpx;
			margin-top: 36rpx;
			
			.section-title{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 40rpx;
				
				&::before{
					content: '';
					display: block;
					width: 100rpx;
					height: 16rpx;
					background: url(/static/mine/vip/decoration-l.png) no-repeat center / 100%;
					margin-right: 18rpx;
				}
				
				&::after{
					content: '';
					display: block;
					width: 100rpx;
					height: 16rpx;
					background: url(/static/mine/vip/decoration-r.png) no-repeat center / 100%;
					margin-left: 18rpx;
				}
			}
			
			.benefit-icons{
				display: flex;
				justify-content: space-around;
				margin-top: 52rpx;
				
				.benefit-item{
					display: flex;
					justify-content: center;
					flex-wrap: wrap;
					
					.img-box{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 108rpx;
						height: 108rpx;
						background: url(/static/mine/vip/icon-bg.png) no-repeat center / 100%;
				
						.item-icon{
							width: 72rpx;
						}
					}
					
					.benefit-txt{
						line-height: 34rpx;
						font-size: 24rpx;
						color: #000000;
						margin-top: 32rpx;
					}
				}
			}
		}
	
		.purchase-footer{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100rpx;
			font-size: 24rpx;
			color: #000000;
			box-shadow: 0 0 6px 0 #FEEED5;
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 0 34rpx 0 26rpx;
			margin-top: 36rpx;
			
			.coin-amount{
				display: flex;
				align-items: center;
				
				.coin-icon{
					width: 28rpx;
					margin-left: 38rpx;
				}
			}
		}
	
		.agreement{
			line-height: 36rpx;
			font-size: 26rpx;
			color: #86909C;
			margin: 20rpx 0 20rpx 26rpx;
		}
	}
}

.purchase-btn{
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 670rpx;
	height: 92rpx;
	border-radius: 20rpx;
	background: #2D2D2D;
	padding: 0 24rpx 0 54rpx;
	margin: 0 auto;
	
	.price-box{
		color: #FFFFFF;
		
		.currency{
			font-size: 24rpx;
		}
		
		.price{
			font-size: 44rpx;
			font-weight: bold;
			margin: 0 26rpx 0 8rpx;
		}
		
		.duration{
			position: relative;
			top: -18rpx;
			font-size: 28rpx;
		}
	}
	
	.btn-buy{
		position: relative;
		width: 200rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 28rpx;
		color: #68300D;
		font-weight: bold;
		text-align: center;
		border-radius: 40rpx;
		background: linear-gradient(97.29deg, #FBE7CA 21.06%, #FAD099 75.17%);
		
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			right: -10rpx;
			width: 54rpx;
			height: 54rpx;
			background: url(/static/mine/vip/arrow.png) no-repeat center / 100%;
		}
	}
}
</style>