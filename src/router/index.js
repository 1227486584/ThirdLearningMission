import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'

import student from '@/components/student'
// import stuNewTask from '@/components/stuNewTask'
// import stuHistoryTask from '@/components/stuHistoryTask'
import admin from '@/components/admin'
import adminNewTask from '@/components/adminNewTask'
import adminManage from '@/components/adminManage'
import tutor from '@/components/tutor'
import stuSubmitTask from '@/components/stuSubmitTask'
import tutorPubTask from '@/components/tutorPubTask'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/student',
      name: 'student',
      component: student,
    },
    {
      path: '/tutor',
      name: 'tutor',
      component: tutor,
      children: [
        {path: '/tutor', redirect: '/tutor/stuSubmitTask'},
        { path: '/tutor/stuSubmitTask', name: 'stuSubmitTask', component: stuSubmitTask },
        { path: '/tutor/tutorPubTask', name: 'tutorPubTask', component: tutorPubTask },
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      children: [
        {path: '/admin', redirect: '/admin/adminNewTask'},
        { path: '/admin/adminNewTask', name: 'adminNewTask', component: adminNewTask },
        { path: '/admin/adminManage', name: 'adminManage', component: adminManage },
      ]
    }
  ]
})
