<template>
    <div class="content">
        <!--<button class="button button1" @click="$router.go(-1)">❮ Назад</button>-->
        <div class="post">
            <div class="header">
                <p>{{ post.name }}</p>
            </div>
            <div class="announce" v-html="post.content"></div>

            <div class="tasks" v-if="post.tests">
                <h2>Перевірте себе</h2>
                <form name="tests" :id="'id_'+post.tests.id">
                    <input type="hidden" name="task_id" :value="post.tests.id">
                    <div v-for="(item, index) in post.tests.test_questions" :key="item.id">
                        <p><b>{{index+1}}. </b> {{item.question}}</p>
                        <div class="boxes">
                            <div class="answer" v-for="answer in item.answers" :key="answer.id">
                                <input type="checkbox" :id="'box-'+answer.id" :name="'box_'+answer.id">
                                <label :for="'box-'+answer.id">{{answer.variant}}</label>
                            </div>
                        </div>
                    </div>

                    <div class="send_btn" v-on:click="send_for_checking()">відправити</div>

                </form>
            </div>
            <div class="announce" v-if="post.sources">
                <h2>Список джерел</h2>
                <div v-html="post.sources"></div>
            </div>
            <div class="more">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                post: this.$parent.$root.posts.filter(post => post.id == this.$route.params.id)[0],
                error: null,
            }
        },
        mounted() {

            const PostScriptsContainer = document.getElementById('postScripts');
            PostScriptsContainer.innerHTML = "";
            document.body.removeChild(PostScriptsContainer);
            let newScriptContainer = document.createElement('script');
            newScriptContainer.setAttribute("id", "postScripts");
            document.body.appendChild(newScriptContainer);

            if (this.post.post_scripts !== undefined) {
                const b = document.getElementById('postScripts');
                b.insertAdjacentHTML('afterbegin', this.post.post_scripts)
                let funcionName = (this.post.post_scripts)
                    .split(' ', 2)[1]
                    .split('(', 1)[0];

                window[funcionName]();
            }
        },
        beforeRouteEnter(to, from, next) {
            // вызывается до подтверждения пути, соответствующего этому компоненту.
            // НЕ имеет доступа к контексту экземпляра компонента `this`,
            // так как к моменту вызова экземпляр ещё не создан!

            next()
        },

        beforeRouteUpdate(to, from, next) {
            // react to route changes...
            // don't forget to call next()

            next()
        },


        methods: {
            send_for_checking() {

                var checked = [];

                $(".tasks input:checkbox:checked").each(function () {
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
                    } else {
                        result = ((goodChoice / rightCount) * 100).toFixed(0);
                    }
                }

                var res = {
                    result: result,
                    token: this.$session.get('user-token'),
                    test: this.post.tests.id,
                    material: this.post.id
                };

                fetch('http://backend.kuharenko.xyz/site/set-test-result', {
                    method: 'POST',
                    body: JSON.stringify(res)
                })
                    .then(function (res) {
                        return res.json();
                    });
                $(".tasks input:checkbox:checked").each(function () {
                    $(this).prop("checked", false);
                });
                // $('.overlay').addClass('active');
                // $('.overlay #modal .title').text('Результат вашого тестування!');

                var modal = document.getElementById('myModal');
                modal.style.display = "block";
                $('#myModal .modal-body').text(result + '%');

                // $('.overlay #modal .response').text(result + '%');

            },

        },
    }
</script>

<style lang="scss" scoped>
    .content {
        .header{
            /*border: 1px solid #b3b3b3;*/
            /*background-color: #e2e2e2;*/
            /*padding: 0px 30px;*/
            p{
                margin: 0;
                color: #3f3844;
                font-size: 48px;
                font-weight: bold;
                /*text-align: center;*/
            }
        }
        .post {
            h2 {
                color: #444444;
            }
        }
    }

    .slide-enter {
        opacity: 0;
        transform: translate(30px, 0);
    }

    .slide-leave-active {
        opacity: 0;
        transform: translate(-30px, 0);
    }
</style>
