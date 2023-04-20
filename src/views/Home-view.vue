<script setup>
import {ref} from 'vue'
const tickLabels = {
	0: '1 (Strongly Disagree)',
	1: '2',
	2: '3',
	3: '4 (Strongly Agree)',
};

const submitForm = () => {
    alert("This is for demo purpose only. No data has been submitted.")
}
const required =  value => !!value || 'This cannot be empty'
const questions = ref([
    {
        id:1,
        question: 'I would recommend Adani to friends and family as a great place to work',
        type:'radio-buttons',
        required:false,
        response:true
    },
    {
        id:2,
        question: 'I feel excited about coming to work',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:3,
        question: 'I am proud of working with Adani',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:4,
        question: 'I am satisfied with your current compensation and benefits?',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:5,
        question: 'I enjoy working with my team',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:6,
        question: 'My work at Adani is meaningful',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:7,
        question: 'I feel comfortable asking for help if I don’t have the skills required to meet my goals',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:8,
        question: 'Adani’s vision and values inspire me',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:9,
        question: 'My manager provides recognition for my accomplishments at work',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:10,
        question: 'I believe my manager is invested in my success',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:11,
        question: 'My Company’s culture fosters a comfortable, supportive work environment',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:12,
        question: 'I plan to be working at my organization two years from now.',
        type:'radio-buttons',
        required:false,
        response:true
    },
    {
        id:13,
        question: 'My work challenges me and aids in my development',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:14,
        question: 'I am able to see a clear path for my career advancement at Adani',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:15,
        question: 'Recently I have thought about leaving Adani',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:16,
        question: 'The leadership at Adani asked about and expressed support for my career goals',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:17,
        question: 'I am often stressed with deadlines and workloads',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:18,
        question: 'My weekends and holidays are spent on work related priorities',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:19,
        question: 'Facilities available at my site are supportive of my health and hygiene',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:20,
        question: 'My commute to work is comfortable',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:21,
        question: 'Safety and Security of my work site is up to global standards',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:22,
        question: 'My workplace has safe & hygienic restrooms, workspaces and commute',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:23,
        question: 'My workplace is close to cities that are supportive of my family’s wellbeing (Schooling, Medical, Connectivity, Basic necessities etc)',
        type:'number-slider',
        required:false,
        response:0
    },
    {
        id:24,
        question: 'I am provided with all the necessary tools to do my job right',
        type:'number-slider',
        required:true,
        response:0
    },
    {
        id:25,
        question: 'What practices do we need to change?',
        type:'text-editor',
        required:false,
        response:""
    },
    {
        id:26,
        question: 'Are there any problems with our culture?',
        type:'text-editor',
        required:false,
        response:""
    },
    {
        id:27,
        question: 'How can we help improve your engagement at work?',
        type:'text-editor',
        required:false,
        response:""
    },
    {
        id:28,
        question: 'Is there anything else you would like to share that you find important to your employee experience here at Adani?',
        type:'text-editor',
        required:false,
        response:""
    },
])
</script>
<template>
    <div class="survey-header">
        <h1>
            Survey Form - Adani Group
        </h1> 
        <span>Powered by Talocity</span>
    </div>
    <v-app class="survey-form">
        <v-form @submit="submitForm">
            <div class="survey-block" v-for="(question,index) in questions" :key="`question-${index}`">
                <div class="survey-question">
                    {{ question.required?"(MANDATORY)":"" }} {{ question.question }} 
                </div>
                <div class="number-slider" v-if="question.type === 'number-slider'">
                    <div class="slider-label"> 
                        Rate (1-4)
                    </div>
                    <v-slider
                        :rules="question.required?[required]:[]"
                        :ticks="tickLabels"
                        :max="3"
                        :step="1"
                        show-ticks="always"
                        :tick-size="4"
                        v-model="question.response"
                    ></v-slider>
                </div>
                <div class="radio-buttons" v-else-if="question.type === 'radio-buttons'">
                    <v-radio-group v-model="question.response" :rules="question.required?[required]:[]" inline>
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
                        :rules="question.required?[required]:[]"
                        label="Type your response..."
                        auto-grow
                        variant="outlined"
                        rows="3"
                        row-height="25"
                        shaped
                        v-model="question.response"
                        ></v-textarea>
                    </v-col>
                </div>
                <!-- {{ question.response }} -->
            </div>    
            <div class="survey-buttons">
                <v-btn rounded="4" type="submit" @click="submitForm" color="blue">Submit</v-btn>
            </div>
        </v-form>
    </v-app>
</template>
<style scoped>
.survey-header{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
}
.survey-header span{
    font-size: 14px;
}
.survey-form{
    width: 75%;
    margin: auto;
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
.survey-block .text-editor .{
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
</style>