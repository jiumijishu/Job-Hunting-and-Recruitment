<template>
	<view class="opinion">
		<view class="">
			<view class="problem">
				<view class="title">
					问题反馈类型
				</view>
				<view class="choice">
					<van-button plain :type="No==index?'info':'default'" :icon="No==index?'success':''" @click="choice(index,item.name)" v-for="(item,index) in opinion" :key="index">{{item.name}}</van-button>
				</view>
				<view style="position: relative;">
					<textarea placeholder="选择问题类型,并填写5字以上的反馈,我们将尽快解决" placeholder-style="font-size:26rpx;" maxlength=500 class="textarea" @input="inputNum">
					</textarea>
					<view class="words" >
						{{num}}/500
					</view>
				</view>
			</view>
			<view class="">
				<van-cell-group>
				  <van-field
				   label="手机号"
				    :value=" phone"
				    placeholder="请输入手机号"
				    border="false"
				    @change="onChange"
				  />
				</van-cell-group>
			</view>
			<view style="padding:0 40rpx;">
				<view class="button safe-margin"  style="width: 89%;" @click="save()">
				提交
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/my.js').Api;
	export default{
		data(){
			return {
				No:3,
				opinion:[
				{
					name:"功能异常",
					flag:false
				},
				{
					name:"优化建议",
					flag:false
				},
				{
					name:"其他反馈",
					flag:false
				}
				],
				
				// 按钮样式
				type:"default",
				// 按钮图标
				icon:"star-o",
				num:0,
				phone:"",
				// 提交数据
				form:{
					type:"",
					content:"",
					phone:""
				}
				
			}
		},
		methods:{
			choice(i,name){
				this.No=i
				this.form.type=name
			},
			// 计算输入框剩余字数
			inputNum(e) {
				this.form.content = e.detail.value;
				this.num = 500 - e.detail.cursor;
			
			},
			  onChange(event) {
					this.form.phone = event.detail;
			  },
			  save(){
				  let params=this.form
				$api.feedBack(params).then(res=>{
					wx.showToast({   //做个提示或者别的操作
					 title: '反馈成功',
					 icon: "success",
					 duration: 1500,
					 mask: true,
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				})
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.opinion{
		height:100%;
		width: 100%;
	
	}
	.problem{
		padding:0 40rpx;
		margin:10px 0;
		height:378px;
		background-color: #fff;
	}
	.opi-style{
		padding:0 40rpx;
		
	}
	.title{
		height:40px;
		line-height: 48px;
		font-size: 14px;
	}
	.choice{
		display: flex;
		justify-content: space-between;
		padding-top:10px;
	}
	
	.textarea {
		border-radius: 10px;
		width: 100%;
		height: 240px;
		margin-top: 20px;
		background-color: #F7F8FA;
		position: relative;
		box-sizing: border-box;
		padding: 16px;
	}
	.words{
		text-align: right;
		 margin-top:10px;
		 color:#808080; 
		 position: absolute;
		 bottom: 10px;
		 right:10px;
	}
</style>