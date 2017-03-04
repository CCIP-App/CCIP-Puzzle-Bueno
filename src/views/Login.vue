<template>
  <div id='Login'>
    <v-container fluid>
      <v-row>
        <v-col xs12 md4 style="margin: 0 auto;">
          <v-card style="margin: 0 auto;" class="grey lighten-4">
            <v-card-text>
              <h4 class="ma-0">Login</h4>
              <v-container fluid>
                <v-row>
                  <v-col xs12 md10 style="margin: 0 auto;">
                    <v-text-input id="account" name="account" placeholder="Your Account" v-model="account" :disabled="disabled"></v-text-input>
                    <v-text-input id="password" type="password" name="password" placeholder="Your password" v-model="password" :disabled="disabled"></v-text-input>
                    <v-btn block ripple info @click.native="login" :disabled="disabled" :loading="disabled">Login</v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  export default {
    name: 'Login',
    data() {
      return {
        account: '',
        password: '',
        disabled: false
      }
    },
    methods: {
      parameters() {
        return location.search.toString().split('?').pop().split('&').map(p => {
          var ps = p.split('=')
          var o = {}
          o[ps.shift()] = ps.join('=')
          return o
        }).reduce((a, b) => {
          var o = a
          for (var k in b) {
            o[k] = b[k]
          }
          return o
        })
      }
    },
    mounted() {
      var self = this
      if (this.parameters().token !== undefined) {
        api.checkBoothToken(this.parameters().token).then((res) => {
          window.localStorage.setItem('token', this.parameters().token)
          window.localStorage.setItem('name', res.data.display_name)
          alert('登入成功')
          self.$router.replace('/AddPuzzle')
        }).catch((error) => {
          self.$vuetify.toast.create(...['登入失敗，請檢查連結Token是否正確？', 'bottom'])
        })
      }
    }
  }
</script>
