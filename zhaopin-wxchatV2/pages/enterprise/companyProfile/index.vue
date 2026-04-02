<template>
	<page-area title="九米技术" navBar :mTop="10" :navBarHei="112">
		<view class="company-header">
			<image class="decoration" src="/static/enterprise/decoration.png" mode="widthFix" />
			<view class="header-content">
			    <image class="company-icon" src="/static/enterprise/company.png" mode="widthFix" />
			    <view class="company-info">
			        <view class="company-name">襄阳九米信息技术有限公司</view>
			        <view class="company-basic">
						<text class="txt">20-99人</text>
						<text class="txt">文化/体育/娱乐</text>
						<text class="txt">文化/有限合伙企业</text>
					</view>
			    </view>
			</view>
			<view class="company-auth-section">
				<view style="display: flex;">
					<view class="auth-item">
					    <image class="auth-img" src="/static/enterprise/icon01.svg" mode="widthFix" />
					    <text class="auth-value">企业认证</text>
					</view>
					<view class="auth-item" style="margin-left: 12rpx;">
					    <image class="auth-img" src="/static/enterprise/icon02.svg" mode="widthFix" />
					    <text class="auth-value">实名认证</text>
					</view>
				</view>
			    <view class="auth-item" style="margin-top: 8rpx;">
			        <image class="auth-img" src="/static/enterprise/icon03.svg" mode="widthFix" />
			        <text class="auth-value">湖北省襄阳市东街8号家属院内</text>
			    </view>
				<view class="tag-list">
				    <view class="tag-item">加班费</view>
				    <view class="tag-item">朝九晚五</view>
				    <view class="tag-item">管理规范</view>
				    <view class="tag-item">压力小</view>
				    <view class="tag-item">压力小</view>
				</view>
			</view>
		</view>
		<view class="company-introduction">
			<view class="filter-tabs">
				<view class="tab active">公司信息</view>
				<view class="tab">在招职位·2</view>
			</view>
			<view class="section-title" style="margin-bottom: 20rpx;">公司简介</view>
			<view class="intro-content">互联成立于 2015 年，聚焦人工智能与大数据服务，为企业提供智能营销、数据中台解决方案，累计服务超 3000 家客户，获评国家级高新技术企业。</view>
			<view class="intro-content">互联成立于 2015 年，聚焦人工智能与大数据服务，为企业提供智能营销、数据中台解决方案，累计服务超 3000 家客户，获评国家级高新技</view>
			<view class="section-title" style="margin-top: 58rpx;">公司相册</view>
			<view class="album-list">
			    <image class="album-image" src="/static/test/test2.jpg" mode="aspectFill" />
			    <image class="album-image" src="/static/test/test3.jpg" mode="aspectFill" />
			</view>
		</view>
		<template #bottomNavBar>
			<view class="b-nav-bar">
				<view class="nav-item">
					<image class="nav-icon" src="/static/common/home.svg" mode="widthFix" />
				    <view class="nav-text">首页</view>
				</view>
				<view class="nav-item">
					<image class="nav-icon" src="/static/common/collect.svg" mode="widthFix" />
				    <view class="nav-text">收藏</view>
				</view>
				<view class="nav-item">
					<image class="nav-icon" src="/static/common/share.svg" mode="widthFix" />
				    <view class="nav-text">分享</view>
				</view>
				<view class="hire-btn">在招职位（2）</view>
			</view>
		</template>
	</page-area>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.company-header{
	overflow: hidden;
	position: relative;
	height: 612rpx;
	padding: 0 70rpx 0 40rpx;
	background: linear-gradient(109.57deg, #5BD1D6 2.64%, #00C0C6 89.02%);
	z-index: 1;
	
	.decoration{
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 1;
	}
	
	.header-content{
		position: relative;
		display: flex;
		align-items: center;
		margin-top: 82rpx;
		z-index: 2;
		
		.company-icon{
			width: 92rpx;
			margin-right: 24rpx;
		}
		
		.company-info{
			color: #FFFFFF;
			
			.company-name{
				line-height: 56rpx;
				font-size: 40rpx;
				font-weight: bold;
				margin-bottom: 12rpx;
			}
			
			.company-basic{
				line-height: 36rpx;
				font-size: 24rpx;
				
				.txt{
					position: relative;
					
					& + .txt{
						margin-left: 24rpx;
						
						&:before{
							content: '';
							position: absolute;
							top: 12rpx;
							left: -12rpx;
							width: 2rpx;
							height: 14rpx;
							background: #FFFFFF;
						}
					}
				}
			}
		}
	}
	
	.company-auth-section{
		position: relative;
		z-index: 2;
		margin-top: 48rpx;
		margin-left: -12rpx;
		
		.auth-item{
			display: flex;
			align-items: center;
			height: 54rpx;
			padding: 0 16rpx;
			
			.auth-img{
				width: 30rpx;
				margin-right: 8rpx;
			}
			
			.auth-value{
				font-size: 28rpx;
				color: #FFFFFF;
			}
			
			&:nth-child(1){
				.auth-img{
					width: 32rpx;
				}
			}
		}
	}

	.tag-list{
		display: flex;
		flex-wrap: wrap;
		gap: 12rpx 20rpx;
		margin-top: 48rpx;
		
		.tag-item{
			width: 142rpx;
			height: 52rpx;
			line-height: 52rpx;
			font-size: 26rpx;
			color: #087073;
			text-align: center;
			border-radius: 24rpx;
			background: #FFFFFF;
		}
	}
}

.company-introduction{
	position: relative;
	min-height: calc(100% - 552rpx);
	border-radius: 40rpx 40rpx 0 0;
	padding: 56rpx 38rpx 56rpx 44rpx;
	margin-top: -60rpx;
	background: #FFFFFF;
	z-index: 2;
	
	.filter-tabs{
		display: flex;
		height: 50rpx;
		line-height: 50rpx;
		margin-bottom: 56rpx;
		
		.tab{
			font-size: 24rpx;
			color: #272727;
			
			& + .tab{
				margin-left: 52rpx;
			}
			
			&.active{
				position: relative;
				font-size: 36rpx;
				font-weight: bold;
				
				&::after{
					content: '';
					display: block;
					position: absolute;
					bottom: -16rpx;
					left: 0;
					right: 0;
					margin: auto;
					width: 46rpx;
					height: 10rpx;
					border-radius: 12rpx 0;
					background: linear-gradient(90deg, #0CABB7 0%, #A9E9EF 100%);
				}
			}
		}
	}
	
	.section-title{
		line-height: 40rpx;
		font-size: 28rpx;
		font-weight: bold;
		color: #1D2129;
	}
	
	.intro-content{
		line-height: 40rpx;
		font-size: 28rpx;
		text-align: justify;
		color: #929393;
	}
	
	.album-list{
		display: flex;
		gap: 28rpx;
		margin-top: 24rpx;
		
		.album-image{
			width: 160rpx;
			height: 160rpx;
			border-radius: 16rpx;
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
				width: 40rpx;
				margin-bottom: 24rpx;
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