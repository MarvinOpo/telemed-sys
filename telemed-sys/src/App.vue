<template>
	<q-layout>
		<q-header elevated class="bg-dark q-pa-lg" height-hint="98">
			<q-toolbar>
				<q-btn dense flat round icon="menu" />

				<q-toolbar-title class="text-left">
					TELEMEDICINE SYSTEM
				</q-toolbar-title>

				<q-btn v-if="!has_logged_in" @click="dialog.login.is_visible = true" class="q-pa-sm" size="lg" dense
					flat>Sign In</q-btn>

				<q-btn v-else @click="logout" class="q-pa-sm" size="lg" dense flat>Logout</q-btn>
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

	<q-dialog v-model="dialog.login.is_visible">
		<q-card>
			<q-card-section class="row items-center">
				<label class="text-h4 text-capitalize">{{ dialog.login.type }}</label>
				<q-space />
				<q-btn @click="dialog.login.is_visible = false" color="grey" icon="close" flat />
			</q-card-section>

			<q-card-section class="w-500px">
				<q-form ref="login_form">
					<q-input v-model="dialog.login.data.email" label="Email" :rules="[rules.required]" outlined></q-input>

					<q-input v-model="dialog.login.data.password" label="Password" :rules="[rules.required]" type="password"
						outlined></q-input>

					<template v-if="dialog.login.type == 'register'">
						<q-input v-model="dialog.login.data.lname" label="Last Name" :rules="[rules.required]"
							outlined></q-input>

						<q-input v-model="dialog.login.data.fname" label="First Name" :rules="[rules.required]"
							outlined></q-input>

						<q-input v-model="dialog.login.data.mname" label="Middle Name" outlined></q-input>
					</template>
				</q-form>
			</q-card-section>

			<q-card-actions align="center" class="q-pa-md">
				<template v-if="dialog.login.type == 'register'">
					<q-btn @click="registerUser" class="w-100" color="green-4" label="Register" size="lg" />
					<div class="row text-center">
						<q-btn @click="dialog.login.type = 'login'" class="q-mt-sm" color="blue-5" flat
							style="text-transform: none;">
							<u>Already have an account?</u>
						</q-btn>
					</div>
				</template>
				<template v-else>
					<q-btn class="w-100" color="green-4" label="Login" size="lg" />
					<div class="row text-center">
						<q-btn @click="dialog.login.type = 'register'" class="q-mt-sm" color="blue-5" flat
							style="text-transform: none;">
							<u>Dont have an account?</u>
						</q-btn>
					</div>
				</template>
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
  
<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { storeToRefs } from 'pinia'
import { useTelemedStore } from './store/pinia'

import { auth } from './services/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';

const { token, has_logged_in } = storeToRefs(useTelemedStore());
const { setToken, resetStore } = useTelemedStore();

const BASE_URL = import.meta.env.VITE_BASE_URL

const dialog = ref({
	login: {
		data: {},
		is_visible: false,
		type: 'login'
	}
});

const login_form = ref(null);

const router = useRouter();
const routes = router.options.routes.filter((item) => {
	return item.name;
});

const rules = ref({
	required: v => !!v || 'This field is required',
});

const user = ref({
	data: {}
});

user.value.name = computed(() => {
	return user.value.data.fname + ' ' + user.value.data.lname;
});

async function registerUser() {
	const valid = await login_form.value.validate();
	if (!valid) return;

	try {
		const data = await createUserWithEmailAndPassword(
			auth,
			dialog.value.login.data.email,
			dialog.value.login.data.password
		);

		user.value.data = Object.assign({}, dialog.value.login.data);
		user.value.data.remember_token = data.user.accessToken;

		setToken(user.value.data.remember_token);
		insertUser();
	} catch (e) {
		if (e.code === 'auth/email-already-in-use') {
			console.log('Email already in use. Please choose a different email or login instead.');
		}
	}
}

async function insertUser() {
	let body = Object.assign({}, user.value.data);
	body.name = user.value.name;

	const res = await fetch(BASE_URL + '/api/users', {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		}
	});

	const data = await res.json();
	if (data.id) console.log('Successfully added user.');

	dialog.value.login.is_visible = false;
}

function logout() {
	resetStore();
}

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
