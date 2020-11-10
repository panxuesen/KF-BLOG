<template>
  <view class="content">
    <view class="tui-searchbox">
			<view class="tui-search-input">
				<icon type="search" :size='13' color='#333'></icon>
				<input confirm-type="search" placeholder="搜索昵称/备注" :focus="true" auto-focus placeholder-class="tui-input-plholder"
				 class="tui-input" v-model.trim="query.search" @keydown.enter="searchFn"/>
			</view>
      <view class="tui-cancle" @tap="searchFn">搜索</view>
		</view>
    <tui-list-cell :lineLeft="false" v-for="(item, i) in dataList" :key="i">
      <view class="tui-item-box">
        <view class="tui-msg-box">
          <image :src="item.avatarUrl" class="tui-msg-pic" mode="widthFix"></image>
          <view class="tui-msg-item">
            <view class="tui-msg-name">{{item.nickName}}</view>
            <view class="tui-msg-content" v-if="isAdmin">
              备注：<input v-if="item.showEdit" type="text" v-model="item.note" :focus="focus" class="tui-input-note" @blur="updateNote(item, i)">
              <span v-else class="tui-text-note">{{item.note ? item.note : '他/她还没有备注'}}</span>
              <tui-icon v-if="!item.showEdit" name="evaluate" :size="20" color="#333" @click="edit(item, i)" margin="15rpx"></tui-icon>
            </view>
            <view class="tui-msg-content" v-else>
              <span>积分：{{item.integral}}</span>
            </view>
          </view>
        </view>
        <view class="tui-msg-right" v-if="isAdmin">
          <tui-numberbox :value="item.integral" :index="i" :min="0" :max="1000000" :height="60" :width="70" :iconSize="30" @change="change($event, item)"></tui-numberbox>
        </view>
        <view class="tui-msg-right" v-else><span class="rank">{{i + 1}}</span></view>
      </view>
    </tui-list-cell>
  </view>
</template>

<script>
export default {
  data() {
    return {
      query: {
        search: '',
        size: 20,
        index: 1
      },
      dataList: [],
      isBottom: false,
      focus: false,
      loading: false
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    isAdmin () {
      return this.userInfo.userLevel > 0
    },
  },
  onLoad(e) {
    this.getList()
  },
  onShow (e) {
  },
  created() {},
  onReachBottom () {
    !isBottom && this.getList()
  },
  methods: {
    // 编辑备注
    edit (item, i) {
      this.dataList[i].showEdit = true
      this.focus = true
    },
    // 更新备注
    updateNote (item, i) {
      this.dataList[i].showEdit = false
      this.focus = false
      this.updateUser(item._id, {note: item.note})
    },
    // 加减积分
    change (e, item) {
      item.integral = e.value
      this.updateUser(item._id, {integral: e.value})
    },
    // 更新用户信息
    updateUser (id, user) {
      this.$store.dispatch('updateUser', {id, user})
    },
    // 模糊搜索
    searchFn () {
      this.query.index = 1
      this.isBottom = false
      this.dataList = []
      this.getList()
    },
    // 获取用户列表
    getList () {
      if (this.loading) return
      this.loading = true
      this.$store.dispatch('getUserList', this.query).then((result) => {
        console.log('callFunction getUserList result: ', result)
        this.dataList = this.dataList.concat(result.data)
        if (this.dataList.lenght == 0) {
          this.isBottom = true
        }
        this.query.index ++
        this.loading = false
      })
    }
  }
};
</script>

<style lang="scss">
.content {
  .tui-item-box {
		width: 100%;
		display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .tui-msg-box {
		display: flex;
		align-items: center;
	}

	.tui-msg-pic {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		display: block;
		margin-right: 24rpx;
		flex-shrink: 0;
	}

	.tui-msg-item {
		max-width: 500rpx;
		min-height: 80rpx;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
  }
  .tui-msg-name {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 34rpx;
		line-height: 1;
		color: #262b3a;
	}

	.tui-msg-content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 26rpx;
		line-height: 1;
		color: #9397a4;
    margin-top: 20upx;
    display: flex;
    align-items: center;
    .tui-input-note {
      border: 1upx solid #ccc;
      border-radius: 10upx;
      padding-left: 15upx;
      display: inline-block;
      width: 200upx;
      height: 35upx;
    }
    .tui-text-note {
      display: inline-block;
      height: 35upx;
      display: flex;
      align-items: center;
    }
	}

	.tui-msg-right {
		text-align: right;
		display: flex;
		align-items: center;
    .rank {
      font-weight: bold;
      font-size: 30upx;
      padding-right: 20upx;
    }
  }
  
  .tui-searchbox {
		padding: 10upx 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

  .tui-search-input {
		width: 100%;
		height: 66rpx;
		border-radius: 35rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #f2f2f2;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
	}

	.tui-input {
		flex: 1;
		color: #333;
		padding: 0 16rpx;
		font-size: 28rpx;
  }
  
  .tui-cancle {
		color: #888;
		font-size: 28rpx;
		padding-left: 30rpx;
		flex-shrink: 0;
	}
}
</style>
