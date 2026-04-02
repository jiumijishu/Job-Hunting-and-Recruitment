<template>
	<!-- 消息 -->
	<view class="message">
		<van-tabs type="card" color="#4684FC" animated duration="0.6" swipeable @change="changeMsg">
			<van-tab title="投递记录" class="tabs-list">
				<van-tabs  :active="active" type="line" title-active-color="#4684FC" swipe-threshold="6" @change="onChange()">
					<van-tab v-for="(item,index) in lists" :key="index" :title="item.title" :name="item.type">
						<view class="userList">
							<view v-if="list.length>0">
								<post :list="list"></post>
							</view>
								<view v-else  class="imgNull">
									<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/null.png" mode="aspectFit"></image>
								</view>
						</view>

					</van-tab>

				</van-tabs>
			</van-tab>
			<van-tab title="职位邀请">
				<view  class="userList">
					<view v-if="list.length>0">
						<post :list="list"></post>
					</view>
						<view v-else class="imgNull">
							<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/null.png" mode="aspectFit"></image>
						</view>
				</view>


			</van-tab>
		</van-tabs>
	</view>
</template>

<script>
	// 组件
	import post from "../../components/list/post.vue";
	// 接口
	const $api = require('../../api/my.js').Api;
		import local from "../../utils/local.js"
	export default {
		components: {
			post
		},

		data() {
			return {
				lists: [{
						title: "已投递",
						type:"01"
					},
					{
						title: "沟通中",
						type:"02"
					},
					{
						title:  "不合格",
						type:"03"
					},
					{
						title:  "约面试",
						type:"04"
					},
					{
						title: "已录用",
						type:"05"
					},
				],
				active:"01",
				type:"01",
				list:[]
			}
		},
		onShow() {
				this.myJobApplyList()
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
		methods:{
			myJobApplyList(){
				let data={
					type:this.type
				}
				$api.myJobApplyList(data).then(res=>{
					this.list=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			},
			// 投递记录子tab切换
			onChange(e){
				this.type=e.detail.name
				this.myJobApplyList()
			},
			// 职位邀请
			myJobApplyMessage(){
				let data={
					type:"02"
				}
				$api.myJobApplyMessage(data).then(res=>{
					this.list=res.data.rows.map(item=>{
						item.jobLabels=item.jobLabels.split(',')
						return item
					})
				})
			},
			// 切换投递记录
			changeMsg(e){
				if(e.detail.title=="职位邀请"){
					this.myJobApplyMessage()
				}else{
					this.myJobApplyList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.message{
		height:100%;
		background-color: #fff;
	}
	.tabs-list {
		// background-color: #fff;
		overflow-y: hidden;
	}
	.userList{
		background-color: white;
		overflow-y: auto;
		.imgNull{
			display: flex;
			justify-content: center;
		}
	}

</style>
