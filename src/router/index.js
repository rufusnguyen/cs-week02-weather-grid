import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Windows from '@/components/Windows'
import Windows2 from '@/components/Windows2'
import Weather from '@/components/Weather'
import About from '@/pages/About'
import NotFound from '@/pages/NotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/windows',
      name: 'windows',
      component: Windows
    },
    {
      path: '/windows2',
      name: 'windows2',
      component: Windows2
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/city/:cityName',
      name: 'city',
      component: Weather
    },
    {
      path: '/not-found',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
