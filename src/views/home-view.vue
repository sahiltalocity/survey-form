<script setup>
	import {ref,onMounted} from 'vue'
	import { useRouter, useRoute } from 'vue-router';

	const router = useRouter()
	const route = useRoute()
	const code = ref(route.query?.survey);
	// const form = ref(null)

	const submit = async() => {
		// if(validate.valid){
		// 	return router.push({name:'survey',params:{id:code.value}})
		// } else{
		// 	return
		// }
		return router.push({name:'survey',params:{id:code.value}})
	}
	onMounted(()=>{
		if(route.query?.survey){
			console.log("mounted")
			submit()
		}
	})
</script>
<template>
	<!-- <div class="form">
		<v-app>
			<v-form class="form-field" @submit.prevent="submit" ref="form">
				<v-text-field v-model="code" :rules="[value => !!value || 'This cannot be empty']" label="Enter Invite Code" variant="outlined"></v-text-field>
				<v-btn type="submit" size="large" variant="outlined" rounded="0" icon="mdi-arrow-right-bold "></v-btn>
			</v-form>
		</v-app>
	</div> -->
	<div class="invalid-link">
		Invalid Link
	</div>
</template>
<style scoped>
.form{
	position: relative;
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

.invalid-link{
	min-height: 500px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>