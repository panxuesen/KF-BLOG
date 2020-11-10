<template>
  <view class="content">
    <open-data type="userAvatarUrl" class="avatar"></open-data>
    <open-data type="userNickName" class="name"></open-data>
    <span v-if="isLogin" class="score">当前积分：{{userInfo.integral || 0 }}</span>
    <tui-button v-else width="372rpx" height="84rpx" :size="34" shape="circle" bold type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" >获取用户信息</tui-button>
    <tui-button v-if="isLogin && isAdmin" width="372rpx" height="84rpx" :size="34" shape="circle" bold type="primary" @click="goList">积分榜</tui-button>
    <tui-button v-if="isLogin && !isAdmin" width="372rpx" height="84rpx" :size="34" shape="circle" bold type="primary" @click="exchange">积分兑换</tui-button>
    <tojoy-fab bgColor="#5677fc"></tojoy-fab>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    isAdmin () {
      return this.userInfo.userLevel > 0
    },
  },
  onShareAppMessage() {
    return this.$getShareInfo();
  },
  onLoad() {
  },
  onShow () {
    this.$store.dispatch('checkAuth')
  },
  created() {},
  methods: {
    getuserinfo (e) {
      this.$store.dispatch('login', e)
    },
    goList () {
      this.$Router.push('/pages/userList/index')
    },
    exchange () {
      this.$Router.push('/pages/exchange/index')
    }
  }
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 800upx;
  padding-top: 100upx;
  .avatar {
    width: 200upx;
    border-radius: 60%;
    overflow: hidden;
    margin-bottom: 30upx;
  }
  .name {
    font-weight: bold;
    margin-bottom: 30upx;
  }
  .score {
    font-weight: bold;
    font-size: 40upx;
    margin-bottom: 50upx;
  }
}
</style>
