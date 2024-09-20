/**
 * 处理日历统计详情数据 活动
 * @param {*} res 后端返回日历统计详情
 * @returns 
 */
export function fromData(res) {
	let tempObj = {}
	let tempTime
	let startTime, endTime
	let tempList = []
	res.forEach((item) => {
		tempTime = item.actDate.split('-')
		startTime = tempTime[0].split(':')[0] * 1 + tempTime[0].split(':')[1] / 60
		endTime = tempTime[1].split(':')[0] * 1 + tempTime[1].split(':')[1] / 60
		// console.log(startTime,endTime,'开始和结束时间');
		tempObj['starTime'] = startTime
		tempObj['endTime'] = endTime
		// console.log(tempObj,'时间数据格式化');
		// 标题
		tempObj['title'] = item.name
		// id
		tempObj['id'] = item.id
		// 状态
		tempObj['state'] = item.actState
		// 数量
		tempObj['num'] = item.actNum
		// 时间段
		tempObj['actDate'] = item.actDate
		// console.log(tempObj,"格式化后数据");
		tempList.push({ ...tempObj })
	})
	return tempList
}
/**
 * 处理日历统计详情数据 团队
 * @param {*} data 后端返回日历统计详情
 * @returns 
 */
export function formatTeamData(data) {
	let tempObj = {}
	let tempTime;
	let startTime, endTime
	let tempList = []
	data.forEach((item) => {
		tempTime = item.skuName.split('-')
		startTime = tempTime[0].split(':')[0] * 1 + tempTime[0].split(':')[1] / 60
		endTime = tempTime[1].split(':')[0] * 1 + tempTime[1].split(':')[1] / 60
		// console.log(startTime,endTime,'开始和结束时间');
		tempObj['starTime'] = startTime
		tempObj['endTime'] = endTime
		// console.log(tempObj,'时间数据格式化');
		// 标题
		tempObj['title'] = ''
		// id
		tempObj['id'] = item.id
		// 状态
		tempObj['state'] = item.appointStatus
		// 数量
		tempObj['num'] = item.appointNumber
		// 时间段
		tempObj['actDate'] = item.skuName
		tempList.push({ ...tempObj })
	})
	return tempList
}

/**
* 格式化时间
* @param {number} time 时间戳
* @returns YYYY年MM月DD日 HH:mm:ss
*/
export function formatDate(time) {
 let year, month, day, hours, minutes,seconds
 let date = new Date(time)
 year = date.getFullYear()
 month = (date.getMonth() + 1).toString().padStart(2, '0')
 day = date.getDate().toString().padStart(2, '0')
 hours = date.getHours().toString().padStart(2, '0')
 minutes = date.getMinutes().toString().padStart(2, '0')
 seconds = date.getSeconds().toString().padStart(2, '0')
 return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
}
