const check = {
	// 验证邮箱
	isEmail(str) {
		return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)
	},
	// 验证手机号码
	isMobile(str) {
		return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
	},
	// 验证电话号码
	isTel(str) {
		return /^1[3-9]\d{9}$/.test(str)
	},
	// 验证数字
	isNumber(str) {
		return /^[0-9]$/.test(str)
	},
	// 验证是否是英文
	isEnglish(str) {
		return /^[a-zA-Z]+$/.test(str)
	},
	// 验证是否是文本
	isText(str) {
		return /^\w+$/.test(str)
	},
	// 验证是否是中文
	isChinese(str) {
		return /^[\u4E00-\u9FA5]+$/.test(str)
	},
	// 验证是否是小写字母
	isLower(str) {
		return /^[a-z]+$/.test(str)
	},
	// 验证是否是大写字母
	isUpper(str) {
		return /^[A-Z]+$/.test(str)
	},
	// 验证身份证号码是否正确
	isValidateIdCard(idCard) {
		const idCardRegex = /^[1-9]\d{5}(19\d{2}|20[0-2]\d)(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{3}([0-9]|X)$/
		return idCardRegex.test(idCard)
	}
	// 校验输入框内容是否超出长度限制
	// inputVerify(str = "",lenght){
	// 	if(str.length > lenght){
	// 		uni.$u.toast('搜索内容超出长度，请输入30个字符以内')
	// 		return true
	// 	}
	// 	return false
	// }
}
export default check
