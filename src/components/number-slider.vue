<template>
	<div class="slider-container">
	<v-slider
      :ticks="tickLabels"
      :max="3"
      step="1"
      show-ticks="always"
      tick-size="4"
	  v-model="model"
    ></v-slider>
	</div>
</template>
<script setup>
import { ref,watch } from 'vue';
const props = defineProps({
	modelValue:String,
})
const emit = defineEmits(['update:modelValue'])
const model = ref(props.modelValue)
const tickLabels = {
	0: '1 (Strongly Disagree)',
	1: '2',
	2: '3',
	3: '4 (Strongly Agree)',
};
watch(model,()=>{
	emit('update:modelValue',model)
})
</script>
<style scoped>
	.slider-container{
		width: 100%;
	}
</style>