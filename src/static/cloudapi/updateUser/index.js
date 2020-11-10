const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
    const db = cloud.database()
    let res = await db.collection('user').doc(event.id).update({
        data: Object.assign({updateTime: new Date().valueOf()}, event.user),
    })
    return res
}