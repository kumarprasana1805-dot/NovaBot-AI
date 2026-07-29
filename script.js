// ======================================================
// Bali AI
// script.js
// PART 1
// Core Initialization
// ======================================================

// ==============================
// Screens
// ==============================

const splashScreen = document.getElementById("splash");
const welcomeScreen = document.getElementById("welcome");
const loadingScreen = document.getElementById("loading");
const modeScreen = document.getElementById("modeScreen");
const languageScreen = document.getElementById("languageScreen");
const receptionScreen = document.getElementById("receptionScreen");
const conversationScreen = document.getElementById("conversationScreen");

// ==============================
// UI Elements
// ==============================

const welcomeText = document.getElementById("welcomeText");
const loadingStatus = document.getElementById("loadingStatus");

// Reception

const receptionInput =
document.getElementById("receptionInput");

const receptionMessages =
document.getElementById("receptionMessages");

// Conversation

const conversationInput =
document.getElementById("conversationInput");

const conversationMessages =
document.getElementById("conversationMessages");

// ==============================
// Global Variables
// ==============================

let selectedAI = "";
let selectedLanguage = "";

let knowledge = {};
let intents = {};

let recognition = null;

let chatHistory = [];

let currentMode = "";

// ======================================================
// Start Bali
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded");

    startSplash();

});

// ======================================================
// Hide All Screens
// ======================================================

function hideAllScreens() {

    splashScreen.classList.add("hidden");
    welcomeScreen.classList.add("hidden");
    loadingScreen.classList.add("hidden");
    modeScreen.classList.add("hidden");
    languageScreen.classList.add("hidden");
    receptionScreen.classList.add("hidden");
    conversationScreen.classList.add("hidden");

}

// ======================================================
// Common Speak Function
// ======================================================

function speak(text) {

    speechSynthesis.cancel();

    const speech =
    new SpeechSynthesisUtterance(text);

    speech.lang =
    selectedLanguage === "Hindi"
        ? "hi-IN"
        : "en-US";

    speech.rate = 0.95;
    speech.pitch = 1;

    speechSynthesis.speak(speech);

}

// ======================================================
// Splash Screen
// ======================================================

function startSplash() {

    hideAllScreens();

    splashScreen.classList.remove("hidden");

    setTimeout(() => {

        splashScreen.classList.add("hidden");

        startWelcome();

    }, 3000);

}

// ======================================================
// Welcome Screen
// ======================================================

function startWelcome() {

    hideAllScreens();

    welcomeScreen.classList.remove("hidden");

    welcomeSpeech();

}

// ======================================================
// Welcome Speech
// ======================================================

function welcomeSpeech() {

    console.log("Welcome Speech Started");

    welcomeText.innerHTML =
        "Jai Hind! Welcome to Sunbeam School Ballia. I am Bali, your Reception Humanoid Robot.";

    const speech = new SpeechSynthesisUtterance(
        "Jai Hind! Welcome to Sunbeam School Ballia. I am Bali, your Reception Humanoid Robot.."
    );

    speech.lang = "en-US";
    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onend = () => {

        console.log("Speech Finished");

        startLoading();

    };

    speech.onerror = () => {

        console.log("Speech Error");

        startLoading();

    };

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);

    // Safety fallback
    setTimeout(() => {

        if (!loadingScreen.classList.contains("hidden")) return;

        console.log("Fallback Loading");

        startLoading();

    }, 5000);

}
// ======================================================
// Loading Screen
// ======================================================

function startLoading() {

    hideAllScreens();

    loadingScreen.classList.remove("hidden");

    const steps = [

        "Loading AI Core...",
        "Loading Memory...",
        "Loading Voice Engine...",
        "Loading Reception AI...",
        "Loading Conversation AI...",
        "Preparing bali..."

    ];

    let index = 0;

    loadingStatus.innerHTML = steps[index];

    const timer = setInterval(() => {

        index++;

        if (index < steps.length) {

            loadingStatus.innerHTML = steps[index];

        }

        else {

            clearInterval(timer);

            showModeSelection();

        }

    }, 1000);

}

// ======================================================
// Mode Selection
// ======================================================

function showModeSelection() {

    hideAllScreens();

    modeScreen.classList.remove("hidden");

    speak(

        "Please select an Artificial Intelligence mode according your choice."

    );

}

// ======================================================
// AI Selection
// ======================================================

function selectAI(ai) {

    selectedAI = ai;

    hideAllScreens();

    languageScreen.classList.remove("hidden");

    speak(

        "Please choose your preferred language."

    );

}

// ======================================================
// Language Selection
// ======================================================

function chooseLanguage(language) {

    selectedLanguage = language;

    if (selectedAI === "Reception") {

        startReceptionAI();

    }

    else if (selectedAI === "Conversation") {

        startConversationAI();

    }

    else {

        alert(selectedAI + " AI Coming Soon.");

    }

}
// ======================================================
// Bali AI
// PART 2
// Reception AI Initialization
// ======================================================

// ==============================
// Load Knowledge Base
// ==============================

async function loadKnowledgeBase() {

    try {

        const response =
        await fetch("./data/knowledgeBase.json");

        if (!response.ok) {

            throw new Error("knowledgeBase.json not found");

        }

        knowledge = await response.json();

        console.log("✅ Knowledge Base Loaded");

    }

    catch (error) {

        console.error(error);

        alert("Knowledge Base Loading Failed");

    }

}

// ==============================
// Load Intent Map
// ==============================

async function loadIntentMap() {

    try {

        const response =
        await fetch("./data/intentMap.json");

        if (!response.ok) {

            throw new Error("intentMap.json not found");

        }

        intents = await response.json();

        console.log("✅ Intent Map Loaded");

    }

    catch (error) {

        console.error(error);

        alert("Intent Map Loading Failed");

    }

}

// ======================================================
// Reception AI Start
// ======================================================

async function startReceptionAI() {

    currentMode = "reception";

    hideAllScreens();

    receptionScreen.classList.remove("hidden");

    clearReceptionChat();

    await loadKnowledgeBase();

    await loadIntentMap();

    startStatusAnimation();

    showReceptionWelcome();

    speak(

        "Jai Hind. I am Bali, the Reception Humanoid Robot of Sunbeam School Ballia. How may I help you today?"

    );

}

// ======================================================
// Reception Status Animation
// ======================================================

let animationTimer = null;

function startStatusAnimation() {

    const boxes =
    document.querySelectorAll(".statusBox");

    if (animationTimer) {

        clearInterval(animationTimer);

    }

    let index = 0;

    animationTimer = setInterval(() => {

        boxes.forEach(box => {

            box.style.background =
            "rgba(0,255,255,.08)";

            box.style.boxShadow =
            "0 0 0px cyan";

        });

        if (boxes[index]) {

            boxes[index].style.background =
            "rgba(0,255,255,.35)";

            boxes[index].style.boxShadow =
            "0 0 25px cyan";

        }

        index++;

        if (index >= boxes.length) {

            index = 0;

        }

    }, 600);

}

// ======================================================
// Stop Animation
// ======================================================

function stopStatusAnimation() {

    if (animationTimer) {

        clearInterval(animationTimer);

        animationTimer = null;

    }

}

// ======================================================
// Clear Reception Chat
// ======================================================

function clearReceptionChat() {

    receptionMessages.innerHTML = "";

}

// ======================================================
// Reception Welcome Message
// ======================================================

function showReceptionWelcome() {

    addReceptionMessage(

        "👋 Hello! Welcome to Balia humoid Reception AI.<br><br>I can help you with:<br>• Admissions<br>• Fees<br>• Teachers<br>• School Timing<br>• Transport<br>• Contact Information",

        "bot"

    );

}
// ======================================================
// Bali AI
// PART 3
// Reception Chat System
// ======================================================

// ==============================
// Send Reception Message
// ==============================

function sendReceptionMessage() {

    const question = receptionInput.value.trim();

    if (question === "") return;

    addReceptionMessage(question, "user");

    receptionInput.value = "";

    showTypingAnimation();

    setTimeout(() => {

        removeTypingAnimation();

        const answer = receptionReply(question);

        addReceptionMessage(answer, "bot");

        speak(answer);

    }, 700);

}

// ==============================
// Add Reception Message
// ==============================

function addReceptionMessage(message, sender) {

    const div = document.createElement("div");

    div.className =
        sender === "user"
        ? "userMessage"
        : "botMessage";

    div.innerHTML = message;

    receptionMessages.appendChild(div);

    receptionMessages.scrollTop =
        receptionMessages.scrollHeight;

}

// ==============================
// Typing Animation
// ==============================

function showTypingAnimation() {

    const typing =
        document.createElement("div");

    typing.id = "typing";

    typing.className = "botMessage";

    typing.innerHTML = "🤖 Thinking...";

    receptionMessages.appendChild(typing);

    receptionMessages.scrollTop =
        receptionMessages.scrollHeight;

}

// ==============================
// Remove Typing Animation
// ==============================

function removeTypingAnimation() {

    const typing =
        document.getElementById("typing");

    if (typing) {

        typing.remove();

    }

}

// ======================================================
// Detect Intent
// ======================================================

function detectIntent(question) {

    question = question.toLowerCase();

    for (const intent in intents) {

        const keywords = intents[intent];

        for (const keyword of keywords) {

            if (
                question.includes(
                    keyword.toLowerCase()
                )
            ) {

                return intent;

            }

        }

    }

    return "unknown";

}

// ======================================================
// Reception Reply
// ======================================================

function receptionReply(question) {

    const intent =
        detectIntent(question);

    switch (intent) {

        // ==========================
        // School Information
        // ==========================

        case "principal":

            return "Our Principal is " +
                knowledge.management.principal.name;

        case "vicePrincipal":

            return "Our Vice Principal is " +
                knowledge.management.vicePrincipal.name;

        case "address":

            return knowledge.school.address;

        case "phone":

            return knowledge.contacts.phone;

        case "website":

            return knowledge.contacts.website;

        case "schoolTiming":

            return knowledge.school.timing;
                    // ==========================
        // Fees
        // ==========================

        case "fees":

            if (question.includes("nursery"))
                return "Nursery fee is " + knowledge.fees.nursery.monthly;

            if (question.includes("lkg"))
                return "LKG fee is " + knowledge.fees.lkg.monthly;

            if (question.includes("ukg"))
                return "UKG fee is " + knowledge.fees.ukg.monthly;

            if (question.includes("1"))
                return "Class 1 fee is " + knowledge.fees.class1.monthly;

            if (question.includes("2"))
                return "Class 2 fee is " + knowledge.fees.class2.monthly;

            if (question.includes("3"))
                return "Class 3 fee is " + knowledge.fees.class3.monthly;

            if (question.includes("4"))
                return "Class 4 fee is " + knowledge.fees.class4.monthly;

            if (question.includes("5"))
                return "Class 5 fee is " + knowledge.fees.class5.monthly;

            if (question.includes("6"))
                return "Class 6 fee is " + knowledge.fees.class6.monthly;

            if (question.includes("7"))
                return "Class 7 fee is " + knowledge.fees.class7.monthly;

            if (question.includes("8"))
                return "Class 8 fee is " + knowledge.fees.class8.monthly;

            if (question.includes("9"))
                return "Class 9 fee is " + knowledge.fees.class9.monthly;

            if (question.includes("10"))
                return "Class 10 fee is " + knowledge.fees.class10.monthly;

            if (question.includes("11 science"))
                return "Class 11 Science fee is " + knowledge.fees.class11Science.monthly;

            if (question.includes("11 commerce"))
                return "Class 11 Commerce fee is " + knowledge.fees.class11Commerce.monthly;

            if (question.includes("11 arts"))
                return "Class 11 Arts fee is " + knowledge.fees.class11Arts.monthly;

            if (question.includes("12 science"))
                return "Class 12 Science fee is " + knowledge.fees.class12Science.monthly;

            if (question.includes("12 commerce"))
                return "Class 12 Commerce fee is " + knowledge.fees.class12Commerce.monthly;

            if (question.includes("12 arts"))
                return "Class 12 Arts fee is " + knowledge.fees.class12Arts.monthly;

            return "Please tell me the class for which you want to know the fee.";

        // ==========================
        // Teachers
        // ==========================

        case "teacher":

            if (question.includes("physics"))
                return "Physics teacher is " + knowledge.teachers.physics.name;

            if (question.includes("chemistry"))
                return "Chemistry teacher is " + knowledge.teachers.chemistry.name;

            if (question.includes("math"))
                return "Math teacher is " + knowledge.teachers.math.name;

            if (question.includes("biology"))
                return "Biology teacher is " + knowledge.teachers.biology.name;

            if (question.includes("english"))
                return "English teacher is " + knowledge.teachers.english.name;

            return "Please tell me the subject name.";

        // ==========================
        // Transport
        // ==========================

        case "transport":

            return "Transport Facility : " +
                   knowledge.transport.available +

                   ". Transport Incharge : " +
                   knowledge.transport.incharge +

                   ". Contact Number : " +
                   knowledge.transport.phone;

        // ==========================
        // Director
        // ==========================

        case "director":

            return "Our Director is " +
                   knowledge.management.director.name;

        // ==========================
        // Greeting
        // ==========================

        case "greeting":

            return "Hello 👋 Welcome to bali a humoid Reception AI. How may I help you today?";

        // ==========================
        // Goodbye
        // ==========================

        case "goodbye":

            return "Thank you for visiting. Have a wonderful day.";

        // ==========================
        // Default
        // ==========================

        default:

            return "Sorry, I couldn't understand your question. Please ask about admissions, fees, teachers, transport, timings or school information.";

    }

}
// ======================================================
// Bali AI
// PART 5
// Voice Recognition
// ======================================================

// ==============================
// Speech Recognition Setup
// ==============================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;

}
else {

    console.warn("Speech Recognition is not supported.");

}

// ======================================================
// Start Listening
// ======================================================

function startListening() {

    if (!recognition) {

        alert("Speech Recognition is not supported.");

        return;

    }

    recognition.lang =
        selectedLanguage === "Hindi"
        ? "hi-IN"
        : "en-US";

    recognition.start();

    if (currentMode === "reception") {

        const mic =
        document.getElementById("micButton");

        if (mic) {

            mic.innerHTML = "🎙 Listening...";
            mic.disabled = true;

        }

    }

    if (currentMode === "conversation") {

        const mic =
        document.getElementById("conversationMic");

        if (mic) {

            mic.innerHTML = "🎙 Listening...";
            mic.disabled = true;

        }

    }

}

// ======================================================
// Voice Result
// ======================================================

recognition.onresult = function(event){

    const speechText =
    event.results[0][0].transcript;

    if(currentMode==="reception"){

        receptionInput.value =
        speechText;

        sendReceptionMessage();

    }

    else if(currentMode==="conversation"){

        conversationInput.value =
        speechText;

        sendConversationMessage();

    }

};

// ======================================================
// Voice End
// ======================================================

recognition.onend = function(){

    const receptionMic =
    document.getElementById("micButton");

    if(receptionMic){

        receptionMic.innerHTML="🎤";

        receptionMic.disabled=false;

    }

    const conversationMic =
    document.getElementById("conversationMic");

    if(conversationMic){

        conversationMic.innerHTML="🎤";

        conversationMic.disabled=false;

    }

};

// ======================================================
// Voice Error
// ======================================================

recognition.onerror = function(event){

    console.log(event.error);

    recognition.onend();

    switch(event.error){

        case "no-speech":

            speak(
                "I could not hear anything. Please try again."
            );

            break;

        case "audio-capture":

            speak(
                "Microphone not detected."
            );

            break;

        case "not-allowed":

            speak(
                "Please allow microphone permission."
            );

            break;

        default:

            speak(
                "Voice recognition failed."
            );

    }

};

// ======================================================
// Enter Key Support
// ======================================================

if(receptionInput){

    receptionInput.addEventListener(

        "keypress",

        function(event){

            if(event.key==="Enter"){

                sendReceptionMessage();

            }

        }

    );

}

if(conversationInput){

    conversationInput.addEventListener(

        "keypress",

        function(event){

            if(event.key==="Enter"){

                sendConversationMessage();

            }

        }

    );

}

// ======================================================
// Clear Reception Chat
// ======================================================

function clearReceptionMessages(){

    receptionMessages.innerHTML="";

    showReceptionWelcome();

}
// ======================================================
// Bali AI
// PART 6
// Conversation AI
// ======================================================

// ==============================
// Start Conversation AI
// ==============================

function startConversationAI() {

    currentMode = "conversation";

    hideAllScreens();

    conversationScreen.classList.remove("hidden");

    clearConversationMessages();

    resetConversationHistory();

    addConversationMessage(

        "👋 Hello! I am  bali Conversation AI.<br><br>You can ask me anything.",

        "bot"

    );

    speak(

        "Conversation AI Activated. How can I help you today?"

    );

}

// ======================================================
// Send Conversation Message
// ======================================================

async function sendConversationMessage() {

    const message =
    conversationInput.value.trim();

    if(message==="") return;

    addConversationMessage(

        message,

        "user"

    );

    conversationInput.value="";

    chatHistory.push({

        role:"user",

        content:message

    });

    showConversationTyping();

    disableConversationInput();

    await getConversationReply(message);

}

// ======================================================
// Add Conversation Message
// ======================================================

function addConversationMessage(message,sender){

    const div =
    document.createElement("div");

    div.className =
    sender==="user"
    ? "userMessage"
    : "botMessage";

    div.innerHTML=message;

    conversationMessages.appendChild(div);

    conversationMessages.scrollTop =
    conversationMessages.scrollHeight;

}

// ======================================================
// Conversation Typing Animation
// ======================================================

function showConversationTyping(){

    const typing =
    document.createElement("div");

    typing.id="conversationTyping";

    typing.className="botMessage";

    typing.innerHTML="🤖 Thinking...";

    conversationMessages.appendChild(typing);

    conversationMessages.scrollTop =
    conversationMessages.scrollHeight;

}

// ======================================================
// Remove Typing
// ======================================================

function removeConversationTyping(){

    const typing =
    document.getElementById("conversationTyping");

    if(typing){

        typing.remove();

    }

}

// ======================================================
// Clear Conversation
// ======================================================

function clearConversationMessages(){

    conversationMessages.innerHTML="";

}

// ======================================================
// Enable Input
// ======================================================

function enableConversationInput(){

    conversationInput.disabled=false;

}

// ======================================================
// Disable Input
// ======================================================

function disableConversationInput(){

    conversationInput.disabled=true;

}

// ======================================================
// Reset Chat History
// ======================================================

function resetConversationHistory(){

    chatHistory=[];

}
// ======================================================
// Bali AI
// PART 7
// Groq AI Connection
// ======================================================

// ==============================
// Get AI Reply
// ==============================

async function getConversationReply(userMessage){

    try{

        const response =
        await fetch(

            "/chat",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },

                body:JSON.stringify({

                    message:userMessage,

                    history:chatHistory,

                    language:selectedLanguage

                })

            }

        );

        if(!response.ok){

            throw new Error("Server Error");

        }

        const data =
        await response.json();

        removeConversationTyping();

        addConversationMessage(

            data.reply,

            "bot"

        );

        chatHistory.push({

            role:"assistant",

            content:data.reply

        });

        enableConversationInput();

        conversationInput.focus();

        speak(data.reply);

    }

    catch(error){

        console.error(error);

        removeConversationTyping();

        addConversationMessage(

            "⚠ Unable to connect to Conversation AI Server.",

            "bot"

        );

        enableConversationInput();

        speak(

            "Unable to connect to the server."

        );

    }

}

// ======================================================
// Exit Conversation AI
// ======================================================

function exitConversationAI(){

    resetConversationHistory();

    hideAllScreens();

    modeScreen.classList.remove("hidden");

    speak(

        "Please select another Artificial Intelligence mode."

    );

}

// ======================================================
// Conversation Screen Auto Focus
// ======================================================

conversationScreen.addEventListener(

    "click",

    ()=>{

        if(conversationInput){

            conversationInput.focus();

        }

    }

);
// ======================================================
// Bali AI
// PART 8
// Common Helper Functions
// ======================================================

// ==============================
// Back To AI Mode Selection
// ==============================

function backToModeSelection(){

    speechSynthesis.cancel();

    if(recognition){

        try{

            recognition.stop();

        }

        catch(error){}

    }

    stopStatusAnimation();

    currentMode = "";

    hideAllScreens();

    modeScreen.classList.remove("hidden");

    speak(

        "Please select an Artificial Intelligence mode."

    );

}

// ==============================
// Change Language
// ==============================

function changeLanguage(){

    speechSynthesis.cancel();

    if(recognition){

        try{

            recognition.stop();

        }

        catch(error){}

    }

    hideAllScreens();

    languageScreen.classList.remove("hidden");

}

// ==============================
// Stop Speaking
// ==============================

function stopSpeaking(){

    speechSynthesis.cancel();

}

// ==============================
// Restart Reception AI
// ==============================

function restartReception(){

    clearReceptionMessages();

    showReceptionWelcome();

    receptionInput.value="";

}

// ==============================
// Restart Conversation AI
// ==============================

function restartConversation(){

    clearConversationMessages();

    resetConversationHistory();

    addConversationMessage(

        "👋 Hello! I am bali Conversation AI.<br><br>How can I help you today?",

        "bot"

    );

    conversationInput.value="";

}

// ==============================
// Go To Reception AI
// ==============================

function goToReception(){

    selectedAI="Reception";

    startReceptionAI();

}

// ==============================
// Go To Conversation AI
// ==============================

function goToConversation(){

    selectedAI="Conversation";

    startConversationAI();

}

// ==============================
// Clear All AI Data
// ==============================

function clearAllData(){

    chatHistory=[];

    knowledge={};

    intents={};

}

// ==============================
// Exit Current AI
// ==============================

function exitCurrentAI(){

    speechSynthesis.cancel();

    if(recognition){

        try{

            recognition.stop();

        }

        catch(error){}

    }

    stopStatusAnimation();

    currentMode="";

    hideAllScreens();

    modeScreen.classList.remove("hidden");

}
// ======================================================
// Bali AI
// PART 9
// Final Initialization
// ======================================================

// ==============================
// DOM Ready
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("=================================");
    console.log("      Bali AI STARTED");
    console.log("=================================");

    console.log("Reception AI : Ready");
    console.log("Conversation AI : Ready");
    console.log("Speech Engine : Ready");

});

// ==============================
// Browser Before Refresh
// ==============================

window.addEventListener("beforeunload", () => {

    speechSynthesis.cancel();

    if(recognition){

        try{

            recognition.stop();

        }

        catch(error){}

    }

});

// ==============================
// Auto Focus Reception Input
// ==============================

if(receptionScreen){

    receptionScreen.addEventListener(

        "click",

        ()=>{

            if(receptionInput){

                receptionInput.focus();

            }

        }

    );

}

// ==============================
// Auto Focus Conversation Input
// ==============================

if(conversationScreen){

    conversationScreen.addEventListener(

        "click",

        ()=>{

            if(conversationInput){

                conversationInput.focus();

            }

        }

    );

}

// ==============================
// Future AI Modules
// ==============================

function startEntertainmentAI(){

    alert("Entertainment AI Coming Soon.");

}

function startHealthAI(){

    alert("Health AI Coming Soon.");

}

function startMemoryAI(){

    alert("Memory AI Coming Soon.");

}
function normalizeQuestion(question) {

    return question
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}
{
facility:"library"
}
conversationMemory={

lastIntent:null,

lastSubject:null,

lastClass:null,

lastFacility:null,

lastTeacher:null,

lastPerson:null

}

// ======================================================
// END OF SCRIPT
// =====================================================
