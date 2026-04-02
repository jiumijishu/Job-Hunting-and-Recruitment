<template>
	<view class="certificate">
		<view class="cer-page">
			<van-cell-group>
				<view class="text">
					证书名称
				</view>
				<van-field class="input-class" :value="form.certificateName" placeholder="请输入证书名称" center="true"  @blur="eName"/>
				<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="text">
						获证时间
					</view>
					<van-field :value="form.inceptDate" placeholder="请选择日期" disabled center="true"/>
				</picker>
			</van-cell-group>
			<view style="display: flex;">
				
				<van-button v-show="delInfo" style="margin-top: 10px;" plain hairline round type="info"  @click="del(id)">删除</van-button>
				<view class="button safe-margin"  @click="save(id)">
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
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 控制删除按钮
				delInfo:false,
				form: {
					id:0,
					resumeId:this.$store.state.resumeId,
					certificateName: "",
					inceptDate: "",
					certificateImage:''
				},
				// 时间
				date: currentDate,
				fileList: [],
				// 头像是否展示删除按钮
				deletable: false,
				// 证书id 
				id:0
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onLoad(options) {
			if(options.id!=0){
				this.id=options.id;
				this.delInfo=true;
				this.form.id=options.id
				this.getResumeCertDetail()
			}
		},
		methods: {
			// 查询证书
			getResumeCertDetail(){
				let data={
					id:this.id
				}
				$api.getResumeCertDetail(data).then(res=>{
					this.form.certificateName=res.data.data.certificateName;
					this.form.inceptDate=res.data.data.inceptDate
				})
			},
			// 时间
			bindDateChange: function(e) {
				if (e) {
					this.form.inceptDate = e.detail.value
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 图片上传
			// afterRead(event) {
			// 	const vm = this
			// 	const {
			// 		file
			// 	} = event.detail;
			// 	let url = file.path;
			// 	// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			// 	wx.uploadFile({
			// 		url: 'http://8.140.136.170:8576/api/noAuth/upload', // 仅为示例，非真实的接口地址
			// 		filePath: url,
			// 		name: 'file',
			// 		formData: {
			// 			user: 'test'
			// 		},
			// 		header: {
			// 			'Authorization': 'Bearer ' + this.$store.state.token,
			// 		},
			// 		success(res) {
			// 			let url = JSON.parse(res.data)
			// 			vm.fileList = vm.fileList.concat({
			// 				url: url.url,
			// 				name: "头像"
			// 			})

			// 			console.log(vm.fileList)
			// 			vm.form.certificateImage=vm.fileList.url
			// 		},
			// 	});
			// },
			// 证书名称、
			eName(e){
				this.form.certificateName=e.detail.value
			},	
			//提示
			Tips(code){
				if(code==200){
					wx.showToast({
					    title: '操作成功！',  // 标题
					    icon: 'success',   // 图标类型，默认success
					    duration: 1500   // 提示窗停留时间，默认1500ms
					})
					setTimeout(()=>{
						uni.navigateBack({
							url:"/pages/myInfo/online-resume"
						})
														
					},1500)
				}
				
			},
			save(id){
				let params=this.form;
				if(id){
					$api.editResumeCertDetail(params).then(res=>{
						this.Tips(res.data.code)
						this.init()
					})
				}else{
					$api.addResumeCertDetail(params).then(res=>{
						this.Tips(res.data.code)
						this.init()
					})
				}
				
			},
			del(id){
				let data={
					id
				}
				$api.removeResumeCertDetail(data).then(res=>{
					this.Tips(res.data.code)
					this.init()
				})
			},
			init(){
				// 控制删除按钮
				this.delInfo=false;
				this.form= {
					id:0,
					resumeId:this.$store.state.resumeId,
					certificateName: "",
					inceptDate: "",
					certificateImage:''
				};
				
				this.fileList= [];
				// 头像是否展示删除按钮
				this.deletable= false;
				// 证书id 
				this.id=0;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.certificate {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}

	.cer-page {
		padding: 0 40rpx;
	}

	.text {
		width: 100px;
		height: 30px;
		font-size: 15px;
		line-height: 42px;
		// padding-left: 17px;
		color: rgba(128, 128, 128, 1);
	}

	/deep/.van-cell {
		padding: 16px 0;
	}

	/deep/.van-cell:after {
		left: 0;
	}
	/deep/ button{
		width: 100px;
		height: 40px;
		margin-right: 10px;
	}
</style>
