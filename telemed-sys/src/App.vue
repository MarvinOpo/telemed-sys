<template>
	<q-layout>
		<q-header elevated class="bg-dark q-pa-lg" height-hint="98">
			<q-toolbar>
				<q-btn dense flat round icon="menu" />

				<q-toolbar-title class="text-left">
					TELEMEDICINE SYSTEM
				</q-toolbar-title>

				<q-btn size="lg" dense flat round>Sign In</q-btn>
			</q-toolbar>

			<q-tabs align="left">
				<q-route-tab v-for="item in routes" :to="item.path" :label="item.name" />
			</q-tabs>
		</q-header>

		<q-page-container>
			<router-view :rules="rules" />
		</q-page-container>

		<!-- <q-footer elevated class="bg-grey-8 text-white">
			<q-toolbar>
				<q-toolbar-title>
					<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
					</q-avatar>
					<div>Title</div>
				</q-toolbar-title>
			</q-toolbar>
		</q-footer> -->
		<q-footer class="bg-dark text-center" dark padless fixed>
			<span class="pa-2">© Copyright 2022 VSMMC | MVO</span>
		</q-footer>
	</q-layout>
</template>
  
<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useTelemedStore } from './store/pinia'

const { token, has_logged_in } = storeToRefs(useTelemedStore());
const { setToken, resetStore } = useTelemedStore();

const router = useRouter();
const routes = router.options.routes.filter((item) => {
	return item.name != 'error';
});

const rules = ref({
	required: v => !!v || 'This field is required',
	required_array: v => v.length > 0 || 'This field is required',
	required_int: v => !isNaN(v) || 'This field is required',
	min_length8: v => (v || '').length >= 8 || 'Must be atleast 8 characters'
});

</script>

<style>
#app {
	margin: 0 !important;
	width: 100% !important;
	height: 100% !important;
	max-width: unset !important;
	padding: 0 !important;
	text-align: start;
}

.q-page-container {
	height: 100% !important;
}
</style>
