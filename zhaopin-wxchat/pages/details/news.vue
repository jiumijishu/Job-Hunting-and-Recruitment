<template>
	<view class="news">
		<view class="newsStyle">
			<view class="title">
				{{title}}
			</view>
			<view class="time">
				<view class="">
					{{createTime}}
				</view>
				<button open-type="share"  @click="shareInfo">
				<view class="icon">
					<van-icon name="share" size="16px" class="icons"/>
					分享
				</view>
				</button>
			</view>
			<rich-text :nodes="content"></rich-text>
		</view>

	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default{
		data(){
			return{
				// 查询详情的id
				id:-1,
				// 标题
				title:"",
				// 时间
				createTime:"",
				// 详情内容
				content:""
			}
		},
		onLoad(options) {
			this.id=options.id;
			this.getJobArticleInfo()
		},
		methods:{
			getJobArticleInfo(){
			// data问题
				let data={
					id:this.id
				}
				$api.getJobArticleInfo(data).then(res=>{
					this.title=res.data.data.title;
					this.createTime=res.data.data.createTime;
					this.content=res.data.data.content?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ')
				})
			},
			// 分享
			shareInfo(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 5,
					path: '/pages/details/news',
					summary: "我正在使用直通车，赶紧跟我一起来体验！",
					 miniProgram: {
					        id: 'gh_abcdefg',
					        path: 'pages/index/index',
					        type: 1,
					        webUrl: 'http://uniapp.dcloud.io'
					    },
					success: function (res) {

					},
					fail: function (err) {

					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news{
		height:100%;
		width:100%;
		padding-top:20px;
		background-color: #fff;
	}
	.newsStyle{
		padding:0 20px;
	}
	.title{
		font-size: 20px;
		font-weight: 600;
	}
	.time{
		    display: flex;
		    justify-content: space-between;
		    padding: 12px 0;
		    font-size: 16px;
		    color: #C1C1C1;
	}
	.icon{
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #C1C1C1;
	}
	::v-deep button::after{
		border:none
	}
	::v-deep button{
		height: 24px;
		line-height: 18px;
		margin:0;
		background-color:rgba(0,0,0,0);
		text-align: left;
		padding: 0;
		padding-right: 10px;
		padding-top: 2px;

	}
</style>
