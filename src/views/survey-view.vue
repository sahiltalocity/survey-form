<script setup>
import {ref, onBeforeUnmount, onMounted} from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

const tickLabels = [
    {
        label:'Strongly Disagree',
        value:1
    },
    {
        label:'Disagree',
        value:2
    },
    {
        label:'Agree',
        value:3
    },
    {
        label:'Strongly Agree',
        value:4
    }
]
let width = ref(screen.width);

const form = ref(null);
const uuid = route.params.id
const uuidStatus = ref({
    valid:true
});
const convertToResponse = (questions) => {
    const response = ref({
        uuid : uuid,
    });
    questions.forEach(question=>{
        if(question.answer){
            response.value = {
                ...response.value,
                [`question_${question.id}`]:question.question,
                [`answer_${question.id}`]:question.answer,
            }
        }
    });
    return response.value;
}
const submitForm = async () => {
    const validate = await form.value.validate();
    if(validate.valid){
        try{
            const response = await fetch(`https://adani-temp.talocity.ai/api/surveys/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(convertToResponse(questions.value))
            })
            const json = await response.json();
            if(json.Error === "Key Not Found"){
                uuidStatus.value={
                    valid:false,
                    message:"Invalid Link"
                }
            } else if(json.Error === "Key has already been used"){
                uuidStatus.value={
                    valid:false,
                    message:"You have already filled this form"
                }
            } else {
                uuidStatus.value={
                    valid:false,
                    message:"Thanks for your valuable feedback"
                }
            }
        } catch(e){
           return;
        }
    } else{
        return
    }
}
const required = (error) => value => !!value || error
const wordLimit150 = value => (value?.split('').filter(c=>c===' ') || [] ).length <= 149 || 'This must be 150 words or less'
const questions = ref([
    {
        id:1,
        question: 'I have clarity on my work and adequate resources (tools, materials, equipment) to perform my job well',
        type:'radio-buttons',
        required:true,
    },
    {
        id:2,
        question: 'I have conducive environment to learn and focus on my individual development and well-being',
        type:'radio-buttons',
        required:true,
    },
    {
        id:3,
        question: 'My manager treats me well and is fair, objective and interested in my career growth',
        type:'radio-buttons',
        required:true,
    },
    {
        id:4,
        question: 'Working conditions and safety practices on site are satisfactory',
        type:'radio-buttons',
        required:true,
    },
    {
        id:5,
        question: 'I feel this organization is the right place to fulfil my career aspirations',
        type:'radio-buttons',
        required:true,
    },
    {
        id:6,
        question: 'What do you like most about your job and work, in our organization?',
        type:'text-editor',
        required:true,
        wordLimit150:true,
    },
    {
        id:7,
        question: 'What do you like least about your job and work, in our organization?',
        type:'text-editor',
        required:true,
        wordLimit150:true,
    },
])
const checkScreenSize = () => {
    width.value = window.innerWidth;
}
onMounted(() =>{
    window.addEventListener('resize', checkScreenSize);
})
onBeforeUnmount(() =>{
    window.removeEventListener('resize', checkScreenSize);
})
</script>
<template>
    <div class="survey">
        <div class="survey-header">
            <img class="header-logo" src="@/assets/adani_logo.png" alt="Adani group">
            <h1>
                AGEL
            </h1> 
            <h2>Employee Engagement Pulse Survey’23</h2>
        </div>
        <div class="uuid-error-message" v-if="!uuidStatus.valid">
            <h1>{{uuidStatus.message}}</h1>
        </div>
        <v-app class="survey-form" v-else>
            <v-form validate-on="submit" @submit.prevent="submitForm" ref="form" lazy-validation>
                <div class="survey-block" v-for="(question,index) in questions" :key="`question-${index}`">
                    <div class="survey-question">
                        {{ question.id }}. {{ question.required?"(MANDATORY)":"" }} {{ question.question }}{{ question.wordLimit150?" (in maximum 150 words)":"" }}
                    </div>
                    <!-- <div class="number-slider" v-if="question.type === 'number-slider'">
                        <div class="slider-label"> 
                            Rate (1-4)
                        </div>
                        <v-slider
                            :rules="question.required?[required]:[]"
                            :ticks="width>=1100?tickLabels:tickLabelsResponsive"
                            :max="4"
                            :min="1"
                            :step="1"
                            show-ticks="always"
                            :tick-size="4"
                            v-model="question.answer"
                            validate-on="input"
                        ></v-slider>
                        <div v-if="width<1100" class="responsive-label-description">
                            <p>Strongly Disagree</p>
                            <p>Disagree</p>
                            <p>Agree</p>
                            <p>Strongly Agree</p>
                        </div>
                    </div> -->
                    <div class="radio-buttons" v-if="question.type === 'radio-buttons'">
                        <!-- <div class="slider-label"> 
                            Rate (1-4)
                        </div> -->
                        <v-radio-group 
                            v-model="question.answer" 
                            :rules="question.required?[required('Select any one option')]:[]" 
                            inline
                            validate-on="input"
                            class="radio-group"
                        >
                            <v-radio class="radio-button" :value="elem.value" :key="`button-${question.id}-${elem.value}`" v-for="elem of tickLabels">
                                <template #label>
                                    <div class="radio-label">
                                        {{ elem.value}}<br/>
                                        {{elem.label}}
                                    </div>
                                    
                                </template>
                            </v-radio>
                        </v-radio-group>
                        <!-- {{ question.answer }} -->
                    </div>
                    <div class="text-editor" style="{width:100%}" v-else-if="question.type === 'text-editor'">
                        <v-col
                            cols="12"
                        >
                            <v-textarea
                            :rules="[question.required?required('This cannot be empty'):'',question.wordLimit150?wordLimit150:'']"
                            onpaste="return false"
                            :label="`Type your response...${question.maxWords?` (in ${question.maxWords} words)`:''}`"
                            auto-grow
                            variant="outlined"
                            rows="3"
                            row-height="25"
                            shaped
                            v-model="question.answer"
                            validate-on="input"
                            ></v-textarea>
                        </v-col>
                    </div>
                </div>    
                <div class="survey-buttons">
                    <v-btn rounded="4" type="submit" @click="submitForm" color="black">Submit</v-btn>
                </div>
            </v-form>
        </v-app>
        <a href="https://talocity.ai" target="_blank" class="branding">
            <p>
                Powered by 
            </p> 
            <img src="@/assets/talocity_logo.png"/>
        </a>
    </div>
</template>
<style scoped>
.slider-label{
    min-width: 100px;
}
.header-logo{
    height: 80px;
    margin-bottom: 20px;
}
.uuid-error-message{
    display: flex;
    min-height: 500px;
    align-items: center;
    justify-content: center;
    padding: 20px;
}
.survey{
    box-sizing: border-box;
    margin: 0;
    overflow-x: hidden;
    max-width:100vw
}
.survey-header{
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.radio-button{
    text-align: center;
}

.radio-buttons{
    display: flex;
    gap:30px;
    align-items: center;
}
.back-button{
    position: absolute;
    left: 20px;
    top: 20px;
}
.back-button a{
    text-decoration: none;
}
.survey-header span{
    font-size: 14px;
}
.survey-form{
    width: 75%;
    margin: auto;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
}
.survey-block{
    display: flex;
    flex-direction: column;
}
.survey-block .number-slider{
    margin-bottom: 50px;
}
.v-messages__message{
    margin-top: 20px;
}
.survey-block .text-editor{
    margin-bottom: 30px;
}
.survey-block .radio-buttons{
    margin: 20px 0px 30px 0
}
.number-slider{
    display: flex;
    gap:50px;
    align-items: center;
}

.survey-question{
    font-weight: bold;
}
.survey-buttons{
    display: flex;
    justify-content: center;
    width: 100%;
    margin-bottom: 50px;
}
.responsive-label-description{
    display: flex;
    justify-content: space-between;
    gap:10px;
    align-items: baseline;
    margin-right:10px;
    margin-left:-10px
}

.v-input__details{
    margin-top: 10px;
}
.branding{
    text-decoration: none;
    color:black;
    position: fixed;
    z-index: 100;
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
.radio-group{
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-direction: column;
}
.radio-label{
    color: #000;
}

@media only screen and (max-width: 1100px){ 
    .slider-label{
        text-align: center;
        font-weight: bold;
    }
    .slider-label-description{
        font-weight: lighter;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .back-button{
        position: relative;
        margin-bottom: 40px;
        display: flex;
        justify-content: left;
        align-items: center;
        width: 100%;
        margin: 0 auto 40px auto;
    }
    .survey-header{
        text-align: center;
        padding: 10px;
    }
    .number-slider{
        flex-direction: column;
        justify-items: center;
        align-items: normal;
        gap:0;
        margin: 20px 0;
    }
    .v-slider-track__tick-label{
        font-size: 10px;
    }
    .responsive-label-description p{
        text-align: center;
        font-size: 16px;
        max-width: 20px;
    }
    .radio-label{
        text-align: center;
        font-size: 12px;
    }
}
@media only screen and (max-width: 650px){ 
    .responsive-label-description p{
        text-align: center;
        font-size: 12px;
    }
    .branding{
        bottom:0
    }
}
@media only screen and (max-width: 500px){ 
    .radio-label{
        text-align: center;
        font-size: 10px;
    }
}
</style>