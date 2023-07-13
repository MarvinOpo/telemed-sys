<template>
	<q-card class="child-container" flat>
		<q-card-section class="row">
			<label class="text-h5">Patients</label>
			<q-space />
			<q-btn @click="openAddPatientDialog" color="green-4" icon="add">Add Patient</q-btn>
		</q-card-section>

		<q-card-section>
			<q-table class="patient-table" :rows="patients.list" :columns="patients.headers" row-key="name" />
		</q-card-section>
	</q-card>

	<q-dialog v-model="dialog.patient.is_visible">
		<q-card style="max-width: unset;">
			<q-card-section>
				<div class="text-h6">{{ dialog.patient.type }} Patient</div>
			</q-card-section>

			<q-card-section class="w-1000px">
				<q-form ref="patient_form">
					<div class="row">
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-input v-model="dialog.patient.data.lname" label="Last Name" :rules="[rules.required]"
								outlined></q-input>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-input v-model="dialog.patient.data.fname" label="First Name" :rules="[rules.required]"
								outlined></q-input>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-input v-model="dialog.patient.data.mname" label="Middle Name" outlined></q-input>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-select v-model="dialog.patient.data.ename" :options="options.suffix" option-label="label"
								option-value="value" label="Suffix Name" outlined></q-select>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm q-mt-lg">
							<q-select v-model="dialog.patient.data.sex" :options="options.sex" option-label="label"
								option-value="value" label="Sex" :rules="[rules.required]" outlined></q-select>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm q-mt-lg">
							<q-input v-model="dialog.patient.data.dateOfBirth" :rules="[rules.required]"
								label=" Date of Birth" outlined></q-input>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-input v-model="dialog.patient.data.contactNumber" :rules="[rules.required]"
								label="Contact Number" outlined></q-input>
						</div>
						<div class="col-12 col-lg-6 q-pa-sm">
							<q-input v-model="dialog.patient.data.email" :rules="[rules.required]" label="Email"
								outlined></q-input>
						</div>
					</div>
				</q-form>
			</q-card-section>

			<q-card-actions align="center" class="q-pa-lg">
				<q-btn @click="dialog.patient.is_visible = false" color="grey" label="Cancel" />
				<q-btn color="green-4" label="Add" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>
  

<script setup>
import { ref } from 'vue'

const BASE_URL = import.meta.env.VITE_BASE_URL

const props = defineProps({
	user: {
		type: Object,
		default: null
	},
	rules: {
		type: Object,
		default: null
	},
});

const dialog = ref({
	patient: {
		data: {},
		type: 'Add',
		is_visible: false
	}
});

const options = ref({
	suffix: [
		{
			label: 'Junior',
			value: 'JR.'
		},
		{
			label: 'Senior',
			value: 'SR.'
		}
	]
})

const patient_form = ref(null);
const patients = ref({
	headers: [
		{
			label: 'First Name',
			field: 'patfirst'
		},
		{
			label: 'Middle Name',
			field: 'patmiddle'
		},
		{
			label: 'Last Name',
			field: 'patlast'
		},
		{
			label: 'Suffix Name',
			field: 'patsuffix'
		},
		{
			label: 'Sex',
			field: 'patsex'
		},
		{
			label: 'Date of Birth',
			field: 'patbdate'
		},
		{
			label: 'Contact Number',
			field: 'contactNumber'
		},
		{
			label: 'Email',
			field: 'email'
		},
		{
			label: 'Actions'
		}
	],
	list: [
		{
			fname: 'John',
			mname: 'Xander',
			lname: 'Doe',
			ename: null
		}
	]
});

getPatients();

async function getPatients() {
	const res = await fetch(BASE_URL + '/api/patients', { method: 'GET' });
	const pats = await res.json();

	patients.value.list = pats.data;
}

function openAddPatientDialog() {
	dialog.value.patient.type = 'Add';
	dialog.value.patient.is_visible = true;
}

async function insertPatient() {
	const valid = await patient_form.value.validate();
	if (valid) {
		console.log(dialog.value.patient.data);
	}
}

</script>

<style>
.patient-table td,
.patient-table th,
.patient-table tr {
	text-align: center;
}
</style>
