<template>
	<view class="">	
		<!-- 筛选 -->
		<view  class="condition">
			<view v-if="loading" class="showF">
				<van-loading size="24px" vertical>加载中...</van-loading>
			</view>
			<view v-else  class="content">				
					<view class="tags">
						<view class="title">
							公司规模
						</view>
					
						<view class="van-button">
							<view class="buttons" 
							@click="choice6(index,item.dictLabel)" 
							:class="item.default?'active-button':''"
							v-for="(item,index) in scale"
							:key="index">
							{{item.dictLabel}}
							</view>
							
						</view>
					</view>
					<view class="tags">
						<view class="title">
							主营行业
						</view>
					
						<view class="van-button">
							<view class="buttons" 
							@click="choice7(index,item.name)" 
							:class="comNum==index?'active-button':''"
							v-for="(item,index) in industry"
							:key="index">
							{{item.name}}
							</view>
							
						</view>
				</view>
			</view>
			<view class="save safe-margin">
				<van-button plain round type="info" @click="empty">清空条件</van-button>
				<view class="btn" @click="savea">
					保存
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default {
		data() {
			return {

				// 公司
				scale:[],
				comNum:-1,
				industry:[],
				loading:true,
				// 公司筛选
				comRequire:{
					// 公司规模
					scaleLabels:[],
					// 公司行业
					industry:""
				}
			}
		},
		onLoad(){

				this.queryCompanyFilterData()
			
			
		},
		methods: {
			// 获取公司搜索条件
			queryCompanyFilterData(){
				$api.queryCompanyFilterData().then(res=>{
						this.loading=false;
					this.scale=res.data.data[0].data;
					this.industry=res.data.data[1].data.map(item=>{
						item.default=false;
						return item
					})
				})
			},
			//筛选

			// 公司规模
			choice6(i,label){
				this.scale[i].default=true;
				
				if(this.scale[i].default){
					this.comRequire.scaleLabels=this.comRequire.scaleLabels.concat(label);
				}else{
					this.comRequire.scaleLabels.splice(this.comRequire.scaleLabels.indexOf(label));
				}
			},
			// 主营行业
			choice7(i,label){
				this.comNum=i;
				this.comRequire.industry=label
			},
			// 保存
			savea(){					
				wx.navigateBack({ //返回
						delta: 1
					});
				uni.$emit('comRequire',this.comRequire );
			},
			// 清空
			empty(){

					this.comRequire={
						// 公司规模
						scaleLabels:[],
						// 公司行业
						industry:""
					}
		
				wx.navigateBack({ //返回
						delta: 1
					});

				uni.$emit('comRequire',this.comRequire );
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.condition {
		width: 100%;
		height: 100%;
		padding-top: 40rpx;
		background-color: #fff;
		.showF{
			height:80px;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.content {
			background-color: #fff;
			padding: 0 40rpx;
			padding-bottom: 150px;
			.tags {
				min-height: 66px;
				
				.van-button {
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;
					// justify-content: space-between;
					.buttons{
						width:100px;
						height:48px;
						border:1px solid #F4F8F9;
						border-radius: 6px;
						font-size: 15px;
						background-color: #F4F8F9;
						color:black;
						display: flex;
						justify-content: center;
						align-items: center;
						margin-top:10px;
						margin-right: 6px;
					}
					.active-button{
						color:#4684FC;
						border:1px solid #4684FC;
						background-color: #F0F9FF;
					}
				}
			}

		}
	}
	.save{
		background-color: #fff;
		padding:0 40rpx;
		height:100px;
		z-index:1;
		display: flex;
		justify-content: space-between;
		position: fixed;
		bottom: -32px;
		
		.btn{
			width:226px;
			height:44px;
			margin-left: 16px;
			border-radius: 30px;
			background-color: #1473FA;
			display: flex;
			justify-content: center;
			align-items: center;
			color:white;
		}
	}
	.title{
		padding-top:10px;
	}
</style>
