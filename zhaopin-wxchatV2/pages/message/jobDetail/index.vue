<template>
	<page-area title="职位详情" navBar :navBarHei="112">
		<image class="bg" src="/static/common/r-t-bg.png" mode="widthFix" />
		<view class="job-container">
			<view class="job-title">咨询顾问</view>
			<view class="job-salary">8-12K</view>
			<view class="job-info">
				<view class="job-requirement">
					<image class="job-icon" src="/static/message/icon01.svg" mode="widthFix" />鄂州市-鄂州区
				</view>
				<view class="job-requirement">
					<image class="job-icon" src="/static/message/icon02.svg" mode="widthFix" />经验不限
				</view>
				<view class="job-requirement">
					<image class="job-icon" src="/static/message/icon03.svg" mode="widthFix" />学历不限
				</view>
			</view>
			<view class="job-meta">
			    <text class="update-time">更新时间：39分钟前</text>
			    <text class="view-count">浏览：786</text>
			</view>
			<view class="company-info">
				<view class="company-l">
					<image class="company-icon" src="/static/common/company.png" mode="widthFix" />
			        <view class="company-txt">
						<view class="recruiter">李响杰</view>
						<view class="company-name">湖北黄商网络科技有限公司</view>
						<view class="ip-location">IP属地：未知</view>
					</view>
				</view>
				<view class="chat-btn">
					<image class="chat-icon" src="/static/message/chat2.svg" mode="widthFix" />
				</view>
			</view>
			<view class="title">
				<text class="txt">职位福利</text>
			</view>
			<view class="job-benefits">
			    <view class="benefit-tag">加班费</view>
			    <view class="benefit-tag">朝九晚五</view>
			    <view class="benefit-tag">管理规范</view>
			    <view class="benefit-tag">压力小</view>
			</view>
			<view class="title">
				<text class="txt">职位详情</text>
			</view>
			<view class="detail-content">针对产品方向、市场定位、客户分析等具体情况，提出专业性的指导意见</view>
			<view class="title">
				<text class="txt">工作地址</text>
			</view>
			<view class="work-address">
			    <image class="address-icon" src="/static/message/icon05.svg" mode="widthFix" />
			    <text class="address-content">鄂州市鄂城区学府路48号</text>
			</view>
			<view class="company-info2">
				<image class="company-icon" src="/static/common/company.png" mode="widthFix" />
				<view class="company-txt">
					<view class="company-name">湖北黄商网络科技有限公司</view>
					<view class="company-stats">
					    <view class="company-size">1000-9999人·李响杰</view>
					    <view class="job-count">在招职位 <text style="color: #FC9100;">44</text>个</view>
					</view>
				</view>
			</view>
			<view class="title">
				<text class="txt">猜你喜欢</text>
			</view>
			<view class="job-item" v-for="(job, index) in 10" :key="index">
				<view class="job-item-header">
				    <text class="job-item-title">仓库协管及配送员（包中餐）</text>
				    <text class="job-item-salary">8-12K</text>
				</view>
				<view class="job-item-info">
				    <view class="job-item-requirement">鄂州市-鄂州区</view>
				    <view class="job-item-requirement">经验不限</view>
				    <view class="job-item-requirement">学历不限</view>
				</view>
				<view class="job-item-company">
					<view class="job-item-l">
						<image class="job-item-img" src="/static/common/company.png" mode="widthFix" />
						<text class="company-name">湖北黄商网络科技有限公司</text>
						<view class="certification">认证</view>
					</view>
					<text class="update-time">2分钟前</text>
				</view>
			</view>
		</view>
		<view class="sidebar">
			<view class="sidebar-btn">
				<image class="btn-icon" src="/static/common/collect.svg" mode="widthFix" />
				<view class="btn-text">收藏</view>
			</view>
			<view style="border-top: 2rpx solid #D9D9D9"></view>
			<view class="sidebar-btn">
				<image class="btn-icon" src="/static/common/share.svg" mode="widthFix" />
				<view class="btn-text">分享</view>
			</view>
		</view>
		<template #bottomNavBar>
			<view class="b-nav-bar">
				<view class="nav-item">
					<image class="nav-icon" src="/static/common/home.svg" mode="widthFix" />
				    <view class="nav-text">首页</view>
				</view>
				<view class="nav-item">
					<image class="nav-icon" src="/static/message/telephone.svg" mode="widthFix" />
				    <view class="nav-text">电话</view>
				</view>
				<view class="nav-item">
					<image class="nav-icon" src="/static/message/chat.svg" mode="widthFix" />
				    <view class="nav-text">在线聊</view>
				</view>
				<view class="hire-btn">申请职位</view>
			</view>
		</template>
	</page-area>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.bg{
	position: fixed;
	top: 0;
	right: 0;
	width: 378rpx;
	z-index: 1;
}

.job-container{
	overflow: hidden;
	position: relative;
	padding: 0 44rpx;
	margin-top: 12rpx;
	z-index: 2;
	
	.job-title{
		line-height: 62rpx;
		font-size: 44rpx;
		font-weight: bold;
		color: #040404;
		margin-left: 10rpx;
	}
	
	.job-salary{
		line-height: 50rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #16B3B2;
		margin: 16rpx 0 0 10rpx;
	}
	
	.job-info{
		display: flex;
		gap: 16rpx;
		margin: 16rpx 0 0 10rpx;
		
		.job-requirement{
			display: flex;
			align-items: center;
			height: 48rpx;
			font-size: 26rpx;
			color: #4E5969;
			padding: 0 10rpx;
			border-radius: 4rpx;
			background: #F5F5F5;
			
			.job-icon{
				width: 28rpx;
				margin-right: 4rpx;
			}
		}
	}
	
	.job-meta{
		display: flex;
		justify-content: space-between;
		line-height: 36rpx;
		font-size: 26rpx;
		color: #86909C;
		padding: 0 10rpx;
		margin-top: 30rpx;
		padding-bottom: 32rpx;
		border-bottom: 2rpx solid #D9D9D9;
	}
	
	.company-info{
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx 32rpx 2rpx;
		border-bottom: 2rpx solid #D9D9D9;
		margin-top: 46rpx;
		
		.company-l{
			display: flex;
			
			.company-icon{
				width: 86rpx;
				margin: 4rpx 34rpx 0 0;
			}
			
			.company-txt{
				line-height: 34rpx;
				font-size: 24rpx;
				color: #86909C;
				
				.recruiter{
					line-height: 44rpx;
					font-size: 32rpx;
					font-weight: bold;
					color: #040404;
				}
				
				.company-name{
					margin-top: 10rpx;
				}
				
				.ip-location{
					margin-top: 6rpx;
				}
			}
		}
		
		.chat-btn{
			display: flex;
			justify-content: center;
			align-items: center;
			width: 80rpx;
			height: 80rpx;
			background: #E0ECFF;
			border-radius: 50%;
			margin-top: 4rpx;
			
			.chat-icon{
				width: 52rpx;
			}
		}
	}
	
	.title{
		position: relative;
		line-height: 50rpx;
		font-size: 36rpx;
		font-weight: bold;
		color: #040404;
		margin: 40rpx 0 0 10rpx;
		
		.txt{
			position: relative;
			z-index: 2;
		}
		
		&::after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			width: 106rpx;
			height: 16rpx;
			border-radius: 12rpx;
			background: linear-gradient(90deg, rgba(6, 206, 221, 0.6) 0%, rgba(169, 233, 239, 0.6) 100%);
		}
	}
	
	.job-benefits{
		display: flex;
		gap: 20rpx;
		margin: 40rpx 0 0 10rpx;
		
		.benefit-tag{
			width: 142rpx;
			height: 52rpx;
			line-height: 52rpx;
			text-align: center;
			font-size: 26rpx;
			color: #4E5969;
			border-radius: 24rpx;
			background: #F2F3F5;
		}
	}
	
	.detail-content{
		line-height: 36rpx;
		font-size: 26rpx;
		color: #86909C;
		margin-top: 28rpx;
		padding: 0 10rpx 32rpx;
		border-bottom: 2rpx solid #D9D9D9;
	}
	
	.work-address{
		display: flex;
		align-items: center;
		height: 36rpx;
		font-size: 26rpx;
		color: #86909C;
		margin: 28rpx 0 0 10rpx;
		
		.address-icon{
			width: 28rpx;
		}
	}

	.company-info2{
		display: flex;
		padding: 0 2rpx 54rpx;
		border-bottom: 2rpx solid #D9D9D9;
		margin-top: 40rpx;
		
		.company-icon{
			width: 86rpx;
			margin-right: 34rpx;
		}
		
		.company-txt{
			flex: 1;
			
			.company-name{
				line-height: 40rpx;
				font-size: 28rpx;
				color: #3D4653;
			}
			
			.company-stats{
				display: flex;
				justify-content: space-between;
				line-height: 34rpx;
				font-size: 24rpx;
				color: #86909C;
				margin-top: 10rpx;
			}
		}
	}

	.job-item{
		padding: 0 16rpx 42rpx;
		border-bottom: 2rpx solid #D9D9D9;
		margin-top: 48rpx;
		
		&:nth-last-child(1){
			border-bottom: none;
		}
		
		.job-item-header{
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-weight: bold;
			
			.job-item-title{
				font-size: 28rpx;
				color: #1D2129;
			}
			
			.job-item-salary{
				font-size: 36rpx;
				color: #16B3B2;
			}
		}
		
		.job-item-info{
			display: flex;
			gap: 16rpx;
			margin-top: 24rpx;
			
			.job-item-requirement{
				line-height: 48rpx;
				font-size: 26rpx;
				color: #4E5969;
				padding: 0 14rpx;
				border-radius: 4rpx;
				background: #F5F5F5;
			}
		}
		
		.job-item-company{
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 42rpx;
			font-size: 26rpx;
			color: #86909C;
			margin-top: 50rpx;
			
			.job-item-l{
				display: flex;
				align-items: center;
				height: 100%;
				
				.job-item-img{
					width: 42rpx;
					margin-right: 12rpx;
				}
				
				.certification{
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

.sidebar{
	overflow: hidden;
	position: fixed;
	top: 0;
	bottom: 0;
	right: 44rpx;
	margin: auto;
	width: 72rpx;
	height: 234rpx;
	border-radius: 60rpx;
	background: #FFFFFF;
	box-shadow: 0 0 12rpx 0 #00000040;
	z-index: 99;
	
	.sidebar-btn{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		height: 116rpx;
		
		.btn-icon{
			width: 36rpx;
		}
		
		.btn-text{
			width: 100%;
			line-height: 28rpx;
			font-size: 20rpx;
			color: #4E5470;
			text-align: center;
		}
		
		&:nth-child(1){
			.btn-text{
				margin-top: 10rpx;
			}
		}
		
		&:nth-child(3){
			.btn-text{
				margin-top: 6rpx;
			}
		}
	}
}
	
.b-nav-bar{
	display: flex;
	align-items: center;
	padding-left: 8rpx;
	
	.nav-item{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-content: center;
		width: 112rpx;
		height: 112rpx;
		
		.nav-text{
			width: 100%;
			line-height: 28rpx;
			font-size: 20rpx;
			color: #686E8B;
			text-align: center;
		}
		
		&:nth-child(1){
			.nav-icon{
				width: 56rpx;
				margin-bottom: 8rpx;
			}
		}
		
		&:nth-child(2){
			.nav-icon{
				width: 48rpx;
				margin-bottom: 16rpx;
			}
		}
		
		&:nth-child(3){
			.nav-icon{
				width: 52rpx;
				margin-bottom: 12rpx;
			}
		}
	}

	.hire-btn{
		width: 352rpx;
		height: 92rpx;
		line-height: 92rpx;
		font-size: 32rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius: 16rpx;
		background: #16B3B2;
		margin-left: 18rpx;
	}
}
</style>