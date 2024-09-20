/**
 *
 * @param {*} variable 需要获取的参数key
 */
function UrlSearch() {
	var name, value
	var str = location.href
	var num = str.indexOf('?')
	str = str.substr(num + 1)

	var arr = str.split('&')
	for (var i = 0; i < arr.length; i++) {
		num = arr[i].indexOf('=')
		if (num > 0) {
			name = arr[i].substring(0, num)
			value = arr[i].substr(num + 1)
			this[name] = value
		}
	}
}
const getQueryVariable = new UrlSearch()
/**
 *
 * @param {*} url 打开的地址
 * @param {*} param 向新页面传递的参数
 */
const openView = (url, param) => {
	let params = Object.keys(param),
		arg = ''
	if (params.length) {
		arg = '?'
		params.forEach((item) => {
			arg += `${item}=${param[item]}&`
		})
	}
	arg = arg.substring(0, arg.length - 1)
	uni.reLaunch({
		url: `/pages${url}${arg}`
	})
}
export { getQueryVariable, openView }
