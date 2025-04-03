import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/views/SignUp.vue'
import LogIn from '@/views/LogIn.vue'
import Main from '@/views/Main.vue'
import Profile from '@/views/Profile.vue'
import LeftSidebar from '@/views/LeftSidebar.vue'
import RightSidebar from '@/views/RightSidebar.vue'
import Search from '@/views/Search.vue'
import SearchTeams from '@/views/SearchTeams.vue'
import SearchPlayers from '@/views/SearchPlayers.vue'
import SearchGames from '@/views/SearchGames.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      meta: {
        authRequired: false,
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn,
      meta: {
        authRequired: false,
      }
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        authRequired: true,  
      },
      children: [
        {
          path: '/profile', 
          components: {
            leftSidebar: LeftSidebar,
            focus: Profile,
            rightSidebar: RightSidebar
          },
          meta: {
            authRequired: true,
          }
        },
        {
          path: '/search', 
          components: {
            leftSidebar: LeftSidebar,
            focus: Search,
            rightSidebar: RightSidebar
          },
          meta: {
            authRequired: true,
          }
        },
        {
          path: '/searchTeams', 
          components: {
            leftSidebar: LeftSidebar,
            focus: SearchTeams,
            rightSidebar: RightSidebar
          },
          meta: {
            authRequired: true,
          }
        },
        {
          path: '/searchPlayers', 
          components: {
            leftSidebar: LeftSidebar,
            focus: SearchPlayers,
            rightSidebar: RightSidebar
          },
          meta: {
            authRequired: true,
          }
        },
        {
          path: '/searchGames', 
          components: {
            leftSidebar: LeftSidebar,
            focus: SearchGames,
            rightSidebar: RightSidebar
          },
          meta: {
            authRequired: true,
          }
        },
      ]
    },
    
  ],
})

export default router
