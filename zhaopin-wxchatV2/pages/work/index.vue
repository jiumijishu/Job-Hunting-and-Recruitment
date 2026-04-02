<template>
	<tab-bar-page>
		<view class="work-page">
			<view class="page-top">
				<image class="circle1" src="/static/work/circle01.svg" mode="widthFix" />
				<image class="circle2" src="/static/work/circle02.svg" mode="widthFix" />
				<view class="title" :style="{width: `${left}px`, height: `${height}px`, lineHeight: `${height}px`, marginTop: `${top}px`}">推荐职位</view>
				<view class="position-search">
					<text class="position-name">总裁/总经理</text>
					<view class="search-container">
						<image src="/static/work/plusempty.svg" mode="widthFix" style="width: 40rpx;" @tap="setUp" />
						<image src="/static/work/search.svg" mode="widthFix" style="width: 40rpx;" />
					</view>
				</view>
				<view class="choice-nox">
					<view class="filter-tabs">
						<view class="tab active">综合</view>
						<view class="tab">附近</view>
					</view>
					<view class="dropdown-container">
						<view class="dropdown">
							<text class="dropdown-text">城市</text>
							<uni-icons type="down" size="16" color="#4E5470" />
						</view>
						<view class="dropdown">
							<text class="dropdown-text">职位</text>
							<uni-icons type="down" size="16" color="#4E5470" />
						</view>
						<view class="dropdown">
							<text class="dropdown-text">筛选</text>
							<uni-icons type="down" size="16" color="#4E5470" />
						</view>
					</view>
				</view>
			</view>
			<scroll-view class="job-list" scroll-y :style="{height: `calc(100vh - ${top + height}px - 186rpx)`, marginTop: `calc(${top + height}px - 326rpx)`}">
				<view class="job-card" v-for="(item, index) in 10" :key="index">
					<view class="job-header">
						<text class="job-title">仓库协管及配送员（包中餐）</text>
						<text class="job-salary">8-12K</text>
					</view>
					<view class="company-info">
						<text class="txt">湖北黄商网络科技有限公司</text>
						<text class="txt">20-99人</text>
					</view>
					<view class="job-details">
						<view class="job-location">鄂州市-鄂州区</view>
						<view class="job-location">经验不限</view>
						<view class="job-location">学历不限</view>
					</view>
					<view class="hr-info">
						<view class="info-l">
							<image class="icon-img" src="/static/common/hr.png" mode="widthFix" />
							<text class="hr-name">彭女士</text>
						</view>
						<text class="address-info">鄂州市 鄂城区</text>
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

const setUp = () => {
	uni.navigateTo({
		url:"/pages/search/modifyIntention"
	})
}
</script>

<style lang="scss" scoped>
.work-page{
	.page-top{
		overflow: hidden;
		position: relative;
		height: 510rpx;
		background: linear-gradient(90.49deg, #A6EBF0 0.2%, #C4F0F4 45.06%, #D5F8F4 99.4%);
		padding: 0 32rpx 0 40rpx;
		
		.circle1{
			position: absolute;
			top: 0;
			left: 294rpx;
			width: 270rpx;
			z-index: 1;
		}
		
		.circle2{
			position: absolute;
			top: 166rpx;
			left: 480rpx;
			width: 106rpx;
			z-index: 1;
		}
		
		.title{
			position: relative;
			font-size: 44rpx;
			font-weight: Bold;
			color: #040404;
			z-index: 2;
		}
		
		.position-search{
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;
			margin-top: 22rpx;
			z-index: 2;
			
			.position-name{
				line-height: 50rpx;
				font-size: 36rpx;
				font-style: Bold;
				color: #676769;
			}
			
			.search-container{
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 128rpx;
				height: 100%;
			}
		}
		
		.choice-nox{
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 58rpx;
			margin-top: 30rpx;
			padding-left: 26rpx;
			z-index: 1;
			
			.filter-tabs{
				display: flex;
				height: 40rpx;
				line-height: 40rpx;
				
				.tab{
					font-size: 28rpx;
					color: #272727;
					
					& + .tab{
						margin-left: 52rpx;
					}
					
					&.active{
						position: relative;
						
						&::after{
							content: '';
							display: block;
							position: absolute;
							bottom: -8rpx;
							right: 0;
							width: 46rpx;
							height: 10rpx;
							border-top-left-radius: 12rpx;
							border-bottom-right-radius: 12rpx;
							background: linear-gradient(90deg, #0CABB7 0%, #A9E9EF 100%);
						}
					}
				}
			}
			
			.dropdown-container{
				display: flex;
				
				.dropdown{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 58rpx;
					border-radius: 8rpx;
					background: #F5F6FA;
					padding: 0 14rpx;
					
					.dropdown-text{
						font-size: 30rpx;
						color: #4E5470;
						margin-right: 10rpx;
					}
					
					& + .dropdown{
						margin-left: 16rpx;
					}
				}
			}
		}
	}

	.job-list{
		position: relative;
		background: #F4F5F8;
		z-index: 3;
		
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
					font-style: Bold;
					color: #16B3B2;
				}
			}
			
			.company-info{
				line-height: 36rpx;
				font-size: 26rpx;
				color: #86909C;
				margin-top: 24rpx;
				
				.txt{
					& + .txt{
						margin-left: 38rpx;
					}
				}
			}
			
			.job-details{
				display: flex;
				flex-wrap: wrap;
				gap: 16rpx;
				margin: 24rpx 0 32rpx;
				
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
			
			.hr-info{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 56rpx;
				
				.info-l{
					display: flex;
					align-items: center;
					height: 100%;
					
					.icon-img{
						width: 56rpx;
						margin-right: 18rpx;
					}
					
					.hr-name{
						font-size: 28rpx;
						color: #1D2129;
					}
				}
				
				.address-info{
					font-size: 26rpx;
					color: #86909C;
				}
			}
		}
	}
}
</style>