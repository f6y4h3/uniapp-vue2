import Request from 'luch-request'
import baseConfig from '@/config/index'
import { getRefreshToken, getToken, refreshNewToken } from './auth'
const http = new Request({
	baseURL: `${baseConfig.baseUrl}`,
	dataType: 'json',
	timeout: 30000
})
/**
 * 用于忽略提示
 * '无效的刷新令牌':刷新令牌被删除时，不用提示
 * '刷新令牌已过期': 使用刷新令牌，刷新获取新的访问令牌时，结果因为过期失败，此时需要忽略。
 */
const ignoreMsgs = ['用户未登录', '无效的刷新令牌', '刷新令牌已过期']

//是否显示重新登录
export let isReLogin = { show: false }

//请求队列
let requestList = []

let currentPage = getCurrentPages()

//是否正在刷新令牌中
let isRefreshToken = false

// let refreshToken = uni.getStorageSync('refreshToken')

http.interceptors.request.use(
	(config) => {
		if (config.custom.showLoading) {
			uni.showLoading({
				title: '正在加载...'
			})
		}
		if (config.custom.isToken) {
			config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token') || ''
		} else {
			config.header = {}
		}
		if (uni.getStorageSync('tenantId')) {
			config.header['tenant-id'] = uni.getStorageSync('tenantId') || ''
		}
		// config.header['Authorization'] = 'Bearer ' + uni.getStorageSync('token') || ''
		// if (!config.header.isToken) {
		//     delete config.header.isToken
		// }
		return config
	},
	(config) => {
		return Promise.reject(config)
	}
)

// 响应拦截器
http.interceptors.response.use(
	async (response) => {
	console.log(response,'响应结果')
		uni.hideLoading()
		const res = response
		switch (res.code || res.statusCode) {
			case 200:
				if (res.data.code === 401) {
					if (!isRefreshToken) {
						// 刷新 token
						// isRefreshToken = true
						// if (!getRefreshToken()) {
						// 	isRefreshToken = false
						// 	return handleReLogin()
						// }
						try {
							const refreshToken = getRefreshToken()
							const token = getToken()
							// console.log('123',ajaxA);
							const data = await refreshNewToken()
							// const data = await http.middleware({method: 'POST', url: '/app-api/yanxue/auth/refresh-token', data: {refreshToken: refreshToken}, header: {Authorization: 'Bearer ' + token}})
							// const data = await ajaxR.refreshToken({refreshToken: refreshToken})
							uni.setStorageSync('token', data.accessToken)
							uni.setStorageSync('userId', data.userId)
							// uni.setStorageSync('userName', data.nickName)
							// uni.setStorageSync('userAvatar', data.avatar)
							uni.setStorageSync('refreshToken', data.refreshToken)
							uni.setStorageSync('expiresTime', data.expiresTime)
							requestList.forEach((cb) => cb())
							return http.middleware(res.config)
						} catch (error) {
							isRefreshToken = false
							requestList.forEach((cb) => cb())
							return handleReLogin()
						} finally {
							requestList = []
							isRefreshToken = false
						}
					} else {
						return new Promise((resolve) => {
							requestList.push(() => {
								resolve(http.middleware(res.config))
							})
						})
					}
				} else if (res.data.code != 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					return Promise.reject(res)
				}
				return res.data.data ? res.data.data : res
			default:
				uni.showToast({
					title: res.message,
					icon: 'none'
				})
				return Promise.reject(res)
		}
	},
	(response) => {
		// 响应失败拦截器
		// console.log(response, '失败')
		uni.hideLoading()
		const res = response
		switch (res.code || res.statusCode) {
			case 403:
				uni.showToast({
					title: res.data.error.message,
					icon: 'none'
				})
				return Promise.reject(res)
			default:
				uni.showToast({
					title: res.data.error,
					icon: 'none'
				})
				//这里关闭所有页面 跳转到登录 因为鉴权失败需要重新登录 为了测试先不写跳转
				return Promise.reject(res)
		}
	}
)

function handleReLogin() {
	if (!isReLogin.show) {
		isReLogin.show = true
		uni.showModal({
			title: '提示',
			content: '身份信息已过期，是否重新登录？',
			success: (res) => {
				isReLogin.show = false
				if (res.confirm) {
					// uni.navigateTo({
					// 	url: `/pages/login/login`
					// })
				} else if (res.cancel) {
					isRefreshToken = false
				}
			},
			fail: () => {
				isReLogin.show = false
			}
		})
	}
	return Promise.reject('无效的会话，或者会话已过期，请重新登录！')
}

export default http
