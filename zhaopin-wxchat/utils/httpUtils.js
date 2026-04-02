const POST = 'POST';
const GET = 'GET';

const baseUrl = 'https://zhaopinapi.weixinai.cn';
// const baseUrl = 'http://localhost:8576';

// #ifdef H5
   var baseURL = '/api';
// #endif
// #ifdef MP-WEIXIN
// var baseURL =  'https://zhaopinapi.weixinai.cn';
// #endif

function request(method, url, data) {
	return new Promise((resolve, reject) => {
		  let token =wx.getStorageSync('token').replace(/^\"|\"$/g,"")
		  const Authorization = 'Bearer '+ token
		let header = {
		'content-type':'application/json',
		// 'token':token
		 Authorization
		};

		uni.request({
			url: baseUrl + url,
			method: method,
			header: header,
			data: method === POST ? JSON.stringify(data) : data,
			success: (res) => {
				if(res.data.code === 200){
					resolve(res);
				}else if(res.data.code ===401){
					uni.showToast({
						title:'账号过期，请从新登录',
						icon:'none'
					})
					setTimeout(()=>{
						wx.navigateTo({
						     url: '/pages/login/index', //这里跳转到登录页，要求用户重新登录
						   })
					},1500)
				} else {
					reject(res.data);
				}
			},
			fail: (err) => {
				reject(err);
			}
		})
	})
}

export default request

