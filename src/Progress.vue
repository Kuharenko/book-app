<template>
    <div>
        <div v-if="access_token">
            Hello, {{login_email}}
            <button @click.prevent="logout()">logout</button>
        </div>
        <form v-if="access_token === null">
            <input v-model="login_email" placeholder="login">
            <div class="error" v-if="login_errors">{{login_errors.email}}</div>
            <input type="password" v-model="login_password" placeholder="password">
            <div class="error" v-if="login_errors">{{login_errors.password}}</div>
            <button @click.prevent="login('login')">Войти</button>
        </form>
        <hr>
        <form v-if="access_token === null">
            <input type="email" v-model="register_email" placeholder="email">
             <div class="error" v-if="register_errors">{{register_errors.email}}</div>
            <input type="password" v-model="register_password" placeholder="New password">
             <div class="error" v-if="register_errors">{{register_errors.password}}</div>
            <button @click.prevent="login('register')">Регистрация</button>
        </form>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                login_email: localStorage['username'] ? localStorage['username'] : "",
                login_password: "",
                access_token: localStorage['user-token'] ? localStorage['user-token'] : null,
                register_email: "",
                register_password: "",
                login_errors: {
                    email: null,
                    password: null
                },
                register_errors: {
                    email: null,
                    password: null
                },
            }
        },
        methods: {
    
            login(action) {
                var myHeaders = new Headers();
                var fields = {
                    email: this.login_email,
                    password: this.login_password,
                    register_email: this.register_email,
                    register_password: this.register_password
                };

    
                myHeaders.append('Content-Type', 'text/plain');
                var that = this;
    
                var url = "";
                if (action == 'login') {
                    url = 'http://api.book.my/user-login/login'
                }
                if (action == 'register') {
                    url = 'http://api.book.my/user-login/register'
                }
    
                fetch(url, {
                        method: 'POST',
                        headers: myHeaders,
                        mode: 'cors',
                        cache: 'default',
                        body: JSON.stringify(fields)
                    }).then(function(response) {
                        return response.json()
                    })
                    .then(function(json) {
                        if (json.status == 200) {
                            that.access_token = json.access_token;
                            that.login_email = json.username;
                            localStorage.setItem('user-token', that.access_token)
                            localStorage.setItem('username', that.login_email)
                        } else {
                            if (action == 'login') {
                                if (json.errors.email) {
                                    that.login_errors.email = json.errors.email[0];
                                }else{
                                    that.login_errors.email = null;
                                }
                                if (json.errors.password) {
                                    that.login_errors.password = json.errors.password[0];
                                }else{
                                    that.login_errors.password = null;
                                }
    
                            } else {
                                if (json.errors.email) {
                                    that.register_errors.email = json.errors.email[0];
                                }else{
                                    that.register_errors.email = null;
                                }
                                if (json.errors.newPassword) {
                                    that.register_errors.password = json.errors.newPassword[0];
                                }else{
                                     that.register_errors.password = null;
                                }
                            }
                        }
                    })
                    .catch(function(error) {
                        localStorage.removeItem('user-token')
                        localStorage.removeItem('username')
                        console.log('Request failure: ', error);
                    });
            },
            logout() {
                this.login_errors = {email: null, password: null};
                this.register_errors = {email: null, password: null};

                localStorage.removeItem('user-token')
                localStorage.removeItem('username')
                this.login_email = "";
                this.access_token = null;
            },
    
        }
    }
</script>


<style lang="scss" scoped>
    .post {
        h2 {
            color: black;
        }
    }
</style>
