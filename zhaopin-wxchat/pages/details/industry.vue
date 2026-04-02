<template>
	<view class="industry">
		<van-nav-bar :title="'行业介绍'" left-text="返回" left-arrow @click-left="onClickLeft" />
		<view class="ind-style">
			<view class="title-style">
				{{title}}
			</view>
			<view class="">
				<rich-text :nodes="introduce"></rich-text>
			</view>
			<view class="title-style">
				对口专业
			</view>
			<view class="">
			{{profession}}
			</view>
			<van-divider />
			<view class="title-style">
				推荐企业
			</view>
		</view>
		<view v-if="flag" class="safe-margin">
			<company  :comList="comList"></company>
		</view>
	</view>
</template>

<script>
	// 组件
	import company from "@/components/list/company.vue"
	// 接口
	const $api = require('../../api/home.js').Api;
	export default {
		components: {
			company
		},
		data() {
			return {
				title: "",
				// 行业id
				id: 0,
				// 行业介绍
				introduce: "",
				// 对口专业
				profession:'',
				// 相关公司
				comList:[],
				flag:false
			}
		},
		onLoad(options) {
			this.id = options.id
			this.queryIndustryDetail()
		},
		methods: {
			// 返回
			onClickLeft(){
				uni.navigateBack({
					delta: 1
				});
			},
			queryIndustryDetail() {
				let data = {
					id: this.id
				}
				$api.queryIndustryDetail(data).then(res => {
					this.title=res.data.data.name;
					this.introduce = res.data.data.introduction?.replace(/\<img/gi, '< img style="max-width:100%;height:auto;margin:10px 0" ');
					this.comList=res.data.data.companyList;
					this.profession=res.data.data.profession
					this.flag=true
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.industry {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
	.ind-style{
		padding:0 40rpx;
	}
	.title-style {
		font-weight: 600;
		margin:10px 0;
	}
</style>
