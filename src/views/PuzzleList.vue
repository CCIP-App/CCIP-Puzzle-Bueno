<template>
  <div id='Dashboard'>
    <v-container fluid>
      <v-row>
        <v-col lg2="lg2" md4="md4" xs6="xs6" v-for="(card,index) in cards" class="pa-2">
          <puzzle :text="card.name"></puzzle>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import * as api from '../modal/apiClient.js'
  export default {
    name: 'Dashboard',
    data() {
      return {
        data: null
      }
    },
    computed: {
      cards: function() {
        return this.data.puzzle
      }
    },
    mounted() {
      api.getPuzzle(this.$route.params.token).then((res) => {
        this.data = res.data
      }).catch((error) => {
        this.$vuetify.toast.create(...['發生錯誤', 'bottom'])
      })
    }
  }
</script>

<style scoped>

</style>
