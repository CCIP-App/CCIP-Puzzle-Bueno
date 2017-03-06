<template>
  <div id='PuzzleList'>
    <template v-if="showScanner">
      <qrcode-reader :enable="qrState" width="320px" height="240px" :noResult="true" title="" subTitle="掃描QR Code 檢視拼圖清單" @OnSuccess="OnSuccess"></qrcode-reader>
    </template>
    <v-container fluid v-else-if="data !== null">
      <v-row>
        <v-col md8>
          <p role="name">{{ name }}</p>
          <blockquote>{{ valid }}<br>{{ coupon }}</blockquote>
        </v-col>
      </v-row>
      <v-row>
        <div role="messages" class="mt-3">
          <p>完成程式碼拼圖後，在購買 SITCON 文創商品可折抵 50 元唷！</p>
        </div>
      </v-row>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="chip in chipsConuter" class="ma-0 pa-0">
          <chip :displayName="chip.displayName" :count="chip.count"></chip>
        </v-col>
      </v-row>
    </v-container>
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
        qrState: true,
        token: ''
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
          self.qrState = false
        }).catch((error) => {
          self.$vuetify.toast.create(...['Token 無法辨識', 'bottom'])
          setTimeout(() => {
            window.location.search = ''
          }, 3 * 1000)
        })
      }
    },
    mounted() {
      var query = {}
      if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
        this.token = query.token
        this.loadPuzzle()
      }
    }
  }
</script>

<style lang="stylus">
  #PuzzleList
    height: 100vh
    width: 100%
    background-image: url('~public/background.jpg')
    background-repeat: repeat-y
    background-size: cover
    color: #FFF

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
      border-radius: 5px
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
</style>
