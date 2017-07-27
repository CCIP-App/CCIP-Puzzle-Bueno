<template>
  <div id='Booth'>
    <qrcode-reader class="scanner" v-if="boothToken!==''" :enable="qrState" width="400px" height="300px" :noResult="true" :title="'程式碼拼圖發放'" :subTitle="'攤位：' +boothName" @OnSuccess="OnSuccess"></qrcode-reader>
    <div role="messages">
      <p :class="{ 'red--text': alertError, 'green--text': alertSuccess }">{{ alertMessages }}</p>
    </div>
    <Footer />
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
            self.alertMessages = '成功拼圖發送給 ' + res.nickname +' (・ω・)ノ'
            self.alertSuccess = true
            self.alertError = false
          }).catch((error) => {
            if (error.response) {
              switch (error.response.data.message) {
                case 'Already take from this deliverer':
                  self.alertMessages = '已經領過拼圖囉(￣▽￣)'
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
  background-size: cover
  background-repeat: no-repeat
  background-image: url('~public/footer.png')
  background-position: center bottom

</style>
