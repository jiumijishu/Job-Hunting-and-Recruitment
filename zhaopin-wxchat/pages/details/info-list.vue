<template>
	<view class="information">
	<view class=""v-for="(item,index) in list" :key="index">
		<view class="info-list"  @click="info(item.id)" >
			<view class="info-text">
				<view class="info-title">
					{{item.title}}
				</view>
				<view class="info-from">
					{{item.typeName}} · {{item.createTime}}
				</view>
			</view>
			<view class="image">
				 <image style="width: 100%; height:100%; " mode="aspectFill" :src="item.coverImage"
				   ></image>
			</view>
		</view>
		<van-divider />
	</view>
	</view>
</template>

<script scoped>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default{
		data(){
			return{
				list:[]
			}
		},
		onLoad() {
			this.getJobArticleList()
		},
		methods:{
			// 跳转到资讯详情
			info(id){
				uni.navigateTo({
					url: `/pages/details/news?id=${id}`
				})
			},
			// 获取资讯列表
			getJobArticleList(){
				$api.getJobArticleList().then(res=>{
					this.list=res.data.rows.map(item=>{
						item.createTime=item.createTime.slice(5, 10)
						return item
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.information{
		width:100%;
		height:100%;
		background-color: white;
		padding-top:20rpx;
			
			.info-list{
				height:160rpx;
				padding:0 40rpx;
				display: flex;
				justify-content: space-between;
				.info-text{
					flex:1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					.info-title{
						padding-right: 20px;
						max-height:50px;
						line-height: 25px;
						font-weight: 600;
						
						color:#393939;
						 display:-webkit-box;
						   overflow:hidden;
						   text-overflow:ellipsis;
						   -webkit-line-clamp:2;
						   -webkit-box-orient:vertical;
					}
					.info-from{
						font-size: 28rpx;
					}
				}
				.image{
					width:160rpx;
					height:160rpx;
					border-radius: 16rpx;
					overflow: hidden;
				}
			}

	}
</style>