<template>
  <div id="background">
    <div class="subpage--banner">
      <div id="hero">
        <div class="layer-bg layer"></div>
        <div class="layer-1 layer"></div>
        <div class="layer-2 layer"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Background'
}
</script>

<style lang="stylus" scoped>
.subpage--banner
  width: 100%

  #hero, .layer
    z-index: -1
    min-height: 712px
    position: absolute
    top: 0
    left: 0
    @media screen and (max-width: 720px)
      min-height: 550px
  #hero
    width: 100vw
    transform: translateX(-7.5%) scale(1.15)

    .layer
      width: 100%
      position: absolute
      z-index: -1

    .layer-bg
      background-size: cover
      background-repeat: no-repeat
      background-image: url('../assets/sub-bg.png')
      background-position: center bottom

    .layer-2
      background-image: url('../assets/sub-dot.png')
      background-size: cover
      background-repeat: no-repeat
      background-position: center bottom
</style>
