export function getSafeArea() {
	try {
		const systemInfo = uni.getWindowInfo()
		return {
			bottomSafeArea: systemInfo.screenHeight - systemInfo.safeArea.bottom,
			topSafeArea: systemInfo.safeArea.top,
			insets: {
				top: systemInfo.safeAreaInsets?.top || 0,
				right: systemInfo.safeAreaInsets?.right || 0,
				bottom: systemInfo.safeAreaInsets?.bottom || 0,
				left: systemInfo.safeAreaInsets?.left || 0
			}
		}
	} catch (error) {
		return {
			bottomSafeArea: 0,
			topSafeArea: 0,
			insets: {
				top: 0,
				right: 0,
				bottom: 0,
				left: 0
			}
		}
	}
}