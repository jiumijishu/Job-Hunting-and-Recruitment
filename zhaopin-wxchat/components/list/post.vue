<template>
	<view class="list">
		<!-- 岗位 -->
			<view class="post">	
			<view class="" v-for="(item,index) in list" :key="index" @click="post(item.id)">
				<view class="postImg">
					<view class="post-1">
						<van-image width="50" height="50" fit="cover" class="entImg"
							:src="item.logo" />
						<view class="postName">{{item.jobName}}</view>
					</view>
					<view class="num" v-if='item.minSalary==0 && item.maxSalary==0'>
						面议
					</view>
					<view class="num" v-else>
						{{item.minSalary/1000+'k' }}-{{item.maxSalary/1000+'k'}}
					</view>
				</view>
				<view class="postText" style="font-size:32rpx; margin-bottom:10rpx;font-weight: 400;">
					<text>{{item.companyName}}</text>
					<text class="ptext">{{item.size?item.size:''}}</text>
					<!-- <text class="ptext">上海</text> -->
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<van-tag color="#F7F8FA" text-color="#9EA3AE"
					 size="large" v-for="(i,ind) in item.jobLabels" :key="ind"
					 style="margin-right: 6px; border-bottom:4px solid white;">{{i}}</van-tag>
				</view>
					<van-divider />
			</view>			
		</view>

	</view>
</template>

<script>

	export default {
	props: {
	  list:{
				type:Array,
				value:[]
			}
	},
		data() {
			return {
			}
		},

		methods: {

			// 点击职位
			post(id) {

				uni.navigateTo({
					url: `/pages/details/position-details?id=${id}`
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		// height: 210rpx;
		width: 100%;
		background-color: #fff;

		.post {
			height: 100%;
			padding: 10px 20px;
			background-color: white;
			// border-bottom: 1px solid #E9EDF2;

			.postImg {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.post-1 {
					display: flex;
					align-items: center;
					max-width:482rpx;
					
				}

				.postName {
					overflow: hidden;
					white-space: nowrap;
					 text-overflow: ellipsis;
					font-size: 39rpx;
					margin-left: 8px;
					color: rgba(34, 34, 34, 1);
				}

				.num {
					min-width:120rpx;
					text-align: right;
					color: #E33C64;
				}
			}

			.ptext {
				font-size: 30rpx;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
				padding-left: 20rpx;
				padding-bottom: 20rpx;
			}

		}
	}
</style>
