<template>
    <div class="main-menu">
        <div id="list">
            <router-link :to="{ path: '/'}" class="main-menu__item">
                <i class="fas fa-book"></i>
            </router-link>
            <div class="side-menu">
                <h4>Содержание</h4>
                <div class="sub-menu-content">
    
                    <router-link v-for="post in posts" :key="post.id" :to="{ path: '/post/'+post.id }" :style="{paddingLeft: 15 + 25 * post.depth + 'px' }" class="sub-menu-item">
                        {{post.name}}
                    </router-link>
                </div>
            </div>
        </div>
    
        <router-link :to="{ path: '/vocabulary'}" class="main-menu__item">
            <i class="far fa-folder"></i>
        </router-link>
    
        <router-link :to="{ path: '/progress'}" class="main-menu__item">
            <i class="fas fa-tasks"></i>
        </router-link>
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
    .main-menu {
        #list {
            &:hover {
                .side-menu {
                    display: block;
                }
            }
        }
        .side-menu {
            font-weight: 900;
            font-size: 16px;
            width: 300px;
            // height: 200px;
            position: absolute;
            border-left: 1px solid black;
            left: 80px;
            top: 0px;
            padding: 10px 0;
            background-color: #353535;
            display: none;
            h4 {
                text-align: center;
                text-transform: uppercase;
                color: white;
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
                    color: white;
                    &:hover {
                        background-color: green;
                    }
                }
            }
        }
    }
</style>
