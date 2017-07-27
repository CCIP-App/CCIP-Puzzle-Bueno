<template>
  <div id='Booth'>
    <div class="content--wrapper">
      <div class="subPage">
        <div class="mobile subpage--title">
          <div class="title--text">開源巔峰挑戰賽 - 攤位端</div>
        </div>
        <div class="desktop subpage--title">
          <div class="title--text">
            <div>開源巔峰挑戰賽 - 攤位端</div>
            <div class="divider"></div>
            <div>Booth Reward Activity - Booth</div>
          </div>
        </div>
      </div>
      <div class="content">
        <qrcode-reader class="scanner" v-if="boothToken!==''" :enable="qrState" width="400px" height="300px" :noResult="true" :title="'攤位：' +boothName" @OnSuccess="OnSuccess"></qrcode-reader>
        <div role="messages">
          <p :class="{ 'red--text': alertError, 'green--text': alertSuccess }">{{ alertMessages }}</p>
        </div>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  import Util from '../modal/util.js'
  export default {
    name: 'Booth',
    data() {
      return {
        boothName: 'Unknow booth',
        boothToken: '',
        qrState: true,
        buffer: '',
        alertMessages: '攤位驗證成功，掃描 QR Code 即可發送程式碼拼圖',
        alertError: false,
        alertSuccess: false
      }
    },
    methods: {
      OnSuccess(result) {
        var self = this
        if (this.buffer !== result) {
          this.buffer = result
          api.grantPuzzle(this.boothToken, result).then((res) => {
            return api.getNickname(result)
          }).then((res) => {
            self.alertMessages = '成功幫 ' + res.nickname +'蓋章囉 (・ω・)ノ'
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
              self.alertMessages = '網路可能出包了_(´ཀ`」 ∠)_'
            }
            self.alertError = true
            self.alertSuccess = false
          })
        }
      }
    },
    mounted() {
      var self = this
      var query = {}
      if (window.location.search.length > 0 && (query = Util.parseQueryParams(window.location.search))) {
        api.checkBoothToken(query.token).then((res) => {
          self.boothToken = query.token
          self.boothName = res.data.display_name
        }).catch((error) => {
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
  .content
    min-height: 212px
    background-size: cover
    background-repeat: no-repeat
    background-image: url('~public/footer.png')
    background-position: center top
  [role="messages"]
    text-align: center

</style>
