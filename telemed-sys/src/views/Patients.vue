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
		<q-card>
			<q-card-section>
				<div class="text-h6">{{ dialog.patient.type }} Patient</div>
			</q-card-section>

			<q-card-section class="w-500px">
				<q-form ref="patient_form">
					<q-input v-model="dialog.patient.data.lname" label="Last Name" :rules="[rules.required]"
						outlined></q-input>
					<q-input v-model="dialog.patient.data.fname" class="q-mt-sm" label="First Name"
						:rules="[rules.required]" outlined></q-input>
					<q-input v-model="dialog.patient.data.mname" class="q-mt-sm" label="Middle Name" outlined></q-input>
					<q-select v-model="dialog.patient.data.ename" class="q-mt-lg" :options="options.suffix"
						option-label="label" option-value="value" label="Suffix Name" outlined></q-select>
				</q-form>
			</q-card-section>

			<q-card-actions align="center" class="q-pa-lg">
				<q-btn @click="dialog.patient.is_visible = false" color="grey" label="Cancel" />
				<q-btn @click="insertPatient" color="green-4" label="Add" />
			</q-card-actions>
		</q-card>
	</q-dialog>
</template>

<script setup>
import { ref } from 'vue'

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
			field: 'fname'
		},
		{
			label: 'Middle Name',
			field: 'mname'
		},
		{
			label: 'Last Name',
			field: 'lname'
		},
		{
			label: 'Suffix Name',
			field: 'ename'
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

function openAddPatientDialog() {
	dialog.value.patient.type = 'Add';
	dialog.value.patient.is_visible = true;
}

function insertPatient() {
	const valid = patient_form.value.validate();
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
