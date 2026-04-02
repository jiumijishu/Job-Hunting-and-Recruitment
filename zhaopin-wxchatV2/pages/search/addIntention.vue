<template>
	<view class="addIntention">
		<view class="add">
			<view>
				<view class="expect">期望职位</view>
				<view class="ex-input" @tap="choice1">
					<view :style="{'color':form.typeName !='' ? 'black' : '#9C9D9F'}">{{form.typeName ? form.typeName : "请选择"}}</view>
					<view>
						<uni-icons type="right" size="16" color="#9C9D9F" />
					</view>
				</view>
			</view>
			<view>
				<view class="expect">期望工作地点</view>
				<picker mode="region" @change="bindRegionChange" :value="region" >
				<view class="ex-input">
					<view>
						<view :style="{'color': city != '' ? 'black' : '#9C9D9F'}">{{city ? city : '请选择'}}</view>
					</view>
					<view>
						<uni-icons type="right" size="16" color="#9C9D9F" />
					</view>
				</view>
				</picker>
			</view>
			<view>
				<view class="expect">期望薪资</view>
				<picker mode="multiSelector" @change="bindMultiPickerChange" @columnchange="bindMultiPickerColumnChange" :value="dbindex" :range="dbArray">
				<view class="ex-input">
					<view>
						<view :style="{'color':salary !='' ? 'black' : '#9C9D9F'}">{{salary ? salary : '请选择最低期望薪资'}}</view>
					</view>
					<view>
						<uni-icons type="right" size="16" color="#9C9D9F" />
					</view>
				</view>
				</picker>
			</view>
			<view style="display: flex;">
				<view class="del-btn" v-show="delInfo" @tap="del">删除</view>
				<view class="button safe-margin" @tap="save">保存</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from "vue"

const form = ref({
	id:0,
	typeId:'', // 岗位编码
	typeName:'',
	province:'',
	workCity:'',
	workDistrict:'',
	lowSalary:0,
	highSalary:0
})
const region = ref(['请选择省市区/县', '', ''])
const city = ref("") // 工作地点
const dbindex = ref([[0], [0]])
const dbArray = ref([['0'], ['0']])
const salary = ref("")
const delInfo = ref(false)

const choice1 = () => {
	uni.navigateTo({
		url: `/pages/search/index`
	})
}
const bindRegionChange = (e) => {}
const bindMultiPickerChange = (e) => {}
const bindMultiPickerColumnChange = (e) => {}
const del = () => {}
const save = () => {}
</script>

<style lang="scss" scoped>
.addIntention {
	height: 100vh;
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

.del-btn{
	width: 100px;
	height: 40px;
	line-height: 38px;
	font-size: 28rpx;
	color: #1989fa;
	border: 1px solid #1989fa;
	text-align: center;
	border-radius: 999px;
	margin-top: 10px;
	margin-right: 10px;
}
</style>