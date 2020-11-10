
let apiUrl, fileUploadUrl, imgUrl
let ENV = __wxConfig.envVersion
// "develop"   开发版  
// "trial"   体验版
// "release"   正式版
console.log('小程序运行环境', ENV)
if (ENV === 'release') {
    apiUrl = 'https://app.yunshang520.com'
    fileUploadUrl = 'https://app.yunshang520.com'
    imgUrl = ''
} else if (ENV === 'trial') {
    apiUrl = 'https://test.app.test.yunshang520.com'
    fileUploadUrl = 'https://test.app.test.yunshang520.com'
    imgUrl = ''
} else {
    apiUrl = 'https://app.test.yunshang520.com'
    fileUploadUrl = 'https://app.test.yunshang520.com'
    imgUrl = ''
}

export const API_URL = apiUrl
export const FILE_UPLOAD_URL = fileUploadUrl
export const IMG_URL = imgUrl