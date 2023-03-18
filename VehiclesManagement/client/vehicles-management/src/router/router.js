import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store/store';

Vue.use(VueRouter);


const routes = [
  {
    path: '*',
   redirect: '/'
  },

  {
    path: '/home',
    name: 'Home',
    component: () => import('../components/Home.vue'),
    meta: { requiresAuth: true },
    beforeEnter: handleBeforeEnterAll
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../components/auth/Login.vue'),
    meta: {
      hideForAuth: true
    },
    beforeEnter: handleBeforeEnterLogin
  },
  {
    path: '/add-incoming',
    name: 'AddIncoming',
    component: () => import('../components/incoming/addIncoming.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: handleBeforeEnterAll
  },
  {
    path: '/edit-incoming',
    name: 'EditIncoming',
    component: () => import('../components/incoming/editIncoming/editIncoming.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: handleBeforeEnterAll
  },
  {
    path: '/add-sender',
    name: 'AddSender',
    component: () => import('../components/senders/addSender.vue'),
    meta: {
      requiresAuth: true
    },
    beforeEnter: handleBeforeEnterAll
  },
  {
    path: '/',
    meta: { requiresAuth: true },
    redirect: "home",
    beforeEnter: handleBeforeEnterAll
  },


]

const router = new VueRouter(
  {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
  }
);




async function handleBeforeEnterLogin(to, from, next) {
  store.dispatch('checkIsAuthenticated', localStorage.getItem('token')).then((data)=> {
    console.log('11111', data)
    if(data) {
      next('/')
    } else {
      next()
    }
  })  
}

async function handleBeforeEnterAll(to, from, next) {
  store.dispatch('checkIsAuthenticated', localStorage.getItem('token')).then((data)=> {
    console.log('11111', data)
    if(data) {
      next()
    } else {
      next('/login')
    }
  })  
}


// router.beforeEach((to, from, next) => {
//   setTimeout(function () {

//     if (to.matched.some((record) => record.meta.requiresAuth)) {
//       if (store.getters.getIsAutenticated) {
//         console.log('store in router2', store.getters.getIsAutenticated)
//         next();
//         return;
//       }
//       next("/login");
//     } else if (to.matched.some((record) => record.meta.hideForAuth)) {
//       setTimeout(function () {
//         if (store.getters.getIsAutenticated) {
//           console.log('store in router2', store.getters.getIsAutenticated)
//           next("/home");
//           return;
//         }

//         else {
//           next();
//         }
//       }, 0);
//     }

//     next();

//   }, 0)

// });








export default router;


