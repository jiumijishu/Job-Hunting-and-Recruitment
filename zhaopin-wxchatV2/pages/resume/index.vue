<template>
	<tab-bar-page>
		<view class="work-page">
			<view class="page-top">
				<image class="bg" src="/static/message/bg.png" mode="widthFix" />
				<view :style="{width: `${left}px`, height: `${height}px`, lineHeight: `${height}px`, marginTop: `${top}px`}"></view>
				<view class="position-search">
					<view class="choice-list">
						<view class="job-btn active">全部</view>
						<view class="job-btn">VUE开发</view>
						<view class="job-btn">java开发</view>
					</view>
					<view class="search-container">
						<image src="/static/work/plusempty.svg" mode="widthFix" style="width: 40rpx;" />
						<image src="/static/work/search.svg" mode="widthFix" style="width: 40rpx;" />
					</view>
				</view>
				<view class="choice-nox">
					<view class="filter-tabs">
						<view class="tab active">推荐</view>
						<view class="tab">最新</view>
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
			<scroll-view class="candidate-list" scroll-y :style="{height: `calc(100vh - ${top + height}px - 186rpx)`, marginTop: `calc(${top + height}px - 300rpx)`}">
				<view class="candidate-card">
					<view class="card-header">
						<view class="avatar-section">
						    <image class="avatar" src="/static/common/default-avatar.png" mode="widthFix" />
						    <image class="gender-icon" src="/static/resume/male.svg" mode="widthFix" />
						</view>
						<view class="basic-info">
							<view class="name-status">
							    <view class="name">许先生</view>
							    <view class="status">今日活跃</view>
							</view>
							<view class="details">
								<text class="txt">25年应届生</text>
								<text class="txt">本科</text>
								<text class="txt">面议</text>
							</view>
						</view>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/follow.svg" mode="widthFix" />
						<text class="txt">最近关注：其他职位</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/academic-qualification.svg" mode="widthFix" />
						<text class="txt">北京大学·银行</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/company.svg" mode="widthFix" />
						<text class="txt">动力科技有限公司·JAVA</text>
					</view>
					<view class="job-duties">工作职责 岗位职称：1.负责软件项目的整体规划，组织落实几监控管理；2.负责软件项目的整体规划，组织落实几监监监监监监监监监监监监监监监监监监</view>
				</view>
				<view class="candidate-card">
					<view class="card-header">
						<view class="avatar-section">
						    <image class="avatar" src="/static/common/default-avatar2.png" mode="widthFix" />
						    <image class="gender-icon" src="/static/resume/female.svg" mode="widthFix" />
						</view>
						<view class="basic-info">
							<view class="name-status">
							    <view class="name">许女士</view>
							    <view class="status">今日活跃</view>
							</view>
							<view class="details">
								<text class="txt">4年</text>
								<text class="txt">本科</text>
								<text class="txt">面议</text>
							</view>
						</view>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/follow.svg" mode="widthFix" />
						<text class="txt">最近关注：英语翻译</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/academic-qualification.svg" mode="widthFix" />
						<text class="txt">北京大学·银行</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/company.svg" mode="widthFix" />
						<text class="txt">动力科技有限公司·JAVA</text>
					</view>
					<view class="job-duties">工作职责 岗位职称：1.负责软件项目的整体规划，组织落实几监控管理；2.负责软件项目的整体规划，组织落实几监监监监监监监监监监监监监监监监监监</view>
				</view>
				<view class="candidate-card">
					<view class="card-header">
						<view class="avatar-section">
						    <image class="avatar" src="/static/common/default-avatar2.png" mode="widthFix" />
						    <image class="gender-icon" src="/static/resume/female.svg" mode="widthFix" />
						</view>
						<view class="basic-info">
							<view class="name-status">
							    <view class="name">许女士</view>
								<view class="new-status">
									<image class="new-icon" src="/static/resume/new.svg" mode="widthFix" />
								</view>
							    <view class="new-resume">新简历</view>
							</view>
							<view class="details">
								<text class="txt">4年</text>
								<text class="txt">本科</text>
								<text class="txt">面议</text>
							</view>
						</view>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/follow.svg" mode="widthFix" />
						<text class="txt">最近关注：英语翻译</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/academic-qualification.svg" mode="widthFix" />
						<text class="txt">北京大学·银行</text>
					</view>
					<view class="detail-box">
						<image class="box-icon" src="/static/resume/company.svg" mode="widthFix" />
						<text class="txt">动力科技有限公司·JAVA</text>
					</view>
					<view class="job-duties">工作职责 岗位职称：1.负责软件项目的整体规划，组织落实几监控管理；2.负责软件项目的整体规划，组织落实几监监监监监监监监监监监监监监监监监监</view>
				</view>
				<view style="height: 1rpx;"></view>
			</scroll-view>
		</view>
	</tab-bar-page>
</template>

<script setup>
import { getMenuButtonInfo } from '@/utils/menuButton'

const { height, top, left } = getMenuButtonInfo()
</script>

<style lang="scss" scoped>
.work-page{
	.page-top{
		overflow: hidden;
		position: relative;
		height: 510rpx;
		padding: 0 32rpx 0 40rpx;
		
		.bg{
			position: fixed;
			top: 0;
			left: 0;
			width: 100vw;
			z-index: 1;
		}
		
		.position-search{
			position: relative;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 50rpx;
			margin-top: 22rpx;
			z-index: 2;
			
			.choice-list{
				display: flex;
				align-items: center;
				height: 62rpx;
				
				.job-btn{
					position: relative;
					font-size: 36rpx;
					color: #878788;
					font-weight: bold;
					
					& + .job-btn{
						margin-left: 32rpx;
					}
					
					&.active{
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
							border-radius: 12rpx;
							background: linear-gradient(90deg, #0CABB7 0%, #A9E9EF 100%);
						}
					}
				}
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
			margin-top: 52rpx;
			z-index: 1;
			
			.filter-tabs{
				display: flex;
				height: 44rpx;
				line-height: 44rpx;
				
				.tab{
					font-size: 28rpx;
					color: #272727;
					
					& + .tab{
						margin-left: 52rpx;
					}
					
					&.active{
						font-size: 32rpx;
						font-weight: bold;
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
					background: #FFFFFF;
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

	.candidate-list{
		position: relative;
		background: #F4F5F8;
		z-index: 3;
		
		.candidate-card{
			width: 686rpx;
			border-radius: 16rpx;
			background: #FFFFFF;
			padding: 40rpx 36rpx 28rpx;
			margin: 28rpx auto;
			
			.card-header{
				display: flex;
				margin-bottom: 40rpx;
				
				.avatar-section{
					position: relative;
					
					.avatar{
						width: 100rpx;
					}
					
					.gender-icon{
						position: absolute;
						top: 6rpx;
						right: 0;
						width: 28rpx;
					}
				}
				
				.basic-info{
					margin: 12rpx 0 0 22rpx;
					
					.name-status{
						display: flex;
						
						.name{
							line-height: 36rpx;
							font-size: 36rpx;
							font-weight: bold;
							color: #1D2129;
						}
						
						.new-status{
							position: relative;
							width: 62rpx;
							margin-left: 10rpx;
							
							.new-icon{
								position: absolute;
								top: -12rpx;
								left: 0;
								width: 62rpx;
							}
						}
						
						.status{
							width: 114rpx;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: #418CFF;
							background: #E5F3FF;
							text-align: center;
							border-radius: 20rpx;
							margin-left: 20rpx;
						}
						
						.new-resume{
							width: 114rpx;
							height: 40rpx;
							line-height: 40rpx;
							font-size: 24rpx;
							color: #FF4377;
							background: #FFEDEF;
							text-align: center;
							border-radius: 20rpx;
							margin-left: 20rpx;
						}
					}
					
					.details{
						line-height: 34rpx;
						font-size: 24rpx;
						color: #86909C;
						margin-top: 14rpx;
						
						.txt{
							& + .txt{
								position: relative;
								margin-left: 30rpx;
								
								&::after{
									content: '';
									position: absolute;
									top: 8rpx;
									left: -14rpx;
									width: 2rpx;
									height: 20rpx;
									background: #86909C;
								}
							}
						}
					}
				}
			}
			
			.detail-box{
				display: flex;
				align-items: center;
				height: 40rpx;
				font-size: 28rpx;
				color: #1D2129;
				margin-top: 20rpx;
				
				.box-icon{
					width: 36rpx;
					margin-right: 4rpx;
				}
			}
			
			.job-duties{
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				text-overflow: ellipsis;
				line-height: 36rpx;
				font-size: 24rpx;
				color: #86909C;
				text-align: justify;
				margin-top: 16rpx;
			}
		}
	}
}
</style>