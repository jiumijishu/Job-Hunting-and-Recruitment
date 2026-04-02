<template>
	<view class="online">

		<view class="resume">

			<!-- 基本信息 -->
			<view class="info">
				<view class="userInfo">
					<van-image round fit="cover" width="70" height="70" :src="userResume.avatar" />
					<view class="user">
						<view class="name">
							{{userResume.userName}}
						</view>
						<view class="age">
							{{userResume.sex==0?"男":"女"}} · {{userResume.age}}岁
						</view>
					</view>

				</view>
				<view class="">
					<van-icon name="more-o" size="54rpx" color="#4983FD" @click="information('基本信息')"/>
				</view>
			</view>
			<van-divider />


			<!-- 个人优势 -->
			<view class="adv">
				<view class="title-style">
					<view class="text">
						个人优势
					</view>
					<view class="">
						<van-icon name="more-o" size="54rpx" color="#4983FD" @click="information('个人优势')" />
					</view>
				</view>
				<view class="advantage">
					{{userResume.advantage}}
				</view>
			</view>
			<van-divider />


			<!-- 教育经历 -->
			<view class="">
				<view class="">
					<view class="title-style">
						<view class="text">
							教育经历
						</view>
						<view class="">
							<van-icon name="add-o" size="54rpx" color="#4983FD" @click="experience('教育经历')"/>
						</view>
					</view>
					<view class="" v-for="(item,index) in userResume.educationList" :key="index">
						<view style="height:24rpx;">
							
						</view>
						<view class="school" @click="experience('教育经历',item.id)">
							<view class="" style="font-size: 34rpx;color:black;font-weight: 600;">
								{{item.schoolName}}
							</view>
							<view class="">
								<van-icon name="arrow" size="40rpx" color="#9B9C9E" />
							</view>
						
						</view>
						<view class="school size">
							{{item.education}} | {{item.major}}
						</view>
						<view class="school size">
							{{item.startDate}} ~ {{item.endDate}}
						</view>
						<view class="advantage">
							{{item.experience}}
							</view>
					</view>
					
				</view>
				<van-divider />
			</view>
			<!-- 工作/实习经历 -->
			<view class="">
				<view class="">	
					<view class="title-style">
						<view class="text">
							工作/实习经历
						</view>
						<view class="">
							<van-icon name="add-o" size="54rpx" color="#4983FD"   @click="experience('工作/实习经历')"/>
						</view>
					</view>
					<view class=""  v-for="(item,index) in userResume.experienceList" :key="index">
						<view style="height:24rpx;">
							
						</view>
						<view class="school"  @click="experience('工作/实习经历',item.id)">
							<view class="" style="font-size: 34rpx;color:black;font-weight: 600;">
								{{item.companyName}}
							</view>
							<view class="">
								<van-icon name="arrow" size="40rpx" color="#9B9C9E"/>
							</view>
						
						</view>
						<view class="school size">
							{{item.postName}}
						</view>
						<view class="school size">
							{{item.startDate}} ~ {{item.endDate}}
						</view>
						<view class="advantage">
							{{item.workContent}}
							</view>
					</view>
				</view>
				<van-divider />
			</view>
			<!-- 项目经验 -->
			<view class="">
				<view class="" >			
					<view class="title-style">
						<view class="text">
							项目经验
						</view>
						<view class="">
							<van-icon name="add-o" size="54rpx" color="#4983FD"  @click="experience('项目经验')"/>
						</view>
					</view>
					<view class="" v-for="(item,index) in userResume.projectList" :key="index">
						<view style="height:24rpx;"></view>
						<view class="school"  @click="experience('项目经验',item.id)">
							<view class="" style="font-size: 34rpx;color:black;font-weight: 600;">
								{{item.projectName}}
							</view>
							<view class="">
								<van-icon name="arrow" size="40rpx" color="#9B9C9E" />
							</view>
						
						</view>
					
						<view class="school size">
							{{item.startDate}} ~ {{item.endDate}}
						</view>
						<view class="advantage">
							{{item.projectContent}}
								</view>
					</view>
				</view>
				<van-divider />
			</view>
			<!-- 职业技能证书 -->
			<view class="">
				<view class="title-style">
					<view class="text">
						职业技能证书
					</view>
					<view class="">
						<van-icon name="add-o" size="54rpx" color="#4983FD" @click="certificate(0)"/>
					</view>
				</view>
				<view class="certificate" v-for="(item,index) in userResume.certList" :key="index">
					<view class="school" @click="certificate(item.id)">
						<view class="" style="font-size: 34rpx;color:black;">
							{{item.certificateName}}
						</view>
						<view class="">
							<van-icon name="arrow" size="40rpx" color="#9B9C9E" />
						</view>							
					</view>
					<view class="time">
						{{item.inceptDate}}
					</view>
				</view>
			</view>
			

		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/my.js').Api;
	const api = require('../../api/resume.js').Api;
	export default{
		data(){
			return {
				userResume:{},
				// 简历id 
				id:0,
			}
		},
		onShow() {
			this.getUserResumeDetal()
		},
		methods:{
			// 获取用户在线简历
			getUserResumeDetal(){
				$api.getUserResumeDetal().then(res=>{
					this.$store.state.resumeId=res.data.data.id;
					this.id=res.data.data.id;
					this.userResume=res.data.data;
				})
			},
			// 获取教育列表
			
			// 基本信息
			information(type){
				uni.navigateTo({
					url:`info?type=${type}`
				})
			},
			// 经历
			experience(type,id){
				
				uni.navigateTo({
					url:`resume?type=${type}&id=${id}`
				})
			},
			//技能证书 
			certificate(id){
				uni.navigateTo({
					url:`certificate?id=${id}`
				})
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.online {
		width: 100%;
		height:auto;
		background-color: #fff;

		.resume {
			padding: 40rpx;

			.info {
				display: flex;
				justify-content: space-between;
				align-items: center;

				.userInfo {
					display: flex;
					align-items: center;

					.user {
						height: 116rpx;
						display: flex;
						padding-left: 20rpx;
						flex-direction: column;
						justify-content: space-between;

						.name {
							font-size: 46rpx;
							  overflow: hidden;
							   text-overflow: ellipsis;
							  width: 186px;
							
						}

						.age {
							font-size: 30rpx;
							color: #949494;
						}
					}
				}
			}
			.adv{
				// height:230rpx;
			}

			.title-style {
				height: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;


			}

			.advantage {
				font-size: 32rpx;
				width: 100%;
				max-height: 88rpx;
				margin-top:20rpx;
				color: #949494;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;

			}

			.text {
				font-size: 42rpx;
				color: black;
			}
			.certificate{
				height:122rpx;
				.time{
					font-size: 30rpx;
				}
			}
			.school{
				height:62rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
			}
			.size{
				font-size: 30rpx;
			}
		
		}
	}
</style>
