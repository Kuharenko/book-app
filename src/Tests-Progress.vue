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
        <div class="tests-list" v-if="access_token">
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Название</td>
                        <td>Успешность</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(material, index) in materials">
                        <td>{{++index}}</td>
                        <td>
                            <router-link :to="{ path: '/post/'+material.id}">{{material.name}}</router-link>
                        </td>
                        <td v-if="material.progress">
                            {{material.progress.progress_value}}%
                        </td>
                        <td v-else>
                            0%
                        </td>
    
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                login_email: this.$session.get('username') ? this.$session.get('username') : "",
                login_password: "",
                access_token: this.$session.get('user-token') ? this.$session.get('user-token') : null,
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
                materials: []
            }
        },
        created: function() {
            if (this.access_token) {
                this.loadMaterials();
            }
        },
        methods: {
            loadMaterials() {
                if (this.access_token) {
                    var myHeaders = new Headers({
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + this.access_token
                    });
                    var that = this;
                    fetch('http://backend.kuharenko.xyz/post?fields=id,name&expand=progress&access-token=' + this.access_token, {
                            method: 'get',
                            cors: 'cors',
                            headers: myHeaders
                        })
                        .then(function(response) {
                            return response.json();
                        })
                        .then(function(data) {
                            that.materials = data.items;
                            // console.log(data);
                            return that.materials;
                        })
                        .catch(function(error) {
                            console.log('Request failure: ', error);
                        });
                }
    
            },
    
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
                    url = 'http://backend.kuharenko.xyz/user-login/login'
                }
                if (action == 'register') {
                    url = 'http://backend.kuharenko.xyz/user-login/register'
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
    
                            that.$session.start()
                            that.$session.set('user-token', that.access_token)
                            that.$session.set('username', that.login_email)
                        } else {
                            if (action == 'login') {
                                if (json.errors.email) {
                                    that.login_errors.email = json.errors.email[0];
                                } else {
                                    that.login_errors.email = null;
                                }
                                if (json.errors.password) {
                                    that.login_errors.password = json.errors.password[0];
                                } else {
                                    that.login_errors.password = null;
                                }
    
                            } else {
                                if (json.errors.email) {
                                    that.register_errors.email = json.errors.email[0];
                                } else {
                                    that.register_errors.email = null;
                                }
                                if (json.errors.newPassword) {
                                    that.register_errors.password = json.errors.newPassword[0];
                                } else {
                                    that.register_errors.password = null;
                                }
                            }
                        }
                        that.loadMaterials();
                    })
                    .catch(function(error) {
                        that.$session.clear()
                        that.$session.destroy()
                        console.log('Request failure: ', error);
                    });
            },
            logout() {
                this.login_errors = {
                    email: null,
                    password: null
                };
                this.register_errors = {
                    email: null,
                    password: null
                };
    
                this.$session.clear()
                this.$session.destroy()
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
