<template>
	<!-- 地图 -->
	<view class="map-info safe-padding">
		<view class="map safe-margin">
			<!-- 地图 -->
			<map style="width:100%;height:100%;" :latitude="latitude" :longitude="longitude" :scale="scale"
				:markers="marker" @markertap="toMap()">
				<!--此处踩坑问题1：
						@markertap 是点击地图上的标记点时 触发打开地图。
						@tap 是点击地图整体的时候 触发打开地图。
						-->
			</map>
		
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				latitude: 0, //纬度
				longitude:0, //经度
				marker: [{
					id: 0,
					latitude: 0, //纬度
					longitude: 0, //经度
					title: '0', //标注点名
					alpha: 1, //透明度
				}],
				scale: 14, //地图缩放程度
				address: ''
	
			}
		},
		onLoad(options) {
			let info=JSON.parse(options.info)
			this.latitude=info.latitude;
			this.longitude=info.longitude;
			this.marker[0].latitude=info.latitude;
			this.marker[0].longitude=info.longitude;
			this.marker[0].id=Number(info.id) ;
			this.marker[0].title=info.city+info.address;
			this.address=info.city+info.address
		},
		methods: {
			//点击地图上的标记，打开手机内置地图
			toMap() {
				uni.openLocation({
					latitude: Number(this.latitude), //要去的纬度-地址
					longitude: Number(this.longitude), //要去的经度-地址
					address: this.address, //要去的具体地址	
					//此处踩坑的问题2：
					//latitude 和 longitude的值一定要是number类型。
					//所以传递的时候需要使用Number将其转换一下。
				})
			}
	
		}
	}
</script>

<style lang="scss" scoped>
	.map-info{
		.map {
			height: 100%;
			width: 100%;
		}
	}
	
</style>