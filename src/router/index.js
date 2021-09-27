import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Dataset from '@/components/Dataset'


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/dataset/:name',
            name: 'Dataset',
            component: Dataset,
        }
    ]
})


export default router