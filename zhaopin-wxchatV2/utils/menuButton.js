export function getMenuButtonInfo() {
	let result = { width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
	// #ifdef MP-WEIXIN
	try {
		result = uni.getMenuButtonBoundingClientRect()
	} catch (e) {
		console.error('获取胶囊按钮失败:', e)
	}
	// #endif
	return result
}