<template>
  <view class="content">
    <tui-card :title="title" :header="header">
			<template v-slot:body>
				<view class="tui-default">
					下单3元及以上的商品每一单积1分，累积积分可兑换礼品或红包
				</view>
			</template>
			<template v-slot:footer>
				<view class="tui-default">
					积分兑换请加群主微信
          <!-- ：xiaoshuaiTZ <tui-tag plain @click="copy">复制</tui-tag> -->
				</view>
			</template>
		</tui-card>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      title: {
        text: "兑换规则",
        color: "rgb(122, 122, 122)",
        size: 34
      },
      header: {
        bgcolor: "#F7F7F7",
        line: true
      }
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  onLoad() {
  },
  onShow () {
  },
  created() {},
  methods: {
    copy () {
      wx.setClipboardData({data: 'xiaoshuaiTZ'})
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
  padding-top: 20upx;
  .tui-default {
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
	}
}
</style>
