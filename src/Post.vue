<template>
    <div class="content">
        <router-link to="/">Назад</router-link>
        <div class="post">
            <h2>{{ post.name }}</h2>
            <div class="announce" v-html="post.content"></div>
    
            <div class="tasks" v-if="post.tests">
                <h2>Перевірте себе</h2>
                <form name="tests" :id="'id_'+post.tests.id">
                    <input type="hidden" name="task_id" :value="post.tests.id">
                    <div v-for="(item, index) in post.tests.test_questions">
                        <p><b>{{index+1}}. </b> {{item.question}}</p>
                        <div class="boxes">
                            <div class="answer" v-for="(answer, answer_index) in item.answers">
                                <input type="checkbox" :id="'box-'+answer.id" :name="'box_'+answer.id">
                                <label :for="'box-'+answer.id">{{answer.variant}}</label>
                            </div>
                        </div>
                    </div>
    
                    <div class="send_btn" v-on:click="send_for_checking()">відправити</div>
    
                </form>
            </div>
    
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
                error: null
            }
        },
        beforeRouteEnter(to, from, next) {
            // вызывается до подтверждения пути, соответствующего этому компоненту.
            // НЕ имеет доступа к контексту экземпляра компонента `this`,
            // так как к моменту вызова экземпляр ещё не создан!
            console.log("loading material");
    
            next(vm => vm.fetchData())
        },
        methods: {
            send_for_checking() {
    
                var checked = [];
    
                $(".tasks input:checkbox:checked").each(function() {
                    checked.push(parseInt($(this).attr('id').split('box-')[1]));
                });
    
                var questions = this.post.tests.test_questions;
                var answers = [];
                questions.forEach(element => {
                    element.answers.forEach(ans => {
                        answers.push({
                            'id': ans.id,
                            'isRight': ans.isRight
                        });
                    })
                });
    
    
                var goodChoice = 0;
                var rightCount = 0;
                answers.forEach(element => {
                    if (element.isRight == 1) {
                        rightCount++;
                    }
                    if (checked.indexOf(parseInt(element.id)) != -1) {
                        if (element.isRight == 1) {
                            goodChoice++;
                        }
                    }
    
                });
                let result = 0;
                if (checked.length <= 0) {
                    result = 0;
                } else {
                    if (checked.length > rightCount) {
                        result = ((goodChoice / checked.length) * 100).toFixed(0);
                    }else{
                        result = ((goodChoice / rightCount) * 100).toFixed(0);
                    }
                }
    
                $('.overlay').addClass('active');
                $('.overlay #modal .title').text('Результат вашого тестування!');
                $('.overlay #modal .response').text(result + '%');
    
            },
    
            fetchData() {
                this.error = null
                this.post = []
    
                this.getMaterial(this.$route.params.id);
    
            },
            getMaterial(id) {
                var that = this;
                fetch('http://backend.kuharenko.xyz/posts/' + id + '?expand=categories,tests')
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(json) {
                        that.post = json;
                        // console.log(that.post);
                        return that.post;
                    }).then(function(result) {
                        /**
                         * При загрузке материала, подгружаем и запускаем его js-скрипты  
                         */
    
                        const b = document.querySelector('#postScripts');
                        b.insertAdjacentHTML('afterbegin', result.post_scripts)
                        let funcionName = (result.post_scripts)
                            .split(' ', 2)[1]
                            .split('(', 1)[0];
                        window[funcionName]();
                    })
                    .catch(function(error) {
                        console.log('OOps Request failed', error);
                        return error;
                    });
            }
    
    
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
