<script>
// import { TUILogin } from '@tencentcloud/tui-core';
﻿
uni.$SDKAppID = 1600105028;

// 蜡笔小新
uni.$userID = 'user01';
uni.$userSig = 'eJwtzNsKgkAUheF3mdtC9h7aowhdhdGQSCehLqWZbBPF5CkpevdMvVzfgv8jDvHea2whQiE9ENN*s7GPii-cc13aAnB8SnPLnGMjQlQACAQyGB7bOi5s50QkAWDQiu9-88lXFCDSWOG8CyfqOsnUOl*eg3qTPHGlovcrNVUJCz7N4nardLprtD5CNBffHy2NMOE_';

// 魔丸哪吒
// uni.$userID = 'user02';
// uni.$userSig = 'eJwtzM0KgkAYheF7ma3hfI6OiuCmHw0RstSdm8AxvsQaxknC6N4zdXmeA**HFGluDkKRgDATyGbeWIuHxgZnfvVCAVufvm6vUmJNAssFsIAD85dHvCUqMTnnnAHAohq7v3ncc7lv2fZawdsUjkfVRKI0Kpqnp23sDN1xKKOK7p9jAlmmi0NitBXd6fJ8uTsh*f4AyhAx7A__';
﻿
export default {
	onLaunch: function() {
		// TUILogin.login({
		// 	SDKAppID: uni.$SDKAppID,
		// 	userID: uni.$userID, 
		// 	userSig: uni.$userSig, 
		// 	useUploadPlugin: true,
		// 	framework: 'vue3'
		// }).catch(() => {});
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
/*每个页面公共css */
@import '@/uni_modules/uni-scss/index.scss';

/* #ifndef APP-NVUE */
@import '@/static/customicons.css';
// 设置整个项目的背景色
page {
	background-color: #F7F6F9;
}
/* #endif */

@import 'static/css/index.scss';

uni-page-body,html,body {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}

view{
	box-sizing: border-box;
}

.example-info {
	font-size: 14px;
	color: #333;
	padding: 10px;
}

.safe-padding{
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
}

.safe-margin{
	margin-bottom: constant(safe-area-inset-bottom);
	margin-bottom: env(safe-area-inset-bottom);
}

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