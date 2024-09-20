import http from '@/utils/http'
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
	const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
	const value = modulesFiles(modulePath)
	modules[moduleName] = value.default
	return modules
}, {})
let Api = {}
//合并所有api
Object.keys(modules).forEach((item) => {
	Object.assign(Api, modules[item])
})

//批量创建请求
const injectRequest = (apis) => {
	const request = {}
	Object.keys(apis).forEach((item) => {
		const { method, url, isToken = true } = apis[item]
		request[item] = (dataOrParams = {}, ags = { showLoading: true }) => {
			const param = ['POST', 'PUT'].includes(method.toUpperCase())
				? { data: dataOrParams }
				: ['UPLOAD'].includes(method.toUpperCase())
				? { filePath: dataOrParams.filePath, name: dataOrParams.name }
				: { params: dataOrParams }
			return http.middleware({ method: method.toUpperCase(), url: url, ...param, custom: { isToken: isToken, ...ags } })
		}
	})
	return request
}
module.exports = injectRequest(Api)