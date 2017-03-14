<template>
  <div id='PuzzleList'>
    <template v-if="showScanner">
      <qrcode-reader :enable="showScanner" width="320px" height="240px" :noResult="true" title="" subTitle="掃描 QR Code 檢視拼圖清單" @OnSuccess="OnSuccess"></qrcode-reader>
    </template>
    <v-container fluid v-else-if="data !== null">
      <v-row>
        <v-col md8>
          <p role="name">{{ name }}</p>
          <blockquote>{{ valid }}<br>{{ coupon }}</blockquote>
        </v-col>
      </v-row>
      <v-row class="pl-2 pr-2 mt-3 mb-3">
        <v-btn block primary dark @click.native.stop="topic = !topic" class="mr-3">拼圖題目</v-btn>
        <v-modal id="topic" v-model="topic">
          <v-card>
            <v-card-text>
              <div role="close-modal">
                <v-btn floating="floating" primary dark outline @click.native.stop="topic = !topic" class="mr-3">X</v-btn>
              </div>
              <iframe src="https://hackmd.io/s/rJxU4vzie"></iframe>
            </v-card-text>
          </v-card>
        </v-modal>
        <v-btn block primary dark @click.native.stop="help = !help" class="ml-3">規則說明</v-btn>
        <v-modal id="help" v-model="help">
          <v-card>
            <v-card-text>
              <div role="close-modal">
                <v-btn floating="floating" primary dark outline @click.native.stop="help = !help" class="mr-3">X</v-btn>
              </div>
              <iframe src="https://hackmd.io/s/rJATGDGje"></iframe>
            </v-card-text>
          </v-card>
        </v-modal>
      </v-row>
      <v-row class="pa-3" style="margin-top:-16px;">
        <div role="messages" class="">
          <p>{{ messages }}</p>
        </div>
      </v-row>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="chip in chipsConuter" class="ma-0 pa-0">
          <chip :displayName="chip.displayName" :count="chip.count"></chip>
        </v-col>
      </v-row>
    </v-container>
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
        topic: false,
        help: false
      }
    },
    computed: {
      showScanner: function() {
        return this.token === '' && this.data === null
      },
      chipsConuter: function() {
        if (this.data === null) return
        return this.data.puzzle.reduce((pv, cv) => {
          var specialChip = pv.find((el) => el.displayName === cv)
          if (specialChip === undefined) {
            pv.push({ displayName: cv, count: 1 })
          } else {
            specialChip.count++
          }
          return pv
        }, [])
      },
      name: function() {
        if (this.data === null) return '不知道是和許人也(｡ ́︿ ̀｡)'
        else return this.data.user_id + ' 的程式拼圖蒐集冊'
      },
      valid: function() {
        if (this.data === null) return ''
        else return '遊戲狀態: ' + (this.data.valid ? '已於 ' + new Date(this.data.valid * 1000).toLocaleString() + ' 完成程式碼拼圖' : '尚未完成')
      },
      coupon: function() {
        if (this.data === null) return ''
        else return '文創折價券: ' + (this.data.coupon ? '已於 ' + new Date(this.data.valid * 1000).toLocaleString() + ' 使用' : this.data.valid ? '尚未使用' : '未完成程式碼拼圖')
      },
      messages: function() {
        return this.data.puzzle.length === 0 ? '還沒有收集到拼圖！偷偷告訴你一個小秘密：除了報到後可以取得兩片拼圖碎片，年會中各個攤位也可以取得拼圖碎片喔(￣▽￣)' : '完成程式碼拼圖後，購買 SITCON 文創商品可折抵 50 元唷！'
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
          self.$vuetify.toast.create(...['Token 無法辨識', 'bottom'])
          setTimeout(() => {
            window.location.search = ''
          }, 3 * 1000)
        })
      }
    },
    beforeMount() {
      var query = {}
      if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
        this.token = query.token
        this.loadPuzzle()
      }
    },
    mounted() {
      var move = document.getElementById('PuzzleList')

      move.addEventListener('touchstart', function() {
        var top = move.scrollTop
        var totalScroll = move.scrollHeight
        var currentScroll = top + move.offsetHeight
        if (top === 0) {
          move.scrollTop = 1
        } else if (currentScroll === totalScroll) {
          move.scrollTop = top - 1
        }
      })
    }
  }
</script>

<style lang="stylus">
  html
    overflow: hidden
  body
    overflow: hidden
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    height: 100%

  #PuzzleList
    transform: translateZ(0)
    perspective: 1000
    background-image: url('~public/background.jpg')
    background-size: cover
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;

    color: #FFF

    overflow-x: hidden
    overflow-y: scroll
    -webkit-overflow-scrolling: touch

    h2
      color: #FFF

    blockquote
      font-size: 1.2rem
      font-weight: 400

    [role="name"]
      font-size: 1.5rem

    [role="messages"]
      background: #FFF
      opacity: .7
      z-index: 1
      border: 1px
      border-radius: 2px
      width: 100%
      @media screen and (max-width: 500px)
        max-width: 400px
        margin: auto
      > p
        padding: 10px
        z-index: 2
        color: #000
        font-size: 1rem
        margin: 0

    .sitcon-btn
      display: block
      width: 100%
      height: 50px
      color: white
      text-decoration: none
      background-color: rgb(225,45,147)
      cursor: pointer
      text-align: center
      line-height: 50px
      font-size: 1.2rem
    .sitcon-btn:hover
      background-color: rgb(228,0,126)

    .modal--active
      max-height: 82vh
      @media screen and (max-width: 500px)
        width: 100vw
        height: 100vh
        max-width: 100vw
        max-height: 100vh
        overflow-y: scroll
        overflow-x: hidden

    iframe
      width: 75vw
      height: 80vh
      border:none
      @media screen and (max-width: 500px)
        padding-right: 5vw
        width: 100vw
        height: 100vh

    [role="close-modal"]
      position: absolute
      background-color: #FFF
      float: right
      right: 0
      z-index: 999


</style>
