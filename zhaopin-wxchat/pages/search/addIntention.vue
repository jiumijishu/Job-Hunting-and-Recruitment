<template>
	<view class="addIntention">
		<view class="add">
			<view class="">
				<view class="expect">
					期望职位
				</view>
				<view class="ex-input" @click="choice1()">
					<view class="" :style="{'color':form.typeName!=''?'black':'#9C9D9F'}">
						{{form.typeName?form.typeName:"请选择"}}
					</view>
					<view class="">
						<van-icon color="#9C9D9F" name="arrow" />
					</view>
				</view>
			</view>
			<view class="">
				
				<view class="expect">
					期望工作地点
				</view>
				<picker mode="region" @change="bindRegionChange" :value="region" >
				<view class="ex-input">
					<view>
						
						     <view  :style="{'color':city!=''?'black':'#9C9D9F'}">
						      {{city?city:'请选择'}}
						    </view>
							
						  
					</view>
					<view class="">
						<van-icon color="#9C9D9F" name="arrow" />
					</view>
				</view>
				</picker>
			</view>
			<view class="">
				<view class="expect">
					期望薪资
				</view>
				<picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="dbindex" :range="dbArray">
				<view class="ex-input">
					
					<view class="">
						
						       <view  :style="{'color':salary!=''?'black':'#9C9D9F'}">
						       	  {{salary?salary:'请选择最低期望薪资'}}
						       </view>
						
					</view>
					<view class="">
						<van-icon color="#9C9D9F" name="arrow" />
					</view>
				</view>
				</picker>
				
			</view>
			<view style="display: flex;">
				
				<van-button v-show="delInfo" style="margin-top: 10px;" plain hairline round type="info"  @click="del()">删除</van-button>
				<view class="button safe-margin"  @click="save()">
					保存
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/resume.js').Api;
	export default {
		data() {
			return {
				// 求职意向id 
				id:-1,
				delInfo:false,
				// 工作地点
				city: "",
				// 期望薪资
				salary: "",
				 region: ['请选择省市区/县', '', ''],
				 //薪资范围选择
				 dbArray: [
				   ['0'],
				   ['0']
				 ],
				 dbindex: [
				   [0],
				   [0]
				 ],
				 salaryOut: ["", ""],
				 form:{
					 id:0,
					 // 岗位编码
					typeId:'',
					typeName:'',
					province:'',
					workCity:'',
					workDistrict:'',
					lowSalary:0,
					highSalary:0,
				 },
				 
			}
		},
		onLoad(options) {
			// 修改id
			this.id=options.id	
			if(this.id!=-1){
				this.delInfo=true;
				this.getIntentionDetail()
			}
			uni.$on('add',(res) =>{
				// 期望职位		
					this.form.typeName=res.text;
					this.form.typeId=res.id;	
				
			      })
		 
			 let arr = ['0k']		
			 let arr1=['1k']
			    for (let i = 1; i < 26; i++) {
			      arr[i] = i + "K"		
					  arr1[i] =(i+1 ) + "K"		
			    }
			 this.dbArray[0] = arr
			  this.dbArray[1] = arr1
		},
				
		//页面卸载
			onUnload() {
				//关闭监听
			uni.$off('add',()=>{
				console.log('关闭监听');
			})
		
		},
		methods: {
			// 修改时查询求职详情
			getIntentionDetail(){
				let data={
					id:this.id
				}
				$api.getIntentionDetail(data).then(res=>{
					this.form.id=res.data.data.id
					this.form.typeId=res.data.data.typeId;
					this.form.typeName=res.data.data.typeName;
					this.form.province=res.data.data.province;
					this.form.workCity=res.data.data.workCity;
					this.form.lowSalary=res.data.data.lowSalary;
					this.form.highSalary=res.data.data.highSalary;
					this.city=res.data.data.province + res.data.data.workCity
					this.salary=`${res.data.data.lowSalary/1000}k-${res.data.data.highSalary/1000}k`
				})
			},
			choice1(){
				uni.navigateTo({
					url: `/pages/search/index`
				})
			},
			// 选择城市
			bindRegionChange (e) {
			    this.region=e.detail.value
				this.city=e.detail.value.toString()
				this.form.province=this.region[0];
				this.form.workCity=this.region[1]
				this.form.workDistrict=this.region[2]
			},
			  //薪资选择框确认
			  bindMultiPickerChange: function (e) {		
					 this.salary=`${e.detail.value[0]+'k'} - ${e.detail.value[1]+1+'k'}`			 
					this.form.lowSalary=e.detail.value[0]*1000;
					this.form.highSalary=(e.detail.value[1]+1)*1000;				
			  },
			  //薪资选择框滚动
			 bindMultiPickerColumnChange: function (e) {
			  },
			  // 新增就业意向
			  addIntentionDetail(){
				  $api.addIntentionDetail(this.form).then(res=>{
				  	wx.showToast({
				  	    title: '操作成功！',  // 标题
				  	    icon: 'success',   // 图标类型，默认success
				  	    duration: 1500   // 提示窗停留时间，默认1500ms
				  	})
				  	setTimeout(()=>{
				  		uni.navigateBack({
				  			 delta: 1
				  		})		
				  	},1500)
				  })
			  },
			  // 修改就业意向
			  editIntentionDetail(){
				  $api.editIntentionDetail(this.form).then(res=>{
				  	wx.showToast({
				  	    title: '操作成功！',  // 标题
				  	    icon: 'success',   // 图标类型，默认success
				  	    duration: 1500   // 提示窗停留时间，默认1500ms
				  	})
				  	setTimeout(()=>{
				  		uni.navigateBack({
				  			 delta: 1
				  		})
				  										
				  	},1500)
				  })
			  },
			  save(){
				if(this.id!=-1){
					this.editIntentionDetail()
				}else{
					this.addIntentionDetail()
				}
				
			  },
			  del(){
				let that=this
				  uni.showModal({
				  	title: '提示',
				  	content: '是否确认删除',
				  	success: function () {
				  	let data={
				  		id:that.id
				  	}
				  			$api.removeIntentionDetail(data).then(res=>{
				  				wx.showToast({
				  				    title: '操作成功！',  // 标题
				  				    icon: 'success',   // 图标类型，默认success
				  				    duration: 1500   // 提示窗停留时间，默认1500ms
				  				})
				  				setTimeout(()=>{
				  					uni.navigateBack({
				  						 delta: 1
				  					})			
				  				},1500)
				  			})
				  	}
				  });
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.addIntention {
		height: 100%;
		width: 100%;
		background-color: #fff;

		.add {
			padding: 0 40rpx;

			.expect {
				font-size: 26rpx;
				color: #A0A0A0;
				padding-top :38rpx;
			}

			.ex-input {
				height: 100rpx;
				width: 100%;
				color:#9B9B9B;
				border-bottom:1px solid #E9EEF2;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		
		}
	}
	/deep/ button{
		width: 100px;
		height: 40px;
		margin-right: 10px;
	}
</style>
