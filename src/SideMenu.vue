<template>
    <div class="menu">
        <nav>
            <ul>
                <li>
                    <router-link :to="{ path: '/'}" class="header">
                        Зміст
                    </router-link>
                    <div class="dropdown" style="">
                        <router-link v-for="post in posts" :key="post.id" :to="{ path: '/post/'+post.id }"
                                     :style="{paddingLeft: 15 + 25 * post.depth + 'px' }">
                            {{post.name}}
                        </router-link>
                    </div>
                </li>
                <li>
                    <router-link :to="{ path: '/progress'}" class="signin">Прогрес</router-link>
                </li>
            </ul>
        </nav>

    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                posts: this.$parent.$root.posts,
            }
        },
    }
</script>

<style lang="scss" scoped>


    nav {
        max-width: 960px;
        mask-image: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #ffffff 25%, #ffffff 75%, rgba(255, 255, 255, 0) 100%);
        margin: 0 auto;
        padding: 60px 0;
    }

    nav ul {
        text-align: center;
        background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 25%, rgba(255, 255, 255, 0.2) 75%, rgba(255, 255, 255, 0) 100%);
        box-shadow: 0 0 25px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
    }

    nav ul li {
        display: inline-block;
    }

    nav ul li a {
        padding: 18px;
        font-family: "Open Sans";
        text-transform: uppercase;
        color: rgba(0, 35, 122, 0.5);
        font-size: 18px;
        text-decoration: none;
        display: block;
    }

    nav ul li a:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), inset 0 0 1px rgba(255, 255, 255, 0.6);
        background: rgba(255, 255, 255, 0.1);
        color: rgba(0, 35, 122, 0.7);
    }

    .menu-line {
        /*background-color: rgba(53,53,53,0.21);*/
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
        .signin {
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
        background-color: rgba(53, 53, 53, 0.21);
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

    li {
        position: relative;
        .dropdown {
            display: none;
            position: absolute;
            width: 400px;
            top: 60px;
            left: 0;
            box-shadow: 0 3px 17px rgba(0, 0, 0, 0.5), inset 0 0 0 white;
            background: rgba(255, 255, 255, 1);
            /*padding: 20px;*/
            a {
                padding: 10px 35px 15px 0;
                font-size: 14px;
                font-weight: bolder;
                text-align: left;
                background-color: ghostwhite;
                border-bottom: 1px solid #dfdfdf;
                &:hover {
                    box-shadow: none;
                }
            }
        }
        &:hover {
            .dropdown {
                display: flex;
                flex-direction: column;
            }
        }
    }
</style>
