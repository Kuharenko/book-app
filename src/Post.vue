<template>
    <div class="content">
        <router-link to="/">Назад</router-link>
        <div class="post">
            <h2>{{ post.name }}</h2>
            <div class="announce" v-html="post.content"></div>
            <div class="more">
                <div class="tags">
                    <span v-for="category in post.categories">
                                    <b>{{category.name}} </b>
                                 </span>
                </div>
            </div>
        </div>
    
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                post: [],
            }
        },
    
        mounted() {
            var myHeaders = new Headers({
                "Content-Type": "application/json"
            });
            var that = this;
            fetch('http://api.book.my/post/' + this.$route.params.id, {
                    'mode': 'cors',
                    'headers': myHeaders
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    that.post = json;
                    return that.post;
                }).then(function(result) {
                    /**
                     * При загрузке материала, подгружаем и запускаем его js-скрипты  
                     */
                    
                    const b = document.querySelector('#postScripts');
                    b.insertAdjacentHTML('afterbegin', result.post_scripts)
                    let funcionName = (result.post_scripts)
                        .split(' ',2)[1]
                        .split('(',1)[0];
                    window[funcionName]();

                })
                .catch(function(error) {
                    console.log('Request failed', error);
                });
        },
        
    }
</script>

<style lang="scss" scoped>
    .post {
        h2 {
            color: black;
        }
    }
</style>
