
<template>
  <div class="friend-detail">
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="person-wrapper van-hairline--bottom" v-if="friendsInfo !== null">
      <img v-lazy="IMG_URL + friendsInfo.avatar" width="100" height="90" />
      <p class="name">{{ friendsInfo.nickname }}</p>
      <p class="date">
        <span>{{ friendsInfo.province }}</span
        ><span>{{ friendsInfo.city }}</span
        ><span>{{ friendsInfo.gender }}</span
        ><span>{{ friendsInfo.age }}</span>
      </p>
    </div>
    <div class="button-type" v-if="friendsInfo !== null && friendsInfo.userName !== userInfo.userName">
      <van-button @click="mesCheck" type="primary">加为好友</van-button>
    </div>
  </div>
</template>

<script>
import {reactive, toRefs, computed, onBeforeMount} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useStore} from 'vuex'
import api from '@/api'
export default {
  name: 'FriendDetail',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = reactive({
      friendsInfo: null,
      isMyFriend: false,
      IMG_URL: process.env.VUE_APP_IMG_URL,
      userInfo: computed(() => {
        return store.state.userInfo
      })
    })

    const onClickLeft = () => {
      router.go(-1)
    }
    const mesCheck = () => {
      console.log('mesCheck')
      router.push({name: 'SendFriendValidate', params: {id: route.params.id}})
    }
    const blockFriend = () => {
      console.log('blockFriend')
    }
    const getUserInfo = async () => {
      const params = {id: route.params.id}
      const res = await api.previewUser(params)
      console.log(res)
      state.friendsInfo = res.data
      store.dispatch('setFriendsInfo', state.friendsInfo)
    }
    onBeforeMount(() => {
      getUserInfo()
    })
    return {
      ...toRefs(state),
      onClickLeft,
      mesCheck,
      blockFriend,
      getUserInfo
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/color.scss';

.friend-detail {
  .van-hairline--bottom::after {
    display: none;
  }
  .van-nav-bar {
    background-color: $lightBgc;
  }
  .person-wrapper {
    margin-top: 5px;
    text-align: center;
    z-index: 2;
    img {
      border-radius: 50%;
    }
    .name {
      margin-top: 5px;
      font-size: 20px;
      font-weight: 600;
      color: $fontWhite;
    }
    .date {
      font-size: 14px;
      color: $fontGray;
      margin-top: 4px;
      span {
        padding-left: 5px;
      }
    }
    :deep(.van-hairline--bottom::after) {
      display: block;
    }
  }
  .van-button {
    margin-top: 25px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 38px;
    border-radius: 8px;
    line-height: 30px;
    font-size: 16px;
  }
}
</style>
