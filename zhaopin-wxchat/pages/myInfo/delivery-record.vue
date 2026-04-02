
<template>
	<!-- 消息 -->
	<view class="message">
				<van-tabs  :active="active" type="line"  @change="onChange()">					
					<van-tab v-for="(item,index) in lists" :key="index" :title="item.title" :name="item.type">
						<view class="userList">
								<post :list="list"></post>
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
		methods:{
			// 岗位列表
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
	}
	::v-deep .van-tabs__line{
		// left:6px;
		background-color: #4684FC;
	}
</style>
