/*
* 状态管理
*/

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
wx.cloud.init()
const db = wx.cloud.database()

let state = {
  userInfo: {},
  isLogin: false
}

let mutations = {
  SETUSERINFO (state, data) {
    state.userInfo = Object.assign({}, state.userInfo, data)
  },
  SETISLOGIN (state, data) {
    state.isLogin = data
  }
}

let actions = {
  // 登陆-注册
  login ({commit}, data) {
    commit('SETISLOGIN', true)
    wx.cloud.callFunction({
      name: 'login',
      data: {user: data.userInfo},
      complete: res => {
        console.log('callFunction test result: ', res)
        commit('SETUSERINFO', res.result.userData)
      }
    })
  },
  // 授权校验
  checkAuth ({commit}) {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.dispatch('login', res)
            }
          })
        } else {
          commit('SETISLOGIN', false)
        }
      }
    })
  },
  // 获取用户列表
  async getUserList ({commit}, event) {
    const _ = db.command
    return await db.collection('user').where(_.or([
      {
        nickName: db.RegExp({
          regexp: '.*' + event.search,
          options: 'i',
        })
      },
      {
        note: db.RegExp({
          regexp: '.*' + event.search,
          options: 'i',
        })
      },
    ]))
    .orderBy('integral', 'desc')
    .skip((event.index - 1) * event.size).limit(event.size).get()
  },
  // 更新用户信息
  updateUser ({commit}, data) {
    wx.cloud.callFunction({
      name: 'updateUser',
      data,
      complete: res => {
        console.log('updateUser test result: ', res)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})

