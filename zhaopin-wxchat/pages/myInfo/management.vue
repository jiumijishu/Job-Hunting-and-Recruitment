<template>
	<view class="">

		<view class="list" v-for="(item,index) in list" :key="index" @click="click(item.text1)">
			<view class="">
				{{item.text1}}
			</view>
			<view class="list-style">
				<view>{{item.text2}}</view>
					<van-icon name="arrow" />			
			</view>			
		</view>
		<van-popup :show="show" @close="onClose"  round position="bottom"  closeable>
			<van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
			<van-radio-group class="radioGroup" v-else :value="radio"   @change="onChange" >
				<view class="chose">
					请选择简历
				</view>
			  <van-radio class="radio"  v-for="(item,index) in resumeList" :key="index" :name="item.id">{{item.title}}</van-radio>			  
			</van-radio-group>
			
		</van-popup>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/resume.js').Api;
	export default{
		data(){
			return {
				list:[
					{
						text1:"在线简历",
						text2:""
					},
					{
						text1:"附件简历",
						text2:"去上传"
					},
					{
						text1:"选择默认投递简历",
						text2:""
					}
				],
				show:false,
				resumeList:[],
				loading:true,
				radio:1
			}
		},
		onShow() {
			this.init();
			$api.getUserResumeList().then(res=>{
				this.loading=false
				let lists=res.data.data;				
					this.resumeList=lists;
				for(let i = 0; i <lists.length; i++){
					if(lists[i].defaultFlag=='Y'){				
						this.radio=lists[i].id
					}
				}
		})},
		methods:{
			click(text1){
			
				if(text1=="在线简历"){
					uni.navigateTo({
						url: "/pages/myInfo/online-resume",
						
					});
				}
				 if(text1=="附件简历"){
					uni.navigateTo({
						url: "/pages/myInfo/resume-attachment",
						
					});
				}
				if(text1=="选择默认投递简历"){
					this.show=true;	
				}
			},
			 onChange(event) {
			      this.radio=event.detail
				  let data={
					  id:event.detail
				  }
			 $api.setUserResumeDefault(data).then(res=>{
				  this.show=false;
				  this.$store.state.resumeId= this.radio
				 wx.showToast({  
				  title: '设置成功',
				  icon: "success",
				  duration: 1500,
				  mask: true,
				 })
			 })
			  },
			  onClose(){
				  this.show=false;
			  },
			  
			init(){
				this.loading=false
				this.show=false
				this.resumeList=[]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.list{
		height:100rpx;
		font-size: 34rpx;
		padding:0 40rpx;
		border-top:10px solid #F7F6F9;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.list-style{
			display: flex;
			align-items: center;
			color:#AFB0B2;
		}
	}
	.radioGroup{
		padding:20px 10px;
	}
	.chose{
		font-size: 24px;
		height:50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/deep/.van-radio{
		height:50px;
		border:1px solid #EAEBED;
		padding:0 10px;
		margin:10px 14px;
		border-radius: 6px;
	}
</style>