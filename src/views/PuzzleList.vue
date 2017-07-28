<template>
  <div id='PuzzleList'>
    <div class="content--wrapper">
      <div class="subPage">
        <div class="mobile subpage--title">
          <div class="title--text">{{ msgText[userLang].title }}</div>
        </div>
        <div class="desktop subpage--title">
          <div class="title--text">
            <div>{{ msgText['zh'].title }}</div>
            <div class="divider"></div>
            <div>{{ msgText['en'].title }}</div>
          </div>
        </div>
      </div>

      <div class="content">
        <template v-if="showScanner">
          <qrcode-reader :enable="showScanner" width="320px" height="240px" :noResult="true" title="" subTitle="掃描 QR Code 檢視集章冊" @OnSuccess="OnSuccess"></qrcode-reader>
        </template>
        <template v-else>
          <div role="chips">
            <div v-for="(sponsor, index) in sponsors" :key="index">
                <chip :displayName="sponsor.name[userLang]" :logoUri="sponsor.logourl" :isActive="sponsor.active" >
              </div>
          </div>
        </template>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import * as api from '../modal/apiClient.js'
import Util from '../modal/util.js'
export default {
  name: 'PuzzleList',
  data() {
    return {
      data: null,
      token: '',
      msgText: {
        'zh': {
          title: '開源巔峰挑戰賽',
          gameStatus: {
            accomplished: '遊戲狀態：已於 ${1} 完成開源巔峰挑戰賽',
            unfinished: '遊戲狀態：尚未完成開源巔峰挑戰賽'
          },
          tips: [
            ''
          ],
          anonymousUser: '不知是何許人也',
          someonesStampCard: '${1} 的集章冊'
        },
        'en': {
          title: 'Booth Reward Activity',
          gameStatus: {
            accomplished: 'Status: Clear on ${1}',
            unfinished: 'Status: Not yet'
          },
          tips: [
            ''
          ],
          anonymousUser: 'Anonymous',
          someonesStampCard: '${1}\'s stamp collection'
        }
      },
      booth: [],
      sponsorList: []
    }
  },
  computed: {
    userLang: function () {
      let lang = navigator.language || navigator.userLanguage
      return lang.toLowerCase().includes('zh') ? 'zh' : 'en'
    },
    showScanner: function () {
      return this.token === '' && this.data === null
    },
    name: function () {
      if (this.data === null) return this.msgText[this.userLang].anonymousUser
      else {
        return Util.StringFormat(
          this.msgText[this.userLang].someonesStampCard,
          this.data.user_id
        )
      }
    },
    valid: function () {
      if (this.data === null) return ''
      else if (this.data.valid) return Util.StringFormat(
        this.msgText[this.userLang].gameStatus.accomplished,
        new Date(this.data.valid * 1000).toLocaleString()
      )
      else return this.msgText[this.userLang].gameStatus.unfinished
    },
    sponsors: function() {
      return this.sponsorList
        .filter((el) => this.booth.indexOf(el.name.en) >= 0)
        .map((el) => {
          el.active = this.data && this.data.deliverer ? this.data.deliverer.indexOf(el.name.en) >= 0 : false
          return el
        })
    }
  },
  methods: {
    OnSuccess(result) {
      if (result !== this.token) {
        window.location.search = 'token=' + Util.sha1Gen(result)
      }
    },
    loadPuzzle() {
      var self = this
      api.getPuzzle(this.token).then((res) => {
        self.data = res.data
      }).catch((error) => {
        setTimeout(() => {
          window.location.search = ''
        }, 3 * 1000)
      })
    },
    loadDeliverers() {
      var self = this
      api.getBoothList().then((res) => {
        self.booth = res
      })
    },
    loadSponsor() {
      var self = this
      api.getSponsorList().then((res) => {
        self.sponsorList = res
      })
    }
  },
  beforeMount() {
    var query = {}
    if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
      this.token = query.token
      this.loadPuzzle()
    }
    this.loadSponsor()
    this.loadDeliverers()
    
  },
  mounted() {
    var move = document.getElementById('PuzzleList')

    move.addEventListener('touchstart', function () {
      var top = move.scrollTop
      var totalScroll = move.scrollHeight
      var currentScroll = top + move.offsetHeight
      if (top === 0) {
        move.scrollTop = 1
      } else if (currentScroll === totalScroll) {
        move.scrollTop = top - 1
      }
    })

    var query = {}

    if (window.location.search.length > 0 
      && (query = Util.parseQueryParams(window.location.search)) 
      && query.mode === 'app') {
      document.getElementsByClassName('subPage')[0].classList.toggle('hidden')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../stylus/_global/_variable"
#PuzzleList
  display: flex
  flex-direction: column
  min-height: 100vh
  .subPage.hidden + .content
    margin-top: 3rem
  [role="chips"]
    display: flex
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
    padding: 0 1em
    @media screen and (max-width: 666px) and (orientation: landscape) // smaller than iPhone 6
      padding: 0 3em
    @media screen and (max-width: 454px) // must bigger than 454px for two column
      margin: 0 auto
      display: block
    > div
      @media screen and (min-width: 1024px)
        min-width: 25%
      padding: 0 .5em

</style>
