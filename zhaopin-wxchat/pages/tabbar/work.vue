<template>
	<!-- 找工作 -->
	<view class="work">
		<view class="workStyle" v-show="isLogin">
			<!-- 搜索 -->
			<view class="search">
				<view class="search-index">
					<label @click="clickInput()">
						<van-search :value="value" disabled @click-input="clickInput()" shape="round"
							placeholder="搜职位/公司" show-action />
					</label>
				</view>

			</view>
			<!-- 完善信息 -->
			<view class="information" v-if="!UserResume">
				<!-- 在app.vue中获取个人信息 -->
				<van-notice-bar  mode="link" color="#1989fa" background-color="#ECF9FF" left-icon="info-o"
					text="完善及简历信息,让HR更了解你" @click="improve"/>
			</view>
			<!-- tab切换 -->
			<view class="tabList">
				<view class="tabs">
					<tabs></tabs>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// tab切换
	import tabs from "@/components/tabs/tabs.vue"
	// 接口
	const $api = require('../../api/my.js').Api;

	export default {
		components: {

			tabs
		},
		data() {
			return {
				isLogin:false,
				// 搜索
				value: "",
				// 控制tab切换
				active: 1,
				// 完善简历
				UserResume:true,
				tabsList:[],
				jobId:0
			}
		},
		onLoad() {

			this.UserResume=this.$store.state.flag;

		},
		onShow() {

				this.isLogin=true

		},

		onShareAppMessage: function (res) {
			return {
			  title: '直通车',
			  path: 'pages/index/index', // 显示的页面
			  success: function (res) {
				// 转发成功
			  },
			  fail: function (res) {
				// 转发失败
			  }
			}
		// }
		},
			onShareTimeline: function (res) {
				return {
				  title: '自定义标题',
				  path: 'pages/index/index', // 显示的页面
				  imageUrl: "自定义分享封面地址",
				  success: function (res) {
					// 转发成功
				  },
				  fail: function (res) {
					// 转发失败
				  }
				}
			// }
			},

		methods: {

			// 点击搜索跳转页面
			clickInput() {
				uni.navigateTo({
					url: '/pages/work/searchWork'
				})
			},
			improve(){
				uni.navigateTo({
					url:"/pages/myInfo/online-resume"
				})
			},


			//初始化
			init(){

			}
		}
	}
</script>

<style lang="scss" scoped>
	.work {
		width: 100%;
		height: 100%;
		overflow-x: hidden;
	}
	.workStyle{
		height:100%;
		background-color: #fff;
	}
	.search {
		width: 100%;
		border: 1px solid white;
		background-color: white;
	}

	.tabList {
		background-color: white;
		height:100%;
		.tabs {
			width: 100%;
			height:100%;
			.tabs-text {
				width: 100%;
				// background-color: #F7F6F9;
				padding: 20rpx 0rpx;
				display: flex;
				justify-content: space-between;

				.setUp {
					color: #4784FC;
				}
			}
		}
	}

	.post {
		background-color: white;
	}
</style>
