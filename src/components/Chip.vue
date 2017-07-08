<template>
  <div role="chip" :class="{ active: isActive }">
    <img :src="logourl">
  </div>
</template>

<script>
export default {
  name: 'Chip',
  props: {
    displayName: {
      type: String,
      default: ''
    },
    logoUri: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    logourl() {
      return window.devicePixelRatio && window.devicePixelRatio > 1 ? this.logoUri.replace(/.png$/, '@2x.png') : this.logoUri
    }
  },
  mounted() {
  }
}
</script>

<style lang="stylus" spcoed>
  [role="chip"]
    @media screen and (max-width: 454px) // must bigger than 454px for two column
      width: 80vw
      height: 53.33vw
      margin: 1em auto
    display: block
    background: #fff
    border: 2px solid #fff
    border-radius: 5px
    padding: 10px
    width: 195px
    height: 130px
    margin: .5em auto
    box-shadow: 0 50px 50px rgba(0,0,0,.1)
    &.active
      img
        filter: none
    img
      filter: opacity(.5)
      max-width: 100%
      max-height: 100%
      
</style>
