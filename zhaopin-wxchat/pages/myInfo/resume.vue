<template>
	<view class="resume">
		<view class="info">
			<!-- 导航 -->
			<van-nav-bar :title="title" left-text="返回" left-arrow fixed="true" placeholder="true" safe-area-inset-top
				@click-left="onClickLeft" />
			<view class="" v-if="title=='教育经历'">
				<!-- 教育经历 -->
				<view class="">
					<van-cell-group>
						<view class="text">
							学校名称
						</view>
						<van-field class="input-class" :value="form.schoolName" placeholder="请输入学校名称" center="true" @blur="eName()" />
						<picker @change="bindPickerChange" :value="index" :range="array">
							<view class="text">
								学历
							</view>
							<van-field :value="form.education" disabled placeholder="请输入学历" center="true" />
						</picker>
						<view class="text">
							专业
						</view>
						<van-field class="input-class" :value="form.major" placeholder="请输入专业名称" center="true" @blur="eMajor()" />
						
						<view class="text">
							在校时间
						</view>
						<view class="time">
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="startDateChange">

									<van-field :value="startDate" placeholder="请选择开始时间" disabled center="true" />
								</picker>
							</view>至
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="endDateChange">

									<van-field :value="endDate" input-align="center" placeholder="请选择结束时间" disabled
										center="true" />
								</picker>
							</view>
						</view>

						<view class="text">
							在校经历
						</view>
						<view class="">
							<textarea placeholder="个人优势" :value="cymsyq" maxlength=500 class="textarea" @input="inputNum">
							</textarea>
							<view style="text-align: right; margin-top:10px;color:#808080;">
								{{num}}/500
							</view>
						</view>
					</van-cell-group>
				</view>
			</view>
			
			<!-- 工作经验 -->
			<view class="" v-if="title=='工作/实习经历'">
				<view class="">
					<van-cell-group>
						<view class="text">
							{{title}}
						</view>
						<van-field class="input-class" :value="job.companyName" placeholder="请输入公司名称" center="true"  @blur="jName()"/>
					
							<view class="text">
								岗位名称
							</view>
							<van-field :value="job.postName"  placeholder="请输入岗位名称" center="true"  @blur="jEducation()"/>
					

						<view class="text">
							工作时间
						</view>
						<view class="time">
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="startDateChange">

									<van-field :value="startDate" placeholder="请选择开始时间" disabled center="true" />
								</picker>
							</view>至
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="endDateChange">

									<van-field :value="endDate" input-align="center" placeholder="请选择结束时间" disabled
										center="true" />
								</picker>
							</view>
						</view>

						<view class="text">
							{{title}}
						</view>
						<view class="">
							<textarea placeholder="请输入相关经验" :value="cymsyq" maxlength=-1 class="textarea" @input="inputNum">
							</textarea>
						</view>
					</van-cell-group>
				</view>
			</view>
			<!-- 项目经验 -->
			<view class="" v-if="title=='项目经验'">
				<view class="">
					<van-cell-group>
						<view class="text">
							{{title}}
						</view>
						<van-field class="input-class" :value="project.projectName" placeholder="请输入项目名称" center="true"  @blur="pName()"/>
						
						<view class="text">
							项目周期
						</view>
						<view class="time">
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="startDateChange">
			
									<van-field :value="startDate" placeholder="请选择开始时间" disabled center="true" />
								</picker>
							</view>至
							<view class="">
								<picker mode="date" :value="date" :start="start_date" :end="end_date"
									@change="endDateChange">
			
									<van-field :value="endDate" input-align="center" placeholder="请选择结束时间" disabled
										center="true" />
								</picker>
							</view>
						</view>
			
						<view class="text">
							项目内容
						</view>
						<view class="">
							<textarea placeholder="请输入相关项目内容" :value="cymsyq" maxlength=-1 class="textarea" @input="inputNum">
							</textarea>
						</view>
					</van-cell-group>
				</view>
			</view>
			
			<view style="display: flex;padding: 18px 0;">
				
				<van-button v-show="delInfo" style="margin-top: 10px;" plain hairline round type="info"  @click="del(title)">删除</van-button>
				<view class="button safe-margin"  @click="save(title,infoId)">
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
				delInfo:false,
				infoId:-1,
				title: "教育经历",
				// 教育表单
				endDate: "",
				startDate: "",
				form: {
					id:-1,
					resumeId:this.$store.state.resumeId,
					schoolName: "",
					// 学历
					education: "",
					// 经历
					experience: "",
					// 专业
					major:"",
					// 时间
					endDate: "",
					startDate: "",
				},
				// 工作表单
				job:{
					id:-1,
					resumeId:this.$store.state.resumeId,
					companyName:"",
					postName:"",
					startDate:'',
					endDate:'',
					workContent:'',
				},
				// 项目
				project:{
					id:-1,
					resumeId:this.$store.state.resumeId,
					projectName:"",
					startDate:'',
					endDate:'',
					projectContent:''
				},
				index: 0,
				array: ['小学', '初中', '中专/高中', '专科', '本科', '硕士研究生', '博士研究生'],
				date: currentDate,
				num: 0,
				// 教育经历内容
				cymsyq:''
			}
		},
		onLoad(options) {
			this.title = options.type;
			this.infoId=options.id;			
			if(this.infoId!="undefined"){
				this.delInfo=true;
				// 查询经历
				this.judge()
			}
		},
		computed: {
			start_date() {
				return this.getDate('start');
			},
			end_date() {
				return this.getDate('end');
			}
		},
		methods: {
			// 查询教育经历
			getResumeEducationDetail(){
				let data={
					id:this.infoId
				}
				$api.getResumeEducationDetail(data).then(res=>{
					this.form=res.data.data;
					this.cymsyq=res.data.data.experience;
					this.endDate=res.data.data.endDate;
					this.startDate=res.data.data.startDate;
				})
			},
			// 查询工作经历
			getUserExprienceDetail(){
				let data ={
					id:this.infoId
				}
				$api.getUserExprienceDetail(data).then(res=>{
					this.job=res.data.data;
					this.cymsyq=res.data.data.workContent ;
					this.endDate=res.data.data.endDate;
					this.startDate=res.data.data.startDate;
				})
			},
			// 查询项目经历
			getResumeProjectDetail(){
				let data ={
					id:this.infoId
				}
				$api.getResumeProjectDetail(data).then(res=>{
					this.project=res.data.data;
					this.cymsyq=res.data.data.projectContent;
					this.endDate=res.data.data.endDate;
					this.startDate=res.data.data.startDate;
				})
			},
			// 判断
			judge(){
				console.log(this.title)
				switch(this.title){
					case '教育经历':this.getResumeEducationDetail();break;
					case '工作/实习经历':this.getUserExprienceDetail();break;
					case '项目经验':this.getResumeProjectDetail();break;
				}
			},
			onClickLeft() {
				uni.navigateBack({
					delta: 1 // 返回上个页面
				})
			},
			// 教育
			bindPickerChange: function(e) {
				this.form.education = this.array[e.detail.value];

			},
			// 时间
			startDateChange: function(e) {
				if (e) {
					this.startDate = e.detail.value
				}
			},
			endDateChange: function(e) {
				if (e) {
					this.endDate = e.detail.value
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
			// 计算输入框剩余字数
			inputNum(e) {
				this.num = 500 - e.detail.cursor;
				switch (this.title){
					case '教育经历':this.form.experience = e.detail.value;break;
					case '工作/实习经历':this.job.workContent = e.detail.value;break;
					case '项目经验':this.project.projectContent = e.detail.value;break;
				}
			},
			// 教育
			eName(e){
				this.form.schoolName=e.detail.value
			},
			eEducation(e){
				this.form.education=e.detail.value
			},
			eMajor(e){
				this.form.major=e.detail.value
			},
			// 工作
			jName(e){
				this.job.companyName=e.detail.value
			},
			jEducation(e){
				this.job.postName=e.detail.value
			},
			// 项目
			pName(e){
				this.project.projectName=e.detail.value
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
			// 保存教育
			addResumeEducationDetail(params){
				if(this.infoId!='undefined'){
					$api.editResumeEducationDetail(params).then(res=>{
						this.Tips(res.data.code)
					})
				}else{
					$api.addResumeEducationDetail(params).then(res=>{
						this.Tips(res.data.code)
					})
				}
				
			},
			// 保存工作
			addUserExprience(params){
				
				if(this.infoId!='undefined'){
					$api.editUserExprience(params).then(res=>{
						this.Tips(res.data.code)
					})
				}else{
					$api.addUserExprience(params).then(res=>{
						this.Tips(res.data.code)
					})
				}
				
			},
			// 保存项目
			addResumeProject(params){
				
				if(this.infoId!='undefined'){
					$api.editResumeProject(params).then(res=>{
						this.Tips(res.data.code)
					})
				}else{
					$api.addResumeProject(params).then(res=>{
						this.Tips(res.data.code)
					})
				}
				
				
			},
			// 修改
			// 保存
			save(type,id){
				if(type=="教育经历"){
					this.form.startDate=this.startDate;
					this.form.endDate=this.endDate;
					this.form.id=this.infoId=="undefined"?"":this.infoId
					let params=this.form
						this.addResumeEducationDetail(params)
					
				}
				 if(type=="工作/实习经历"){
					 this.job.startDate=this.startDate;
					 this.job.endDate=this.endDate;
					 this.job.id=this.infoId=="undefined"?"":this.infoId
					 let params=this.job					
						this.addUserExprience(params)
					
				}
				if(type=="项目经验"){
					this.project.startDate=this.startDate;
					this.project.endDate=this.endDate;
					this.project.id=this.infoId=="undefined"?"":this.infoId
					let params=this.project					
						this.addResumeProject(params)
					
				}
				this.init()
			},
			
			del(type){
				let data={
					id:this.infoId
				}
				let flag=false
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: function (res) {
						if(type=="教育经历"){
							$api.removeResumeEducationDetail(data).then(res=>{
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
							})
						}
						if(type=="工作/实习经历"){
							$api.removeUserExprience(data).then(res=>{
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
							})
						}
						if(type=="项目经验"){
							$api.removeResumeProject(data).then(res=>{
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
							})
						}
					}
				});
			},
			delResume(data){
				if(type=="教育经历"){
					$api.editResumeEducationDetail(data).then(res=>{
						this.Tips(res.data.code)
					})
				}
				if(type=="工作/实习经历"){
					$api.removeUserExprience(data).then(res=>{
						this.Tips(res.data.code)
					})
				}
				if(type=="项目经验"){
					$api.removeResumeProject(data).then(res=>{
						this.Tips(res.data.code)
					})
				}
			},
			// 初始化
			init(){
				this.form={
					id:-1,
					resumeId:this.$store.state.resumeId,
					schoolName: "",
					// 学历
					education: "",
					// 经历
					experience: "",
					// 专业
					major:"",
					// 时间
					endDate: "",
					startDate: "",
				};
				this.job={
					id:-1,
					resumeId:this.$store.state.resumeId,
					companyName:"",
					postName:"",
					startDate:'',
					endDate:'',
					workContent:'',
				};
				this.project={
					id:-1,
					resumeId:this.$store.state.resumeId,
					projectName:"",
					startDate:'',
					endDate:'',
					projectContent:''
				};
			}
		}
	}
</script>

<style lang="scss" scoped>
	.resume {
		width: 100%;
		height: 100%;
		background-color: #fff;

		.info {
			padding: 0 40rpx;
			background-color:#fff;
		}
	}

	.text {
		width: 124px;
		height: 30px;
		font-size: 18px;
		line-height: 42px;
		// padding-left: 17px;
		color: rgba(128, 128, 128, 1);
	}

	/deep/.van-cell {
		height: 60px;
		padding: 10px 0;
	}

	.time {
		height: 60px;
		display: flex;
		align-items: center;
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

	/deep/ .van-field__input--disabled {
		color: black;
	}

	/deep/.van-cell:after {
		left: 0;
	}
	/deep/.van-cell__value{
		font-size: 16px;
	}
	/deep/ button{
		width: 100px;
		height: 40px;
		margin-right: 10px;
	}
</style>
