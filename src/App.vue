<template>
<div class = "container"> 
    <div id = "app"> 
            <transition name = "slide-fade">
                <router-view ></router-view>
            </transition>
        </div>
    </div>
</template>  

<style lang="css"> 
    .slide-fade-enter-active {
    transition:all .3s ease; 
    }
    .slide-fade-leave-active {
    transition:all .3s cubic - bezier(1.0, 0.5, 0.8, 1.0); 
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active до версии 2.1.8 */ {
    transform:translateX(10px); 
    opacity:0; 
    } 
    .container{
        max-width: 1000px;
        margin: 0 auto;
    }
</style> 
