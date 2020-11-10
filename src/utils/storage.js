class Store {
  constructor() {
    this.prefix = 'XS-'
  }
  set(key, value) {
    uni.setStorageSync(this.prefix + key, value)
  }
  get(key) {
    return uni.getStorageSync(this.prefix + key)
  }
  remove(key) {
    uni.removeStorageSync(this.prefix + key)
  }
  clear() {
    uni.clearStorageSync()
  }
}
export default new Store()

