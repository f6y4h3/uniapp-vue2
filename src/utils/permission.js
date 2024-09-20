let pers
/**
 *	首页金刚区跳转权限判断
 * @param {String} `url` 将要跳转的路径
 * @param {String} `permission` 所需要的权限
 * @returns void
 */
export function navigateto(url, permission) {
	pers = uni.getStorageSync('profile') || []
	if (!pers.includes(permission)) {
		uni.navigateTo({
			url: '/pages/no_permission/index'
		})
		return
	}
	uni.navigateTo({
		url: url
	})
}
