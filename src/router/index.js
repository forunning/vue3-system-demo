import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ('../views/Home.vue'),
        children: [{
                path: '/student',
                name: 'Student',
                component: () =>
                    import ('../views/Student.vue')
            },
            {
                path: '/book',
                name: 'Book',
                component: () =>
                    import ('../views/Book.vue')
            },
            {
                path: '/activity',
                name: 'Activity',
                component: () =>
                    import ('../views/Activity.vue')
            }
        ],
        redirect: '/student'
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ('../views/Login.vue')
    },
    { path: '*', redirect: '/' }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router