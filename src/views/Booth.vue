<template>
  <div id='Booth'>
    <div class="content--wrapper">
      <div class="subPage">
        <div class="mobile subpage--title">
          <div class="title--text">{{title.zh}} - 攤位端</div>
        </div>
        <div class="desktop subpage--title">
          <div class="title--text">
            <div>{{title.zh}} - 攤位端</div>
            <div class="divider"></div>
            <div>{{title.en}} - Booth</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div role="logo"><img alt="" :src="boothLogo"></div>
        <qrcode-reader class="scanner" v-if="boothToken!==''" :enable="qrState" width="400px" height="300px" :noResult="true" @OnSuccess="OnSuccess"></qrcode-reader>
        <div role="messages">
          <p :class="{ 'red--text': alertError, 'green--text': alertSuccess }">{{ alertMessages }}</p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import * as api from '../modal/apiClient.js'
import Util from '../modal/util.js'
import config from '../../config/project.json'
export default {
  name: 'Booth',
  data () {
    return {
      title: config.title,
      boothName: 'Unknow booth',
      boothToken: '',
      qrState: true,
      buffer: '',
      alertMessages: '攤位驗證成功，掃描 QR Code 即可發送程式碼拼圖',
      alertError: false,
      alertSuccess: false,
      sponsorList: [],
      communityList: [
        {
          name: { en: 'openSUSE Taiwan' },
          logourl: require('@/assets/community/openSUSE_Taiwan.png')
        },
        {
          name: { en: 'SITCONxHK' },
          logourl: require('@/assets/community/SITCONxHK.png')
        },
        {
          name: { en: 'MozTW 摩茲台灣社群' },
          logourl: require('@/assets/community/Moztwlogo.png')
        },
        {
          name: { en: 'Monospace 社群友善空間' },
          logourl: require('@/assets/community/monospace.png')
        },
        {
          name: { en: '中央創遊' },
          logourl: require('@/assets/community/NCUGC.png')
        },
        {
          name: { en: '全球学生开源年会' },
          logourl: require('@/assets/community/sosconf.svg')
        },
        {
          name: { en: 'MOPCON 行動科技年會' },
          logourl: require('@/assets/community/mopcon.png')
        },
        {
          name: { en: 'TDOHacker' },
          logourl: require('@/assets/community/TDOH.png')
        }
      ]
    }
  },
  computed: {
    boothLogo () {
      var booth = null
      if (this.boothName !== 'Unknow booth' && (booth = this.sponsorList.find((el) => el.name.en === this.boothName)) !== undefined) {
        // return window.devicePixelRatio && window.devicePixelRatio > 1 ? booth.logourl.replace(/.png$/, '@2x.png') : booth.logourl
        return booth.logourl
      }
      if (this.boothName !== 'Unknow booth' && (booth = this.communityList.find((el) => el.name.en === this.boothName)) !== undefined) {
        // return window.devicePixelRatio && window.devicePixelRatio > 1 ? booth.logourl.replace(/.png$/, '@2x.png') : booth.logourl
        return booth.logourl
      }
      return ''
    }
  },
  methods: {
    OnSuccess (result) {
      var self = this
      if (this.buffer !== result) {
        this.buffer = result
        api.grantPuzzle(this.boothToken, result).then((res) => {
          return api.getNickname(result)
        }).then((res) => {
          self.alertMessages = '成功幫 ' + res.nickname + '蓋章囉 (・ω・)ノ'
          self.alertSuccess = true
          self.alertError = false
        }).catch((error) => {
          if (error.response) {
            switch (error.response.data.message) {
              case 'Already take from this deliverer':
                self.alertMessages = '已經蓋過章囉(￣▽￣)'
                break
              case 'invalid receiver token':
                self.alertMessages = '條碼好像不正確(⊙ω⊙)'
                break
              case 'token and receiver required':
                self.alertMessages = '好像抓不到條碼(;´༎ຶД༎ຶ`)'
            }
          } else {
            self.alertMessages = '網路可能有問題了_(´ཀ`」 ∠)_'
          }
          self.alertError = true
          self.alertSuccess = false
        })
      }
    },
    loadSponsor () {
      var self = this
      api.getSponsorList().then((res) => {
        self.sponsorList = res
      })
    }
  },
  mounted () {
    var self = this
    var query = {}

    this.loadSponsor()

    if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
      api.checkBoothToken(query.token).then((res) => {
        self.boothToken = query.token
        self.boothName = res.data.display_name
      }).catch((error) => {
        console.log(error)
        setTimeout(() => {
          self.$router.replace('/')
        }, 10 * 1000)
      })
    } else {
      self.$router.replace('/')
    }
  }
}

</script>

<style lang="stylus">
#Booth
  min-height: 100vh
  display: flex
  flex-direction: column
  [role="messages"]
    text-align: center
  [role="logo"]
    @media screen and (max-width: 454px) // must bigger than 454px for two column
      width: 70vw
      height: 46.66375vw
      margin: 1em auto
    display: flex
    align-items center
    justify-content center
    padding: 10px
    width: 350px
    height: 200px
    margin: .5em auto
    img
      max-width: 100%
      max-height: 100%
      margin: 0 auto
  .subPage
    min-height: 200px
    justify-content: flex-end
    @media screen and (max-width: 454px)
      min-height: 75px
</style>
