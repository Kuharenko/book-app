<template>
    <div id="app">
        <side-menu></side-menu>
        <div class="container">
            <transition name="slide-fade" mode="out-in">
                <router-view :key="$route.fullPath"></router-view>
            </transition>
        </div>
    </div>
</template>

<style lang="css">
    #app{
        display: flex;
    }
    .slide-fade-enter-active {
        transition: all .7s ease;
    }

    .slide-fade-leave-active {
        transition: all .6s ease;
    }

    .slide-fade-enter
    {
        transform: perspective(3000px) translateZ(-150px);
        /*transform: translateY(350px);*/
        opacity: 0;
    }

    .slide-fade-leave-to
    {
        /*transform: translateY(-350px);*/
        transform: perspective(800px) translateZ(150px);
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
        max-width: 1200px;
        margin-left: 250px;
    }


</style>
