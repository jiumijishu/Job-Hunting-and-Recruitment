<template>
	<tab-bar-page>
		<view class="home-page">
			<view class="search-box" :style="{width: `${left}px`, height: `${height}px`, marginTop: `${top}px`}">
				<view class="address-btn">
					<text>全国</text>
					<uni-icons type="down" size="16"></uni-icons>
				</view>
				<view class="search-bar" :style="{width: `calc(${left}px - 190rpx)`}">
					<image class="search-icon" src="/static/common/search.svg" mode="widthFix" />
					<input class="uni-input" placeholder="搜索联系人" />
				</view>
			</view>
			<scroll-view class="content-center" scroll-y :style="{height: `calc(100vh - ${top}px - ${height}px - 36rpx)`}">
				<view class="content-t">
					<image class="cover-img" src="/static/test/test1.jpg" mode="widthFix" />
					<view class="nav-grid">
						<view class="nav-item">
							<view class="nav-icon">
								<image class="icon-img" src="/static/index/icon01.svg" mode="widthFix" />
							</view>
							<text class="nav-text">找工作</text>
						</view>
						<view class="nav-item">
							<view class="nav-icon">
								<image class="icon-img" src="/static/index/icon02.svg" mode="widthFix" />
							</view>
							<text class="nav-text">找人才</text>
						</view><view class="nav-item">
							<view class="nav-icon">
								<image class="icon-img" src="/static/index/icon03.svg" mode="widthFix" />
							</view>
							<text class="nav-text">找企业</text>
						</view><view class="nav-item">
							<view class="nav-icon">
								<image class="icon-img" src="/static/index/icon04.svg" mode="widthFix" />
							</view>
							<text class="nav-text">兼职</text>
						</view>
					</view>
					<view class="select-identity">
						<view class="module-box">
							<image class="icon-img" src="/static/index/icon05.png" mode="widthFix" />
							<view class="text-conten">
								<view class="text-t">发布职位</view>
								<text>收简历招精英人才</text>
							</view>
						</view>
						<view class="module-box">
							<image class="icon-img" src="/static/index/icon06.png" mode="widthFix" />
							<view class="text-conten">
								<view class="text-t">创建简历</view>
								<text>海量职位任您挑选</text>
							</view>
						</view>
					</view>
				</view>
				<view class="filter-module">
					<view class="filter-list">
						<view class="filter-type active">最新</view>
						<view class="filter-type">推荐</view>
						<view class="filter-type">急聘</view>
						<view class="filter-type">附近</view>
					</view>
					<view class="filter-btn" @tap="search">
						<image class="icon-img" src="/static/index/filter.svg" mode="widthFix" />
						筛选
					</view>
				</view>
				<view class="job-list">
					<view class="job-card" v-for="(item, index) in 10" :key="index">
						<view class="job-header">
							<text class="job-title">仓库协管及配送员（包中餐）</text>
							<text class="job-salary">8-12K</text>
						</view>
						<view class="job-details">
							<view class="job-location">鄂州市-鄂州区</view>
							<view class="job-location">经验不限</view>
							<view class="job-location">学历不限</view>
						</view>
						<view class="company-info">
							<view class="info-l">
								<image class="icon-img" src="/static/common/company.png" mode="widthFix" />
								<text class="company-name">湖北黄商网络科技有限公司</text>
								<view class="verified-tag">认证</view>
							</view>
							<text class="publish-time">2分钟前</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</tab-bar-page>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()

const search = () => {
	uni.navigateTo({
		url:"/pages/search/screen"
	})
}
</script>

<style lang="scss" scoped>
.home-page{
	overflow: hidden;
	background: #FFFFFF;
	
	.search-box{
		display: flex;
		align-items: center;
		height: 64rpx;
		margin-bottom: 34rpx;
		padding: 0 32rpx;
		
		.address-btn{
			height: 42rpx;
			line-height: 42rpx;
			font-weight: 500;
			font-size: 30rpx;
			color: #505569;
		}
		
		.search-bar{
			position: relative;
			height: 100%;
			border-radius: 12rpx;
			background: #F5F7FA;
			padding: 0 32rpx 0 84rpx;
			margin-left: 34rpx;
			
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
	}
	
	.content-center{
		background: #F4F5F8;

		.content-t{
			padding: 0 32rpx 36rpx;
			background: #FFFFFF;
	
			.cover-img{
				width: 100%;
				border-radius: 12rpx;
			}
			
			.nav-grid{
				display: flex;
				justify-content: space-between;
				padding: 0 32rpx;
				
				.nav-item{
					width: 92rpx;
					text-align: center;
					margin-top: 36rpx;
					
					.nav-icon{
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 92rpx;
						border-radius: 20rpx;
						margin-bottom: 18rpx;
					}
					
					.nav-text{
						line-height: 36rpx;
						font-size: 26rpx;
						color: #272727;
					}
					
					&:nth-child(1){
						.nav-icon{
							background: #E8EFFD;
							
							.icon-img{
								width: 60rpx;
							}
						}
					}
					
					&:nth-child(2){
						.nav-icon{
							background: #ECFAFB;
							
							.icon-img{
								width: 56rpx;
							}
						}
					}
					
					&:nth-child(3){
						.nav-icon{
							background: #EFF7FE;
							
							.icon-img{
								width: 64rpx;
							}
						}
					}
					
					&:nth-child(4){
						.nav-icon{
							background: #FDF1E6;
							
							.icon-img{
								width: 60rpx;
							}
						}
					}
				}
			}

			.select-identity{
				display: flex;
				justify-content: space-between;
				margin-top: 38rpx;
				
				.module-box{
					overflow: hidden;
					display: flex;
					align-items: center;
					width: 330rpx;
					height: 122rpx;
					border-radius: 12rpx;
					
					.text-conten{
						line-height: 28rpx;
						font-size: 20rpx;
						color: #272727;
						
						.text-t{
							line-height: 40rpx;
							font-size: 28rpx;
							font-weight: bold;
							margin-bottom: 6rpx;
						}
					}
					
					&:nth-child(1){
						background: #DBF4F2;
						
						.icon-img{
							width: 132rpx;
							margin-top: 12rpx;
						}
					}
					
					&:nth-child(2){
						background: #E2EEF9;
						
						.icon-img{
							width: 96rpx;
							margin: 0 10rpx 0 22rpx;
						}
					}
				}
			}
		}
	
		.filter-module{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 12rpx;
			height: 80rpx;
			background: #FFFFFF;
			padding: 0 32rpx;
			
			.filter-list{
				display: flex;
				align-items: center;
				
				.filter-type{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 28rpx;
					color: #272727;
					
					& + .filter-type{
						margin-left: 52rpx;
					}
					
					&.active{
						position: relative;
						height: 50rpx;
						line-height: 50rpx;
						font-weight: bold;
						font-size: 36rpx;
						
						&::after{
							content: '';
							display: block;
							position: absolute;
							bottom: -16rpx;
							left: 0;
							right: 0;
							margin: auto;
							width: 48rpx;
							height: 8rpx;
							border-radius: 12rpx;
							background: #16B3B2;
						}
					}
				}
			}
			
			.filter-btn{
				display: flex;
				align-items: center;
				height: 34rpx;
				font-size: 24rpx;
				color: #272727;
				
				.icon-img{
					width: 32rpx;
					margin-right: 8rpx;
				}
			}
		}

		.job-list{
			padding-bottom: 1rpx;
			
			.job-card{
				width: 686rpx;
				border-radius: 20rpx;
				background: #FFFFFF;
				padding: 28rpx;
				margin: 28rpx auto;
				
				.job-header{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 50rpx;
					
					.job-title{
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: 500;
						color: #1D2129;
					}
					
					.job-salary{
						line-height: 50rpx;
						font-size: 36rpx;
						font-weight: 700;
						color: #16B3B2;
					}
				}
				
				.job-details{
					display: flex;
					flex-wrap: wrap;
					gap: 16rpx;
					margin: 18rpx 0 50rpx;
					
					.job-location{
						height: 48rpx;
						line-height: 48rpx;
						font-size: 26rpx;
						color: #4E5969;
						padding: 0 12rpx;
						border-radius: 4rpx;
						background: #F5F5F5;
					}
				}
				
				.company-info{
					display: flex;
					justify-content: space-between;
					align-items: center;
					height: 42rpx;
					font-size: 26rpx;
					color: #86909C;
					
					.info-l{
						display: flex;
						align-items: center;
						height: 100%;
						
						.icon-img{
							width: 42rpx;
							margin-right: 12rpx;
						}
						
						.verified-tag{
							width: 60rpx;
							height: 28rpx;
							line-height: 28rpx;
							font-size: 20rpx;
							color: #FC9100;
							text-align: center;
							border-radius: 8rpx;
							background: #FEF2E0;
							margin-left: 12rpx;
						}
					}
				}
			}
		}
	}
}
</style>