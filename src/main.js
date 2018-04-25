import Vue from 'vue'
import App from './App.vue'
import Post from './Post.vue'
import List from './List.vue'
import Categories from './Categories.vue'
import Vocabulary from './Vocabulary.vue'
import Progress from './Tests-Progress.vue'
import SideMenu from './SideMenu.vue'
// import Loading from './Loading.vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'

Vue.use(VueRouter)
Vue.use(VueSession)

Vue.component('list', List);
Vue.component('post', Post);
Vue.component('categories', Categories);
Vue.component('vocabulary', Vocabulary);
Vue.component('tests-progress', Progress);
Vue.component('side-menu', SideMenu);

// Vue.component('loading', Loading)

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
  { path: '/post/:id', name: 'post', component: Post},
  { path: '/categories/', component: Categories},
  { path: '/vocabulary/', component: Vocabulary},
  { path: '/progress/', component: Progress},
]

// 3. Создаём экземпляр роутера с опцией `routes`
// Можно передать и другие опции, но пока не будем усложнять
const router = new VueRouter({
  routes, // сокращение от `routes: routes`
  mode: 'history'
})

function compare(a, b) {
  if (a.sortIndex < b.sortIndex)
      return -1;
  if (a.sortIndex > b.sortIndex)
      return 1;
  return 0;
}

function sortPosts(item, array, materials) {
  if (!array.find((i, idx, arr) => {
          return i.id == item.id;
      })) {
      array.push(item);
  }

  let arrayItems = materials.filter(i => i.parent == item.id);

  arrayItems.sort(compare);

  arrayItems.forEach((item2, i, array2) => {
      return sortPosts(item2, array, materials);
  });

  return array;
}

function findParents(item, depth, materials) {

  let parentItem = materials.find(function(obj) {
      if (obj.id === item.parent) {
          return obj;
      } else {
          return null;
      }
  });

  if (parentItem !== null) {
      if (parentItem.parent == 0) {
          return depth;
      } else {
          depth++;
          return findParents(parentItem, depth, materials);
      }
  } else {
      return depth;
  }
}

function loadData(){
  var materials = [];
    var myHeaders = new Headers({
        "Content-Type": "application/json",
        // 'Authorization': 'Bearer ' + this.access_token
    });
    

       let url = 'http://backend.kuharenko.xyz/post?expand=categories,tests';
       let zz = 10;
    
    fetch(url, {
            method: 'get',
            cors: 'cors',
            headers: myHeaders
        })
        .then(function(response) {
            return response.json();
        })
        .then(function(json) {
            // console.log(json);
            // that.pager = json._links;
            materials = json.items;

            var newSortedPosts = [];
            materials.forEach((item, i, arr) => {
                if (item.parent == 0) {
                  materials[i].depth = 0;
                } else {
                    let depth = 1;
                    materials[i].depth = findParents(item, depth, arr);
                }
            });

            materials.forEach((item, i, arr) => {
                sortPosts(item, newSortedPosts, arr);
            });

            materials = newSortedPosts;
            const app = new Vue({
              el: '#app',
              data: {
                posts: materials,
              },
              router,
              render: h => h(App, SideMenu, List, Post, Categories, Vocabulary, Progress)
            })
        })
        .catch(function(error) {
            console.log('Request failed', error);
        });
      }


// 4. Создаём и монтируем корневой экземпляр Vue нашего приложения.
// Удостоверьтесь, что передали экземпляр роутера в опции `router`,
// что позволит приложению знать о его наличии
// const app = new Vue({
//   el: '#app',
//   data: {
//     posts: loadData(),
//   },
//   router,
//   render: h => h(App, List, Post, Categories, Vocabulary, Progress)
// })

// router.beforeEach((to, from, next) => {
//   app.loading = true
// 	next()
// })

// router.afterEach((to, from) => {
//   // setTimeout(() => app.loading = false, 1500) // timeout for demo purposes
// })

loadData();