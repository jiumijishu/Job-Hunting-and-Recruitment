<template>
	<view class="modifyIntention">
		<view class="modify">	
		<!-- 修改求职意向 -->
		<view class="modify-title">
			<view class="modift-g">
				管理求职意向
			</view>
			<view class="modift-num">
				（{{num}}/3）
			</view>
		</view>
		<view class="modift-info">
			我们会根据你的"求职意向"在找工作页展示合适的职位
		</view>

			<van-divider/>
		
		
		<view class="modift-list" v-for="(item,index) in modifyList" :key="index">
			<view class="">
				<view class="modify-name">
					{{item.typeName}}
				</view>
				<view class="modify-money">
					{{item.lowSalary}}-{{item.highSalary}} | {{item.workCity}}
				</view>
			</view>
			<view class="">
				<van-icon name="edit" size="52rpx" color="#4684FC" @click="addIntention(item.id)"/>
			</view>
		</view>
		
		<van-button type="primary" size="large" color="#4684FC" @click="addIntention(-1)">添加求职意向</van-button>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/resume.js').Api;
	export default{
		data(){
			return{
				modifyList:[],
				num:0,
			}
		},
		onShow() {
			this.getUserIntention()
		},
		methods:{
			getUserIntention(){
				$api.getUserIntention().then(res=>{
					this.modifyList=res.data.data
					this.num=res.data.data.length
					uni.$emit("Detail",this.modifyList)
				})
			},
			// 添加求职意向
			addIntention(id){
				if(id=="-1"){
					if(this.num>3){
						wx.showToast({
						    title: '最多添加3个求职意向，请删除后再上传',  // 标题
						    icon: "none",   // 图标类型，默认success
						    duration: 1500   // 提示窗停留时间，默认1500ms
						})
					}else{
						uni.navigateTo({
							url:`/pages/search/addIntention?id=${id}`
						})
					}
				}else{
					uni.navigateTo({
						url:`/pages/search/addIntention?id=${id}`
					})
				}
				
				
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	.modifyIntention{
		height:100%;
		width:100%;
		background-color: #fff;
		.modify{
			padding:0 40rpx;
			.modify-title{
				height:98rpx;
				display: flex;
				align-items: center;
				.modift-g{
					font-size: 48rpx;
					font-family: "黑体";
					font-weight: 600;
					
				}
				.modift-num{
					font-size: 28rpx;
					padding-left: 15rpx;
				}
			}
			.modift-info{
				font-size: 26rpx;
				color: rgba(128, 128, 128, 1);
			}
			.line{
				height:80rpx;
				display: flex;
				align-items: center;
			}
			.modift-list{
				height:120rpx;
				padding-bottom: 40rpx;
				display: flex;
				justify-content: space-between;
				.modify-name{
					font-size: 36rpx;
					height:50rpx;
					font-family: "黑体";
					font-weight: 500;
					
				}
				.modify-money{
					font-size: 27rpx;
					color: rgba(128, 128, 128, 1);
				}
			}
		}
		
	}
</style>