<template>
  <div id='PuzzleList'>
    <div class="content--wrapper">
      <div
        class="subPage"
        :class="{hidden: hidden}"
      >
        <div class="subpage--title">
          <div class="title--text">{{ title.zh }}</div>
        </div>
        <div class="desktop subpage--title">
          <div class="title--text">
            <div>{{ title.zh }}</div>
            <div class="divider"></div>
            <div>{{ title.en }}</div>
          </div>
        </div>
      </div>

      <div class="content">
        <p>
          今年前來 SITCON 的社群與贊助商盛況空前！在各攤位出示你的 QR Code，集章湊齊指定數量的連線，就有機會把限量紀念品帶回家。ヽ(✿ﾟ▽ﾟ)ノ
        </p>
        <p>
          兌換規則：<br>
          <ol>
            <li>集滿三條直線：能在紀念品攤位折價 20 元</li>
            <li>集滿五條直線：兌換年會刺繡布章一只</li>
            <li>集滿七條直線：兌換小石金屬鑰匙圈一只</li>
            <li>湊齊十條直線：兌換 SITCON 大禮包一袋，內含鑰匙圈與布章</li>
          </ol>
        </p>
        <p>
          p.s. 請鼓起勇氣和有空的工作人員聊天認識一下，就能收集到 SITCON 那格的章！<br>
          每張 QR Code 只能擇一兌換一次，請在達成條件之後，至 4F 文創組紀念品攤位處領取獎品。
        </p>
        <template v-if="showScanner">
          <qrcode-reader
            :enable="showScanner"
            :noResult="true"
            title=""
            subTitle="掃描 QR Code 檢視集章冊"
            @OnSuccess="OnSuccess"
          ></qrcode-reader>
        </template>
        <template v-else>
          <!-- <div role="chips">
            <div v-for="(sponsor, index) in sponsors" :key="index">
              <chip :displayName="sponsor.name[userLang]" :logoUri="sponsor.logourl" :isActive="sponsor.active" />
            </div>
          </div> -->
          <div class="table">
            <table>
              <tr
                v-for="i in range"
                :key="'r'+i"
              >
                <td
                  v-for="j in range"
                  :key="'d'+j"
                  :class="{ active: (table[i * 5 + j].element) ? table[i * 5 + j].element.active : true }"
                  :style="{ backgroundImage: `url(${(table[i * 5 + j].element) ? table[i * 5 + j].element.logourl : ''})` }"
                  :data-text="(table[i * 5 + j].element && table[i * 5 + j].element.logourl === '') ? table[i * 5 + j].element.name.en : ''"
                >
                </td>
              </tr>
            </table>
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
import config from '../../config/project.json'
import generateBingo from '../utils/generateBingo.js'

export default {
  name: 'PuzzleList',
  data () {
    return {
      data: null,
      hidden: false,
      token: '',
      // userLang: (navigator.language || navigator.userLanguage).toLowerCase().includes('zh') ? 'zh' : 'en',
      title: config.title,
      // msgText: {
      //   'zh': {
      //     gameStatus: {
      //       accomplished: '遊戲狀態：已於 ${1} 完成開源巔峰挑戰賽',
      //       unfinished: '遊戲狀態：尚未完成開源巔峰挑戰賽'
      //     },
      //     tips: [
      //       ''
      //     ],
      //     anonymousUser: '不知是何許人也',
      //     someonesStampCard: '${1} 的集章冊'
      //   },
      //   'en': {
      //     gameStatus: {
      //       accomplished: 'Status: Clear on ${1}',
      //       unfinished: 'Status: Not yet'
      //     },
      //     tips: [
      //       ''
      //     ],
      //     anonymousUser: 'Anonymous',
      //     someonesStampCard: '${1}\'s stamp collection'
      //   }
      // },
      booth: [],
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
          logourl: require('@/assets/community/SOSCONF.png')
        },
        {
          name: { en: 'MOPCON 行動科技年會' },
          logourl: require('@/assets/community/mopcon.png')
        },
        {
          name: { en: 'TDOHacker' },
          logourl: require('@/assets/community/TDOH.png')
        }
      ],
      range: [0, 1, 2, 3, 4]
    }
  },
  computed: {
    // userLang: function() {
    //   let lang = navigator.language || navigator.userLanguage
    //   return lang.toLowerCase().includes('zh') ? 'zh' : 'en'
    // },
    showScanner: function () {
      return this.token === '' && this.data === null
    },
    // name: function () {
    //   if (this.data === null) return this.msgText[this.userLang].anonymousUser
    //   else {
    //     return Util.StringFormat(
    //       this.msgText[this.userLang].someonesStampCard,
    //       this.data.user_id
    //     )
    //   }
    // },
    // valid: function () {
    //   if (this.data === null) return ''
    //   else if (this.data.valid) return Util.StringFormat(
    //     this.msgText[this.userLang].gameStatus.accomplished,
    //     new Date(this.data.valid * 1000).toLocaleString()
    //   )
    //   else return this.msgText[this.userLang].gameStatus.unfinished
    // },
    sponsors: function () {
      return this.booth
        .filter(el => this.communityList.find(ele => ele.name.en === el) === undefined)
        .map(el => {
          const sponsor = this.sponsorList.find(sponsor => sponsor.name.en === el)
          return (sponsor) || {
            name: {
              en: el
            },
            logourl: ''
          }
        })
        .map(el => {
          el.active =
            this.data && this.data.deliverer
              ? this.data.deliverer.indexOf(el.name.en) >= 0
              : false
          return el
        })
        .map(el => {
          if (el.name.en === '國網中心') {
            el.logourl = require('@/assets/sponsors/nchc.png')
            el.active = true
          }
          if (el.name.en === '創代科技股份有限公司') {
            el.active = true
          }
          return el
        })
    },
    communities: function () {
      return this.communityList
        .filter(el => this.booth.indexOf(el.name.en) >= 0)
        .map(el => {
          el.active =
            this.data && this.data.deliverer
              ? this.data.deliverer.indexOf(el.name.en) >= 0
              : false
          return el
        })
    },
    table: function () {
      return generateBingo(this.sponsors, this.communities, this.token)
    }
  },
  methods: {
    OnSuccess (result) {
      if (result !== this.token) {
        window.location.search = 'token=' + Util.sha1Gen(result)
      }
    },
    loadPuzzle () {
      var self = this
      api
        .getPuzzle(this.token)
        .then(res => {
          self.data = res.data
        })
        .catch(error => {
          console.log(error)
          setTimeout(() => {
            window.location.search = ''
          }, 3 * 1000)
        })
    },
    loadDeliverers () {
      var self = this
      api.getBoothList().then(res => {
        self.booth = res
      })
    },
    loadSponsor () {
      var self = this
      api.getSponsorList().then(res => {
        self.sponsorList = res
      })
    }
  },
  beforeMount () {
    var query = {}
    if (
      window.location.search.length > 0 &&
      (query = Util.parseQueryParams(window.location.search))
    ) {
      this.token = query.token
      this.hidden = query.mode === 'app'
      this.loadPuzzle()
    }
    this.loadSponsor()
    this.loadDeliverers()
  }
  // mounted() {
  //   // var move = document.getElementById('PuzzleList')

  //   // move.addEventListener('touchstart', function () {
  //   //   var top = move.scrollTop
  //   //   var totalScroll = move.scrollHeight
  //   //   var currentScroll = top + move.offsetHeight
  //   //   if (top === 0) {
  //   //     move.scrollTop = 1
  //   //   } else if (currentScroll === totalScroll) {
  //   //     move.scrollTop = top - 1
  //   //   }
  //   // })

  //   // var query = {}

  //   // if (window.location.search.length > 0
  //   //   && (query = Util.parseQueryParams(window.location.search))
  //   //   && query.mode === 'app') {
  //   //   document.getElementsByClassName('subPage')[0].classList.toggle('hidden')
  //   // }
  // }
}
</script>

<style lang="stylus" scoped>
#PuzzleList
  display flex
  flex-direction column
  min-height 100vh

  p
    margin 5px auto
    width 70%
    color #604726
    text-align left

    @media screen and (max-width: 600px)
      width 90%

  ol
    margin 5px auto
    width 70%
    text-align left
    @media screen and (max-width: 600px)
      width 90%

  .subPage
    margin-bottom 1rem
    padding 15px
    background-color rgba(66, 93, 79, 0.5)
    color white

  .subPage.hidden + .content
    margin-top 3rem

  [role='chips']
    display flex
    flex-wrap wrap
    justify-content space-between
    align-items center
    padding 0 1em

    @media screen and (max-width: 666px) and (orientation: landscape)
      padding 0 3em // smaller than iPhone 6

    @media screen and (max-width: 454px)
      display block
      margin 0 auto // must bigger than 454px for two column

    > div
      @media screen and (min-width: 1024px)
        min-width 25%

      padding 0 0.5em

  .content
    .table
      margin-top 12px
      padding 18px 0
      background-color rgb(217, 183, 139)
      box-shadow 0 0 10px rgba(40, 40, 40, 0.5)

      table
        margin 0 auto
        width 90%
        border-collapse collapse
        table-layout fixed

        td
          width 20%
          border 3px solid rgb(136, 98, 52)
          padding 0px
          filter grayscale(0.9) blur(1px)
          vertical-align middle
          background-size contain
          background-position center
          background-repeat no-repeat
          padding-bottom 20%
          position relative

          &:after
            content attr(data-text)
            position absolute
            top 50%
            left 50%
            transform translate(-50%, -50%)

          &.active
            filter none
            background-color #fff
            background-clip padding-box
            box-shadow 0 0 10px rgba(40, 40, 40, 0.8)

            &:before
              position absolute
              top 0
              right 0
              bottom 0
              left 0
              background-image url('../assets/meow.png')
              background-position center
              background-size auto 100%
              background-repeat no-repeat
              content ''
              opacity 0.6
</style>
