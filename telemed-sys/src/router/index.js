import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		redirect: 'patients'
	},
	{
		path: '/patients',
		name: 'Patients',
		component: () => import('../views/Patients.vue')
	},
	{
		path: '/appointments',
		name: 'Appointments',
		component: () => import('../views/Appointments.vue')
	},
	{
		path: '/chats',
		name: 'Chats',
		component: () => import('../views/Chats.vue')
	},
	{
		path: '/consultations',
		name: 'Consultations',
		component: () => import('../views/Consultations.vue')
	},
	{
		path: '/:catchAll(.*)',
		name: 'error',
		component: () => import('../views/PageNotFound.vue')
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
