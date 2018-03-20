import Vue from 'vue'
import App from './App.vue'
import Post from './Post.vue'
import List from './List.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.component('list', List);
Vue.component('post', Post);
// 0. При использовании модульной системы (напр. vue-cli),
// импортируйте Vue и VueRouter и затем вызовите `Vue.use(VueRouter)`

// 1. Определение используемых компонентов
// Они могут быть импортированы из внешних файлов
// const Post = { template: '<div>Статья {{ $route.params.id }}</div>' }


// 2. Определение путей
// Каждый путь должен указывать на компонент
// "Компонентом" может быть как созданный через `Vue.extend()`
// полноценный конструктор, так и просто объект с настройками компонента
// Вложенные пути будут рассмотрены далее.
const routes = [
  { path: '/', component: List},
  { path: '/post/:id', component: Post}
]

// 3. Создаём экземпляр роутера с опцией `routes`
// Можно передать и другие опции, но пока не будем усложнять
const router = new VueRouter({
  routes // сокращение от `routes: routes`
})

// 4. Создаём и монтируем корневой экземпляр Vue нашего приложения.
// Удостоверьтесь, что передали экземпляр роутера в опции `router`,
// что позволит приложению знать о его наличии
new Vue({
  el: '#app',
  router,
  render: h => h(App, List, Post)
})
