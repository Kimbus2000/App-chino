// --- AÑADIDO: Nuevos elementos del DOM ---
const hintButton = document.getElementById('hint-btn');
const hintSection = document.getElementById('hint-section');
const hintTextElement = document.getElementById('hint-text');

// --- Elementos del DOM existentes ---
const questionTextElement = document.getElementById('question-text');
const questionCounterElement = document.getElementById('question-counter');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('feedback-section');
const rationaleTextElement = document.getElementById('rationale-text');
const nextButton = document.getElementById('next-btn');

// --- AÑADIDO: 'hint' a los datos del Cuestionario ---
const quizQuestions = [
    {
        question: "Completa la oración: 你喝 _____ ?",
        hint: "Necesitas el pronombre interrogativo que significa 'qué'.",
        answers: [
            { text: "什么", correct: true, rationale: "¡Correcto! '什么' (shénme) significa 'qué'. La pregunta es '¿Qué bebes?'." },
            { text: "谁", correct: false, rationale: "'谁' (shéi) significa 'quién', lo cual no encaja en el contexto de beber." },
            { text: "哪儿", correct: false, rationale: "'哪儿' (nǎr) significa 'dónde', lo cual no es coherente con el verbo 'beber'." },
            { text: "吗", correct: false, rationale: "'吗' (ma) es una partícula para preguntas de sí/no y no encaja en esta estructura." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '这是苹果 (Zhè shì píngguǒ)'?",
        hint: "La respuesta habla de un objeto, no de una persona o un lugar.",
        answers: [
            { text: "这是谁？", correct: false, rationale: "Esta pregunta significa '¿Quién es este?', y se usa para personas." },
            { text: "这是什么？", correct: true, rationale: "¡Exacto! Esta pregunta es '¿Qué es esto?', que corresponde a la respuesta." },
            { text: "你叫什么名字？", correct: false, rationale: "Esta pregunta significa '¿Cómo te llamas?'." },
            { text: "这是哪儿？", correct: false, rationale: "Esta pregunta significa '¿Dónde es esto?'." }
        ]
    },
    // --- AGREGA LAS OTRAS PREGUNTAS CON SUS PISTAS AQUÍ ---
    {
        question: "Completa: A: 你看！ (Nǐ kàn!) B: 是 _____？",
        hint: "Cuando alguien llama tu atención para que mires algo, ¿cuál es la pregunta más inmediata que harías?",
        answers: [
            { text: "谁", correct: false, rationale: "Si bien podría ser posible, preguntar 'qué' es más general y común." },
            { text: "什么", correct: true, rationale: "¡Perfecto! Cuando alguien te pide que mires algo, una reacción natural es preguntar '¿Qué es?'." },
            { text: "吗", correct: false, rationale: "Preguntar '¿Es?' no tiene sentido en este contexto." },
            { text: "哪儿", correct: false, rationale: "Preguntar '¿Dónde?' podría ser una opción, pero '¿Qué?' es más directo." }
        ]
    }
];

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.classList.add('hide');
    showQuestion(quizQuestions[currentQuestionIndex]);
}

function showQuestion(questionData) {
    resetState();
    questionTextElement.innerText = questionData.question;
    questionCounterElement.innerText = `Pregunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;

    questionData.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.dataset.correct = answer.correct;
        button.dataset.rationale = answer.rationale;
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    feedbackElement.classList.add('hide'); // Usamos hide para consistencia
    rationaleTextElement.innerText = '';
    
    // --- AÑADIDO: Resetear la sección de la pista ---
    hintSection.classList.add('hide');
    hintButton.classList.remove('hide');
    hintButton.disabled = false;
    
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const rationale = selectedButton.dataset.rationale;

    rationaleTextElement.innerText = rationale;
    feedbackElement.classList.remove('hide');
    
    // --- AÑADIDO: Ocultar el botón de pista después de responder ---
    hintButton.classList.add('hide');

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
        button.disabled = true;
    });

    if (quizQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        questionTextElement.innerText = "¡Has completado el cuestionario!";
        nextButton.innerText = 'Reiniciar';
        nextButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('incorrect');
    }
}

// --- AÑADIDO: Función para mostrar la pista ---
function showHint() {
    const hint = quizQuestions[currentQuestionIndex].hint;
    hintTextElement.innerText = hint;
    hintSection.classList.remove('hide');
    hintButton.disabled = true; // Deshabilitar después de usar
}

// --- AÑADIDO: Event listener para el nuevo botón ---
hintButton.addEventListener('click', showHint);

nextButton.addEventListener('click', () => {
    if (quizQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        showQuestion(quizQuestions[currentQuestionIndex]);
    } else {
        startQuiz();
    }
});

startQuiz();