<template>
	<view class="list">
		<!-- 企业 -->
		<view class="comStyle">
			<view class="enterprise" v-for="(item,index) in comList" :key="index" @click="company(item.id)" >
			<!-- <view class="enterprise"  @click="company()" > -->
				<!-- 企业头像 -->
				<view class="enterprise-image">
					<van-image width="60" height="60" fit="cover" class="entImg"
						:src="item.logo?item.logo:'https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/comPortrait.png'" />
						
				</view>
				<view class="entInfo">
					<!-- 企业名称 -->
					<view class="entName">
						{{item.companyName}}
					</view>
					<!-- 企业人数 -->
					<view class="entPeople">
						{{item.size?item.size:'无'}}
					</view>
					<!-- 招聘岗位 -->
					<view class="entPost">
						<text v-show="item.jobNames!=null">
						招聘
						<text style="color:#4684FC">{{item.jobNames}}</text>
						等职位
						</text>
						<text v-show="item.jobNames==null">暂无招聘岗位</text>
					</view>

				</view>

			</view>
		</view>

	</view>
</template>

<script>
	export default {
	  // 接受父组件传递过来的值
	  props: {
	    comList:{
			type:Array,
			value:[]
		}
	  },

		data() {
			return {
				type: true,
			}
		},


		methods: {
			// 点击职位
			company(id) {
				uni.navigateTo({
					url: `/pages/details/company-details?id=${id}`
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
		.comStyle{
			padding:0 20px;
		}
		.enterprise {
			height: 90%;
			// width: 100%;
			padding: 16px 0;
			display: flex;
			justify-content: flex-start;
			border-bottom: 1px solid #E9EDF2;


			.entInfo {
				height: 100%;
				margin-left: 8px;

				.entName {
					font-size: 16px;
					color: rgba(34, 34, 34, 1);

				}

				.entPeople {
					font-size: 15px;
					font-weight: 400;
					margin: 10rpx 0;
					color: rgba(166, 166, 166, 1);

				}

				.entPost {
					font-size: 13px;
					font-weight: 400;
					color: rgba(102, 102, 102, 1);
				}
			}

		}

	}
</style>
