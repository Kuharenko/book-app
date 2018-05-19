<template>
    <div class="content">

        <div class="post" v-for="post in posts" :key="post.id">
            <h2>{{ post.name }}</h2>
            <div class="announce">{{ post.announce }}</div>
            <div class="more">
                <div class="tags">
                    <span v-for="category in post.categories" :key="category.id">
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
        data: function() {
            return {
                posts: this.$parent.$root.posts,
                pager: []
            }
        },
        methods: {
            nextBtn() {
                this.loadMaterials(this.pager.next.href);
            },
            prevBtn() {
                this.loadMaterials(this.pager.prev.href);
            },
            lastBtn() {
                this.loadMaterials(this.pager.last.href);
            },
            firstBtn() {
                this.loadMaterials(this.pager.first.href);
            },
        },
    }
</script>

<style lang="scss" scoped>
    .post {
        h2 {
            color: black;
        }
    }
    
    .list {
        ul {
            list-style: none;
            padding: 0;
        }
    }
</style>
