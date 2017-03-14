<template>
  <div id='Counter'>
    <qrcode-reader :enable="true" :width="qrcodeSize.width" :height="qrcodeSize.height" :noResult="true" title="" subTitle="" @OnSuccess="OnSuccess" class="pa-3"></qrcode-reader>
    <v-row v-if="!isAndroid">
      <v-btn block primary dark class="mt-4 mb-3 mr-3 ml-3" @click.native="closeCounter">關閉計算器</v-btn>
    </v-row>
    <v-container fluid>
      <v-row class="pa-3">
        <div role="messages">
          <p>掃描不同夥伴的 QR Code 可以統計夥伴們的程式碼拼圖總數量</p>
          <template v-if="partner.nickname.length > 0">
            <p>已經計算了：{{ partnerName }}的拼圖</p>
          </template>
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
    name: 'Counter',
    data() {
      return {
        isAndroid: false,
        partner: {
          token: [],
          nickname: []
        },
        puzzle: [],
        qrcodeSize: {
          width: '80vw',
          height: '60vw'
        }
      }
    },
    computed: {
      chipsConuter: function() {
        if (this.puzzle.length === 0) return []
        return this.puzzle.reduce((pv, cv) => {
          var specialChip = pv.find((el) => el.displayName === cv)
          if (specialChip === undefined) {
            pv.push({ displayName: cv, count: 1 })
          } else {
            specialChip.count++
          }
          return pv
        }, [])
      },
      partnerName: function() {
        return this.partner.nickname.join('、')
      }
    },
    methods: {
      OnSuccess(result) {
        if (this.partner.token.indexOf(result) < 0) {
          this.partner.token.push(result)
          this.loadPuzzle(Util.sha1Gen(result))
          this.loadNickname(result)
        }
      },
      loadPuzzle(token) {
        var self = this
        api.getPuzzle(token).then((res) => {
          this.puzzle = this.puzzle.concat(res.data.puzzle)
        }).catch((error) => {
          self.$vuetify.toast.create(...['Token 無法辨識', 'bottom'])
        })
      },
      loadNickname(token) {
        var self = this
        api.getNickname(token).then((res) => {
          self.partner.nickname.push(res.nickname)
        }).catch((error) => {
          self.$vuetify.toast.create(...['Token 無法辨識', 'bottom'])
        })
      },
      closeCounter() {
        window.history.back()
      },
      detectOS() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera
        if (/android/i.test(userAgent)) this.isAndroid = true
      }
    },
    mounted() {
      var move = document.getElementById('Counter')

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
    },
    beforeMount() {
      if (window.innerWidth > 500) this.qrcodeSize = {width: '480px', height: '360px'}
      this.detectOS()
    }
  }
</script>

<style lang="stylus">
  body
    overflow: hidden
    background: transparent;
    -webkit-tap-highlight-color: transparent;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    height: 100%

  #Counter
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

    overflow: scroll
    -webkit-overflow-scrolling: touch

    h2
      color: #FFF

    blockquote
      font-size: 1.2rem
      font-weight: 400

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


</style>
