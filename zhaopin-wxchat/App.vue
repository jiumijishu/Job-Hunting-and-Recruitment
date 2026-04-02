<script>
	const qapi = require('./api/login.js').Api;
		import local from "./utils/local.js"
	export default {
		onLaunch: function() {

		},
		onShow: function() {
			qapi.getUserDetal().then(res=>{
				this.$store.state.flag=res.data.onlineResumeFlag
			})
		},
		onHide: function() {
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	 @import '/wxcomponents/vant/common/index.wxss';
	 @import 'static/css/index.scss';
	 page{
		 width:100%;
		 overflow-x: hidden;
	 		background-color: #F7F6F9;
			height:100%;
			&>view{
				height:100%;
			}
	 }

	.safe-padding{ padding-bottom: constant(safe-area-inset-bottom); padding-bottom: env(safe-area-inset-bottom);}
	.safe-margin{ margin-bottom: constant(safe-area-inset-bottom); margin-bottom: env(safe-area-inset-bottom);}
	.button{
		width:100%;
		height:40px;
		margin-top: 10px;
		color:white;
		border-radius: 20px;
		background-color:#4684FC;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
