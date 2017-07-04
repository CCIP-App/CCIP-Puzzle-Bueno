<template>
  <div id="background">
    <div class="subpage--banner">
      <div id="hero">
        <div class="layer-bg layer"></div>
        <div class="layer-1 layer"></div>
        <div class="layer-2 layer"></div>
        <div class="layer-3 layer"></div>
      </div>
      <div id="hero-mobile">
        <img src="~public/sub-mb-bg.png" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Background',
  mounted () {

  }
}
</script>

<style lang="stylus">
@import "../stylus/_global/_variable"

.subpage--banner
  width: 100vw
  height: 100vh
  z-index: -1
  position: absolute
  top: 0
  left: 0

  $bronze: #fff
  $white: #fff
  $black: #50514F

  #hero
    overflow: hidden
    position: absolute
    width: 100%
    height: 100%
    top: 0
    left: 0
  
  #hero, .layer
    min-height: 1024px
  
  .layer
    background-position: bottom center
    background-size: auto
    background-repeat: no-repeat
    width: 100%
    height: $heroHeight
    position: absolute
    z-index: -1

  #hero-mobile
    position: absolute
    top: 0
    left: 0
    z-index: -1
    width: 100%
    height: 700px
    display: none
    img
      width: 100%
      height: auto

  .layer-bg
    background-size: cover
    background-repeat: no-repeat
    background-image: url('~public/sub-bg.png')

  .layer-2
    background-image: url('~public/sub-dot.png')
    background-size: cover
    background-repeat: no-repeat

  @media only screen and (max-width: $mobile-screen-width)
    #hero, .layer
      min-height: 550px
</style>
