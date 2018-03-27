<template>
        <div class="content">
                <div class="post" v-for="post in posts">
                    <h2>{{ post.name }}</h2>
                    <div class="announce">{{ post.announce }}</div>
                    <div class="more">
                        <div class="tags">
                            <span v-for="category in post.categories">
                                <b>{{category.name}} </b>
                            </span>
                        </div>
                        <router-link :to="{ path: '/post/'+post.id}">детальніше...</router-link>
                    </div>
                </div>
            </div>
</template>

<script>

export default {
  data: function(){
            return {
                posts : [],
            }
        },
        
        mounted() {
            var myHeaders = new Headers({
                "Content-Type": "application/json"
            });
            var that = this;
            fetch('http://backend.kuharenko.xyz/post')
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    that.posts = json;
                    return that.posts;
                })
                .then(function (json) {
                    
                     const PostScriptsContainer = document.getElementById('postScripts');
                     PostScriptsContainer.innerHTML = "";

                     document.body.removeChild(PostScriptsContainer);
                     let newScriptContainer = document.createElement('script');
                     newScriptContainer.setAttribute("id", "postScripts");
                     document.body.appendChild(newScriptContainer);

                })
                .catch(function (error) {
                    console.log('Request failed', error);
                });
        }
}
</script>

<style lang="scss" scoped>
.post{
    h2{
        color: black;
    }
}
</style>
