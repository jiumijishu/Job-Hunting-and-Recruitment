<template>
	<view class="enclosure">
		<view class="enc-style">
			<view class="" v-if="enclosure">
				<view class="" v-for="(item,index) in resumeList" :key="index">
					<view class="pdf">
						<view style="display: flex;"  @click="goResume(item.resumeUrl)">
							<image src="../../static/images/p.png" mode="aspectFit" style="width:32px;height:32px;">
								<view style="padding-left: 10px;">
									<view class="title">
										{{item.title}}
									</view>
									<view class="info">
										120kb | {{item.createTime}}
									</view>
								</view>
						</view>
						<view class="" @click="del(item.id)">
							<van-icon name="delete" size="30px" color="#9C9C9C" />
						</view>
					</view>
					<van-divider />
				</view>
			</view>
			<view class="image" v-else>
				<image src="https://yaoqizhipinoss.oss-cn-beijing.aliyuncs.com/wxchat/null.png" mode="aspectFit">
				</image>
			</view>
			<view class="button safe-margin" @click="up">
				从微信聊天中上传
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
				// 是否显示暂无数据
				enclosure: true,
				// 简历列表
				resumeList: []
			}
		},
		onShow() {
			this.getUserResumeList()
		},
		methods: {
			// 查询附件简历列表
			getUserResumeList() {
				// 上传成功之后刷线页面
				$api.getUserResumeList().then(res => {
					let list = res.data.data;
					if (list.length > 1) {
						this.enclosure = true
						for (let i = 0; i < list.length; i++) {
							if (list[i].title == '在线简历') {
								list.splice(i, 1)
							}
						}
						this.resumeList = list;
					} else {
						this.enclosure = false
					}
				})
			},
			// 上传文件
			up() {
				let that = this;
				if (that.resumeList.length >= 3) {
					uni.showToast({
						title: '最多上传3个附件，请删除后再上传',
			 		icon: "none",
						duration: 2000
					});
				} else {
					wx.chooseMessageFile({
						count: 1, //能选择文件的数量
			 		type: 'file', //能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
						extension: ['pdf', 'PDF'],
						success(res) {
			  		var size = res.tempFiles[0].size;
							var filename = res.tempFiles[0].name;
							var newfilename = filename + "";
							if (size > 4194304 || newfilename.indexOf(".pdf") == -
								1) { //这里限制了文件的大小和具体文件类型,如果不限制文件类型则去掉'|| newfilename.indexOf(".pdf") == -1'
								wx.showToast({
									title: '文件大小不能超过4MB,格式必须为pdf！',
									icon: "none",
									duration: 2000,
									mask: true
								})
							} else {
								let path = res.tempFiles[0].path
								let fileName = res.tempFiles[0].name
								let token = that.$store.state.token;
								wx.uploadFile({
									url: 'http://localhost:8576/api/noAuth/upload', //上传的路径
									filePath: path, //刚刚在data保存的文件路径
									name: 'file', //后台获取的凭据
									formData: {
										fileName
									},
									header: {
										'Authorization': 'Bearer ' + token,
									},
									success(resolve) {
										let url = JSON.parse(resolve.data).url
										let params = {
											title: fileName,
											resumeUrl: url
										}
										$api.addUserResumeFile(params).then(res => {
											if (res.data.code == "200") {
												wx.showToast({ //做个提示或者别的操作
													title: '上传成功',
													icon: "success",
													duration: 1000,
													mask: true,
												})
												that.getUserResumeList()
											}
										})
									}
								})
							}
						}
					})
				}
			},
			// 查看pdf文件
			goResume(path) {
				//打开pdf文件
				wx.showLoading({
					title: '加载中...',
				})
				wx.downloadFile({
					url: path,
					success: function(res) {
						const filePath = res.tempFilePath
						wx.openDocument({
							filePath: filePath,
							success: function(res) {
				 			wx.hideLoading()
							},
							fail: function(res) {

							},
						})
					}
				})
			},
			// 删除文件
			del(id) {
				let data = {
					id
				}
				let that = this;
				uni.showModal({
					title: '提示',
					content: '删除后没有办法恢复哦，确定要删除吗？',
					success: function(res) {
						if (res.confirm) {
							$api.removeUserResume(data).then(res => {
								if (res.data.code == 200) {
									wx.showToast({ //做个提示或者别的操作
										title: '删除成功',
										icon: "success",
										duration: 1000,
										mask: true,
									})
									that.getUserResumeList()
								}
							})
						} else if (res.cancel) {
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.enclosure {
		height: 100%;
		background-color: #fff;
	}

	.enc-style {
		padding: 20px 40rpx 0 40rpx;
	}

	.pdf {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.image {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.title {
		font-size: 18px;
		font-weight: 600;
		height: 36px;
	}

	.info {
		font-size: 16px;
		color: rgba(166, 166, 166, 1)
	}
</style>
