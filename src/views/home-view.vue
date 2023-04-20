<script setup>
	import {ref} from 'vue'
	import { useRouter } from 'vue-router';
	const router = useRouter()
	const form = ref(null);
	const code = ref();
	const submit = async() => {
		const validate = await form.value.validate();
		if(validate.valid){
			return router.push(code.value)
		} else{
			return
		}
	}
</script>
<template>
		<v-app class="form">
			<v-form class="form-field" @submit.prevent="submit" ref="form">
				<v-text-field v-model="code" :rules="[value => !!value || 'This cannot be empty']" label="Enter Invite Code" variant="outlined"></v-text-field>
				<v-btn type="submit" size="large" variant="outlined" rounded="0" icon="mdi-arrow-right-bold "></v-btn>
			</v-form>
		</v-app>
</template>
<style scoped>
.form{
    width: 75%;
	min-height: 100vh;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
	justify-content: center;
	margin: auto;
}
.form-field{
	display: flex;
	gap: 20px;
}
</style>