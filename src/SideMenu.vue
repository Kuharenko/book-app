<template>
    <div class="side-menu">
        <div class="menu-line">
            <router-link :to="{ path: '/progress'}" class="signin">
                <i class="fas fa-sign-in-alt"></i>
            </router-link>
        </div>
        <div class="main-menu">
    
            <!-- <div id="list">
                    <router-link :to="{ path: '/'}" class="main-menu__item">
                        <i class="fas fa-book"></i>
                    </router-link> -->
            <router-link :to="{ path: '/'}" class="header">
                        Зміст
                    </router-link>
            <div class="sub-menu-content">
    
                <router-link v-for="post in posts" :key="post.id" :to="{ path: '/post/'+post.id }" :style="{paddingLeft: 15 + 25 * post.depth + 'px' }" class="sub-menu-item">
                    {{post.name}}
                </router-link>
            </div>
            <div class="side-menu">
    
            </div>
            <!-- </div> -->
    
            <!-- <router-link :to="{ path: '/progress'}" class="main-menu__item">
                    <i class="fas fa-tasks"></i>
                </router-link> -->
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                posts: this.$parent.$root.posts,
            }
        },
    }
</script>

<style lang="scss" scoped>
.menu-line{
    background-color: rgba(53,53,53,0.21);
    height: 40px;
    border-left: 1px solid black;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    // width;
    padding: 0 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    z-index: 4;
    .signin{
        font-size: 24px;
        color: black;
    }
}
    .main-menu {
        font-weight: 900;
        font-size: 16px;
        width: 300px;
        // height: 200px;
        position: fixed;
        border-left: 1px solid black;
        left: 0;
        top: 40px;
        padding: 10px 0;
        background-color: rgba(53,53,53,0.21);
        max-width: 100%;
        // display: none;
        .header {
            text-align: center;
            text-transform: uppercase;
            color: black;
        }
        .sub-menu-content {
            // padding-left: 20px;
            text-align: left;
            display: flex;
            flex-direction: column;
            .sub-menu-item {
                // padding: 5px 10px;
                padding-top: 10px;
                padding-bottom: 10px;
                color: black;
                &:hover {
                    background-color: green;
                }
            }
        }
    }
</style>
