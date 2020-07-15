import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/about/:id",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/list1",
    name: "list1",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/List1.vue"),
    scrollBehavior(to, from, savedPosition) {
      console.log("savedPosition:", savedPosition);
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  },
  {
    path: "/list2",
    name: "list2",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/List2.vue"),
    scrollBehavior(to, from, savedPosition) {
      console.log("savedPosition:", savedPosition);
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
