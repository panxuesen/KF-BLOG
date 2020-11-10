const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
    const db = cloud.database()
    const _ = db.command
    let res, userData, userInfo
    userInfo = await db.collection('user').where({ openId: _.eq(event.userInfo.openId) }).get()
    if (userInfo.data.length) { // 更新用户
        userData = userInfo.data[0]
        res = await db.collection('user').doc(userData._id).update({
            data: Object.assign({updateTime: new Date().valueOf()}, event.user)
        })
    } else { // 新增用户
        userData = Object.assign({
            createTime: new Date().valueOf(),
            updateTime: new Date().valueOf(),
            openId: event.userInfo.openId,
            userLevel: 0,
            integral: 0,
            note: ''
        }, event.user)
        res = await db.collection('user').add({
            data: userData
        })
    }
    return {res, userData}
}