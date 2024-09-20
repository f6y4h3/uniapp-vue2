import service from './http'

export function getToken() {
	return uni.getStorageSync('token')
}

export function getRefreshToken() {
	return uni.getStorageSync('refreshToken')
}

export function getUserId() {
	return uni.getStorageSync('userId')
}

export function getUserAvatar() {
	return uni.getStorageSync('userAvatar')
}

export function getUserName() {
	return uni.getStorageSync('userName')
}

export function getExpresssTime() {
	return uni.getStorageSync('expiresTime')
}

export function refreshNewToken() {
	// return service.middleware({ method: 'POST', url: '/app-api/yanxue/auth/refresh-token?refreshToken=' + getRefreshToken(), custom: { isToken: true } })
}
