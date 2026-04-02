<template>
	<view class="information">

		<!-- 导航 -->
		<van-nav-bar :title="title" left-text="返回" left-arrow fixed="true" placeholder="true" safe-area-inset-top
			@click-left="onClickLeft" />
		<!-- 头像 -->
		<view class="" v-if="type">
			<view class="portrait">
				<text>头像</text>
				<view class="">
					<!-- 头像回显成功 -->
					<van-uploader :file-list="fileList" @after-read="afterRead"  max-count="1" :deletable='deletable' @delete="del"/>
					</view>
			</view>
			<!-- 表单 -->

			<view class="">
				<van-cell-group>
					<view class="text" >
						用户名
					</view>
					<van-field class="input-class":value="form.userName"  placeholder="请输入用户名"
						:error-message="errName" size="large" center="true" @blur="eName()" />
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" @cancel="eBir">
						<view class="text">
							出生日期
						</view>
						<van-field  :value="form.birthDate"  placeholder="请选择出生日期" disabled center="true" :error-message="errBir"
							/>
					</picker>
					<view class="text">
						手机号
					</view>
						 <van-field
						    :value="form.phonenumber"
							 placeholder="请授权手机号"
						    center
						    clearable
							:error-message="errPhone"
							 @blur="ePhone()"
						    use-button-slot
							@input="inputP"
						  >
						    <van-button slot="button" size="small" type="info" @getphonenumber="onGetPhoneNumber" open-type="getPhoneNumber" >
						      授权手机号
						    </van-button>
						  </van-field>
					<label class="radio">
							<view class="text">性别</view>
						<view class="radio-style">

							<view class="border">

								<van-radio-group :value="form.sex" @change="onChange" style="height: 100%; display: flex; align-items: center;">
									<van-radio name="0" checked-color="#4684FC">男</van-radio>
									<van-radio name="1" checked-color="#4684FC">女</van-radio>
								</van-radio-group>
							</view>
						</view>
					</label>
				</van-cell-group>
			</view>
		</view>
		<view class="" v-else>

			<view class="advantage">
				个人优势
			</view>
			<view class="proposal">
				写下你最擅长的事，展示你的特别支持，分享你在工作中取得成绩
			</view>
			<van-divider />
			<view class="">
				<textarea placeholder="个人优势" :value="text" maxlength=500 class="textarea" @input="inputNum">
				</textarea>
				<view style="text-align: right; margin-top:10px;color:#808080;" >
					{{num}}/500
				</view>
			</view>
		</view>
		<view class="button safe-margin" @click="save">
		保存
		</view>
	</view>
</template>

<script>
	// 接口
	const _api = require('../../api/my.js').Api;
	const $api = require('../../api/resume.js').Api;
	const api = require('../../api/login.js').Api;
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				// 简历id
				id:0,
				title: "",
				// 切换基本信息与个人优势
				type: true,
				form: {
					avatar:"",
					userName: "",
					phonenumber: "",
					// 出生日期
					birthDate: "",
					sex: "0",

				},
				errName: "",
				errPhone: "",
				errBir:"",
				// 时间
				date: currentDate,
				// 文件上传
				fileList: [],
				message: "",
				num:0,
				// 头像是否展示删除按钮
				deletable:true,
				// 个人优势
				text:""

			}

		},
		onLoad(option) {
			if (option.type == "基本信息") {
				this.type = true;
			} else {
				this.type = false;
			}
			this.title = option.type
			this.getUserResumeDetal()
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			// 获取用户在线简历
			getUserResumeDetal(){
				_api.getUserResumeDetal().then(res=>{
					let {
						phonenumber,
						avatar,
						userName,
						birthDate,
						sex,
						advantage,
						id
					}=res.data.data;
					this.fileList=[{
						url:avatar,
						name:""
					}];
					this.id=id
					if(avatar=="null"){
						this.form.avatar=""
						this.fileList=[]
					}else{
						this.form.avatar=avatar
					}
					if(userName=="微信用户"){
						this.form.userName=""
					}else{
						this.form.userName=userName
					}
					this.form.birthDate=birthDate
					this.form.sex=sex
					this.form.phonenumber=phonenumber
					this.text=advantage
				})
			},
			// 授权手机号
			onGetPhoneNumber(e) {
				let vm = this;
				let params = {
								code: e.detail.code,
							}
				api.getWxPhoneNumber(params).then(res => {
					let form={
						phone:res.data.data.phoneNumber
					}
					api.savePhone(form).then(res=>{
						if(res.data.code=="200"){
							vm.form.phonenumber=form.phone
								this.errPhone=""
						}

					})

				})
			},
			inputP(e){
				this.form.phonenumber=e.detail
				this.errPhone=""
			},
			onClickLeft() {
				uni.navigateBack({
					delta: 1 // 返回上个页面
				})
			},

			// 时间
			bindDateChange: function(e) {
				if (e) {
					this.form.birthDate = e.detail.value
					this.errBir=""
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
			// 性别
			onChange(e) {
				this.form.sex = e.detail
			},
			// 计算输入框剩余字数
			inputNum(e){
				this.num=500-e.detail.cursor;
				this.text=e.detail.value
			},

			// 文件上传
			  afterRead(event) {
				  const vm=this
			    const { file } = event.detail;
				let url=file.path
			    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			    wx.uploadFile({
			      url: 'http://localhost:8576/api/noAuth/upload', // 仅为示例，非真实的接口地址
			      filePath: url,
			      name: 'file',
			      formData: { user: 'test' },
				  header: {
				  	'Authorization': 'Bearer ' + this.$store.state.token,
				  },
			      success(res) {
					let url=JSON.parse(res.data)
					vm.fileList=vm.fileList.concat({url:url.url,name:"头像"})
					vm.form.avatar=url.url

			      },
			    });
			  },
			  // 删除图片
			  del(e){
				  this.fileList.splice(e.detail.index, 1)
				  this.form.avatar=""
			  },
			//表单验证
			eName(e){
				if(e.detail.value==""){
					this.errName="请输入用户名"
					return false
				}else{
					this.errName=""
					this.form.userName=e.detail.value
					return true
				}
			},
			eBir(){
				if(this.form.birthDate==""){
					this.errBir="请选择出生日期"
					return false
				}else{
					this.errBir=""
					return true
				}
			},
			ePhone(e){
				let value=e.detail.value
				let res=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				let tes=res.test(value)
				if(tes){
					this.errPhone=""
						this.form.phonenumber=e.detail.value
						return true
				}else{
					this.errPhone="请输入正确的手机号格式"
					return false
				}
			},
			// 添加个人信息表单验证
			formVerification(){
				let {
					userName,
					phonenumber,
					birthDate,
				}=this.form;
				let res=/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
				let tes=res.test(phonenumber);
				if(userName!=""&tes!=""&birthDate!=""){
					api.motifyUserInfo(this.form).then(res=>{
						if(res.data.code==200){
							uni.showToast({
								title: '保存成功',
								icon:"success",
								duration: 1000
							});
						wx.setStorageSync("userInfo",JSON.stringify(this.form));
							setTimeout(()=>{
								uni.redirectTo({
									url:"/pages/myInfo/online-resume"
								})

							},1000)
						}else{
							uni.showToast({
								title: "保存失败"
							});
						}

					})
				}else{
					uni.showToast({
						title: '请完善相关信息',
						icon:"none",
						duration: 1000
					});
				}
			},
			advantages(){
				let params={
					id:JSON.stringify(this.id) ,
					title:"在线简历",
					advantage:this.text,
					status:"02"
				}
				$api.editUserResume(params).then(res=>{
					if(res.data.code==200){
						uni.showToast({
							title: '保存成功',
							icon:"success",
							duration: 2000
						});
						setTimeout(()=>{
							uni.redirectTo({
								url:"/pages/myInfo/online-resume"
							})
						},1000)
					}
				})
			},
			// 保存
			save(){
				if(this.type){
					this.formVerification()
				}else{
					this.advantages()

				}

			},
			// 初始化
			init(){
				this.text=""
			}

		}
	}
</script>

<style lang="scss" scoped>
	.information {

		height: 100%;
		padding: 0 26rpx;
		background-color: white;
	}

	.portrait {
		height: 100px;
		padding-left: 16px;
		padding-top: 10px;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.radio {
		width: 100%;
		background-color: white;

		.radio-style {
			height: 55px;
			background-color: #fff;
			padding: 0 16px;

			.border {
				height: 48px;
				font-size: 15px;
				background-color: white;
				position: relative;

			}


		}
	}
	.text {
		    width: 90px;
		    height: 30px;
			font-size: 15px;
		    line-height: 42px;
		    padding-left: 17px;
			color:rgba(128, 128, 128, 1);
	}

	.text::before {
		content: "*";
		position: absolute;
		color: var(--cell-required-color, #ee0a24);
		left: 8px;
		font-size: var(--cell-font-size, 14px);
	}

	/deep/.van-cell {
		height: 60px;
	}
	.advantage{
		font-size: 20px;
		font-weight: 600;
		height:56px;
		line-height: 66px;
	}
	.proposal{
		font-size: 13px;
		width:94%;
		color:#808080;
	}
	.textarea {
		border-radius: 10px;
		width: 100%;
		height: 240px;
		background-color: #F7F8FA;
		position: relative;
		box-sizing: border-box;
		padding:16px;
	}
	/deep/.van-cell{
		height:55px;
	}
	/deep/ .van-field__input--disabled {
		color: black;
	}
</style>
