<template>
        <div class="content">
            <h2>Список категорій</h2>
                <div class="category" v-for="category in categories">
                    <p>{{ category.name }}</p>
                        </div>
                    </div>
</template>

<script>

export default {
  data: function(){
            return {
                categories : [],
            }
        },
        
        mounted() {
            var myHeaders = new Headers({
                "Content-Type": "application/json"
            });
            var that = this;
            fetch('http://backend.kuharenko.xyz/category')
                .then(function (response) {
                    return response.json();
                })
                .then(function (json) {
                    that.categories = json;
                    return that.categories;
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
