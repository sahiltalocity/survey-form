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
		<h1>
                AGEL
        </h1> 
        <h2>Employee Engagement Pulse Survey’23</h2>
	</div>
	<a href="https://talocity.ai" target="_blank" class="branding">
            <p>
                Powered by 
            </p> 
            <img src="@/assets/talocity_logo.png"/>
        </a>
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
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
.branding{
    text-decoration: none;
    color:black;
    position: fixed;
    z-index: 9999;
    bottom: 20px;
    right:0;
    display: flex;
    align-items: center;
    gap:10px;
    padding: 5px;
    box-shadow:0.5px 0.5px 0.5px 0.5px grey;
    font-size: 10px;
    background: #fff;
}
.branding img{
    height: 25px;
    width:auto;
}
</style>