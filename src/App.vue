<template>
    <div class="container">
        <div id="app">
            <!-- <loading v-if="$root.loading"></loading> -->
            <transition name="flip" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<style lang="css">
     .slide-fade-enter-active {
         transition: all .3s ease;
     }
     
     .slide-fade-leave-active {
         transition: all .3s ease - bezier(1.0, 0.5, 0.8, 1.0);
     }
     
     .slide-fade-enter,
     .slide-fade-leave-to
     /* .slide-fade-leave-active до версии 2.1.8 */
     
     {
         transform: translateX(200px);
         opacity: 0;
     }
     
     .flip-enter-active {
         transition: all .4s cubic-bezier(0.55, 0.085, 0.68, 0.53);
     }
     
     .flip-leave-active {
         transition: all .4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
     }
     
     .flip-enter,
     .flip-leave-to {
         transform: scaleY(0) translateZ(0);
         opacity: 0;
     }
     
     .container {
         max-width: 1000px;
         margin: 0 auto;
     }
</style>
