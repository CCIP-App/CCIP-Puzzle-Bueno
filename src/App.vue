<template>
  <v-app>
    
    <main>
        <v-container fluid>
          <transition name="slide" mode="out-in">
            <router-view class="pa-4"></router-view>
          </transition>
        </v-container>
    </main>
  </v-app>
</template>

<script>

</script>

<style lang="stylus">
  @import './stylus/main'
</style>