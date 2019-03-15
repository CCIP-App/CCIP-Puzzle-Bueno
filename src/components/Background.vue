<template>
  <div id="background">
    <!-- <div class="subpage--banner">
      <div id="hero">
        <div class="layer-bg layer"></div>
        <div class="layer-1 layer"></div>
        <div class="layer-2 layer"></div>
      </div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'Background',
  mounted () {
    // var rotateBg = this.$el
    // var deg = 150
    // var step = 1
    // var transform = 'translateY(-132px)'
    // setInterval(function () {
    //   rotateBg.style.transform = transform + ' rotate(' + deg + 'deg)'
    //   deg += step
    //   // console.log(deg)
    // }, 100)

    // var incrStep = function () {
    //   step += 10
    // }
    // var uncrStep = function () {
    //   step -= 10
    // }

    // document.onkeydown = function (event) {
    //   // console.log(event.which)
    //   if (event.which === 39) incrStep()
    //   else if (event.which === 37) uncrStep()
    // }
  }
}
</script>

<style lang="stylus" scoped>
#background
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color #efe9dc
  background-image: url('../assets/sitcon-home.png');
  background-repeat: repeat;
  background-size: 100%;
  background-position: center center;
  transition: all 2s;
  z-index -1

@media screen and (max-width: 720px)
  #background-coscup
    left: -200px;
    right: -200px;
    top: -200px;
    bottom: -200px;
    transform: translateY(-132px) rotate(120deg);
// .subpage--banner
//   width: 100%

//   #hero, .layer
//     z-index: -1
//     min-height: 712px
//     position: absolute
//     top: 0
//     left: 0
//     @media screen and (max-width: 720px)
//       min-height: 550px
//   #hero
//     width: 100vw
//     transform: translateX(-7.5%) scale(1.15)

//     .layer
//       width: 100%
//       position: absolute
//       z-index: -1

//     .layer-bg
//       background-size: cover
//       background-repeat: no-repeat
//       background-image: url('../assets/sub-bg.png')
//       background-position: center bottom

//     .layer-2
//       background-image: url('../assets/sub-dot.png')
//       background-size: cover
//       background-repeat: no-repeat
//       background-position: center bottom
</style>
