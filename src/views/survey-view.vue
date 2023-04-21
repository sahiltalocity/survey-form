<script setup>
import {ref, onBeforeUnmount, onMounted} from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

const tickLabels = {
	1: '1 (Strongly Disagree)',
	2: '2 (Disagree)',
	3: '3 (Agree)',
	4: '4 (Strongly Agree)',
};
let width = ref(screen.width);
const tickLabelsResponsive = {
	1: '1',
	2: '2',
	3: '3',
	4: '4',
};

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
const required =  value => !!value || 'This cannot be empty'
const wordLimit150 = value => (value?.split('').filter(c=>c===' ') || [] ).length <= 149 || 'This must be 150 words or less'
// const questions = ref([
//     {
//         id:1,
//         question: 'I would recommend Adani to friends and family as a great place to work',
//         type:'radio-buttons',
//         required:true,
//     },
//     {
//         id:2,
//         question: 'I feel excited about coming to work',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:3,
//         question: 'I am proud of working with Adani',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:4,
//         question: 'I am satisfied with your current compensation and benefits?',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:5,
//         question: 'I enjoy working with my team',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:6,
//         question: 'My work at Adani is meaningful',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:7,
//         question: 'I feel comfortable asking for help if I don’t have the skills required to meet my goals',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:8,
//         question: 'Adani’s vision and values inspire me',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:9,
//         question: 'My manager provides recognition for my accomplishments at work',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:10,
//         question: 'I believe my manager is invested in my success',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:11,
//         question: 'My Company’s culture fosters a comfortable, supportive work environment',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:12,
//         question: 'I plan to be working at my organization two years from now.',
//         type:'radio-buttons',
//         required:false,
//     },
//     {
//         id:13,
//         question: 'My work challenges me and aids in my development',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:14,
//         question: 'I am able to see a clear path for my career advancement at Adani',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:15,
//         question: 'Recently I have thought about leaving Adani',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:16,
//         question: 'The leadership at Adani asked about and expressed support for my career goals',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:17,
//         question: 'I am often stressed with deadlines and workloads',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:18,
//         question: 'My weekends and holidays are spent on work related priorities',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:19,
//         question: 'Facilities available at my site are supportive of my health and hygiene',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:20,
//         question: 'My commute to work is comfortable',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:21,
//         question: 'Safety and Security of my work site is up to global standards',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:22,
//         question: 'My workplace has safe & hygienic restrooms, workspaces and commute',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:23,
//         question: 'My workplace is close to cities that are supportive of my family’s wellbeing (Schooling, Medical, Connectivity, Basic necessities etc)',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:24,
//         question: 'I am provided with all the necessary tools to do my job right',
//         type:'number-slider',
//         required:false,
//     },
//     {
//         id:25,
//         question: 'What practices do we need to change?',
//         type:'text-editor',
//         required:true,
//     },
//     {
//         id:26,
//         question: 'Are there any problems with our culture?',
//         type:'text-editor',
//         required:false,
//     },
//     {
//         id:27,
//         question: 'How can we help improve your engagement at work?',
//         type:'text-editor',
//         required:false,
//     },
//     {
//         id:28,
//         question: 'Is there anything else you would like to share that you find important to your employee experience here at Adani?',
//         type:'text-editor',
//         required:false,
//     },
// ])
const questions = ref([
    {
        id:1,
        question: 'I have clarity on my work and adequate resources (tools, materials, equipment ) to perform my job well',
        type:'number-slider',
        answer:1,
        required:true,
    },
    {
        id:2,
        question: 'I have conducive environment to learn and focus on my individual development and well-being',
        type:'number-slider',
        answer:1,
        required:true,
    },
    {
        id:3,
        question: 'My manager treats me well and is fair, objective and interested in my career growth',
        type:'number-slider',
        answer:1,
        required:true,
    },
    {
        id:4,
        question: 'Working conditions and safety practices on site are satisfactory',
        type:'number-slider',
        answer:1,
        required:true,
    },
    {
        id:5,
        question: 'I feel this organization is the right place to fulfil my career aspirations',
        type:'number-slider',
        answer:1,
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
                        {{ question.required?"(MANDATORY)":"" }} {{ question.question }}{{ question.wordLimit150?" (in maximum 150 words)":"" }}
                    </div>
                    <div class="number-slider" v-if="question.type === 'number-slider'">
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
                    </div>
                    <div class="radio-buttons" v-else-if="question.type === 'radio-buttons'">
                        <v-radio-group 
                            v-model="question.answer" 
                            :rules="question.required?[required]:[]" 
                            inline
                            validate-on="input"
                        >
                            <v-radio label="Yes" :value="true"></v-radio>
                            <v-radio label="No" :value="false"></v-radio>
                        </v-radio-group>
                    </div>
                    <div class="text-editor" style="{width:100%}" v-else-if="question.type === 'text-editor'">
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-textarea
                            :rules="[question.required?required:'',question.wordLimit150?wordLimit150:'']"
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
            <img src="@/assets/logo.png"/>
        </a>
    </div>
</template>
<style scoped>

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
.survey-block .text-editor, .survey-block .radio-buttons{
    margin-bottom: 10px;
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
    margin-bottom: 20px;
}
.responsive-label-description{
    display: flex;
    justify-content: space-between;
    gap:10px;
    align-items: baseline;
    margin-right:10px;
    margin-left:-10px
}
.responsive-label-description p{
    max-width: 20px;
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
    font-size: 14px;
    background: #fff;
}
.branding img{
    height: 25px;
    width:auto;
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
@media only screen and (max-width: 300px){ 
    .responsive-label-description p{
        text-align: center;
        font-size: 10px;
    }
}
</style>