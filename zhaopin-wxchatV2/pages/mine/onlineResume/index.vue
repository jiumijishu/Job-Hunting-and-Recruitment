<template>
	<page-area title="我的在线简历" navBar :navBarHei="92">
		<image class="bg" src="/static/common/r-t-bg.png" mode="widthFix" />
		<view class="resume-container">
			<view class="basic-info">
				<view class="info-l">
					<view class="name-section">
						<view class="name">程橙</view>
						<image class="modify" src="/static/mine/modify.svg" mode="widthFix" />
						<view class="refresh-btn">刷新</view>
					</view>
					<view class="basic-detail">男 18岁 初中及以下</view>
					<view class="ip-address">IP属地：上海市</view>
				</view>
				<image class="avatar" src="/static/common/default-avatar.png" mode="widthFix" />
			</view>
			<view class="section-header">
				<view class="header-l">
					<view class="section-title">
						<text class="txt">求职意向</text>
					</view>
					<view class="required">必填</view>
				</view>
			    <view class="edit-btn">
					<image class="modify" src="/static/mine/modify2.svg" mode="widthFix" />编辑
				</view>
			</view>
			<view class="job-intention">
				<view class="job-item">
					<view class="job-item-l">
						<view class="job-title">商务专员</view>
						<view class="job-location">【北京市--东城区】</view>
					</view>
			        <view class="salary">面议</view>
			    </view>
			    <view class="job-item">
					<view class="job-item-l">
						<view class="job-title">销售工程师</view>
						<view class="job-location">【北京市--东城区】</view>
					</view>
					<view class="salary">面议</view>
			    </view>
			</view>
			<view class="section">
				<view class="section-title">
					<text class="txt">自我描述</text>
				</view>
				<image class="right-icon" src="/static/mine/right.svg" mode="widthFix" />
			</view>
			<view class="self-desc">踏实肯干，注重细节，具备良好沟通与团队协作能力。适应性强，能快速融入工作，以结果为导向，持续精进业务技能。</view>
			<view class="section">
			 	<view class="section-title">
			 		<text class="txt">教育经历</text>
			 	</view>
			 	<view class="add">+ 添加</view>
			</view>
			<view class="education-box">
				<view class="education-item" v-for="(item, index) in 2" :key="index">
					<view class="edu-header">
						<view class="school">武汉大学</view>
						<view class="major">博士·金融专硕</view>
					</view>
					<view class="duration">
						2020-01 ~ 2024-03<image class="right-icon" src="/static/mine/right.svg" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="section">
			 	<view class="section-title">
			 		<text class="txt">工作经历</text>
			 	</view>
			 	<view class="add">+ 添加</view>
			</view>
			<view class="work-box">
				<view class="work-item" v-for="(item, index) in 2" :key="index">
					<view class="work-top">
						<view class="work-header">
						    <view class="company">中国银行</view>
						    <view class="position">商务专员·行长</view>
						</view>
						<view class="duration">
							2020-01 ~ 2024-03<image class="right-icon" src="/static/mine/right.svg" mode="widthFix" />
						</view>
					</view>
				    <view class="work-desc">主要是负责新人的招聘和培训，文案变价和排版，等主要是负责新人的招聘和培训，文案变价和排版，等主要是负责新人的招聘和培训，文案变价和排版，等</view>
				</view>
			</view>
			<view class="section">
			 	<view class="section-title">
			 		<text class="txt">培训经历</text>
			 	</view>
			 	<view class="add">+ 添加</view>
			</view>
			<view class="education-box" style="border: none;">
				<view class="education-item" v-for="(item, index) in 1" :key="index">
					<view class="edu-header">
						<view class="school">中国银行</view>
						<view class="major">商务专员·行长</view>
					</view>
					<view class="duration">
						2020-01 ~ 2024-03<image class="right-icon" src="/static/mine/right.svg" mode="widthFix" />
					</view>
				</view>
			</view>
			<view class="generate-btn">
			    <image class="generate-icon" src="/static/mine/resume.svg" mode="widthFix" />生成附件简历
			</view>
		</view>
		<template #bottomNavBar>
			<view class="b-nav-bar">
				<view class="btn">预览简历</view>
				<view class="btn">保存</view>
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

.resume-container{
	overflow: hidden;
	position: relative;
	padding: 0 44rpx;
	z-index: 2;
	margin-top: 24rpx;
	
	.basic-info{
		display: flex;
		justify-content: space-between;
		padding: 0 10rpx 10rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		.info-l{
			.name-section{
				display: flex;
				align-items: center;
				
				.name{
					line-height: 62rpx;
					font-size: 44rpx;
					font-weight: bold;
					color: #040404;
				}
				
				.modify{
					width: 48rpx;
					margin-left: 22rpx;
				}
				
				.refresh-btn{
					height: 40rpx;
					line-height: 40rpx;
					font-size: 28rpx;
					color: #16B3B2;
					border-radius: 20rpx;
					padding: 0 12rpx;
					background: #E8F8F8;
					margin-left: 22rpx;
				}
			}
			
			.basic-detail,
			.ip-address{
				line-height: 36rpx;
				font-size: 26rpx;
				color: #86909C;
			}
			
			.basic-detail{
				margin-top: 12rpx;
			}
			
			.ip-address{
				margin-top: 18rpx;
			}
		}
		
		.avatar{
			width: 120rpx;
		}
	}

	.section-title{
		position: relative;
		line-height: 44rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #040404;
		margin-left: 10rpx;
		
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
	
	.section-header{
		display: flex;
		justify-content: space-between;
		margin-top: 24rpx;
		
		.header-l{
			display: flex;
			align-items: center;
		
			.required{
				width: 56rpx;
				height: 32rpx;
				line-height: 32rpx;
				font-size: 20rpx;
				color: #FFFFFF;
				text-align: center;
				border-radius: 20rpx 20rpx 20rpx 0;
				background: #FF586C;
				margin-left: 18rpx;
			}
		}
		
		.edit-btn{
			display: flex;
			align-items: center;
			height: 40rpx;
			font-size: 24rpx;
			color: #418CFF;
			border-radius: 20rpx;
			padding: 0 16rpx;
			background: #E5F3FF;
			
			.modify{
				width: 32rpx;
			}
		}
	}
	
	.job-intention{
		padding-bottom: 40rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		.job-item{
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-left: 2rpx solid #16B3B2;
			border-radius: 0 16rpx 16rpx 0;
			padding: 32rpx 38rpx 26rpx 26rpx;
			background: #F4F5F8;
			margin-top: 20rpx;
			
			&:nth-child(1){
				margin-top: 30rpx;
			}
			
			.job-item-l{
				.job-title{
					line-height: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #3D4653;
					margin-left: 6rpx;
				}
				
				.job-location{
					line-height: 36rpx;
					font-size: 26rpx;
					color: #86909C;
					margin-top: 10rpx;
				}
			}
			
			.salary{
				line-height: 44rpx;
				font-size: 32rpx;
				font-weight: bold;
				color: #FF586C;
			}
		}
	}
	
	.section{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 10rpx;
		margin-top: 32rpx;
		
		.right-icon{
			width: 16rpx;
		}
		
		.add{
			line-height: 40rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #418CFF;
			padding: 0 24rpx;
			border-radius: 20rpx;
			background: #E5F3FF;
		}
	}
	
	.self-desc{
		line-height: 36rpx;
		font-size: 26rpx;
		color: #86909C;
		text-align: justify;
		padding: 0 10rpx 36rpx;
		border-bottom: 2rpx solid #F0F0F0;
		margin-top: 38rpx;
	}
	
	.education-box{
		padding: 0 10rpx 34rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		.education-item{
			display: flex;
			justify-content: space-between;
			line-height: 36rpx;
			font-size: 26rpx;
			color: #86909C;
			margin-top: 70rpx;
			
			&:nth-child(1){
				margin-top: 40rpx;
			}
			
			.edu-header{
				.school{
					line-height: 40rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #3D4653;
				}
				
				.major{
					margin-top: 10rpx;
				}
			}
			
			.duration{
				.right-icon{
					width: 16rpx;
					margin-left: 24rpx;
				}
			}
		}
	}
	
	.work-box{
		padding: 0 10rpx 56rpx;
		border-bottom: 2rpx solid #F0F0F0;
		
		.work-item{
			line-height: 36rpx;
			font-size: 26rpx;
			color: #86909C;
			margin-top: 48rpx;
			
			&:nth-child(1){
				margin-top: 40rpx;
			}
			
			.work-top{
				display: flex;
				justify-content: space-between;
				
				.work-header{
					.company{
						line-height: 40rpx;
						font-size: 28rpx;
						font-weight: bold;
						color: #3D4653;
					}
					
					.position{
						margin-top: 10rpx;
					}
				}
				
				.duration{
					.right-icon{
						width: 16rpx;
						margin-left: 24rpx;
					}
				}
			}
			
			.work-desc{
				line-height: 36rpx;
				font-size: 26rpx;
				color: #696D72;
				text-align: justify;
				margin-top: 20rpx;
			}
		}
	}
	
	.generate-btn{
		display: flex;
		justify-content: center;
		align-items: center;
		width: 572rpx;
		height: 92rpx;
		border-radius: 60rpx;
		background: #FFFFFF;
		box-shadow: 0 0 12rpx 0 #00000040;
		margin: 62rpx auto;
		
		.generate-icon{
			width: 48rpx;
			font-size: 36rpx;
			color: #4E5470;
			margin-right: 10rpx;
		}
	}
}

.b-nav-bar{
	display: flex;
	gap: 26rpx;
	height: 96rpx;
	padding: 0 36rpx;
	
	.btn{
		flex: 1;
		height: 100%;
		line-height: 96rpx;
		font-size: 32rpx;
		color: #FFFFFF;
		text-align: center;
		border-radius: 16rpx;
		
		&:nth-child(1){
			background: #048CFC;
		}
		
		&:nth-child(2){
			background: #16B3B2;
		}
	}
}
</style>