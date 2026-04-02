<template>
	<view class="index s-index">
		<view class="search">
			<!-- 搜索 -->
			<uni-search-bar
				v-model="value"
				radius="34"
				placeholder="搜职位/公司"
				cancelButton="always"
				@input="change"
			/>
			<!-- 搜索时显示相关内容 -->
			<view>
				<view class="searchInfo" v-for="(item,index) in search" :key="index" @tap="searchOne(item.name)">{{item.name}}</view>
			</view>
			<!-- 历史与推荐 -->
			<view class="s-style">
				<view class="history">
					<view>历史搜索</view>
					<view style="color: rgba(0, 0, 0, 0.3)" @tap="clearHistory">清除</view>
				</view>
				<view class="tags">
					<view
						class="tag" 
						color="#F5F5F7" size="large"
						text-color="#7A7A7B" 
						v-for="(item,index) in searchData" 
						@tap="historySearch(item.name)"
						:key="index"
					>{{item.name}}</view>
				</view>
			</view>
			<view class="h-style">
				<view>热门搜索</view>
				<view class="tags">
					<view class="tag" 
						color="#F5F5F7"
						size="large" 
						text-color="#7A7A7B"  
						v-for="(item,index) in hotData"
						@click="historySearch(item.name)"
						:key="index"
					 >{{item.name}}</view>
				</view>
			</view>
		</view>
		<view class="directories">
			<view class="c-style">
				<view style="width:280rpx;">
					<uni-segmented-control
						:current="current"
						:values="items"
						style-type="text"
						@clickItem="onChange"
					/>
					<post :list="postList" v-if="current === 0" />
					<company :comList="comList" v-if="current === 1" />
				</view>
				<view class="dir-style">
					<view>
						<picker mode="region" @change="bindRegionChange" :value="region">
							<view class="choose-item">地区</view>
						</picker>
					</view>
					<view @tap="screen">筛选</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const value = ref("")
const search = ref([]) // 联想职位
const searchData = ref([]) // 搜索记录
const hotData = ref([]) // 热门搜索
const current = ref(0)
const items = ref(['搜职位', '搜公司'])
const postList = ref([]) // 搜职位
const comList = ref([]) // 搜公司
const region = ref(['请选择省市区/县', '', ''])
const title = ref("搜职位")

const change = (e) => {}
const searchOne = (name) => {}
const clearHistory = () => {}
const historySearch = (name) => {}
const onChange = (event) => {
	if(event.currentIndex === 0){
		title.value = "搜职位"
	} else if(event.currentIndex === 1){
		title.value = "搜公司"
	}
}
const bindRegionChange = (e) => {}
const screen = () => {
	if(title.value == "搜职位"){
		uni.navigateTo({
			url:`/pages/search/screen`
		})
	}else{
		uni.navigateTo({
			url:`/pages/search/comScreen`
		})
	}
}
</script>

<style lang="scss" scoped>
.s-index {
	min-height: 800px;
	overflow-y: auto;
	background-color: #fff;
}

.s-style {
	padding: 10px 0;
	border-top: 1px solid #F2F2F2;
	border-bottom: 1px solid #F2F2F2;
}

.c-style {
	padding: 10px 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
}

.dir-style {

	display: flex;
	position: absolute;
	right:10px;
	top:22px;
	z-index:9;
	view {
		margin-right: 10px;
	}
}

.search {
	padding: 0 40rpx;

}

.h-style {
	padding-top: 50rpx;
}

.history {
	display: flex;
	justify-content: space-between;
}

.searchInfo {
	width: 100%;
	height: 110rpx;
	line-height: 110rpx;
	border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.tags{
	display: flex;
	flex-wrap: wrap;
}
.tag{
	font-size: 14px;
	height:24px;
	padding:3px 8px;
	border-radius: 2px;
	margin:4px 4px 0 0;
	background-color: #F5F5F7;
	color:#7A7A7B;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>