<template>
    <div class="content">
        <div v-if="access_token">
            <button @click.prevent="logout()" class="button button1">Вийти</button>
        </div>
    
        <div class="tabs-form" v-if="access_token === null">
            <div class="buttons">
                <button @click="showLoginForm = true; showRegisterForm = false;" :class="{'active': showLoginForm}">Увійти</button>
                <button @click="showLoginForm = false; showRegisterForm = true;" :class="{'active': showRegisterForm}">Реєстрація</button>
            </div>
            <div class="form-wrap">
    
                <form v-if="showLoginForm && access_token === null">
                    <!-- <h4>Введите свой логин и пароль</h4> -->
                    <div class="field-wrap">
                        <label for="log-email">email</label>
                        <input v-model="login_email" id="log-email">
                    </div>
                    <div class="error" v-if="login_errors">{{login_errors.email}}</div>
    
                    <div class="field-wrap">
                        <label for="log-password">Пароль</label>
                        <input type="password" id="log-password" v-model="login_password">
                    </div>
    
                    <div class="error" v-if="login_errors">{{login_errors.password}}</div>
                    <button @click.prevent="login('login')">Увійти</button>
                </form>
                <form v-if="!showLoginForm && access_token === null">
                    <!-- <h4>Введите свой логин и пароль</h4> -->
                    <div class="field-wrap">
                        <label for="reg-email">email</label>
                        <input type="email" id="reg-email" v-model="register_email" autocomplete="off">
                    </div>
                    <div class="error" v-if="register_errors">{{register_errors.email}}</div>
    
                    <div class="field-wrap">
                        <label for="reg-password">Пароль</label>
                        <input type="password" id="reg-password" v-model="register_password" autocomplete="off">
                    </div>
    
                    <div class="error" v-if="register_errors">{{register_errors.password}}</div>
                    <button @click.prevent="login('register')">Зареєструватися</button>
                </form>
            </div>
        </div>
    
        <div class="tests-list" v-if="access_token">
            <table>
                <thead>
                    <tr>
                        <td>#</td>
                        <td>Назва теми</td>
                        <td>Успішність</td>
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
                showLoginForm: true,
                showRegisterForm: false,
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
                var fieldsLog = {
                    email: this.login_email,
                    password: this.login_password,
                };

                var fieldsReg = {
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
                        body: JSON.stringify(action == 'login'? fieldsLog: fieldsReg)
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
    
    .tabs-form {
        display: flex;
        flex-direction: column;
        background-color: #13232f;
        width: 800px;
        margin: 0 auto;
        // padding: 50px;
        padding: 20px 0;
        .buttons {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
            padding: 20px 30px 0 30px;
            button {
                padding: 20px;
                width: 45%;
                color: #a0b3b0;
                background-color: rgba(160, 179, 176, 0.25);
                border: none;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 16px;
                &:hover {
                    background-color: #179b77;
                    color: white;
                }
            }
            button.active {
                background-color: #1ab188;
                color: white;
                &:hover {
                    background-color: #179b77;
                    color: white;
                }
            }
        }
        .form-wrap {
            padding: 20px 30px;
            .field-wrap {
                margin-bottom: 10px;
                label {
                    color: white;
                    text-transform: capitalize;
                }
                input {
                    box-sizing: border-box;
                    font-size: 22px;
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 8px 10px;
                    background: none !important;
                    background-color:#13232f !important;
                    background-image: none !important;
                    border: 1px solid #a0b3b0;
                    color: #ffffff;
                    border-radius: 0;
                    transition: border-color .25s ease, box-shadow .25s ease;
                }
            }
            button {
                margin-top: 20px;
                padding: 20px;
                width: 100%;
               background-color: #1ab188;
                color: white;
                border: none;
                font-weight: bold;
                text-transform: uppercase;
                font-size: 16px;
                &:hover {
                    background-color: #179b77;
                    color: white;
                }
            }
        }
        .error{
            color: #f44336;
        }
    }

    .tests-list{
        table{
            width: 100%;
            thead{
                background-color: #d4d4d4;
                tr td{
                    padding-left: 15px;
                }
            }
            tbody{
                tr:nth-child(2n){
                    background-color: #cacaca;
                }
                tr:nth-child(2n -1){
                    background-color: #e8e8e8;
                }
                tr:hover{
                    background-color: #dfd7e8;
                }
                td{
                     padding-left: 15px;
                }
            }
        }
    }
</style>
