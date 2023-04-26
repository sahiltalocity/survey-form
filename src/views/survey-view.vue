<script setup>
import {ref, onBeforeUnmount, onMounted} from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()

//select language
const showSelectLanguage = ref(true);
const languageOptions = ref({
    English:{
        questions:[
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
                question: 'What do you like most about your job and work, in our organization?<br/>(in maximum 150 words)',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'What do you like least about your job and work, in our organization?<br/>(in maximum 150 words)',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
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
    },
    Gujarati:{
        questions:[
            {
                id:1,
                question: 'મારી પાસે મારા કામ પ્રત્યેની સ્પષ્ટતા અને પૂરતા સંસાધનો (ટૂલ્સ, મટિરિયલ્સ, ઇક્વિપમેન્ટ) છે.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:2,
                question: 'મારી પાસે મારા વ્યક્તિગત વિકાસ અને સુખાકારી પર શીખવા અને ધ્યાન કેન્દ્રિત કરવા માટે અનુકૂળ વાતાવરણ છે.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:3,
                question: 'મારા મેનેજર મારી સાથે સારો, વ્યાજબી, ઉદેશ્યપૂર્ણ વ્યવહાર રાખે છે અને તે મારા કાર્યકિર્દીની વૃદ્ધિમાં રસ ધરાવે છે.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:4,
                question: 'સાઇટ પર કામ કરવાની પરિસ્થિતિઓ અને સલામતી પ્રથાઓ સંતોષકારક છે.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:5,
                question: 'મને લાગે છે કે મારી કારકિર્દીની આકાંક્ષાઓને પૂર્ણ કરવા માટે આ સંસ્થા યોગ્ય સ્થાન ધરાવે છે.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:6,
                question: 'અમારી સંસ્થામાં તમારી નોકરી અને કાર્ય વિશે તમને સૌથી વધુ શું ગમે છે?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'અમારી સંસ્થામાં તમારી નોકરી અને કામ વિશે તમને સૌથી ઓછું શું ગમે છે?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
            {
                label:'ભારપૂર્વક અસહમત',
                value:1
            },
            {
                label:'અસહમત',
                value:2
            },
            {
                label:'સહમત',
                value:3
            },
            {
                label:'ભારપૂર્વક સહમત',
                value:4
            }
        ]
    },
    Hindi:{
        questions:[
            {
                id:1,
                question: 'मेरे पास अपने काम पर स्पष्टता है और अपना काम अच्छी तरह से करने के लिए पर्याप्त संसाधन (उपकरण, सामग्री, उपकरण) हैं',
                type:'radio-buttons',
                required:true,
            },
            {
                id:2,
                question: 'मेरे पास सीखने और अपने व्यक्तिगत विकास और कल्याण पर ध्यान केंद्रित करने के लिए अनुकूल वातावरण है',
                type:'radio-buttons',
                required:true,
            },
            {
                id:3,
                question: 'मेरे प्रबंधक मेरे साथ अच्छा व्यवहार करते हैं और निष्पक्ष, वस्तुनिष्ठ हैं और मेरे करियर के विकास में रुचि रखते हैं',
                type:'radio-buttons',
                required:true,
            },
            {
                id:4,
                question: 'साइट पर काम करने की स्थिति और सुरक्षा अभ्यास संतोषजनक है',
                type:'radio-buttons',
                required:true,
            },
            {
                id:5,
                question: 'मुझे लगता है कि यह संगठन मेरे करियर की आकांक्षाओं को पूरा करने के लिए सही जगह है.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:6,
                question: 'आप अपने काम के बारे में सबसे ज्यादा क्या पसंद करते हैं और हमारे संगठन में काम करते हैं?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'आप अपनी नौकरी और हमारे संगठन में काम के बारे में सबसे कम क्या पसंद करते हैं?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
            {
                label:'पूरी तरह असहमत',
                value:1
            },
            {
                label:'असहमत',
                value:2
            },
            {
                label:'सहमत',
                value:3
            },
            {
                label:'पूरी तरह सहमत',
                value:4
            }
        ]
    },
    Tamil:{
        questions:[
            {
                id:1,
                question: 'எனது வேலையைச் சிறப்பாகச் செய்வதற்குப் போதுமான வளங்கள் (கருவிகள், பொருட்கள், உபகரணங்கள்) பற்றிய தெளிவு என்னிடம் உள்ளது.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:2,
                question: 'எனது தனிப்பட்ட மேம்பாடு மற்றும் நல்வாழ்வில் கற்கவும் கவனம் செலுத்தவும் எனக்கு உகந்த சூழல் உள்ளது',
                type:'radio-buttons',
                required:true,
            },
            {
                id:3,
                question: 'எனது மேலாளர் நியாயமானவர் மற்றும் என்னை நன்றாக நடத்துகிறார், எனது தொழில் வளர்ச்சியில் குறிக்கோள் மற்றும் ஆர்வமாக இருக்கிறார்.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:4,
                question: 'எனது ஆலையில் பணி நிலைமைகள் மற்றும் பாதுகாப்பு நடைமுறைகள் திருப்திகரமாக உள்ளன.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:5,
                question: 'எனது தொழில் குறிக்கோள்களை நிறைவேற்ற இந்த அமைப்பு சரியான இடம் என்று நான் உணர்கிறேன்.',
                type:'radio-buttons',
                required:true,
            },
            {
                id:6,
                question: 'நமது நிறுவனத்தில் உங்கள் வேலை மற்றும் பணியில் நீங்கள் எதை அதிகம் விரும்புகிறீர்கள்?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'நமது நிறுவனத்தில் உங்கள் வேலை மற்றும் பணியில் நீங்கள் எதை குறைவாக விரும்புகிறீர்கள்?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
            {
                label:'கடுமையாக உடன்படவில்லை',
                value:1
            },
            {
                label:'உடன்படவில்லை',
                value:2
            },
            {
                label:'உடன்படுகிறேன்',
                value:3
            },
            {
                label:'கடுமையாக உடன்படுகிறேன்',
                value:4
            }
        ]
    },
    Kannada:{
        questions:[
            {
                id:1,
                question: 'ನನ್ನ ಕೆಲಸವನ್ನು ಉತ್ತಮವಾಗಿ ನಿರ್ವಹಿಸಲು ನನ್ನ ಕೆಲಸ ಮತ್ತು ಸಾಕಷ್ಟು ಸಂಪನ್ಮೂಲಗಳು (ಉಪಕರಣಗಳು, ಸಾಮಗ್ರಿಗಳು, ಸಲಕರಣೆಗಳು) ಬಗ್ಗೆ ನನಗೆ ಸ್ಪಷ್ಟತೆ ಇದೆ',
                type:'radio-buttons',
                required:true,
            },
            {
                id:2,
                question: 'ನನ್ನ ವೈಯಕ್ತಿಕ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಯೋಗಕ್ಷೇಮವನ್ನು ಕಲಿಯಲು ಮತ್ತು ಗಮನಹರಿಸಲು ನಾನು ಅನುಕೂಲಕರ ವಾತಾವರಣವನ್ನು ಹೊಂದಿದ್ದೇನೆ',
                type:'radio-buttons',
                required:true,
            },
            {
                id:3,
                question: 'ನನ್ನ ಮ್ಯಾನೇಜರ್ ನನ್ನನ್ನು ಚೆನ್ನಾಗಿ ನಡೆಸಿಕೊಳ್ಳುತ್ತಾರೆ ಮತ್ತು ನ್ಯಾಯಯುತ, ವಸ್ತುನಿಷ್ಠ ಮತ್ತು ನನ್ನ ವೃತ್ತಿಜೀವನದ ಬೆಳವಣಿಗೆಯಲ್ಲಿ ಆಸಕ್ತಿ ಹೊಂದಿದ್ದಾರೆ',
                type:'radio-buttons',
                required:true,
            },
            {
                id:4,
                question: 'ಕೆಲಸದ ಪರಿಸ್ಥಿತಿಗಳು ಮತ್ತು ಸೈಟ್‌ನಲ್ಲಿನ ಸುರಕ್ಷತಾ ಅಭ್ಯಾಸಗಳು ತೃಪ್ತಿಕರವಾಗಿವೆ',
                type:'radio-buttons',
                required:true,
            },
            {
                id:5,
                question: 'ನನ್ನ ವೃತ್ತಿಜೀವನದ ಆಕಾಂಕ್ಷೆಗಳನ್ನು ಪೂರೈಸಲು ಈ ಸಂಸ್ಥೆಯು ಸರಿಯಾದ ಸ್ಥಳವೆಂದು ನಾನು ಭಾವಿಸುತ್ತೇನೆ',
                type:'radio-buttons',
                required:true,
            },
            {
                id:6,
                question: 'ನಮ್ಮ ಸಂಸ್ಥೆಯಲ್ಲಿ ನಿಮ್ಮ ಕೆಲಸ ಮತ್ತು ಕೆಲಸದ ಬಗ್ಗೆ ನೀವು ಹೆಚ್ಚು ಇಷ್ಟಪಡುವಿರಿ?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'ನಮ್ಮ ಸಂಸ್ಥೆಯಲ್ಲಿ ನಿಮ್ಮ ಕೆಲಸ ಮತ್ತು ಕೆಲಸದ ಬಗ್ಗೆ ನೀವು ಏನು ಇಷ್ಟಪಡುತ್ತೀರಿ?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
            {
                label:'ಬಲವಾಗಿ ಒಪ್ಪುವುದಿಲ್ಲ',
                value:1
            },
            {
                label:'ಅಸಮ್ಮತಿ',
                value:2
            },
            {
                label:'ಒಪ್ಪಿಗೆ',
                value:3
            },
            {
                label:'ಬಲವಾಗಿ ಒಪ್ಪುತ್ತೇನೆ',
                value:4
            }
        ]
    },
    Telugu:{
        questions:[
            {
                id:1,
                question: 'నా పనిపై నాకు స్పష్టత ఉంది మరియు నా పనిని చక్కగా నిర్వహించడానికి తగిన వనరులు (సాధనాలు, మెటీరియల్స్, పరికరాలు) ఉన్నాయి',
                type:'radio-buttons',
                required:true,
            },
            {
                id:2,
                question: 'నేను నేర్చుకోవడానికి మరియు నా వ్యక్తిగత అభివృద్ధి మరియు శ్రేయస్సుపై దృష్టి ట్టడానికి అనుకూలమైన వాతావరణం కలిగి ఉన్నాను',
                type:'radio-buttons',
                required:true,
            },
            {
                id:3,
                question: 'నా మేనేజర్ నాతో మంచిగా వ్యవహరిస్తారు మరియు న్యాయంగా, లక్ష్యంతో మరియు నా కెరీర్ గ్రోత్ పట్ల ఆసక్తిని కలిగి ఉంటారు',
                type:'radio-buttons',
                required:true,
            },
            {
                id:4,
                question: 'సైట్‌లో పని పరిస్థితులు మరియు భద్రతా పద్ధతులు సంతృప్తికరంగా ఉన్నాయి',
                type:'radio-buttons',
                required:true,
            },
            {
                id:5,
                question: 'నా కెరీర్ ఆకాంక్షలను నెరవేర్చుకోవడానికి ఈ సంస్థ సరైన స్థలమని నేను భావిస్తున్నాను',
                type:'radio-buttons',
                required:true,
            },
            {
                id:6,
                question: 'మా సంస్థలో మీ ఉద్యోగం మరియు పని గురించి మీకు ఏది బాగా నచ్చింది?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
            {
                id:7,
                question: 'మా సంస్థలో మీ ఉద్యోగం మరియు పని గురించి మీకు ఏది తక్కువ ఇష్టం?',
                type:'text-editor',
                required:true,
                wordLimit150:true,
            },
        ],
        options:[
            {
                label:'గట్టిగా విభేదించడం',
                value:1
            },
            {
                label:'ఏకీభవించడం లేదు',
                value:2
            },
            {
                label:'అంగీకరించడం',
                value:3
            },
            {
                label:'గట్టిగా అంగీకరించడం',
                value:4
            }
        ]
    },
});
const language = ref();
const languageSelectForm = ref(null);
const selectLanguage = async () => {
    const validate = await languageSelectForm.value.validate();
    if(validate.valid){
        showSelectLanguage.value = false;
    }
}

let width = ref(screen.width);

const form = ref(null);
const uuid = route.params.id
const uuidStatus = ref({
    valid:true
});
const convertToResponse = (questions) => {
    const response = ref({
        uuid : uuid,
        language: language.value
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
            const response = await fetch(`https://adani-temp.talocity.ai:8002/api/surveys/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(convertToResponse(languageOptions.value[language.value].questions))
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
        <div class="main-content" v-else>
            <v-app v-if="showSelectLanguage">
                <v-form validate-on="submit" class="select-language" ref="languageSelectForm" @submit.prevent="selectLanguage" lazy-validation>
                    <v-select
                        label="Select language..."
                        :items="Object.keys(languageOptions)"
                        variant="outlined"
                        v-model="language"
                        :rules="[required('Please select a language to continue')]"
                        validate-on="input"
                    >
                    </v-select>
                    <v-btn type="submit" size="large" variant="outlined" rounded="0" icon="mdi-arrow-right-bold "></v-btn>
                </v-form>
            </v-app>
            <v-app class="survey-form" v-else>
                <div class="back-button">
                    <v-btn icon="mdi-arrow-left-bold" @click="showSelectLanguage=true" variant="outlined" rounded="0"></v-btn>
                </div>
                <v-form validate-on="submit" @submit.prevent="submitForm" ref="form" lazy-validation>
                    <div class="survey-block" v-for="(question,index) in languageOptions[language]?.questions" :key="`question-${index}`">
                        <div class="survey-question">
                            <p>
                                {{ question.id }}.
                            </p> 
                            <div>
                                <span v-html="question.question"></span><br/>
                                <span v-if="language!=='English'" v-html="languageOptions.English.questions[index].question"></span>
                            </div>

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
                                <v-radio class="radio-button" :value="elem.value" :key="`button-${question.id}-${elem.value}-${index}`" v-for="(elem,index) of languageOptions[language].options">
                                    <template #label>
                                        <div class="radio-label">
                                            {{elem.value}}<br/>
                                            <span v-html="elem.label"></span><br/>
                                            <span v-if="language!=='English'" v-html="languageOptions['English']?.options[index].label"></span>
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
                        <v-btn rounded="4" type="submit" color="black">Submit</v-btn>
                    </div>
                </v-form>
            </v-app>
        </div>
        <a href="https://talocity.ai" target="_blank" class="branding">
            <p>
                Powered by 
            </p> 
            <img src="@/assets/talocity_logo.png"/>
        </a>
    </div>
</template>
<style scoped>
.select-language{
    display: flex;
    align-items: top;
    gap:10px;
    width:75%;
    margin: 50px auto;
}
.slider-label{
    min-width: 100px;
}
.header-logo{
    height: 80px;
    margin-bottom: 20px;
}
.uuid-error-message{
    display: flex;
    min-height: 300px;
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
    position: relative;
    margin-bottom: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: 0 auto 40px auto;
}
.survey-header span{
    font-size: 14px;
}
.survey-form{
    position: relative;
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
    display: flex;
    gap: 10px;
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
        justify-content: center;
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