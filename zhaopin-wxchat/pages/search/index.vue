<template>
	<!-- 求职意向 -->
	<view class="expected">
		<view class="post">
			<van-tree-select
			  :items="items"
			  :main-active-index="mainActiveIndex"
			  :active-id="activeId"
			  @click-nav="onClickNav"
			  @click-item="onClickItem"
			/>
		</view>
	</view>
</template>

<script>
	// 接口
	const $api = require('../../api/home.js').Api;
	export default{
		data(){
			return{
				items:[],
				mainActiveIndex:0,
				activeId:null,
				id:0
			}
		},
		onShow() {
			this.queryJobTypeData()
		},
		methods:{
			// 获取职业类型
			queryJobTypeData(){
				$api.queryJobTypeData().then(res=>{
					let jobs=res.data.data
					jobs=jobs.map(item=>{
						let ids=item.categoryId
						let text=item.categoryName;
						let children=item.childList.map(i=>{
							let id=i.id;
							let text=i.typeName
							return {
								id,text
							}
						})
						return {
							ids,text,children
						}
					})
					this.items=JSON.parse(JSON.stringify(jobs)) 
				})
				
			},
			// 根据职位类型查询岗位
			queryJobDataByType(){
				console.log(this.id)
				let data={
					typeId:this.id
				}
				$api.queryJobDataByType(data).then(res=>{
					this.items=this.items.map(item=>{
						item.children=res.data.rows.map(item=>{
							let obj={};
							obj.text=item.jobName;
							obj.id=item.id
							return obj
						})
						return item
					})
				})
			},
			  onClickNav(e) {
				  this.mainActiveIndex=e.detail.index
			  },
			
			  onClickItem(e) {
				  let info=e.detail
				setTimeout(()=>{
					 uni.$emit('add',info)
					            uni.navigateBack({
						            delta: 1 
								});

				},100)
			  }
		}
	}
</script>

<style lang="scss" scoped>
	.expected{
		height:100%;
		width:100%;
		background-color: #fff;
	}
	.post{
		height:100%
	}
	::v-deep .van-tree-select{
		height: 100% !important;
	}
	.main-active-class{
		
	}
	/deep/.van-sidebar-item--selected{
		border-color:#4684FC
	}
	/deep/.van-tree-select__item--active{
		color:#4684FC
	}
</style>