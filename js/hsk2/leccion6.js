// --- Nuevos elementos del DOM ---
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

// --- 'hint' a los datos del Cuestionario ---
const quizQuestions = [
    {
        question: "Completa la pregunta: 你弟弟 _____ 高？ (Nǐ dìdi _____ gāo?)",
        hint: "Para preguntar por el grado de un adjetivo (como la altura), se usa '多'.",
        answers: [
            { text: "多", correct: true, rationale: "¡Correcto! '多高' (duō gāo) es la forma de preguntar '¿qué tan alto?' o '¿cuánto mide?'." },
            { text: "吗", correct: false, rationale: "'吗' (ma) formaría una pregunta de sí/no ('¿Es alto tu hermano?'), pero no pregunta por el grado." },
            { text: "几", correct: false, rationale: "'几' (jǐ) se usa para preguntar por cantidades pequeñas, no por el grado de un adjetivo como la altura." },
            { text: "最", correct: false, rationale: "'最' (zuì) se usa para el superlativo ('el más alto'), no para preguntar 'cuán alto'." }
        ]
    },
    {
        question: "Elige la pregunta correcta para la respuesta '我今年二十岁 (Wǒ jīnnián èrshí suì)'.",
        hint: "La respuesta da una edad específica. ¿Cómo se pregunta la edad a un adulto joven?",
        answers: [
            { text: "你几岁了？", correct: false, rationale: "'几岁' (jǐ suì) se usa generalmente para preguntar la edad a niños (menores de 10 años)." },
            { text: "你是不是二十岁？", correct: false, rationale: "Esto es para confirmar si tienes 20 años, no para preguntar la edad abiertamente." },
            { text: "你多大？", correct: true, rationale: "¡Correcto! '多大' (duō dà) es la forma estándar de preguntar la edad a personas mayores de 10 años." },
            { text: "你大吗？", correct: false, rationale: "Esto significa '¿Eres grande?' y no es la forma correcta de preguntar la edad." }
        ]
    },
    {
        question: "La pregunta '¿Qué altura tiene él?' se traduce como:",
        hint: "Usa la estructura 'Sujeto + 多 + Adjetivo'.",
        answers: [
            { text: "他高吗？", correct: false, rationale: "Esto significa '¿Es alto?'." },
            { text: "他是多高？", correct: false, rationale: "Añadir '是' (shì) es innecesario y poco común en esta pregunta." },
            { text: "他高多？", correct: false, rationale: "El orden es incorrecto. '多' debe ir antes del adjetivo '高' (gāo)." },
            { text: "他多高？", correct: true, rationale: "¡Exacto! Esta es la forma correcta y natural de preguntar '¿cuán alto es él?'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 这条路 _____ 长？ B: 三公里。(Sān gōnglǐ.)",
        hint: "Estás preguntando por la longitud, un grado del adjetivo '长' (cháng - largo).",
        answers: [
            { text: "什么", correct: false, rationale: "'什么' (shénme) no se usa para preguntar por el grado de un adjetivo." },
            { text: "多", correct: true, rationale: "¡Correcto! '多长' (duō cháng) significa '¿qué tan largo?' o '¿cuánto mide de largo?'." },
            { text: "几", correct: false, rationale: "'几' (jǐ) se usa para preguntar 'cuántos', no 'qué tan largo'." },
            { text: "是不是", correct: false, rationale: "'是不是' (shì bu shì) es para confirmar, no para preguntar por una medida." }
        ]
    },
    {
        question: "¿Qué respuesta es apropiada para '你多大？' (Nǐ duō dà?)",
        hint: "La pregunta pide una cantidad específica de años.",
        answers: [
            { text: "我很大。(Wǒ hěn dà.)", correct: false, rationale: "Esto significa 'Soy muy grande', lo cual no responde a la pregunta sobre la edad." },
            { text: "我三十岁。(Wǒ sānshí suì.)", correct: true, rationale: "¡Correcto! Se responde con un número específico seguido del clasificador para años de edad, '岁' (suì)." },
            { text: "我不大。(Wǒ bú dà.)", correct: false, rationale: "Esto significa 'No soy viejo/grande', pero no da la edad específica." },
            { text: "我大。(Wǒ dà.)", correct: false, rationale: "Esta respuesta es incompleta y no suena natural." }
        ]
    },
    {
        question: "¿Cómo se pregunta '¿Qué tan lejos está el hospital?'?",
        hint: "Lejos se dice '远' (yuǎn).",
        answers: [
            { text: "医院远吗？", correct: false, rationale: "Esto pregunta '¿Está lejos el hospital?', y la respuesta sería sí o no." },
            { text: "医院是多远？", correct: false, rationale: "Añadir '是' (shì) es gramaticalmente incorrecto en esta estructura." },
            { text: "医院多远？", correct: true, rationale: "¡Correcto! Esta es la forma precisa de preguntar por la distancia." },
            { text: "医院几远？", correct: false, rationale: "'几' (jǐ) no se usa con el adjetivo '远' (yuǎn) para preguntar por la distancia." }
        ]
    },
    {
        question: "Elige la oración que está gramaticalmente INCORRECTA.",
        hint: "Revisa el orden de '多' y el adjetivo en cada pregunta.",
        answers: [
            { text: "你儿子多高？", correct: false, rationale: "Esta pregunta es correcta y significa '¿Qué altura tiene tu hijo?'." },
            { text: "这个房间多大？", correct: false, rationale: "Esta pregunta es correcta y significa '¿Qué tan grande es esta habitación?'." },
            { text: "你重多？", correct: true, rationale: "¡Correcto, esta es la incorrecta! Para preguntar el peso ('重' zhòng), el orden debe ser '你多重？' (Nǐ duō zhòng?)." },
            { text: "你的手机多贵？", correct: false, rationale: "Esta pregunta es correcta y significa '¿Qué tan caro es tu celular?' (aunque '多少钱' es más común)." }
        ]
    },
    {
        question: "Completa: A: 王医生的儿子多高？ B: 他 _____ 一米七。(Tā _____ yī mǐ qī.)",
        hint: "La respuesta a una pregunta con '多 + adjetivo' suele ser una cantidad específica.",
        answers: [
            { text: "是", correct: false, rationale: "Se puede omitir '是' (shì) en la respuesta para que suene más natural." },
            { text: "有", correct: true, rationale: "¡Correcto! Es muy común usar '有' (yǒu) al dar una medida, significando 'tiene' una altura de 1.70m. También se podría omitir." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy' y no se usa para dar una medida exacta." },
            { text: "多", correct: false, rationale: "'多' (duō) se usa en la pregunta, no en la respuesta de medida." }
        ]
    },
    {
        question: "Si alguien responde '一米八几' (yī mǐ bā jǐ), ¿cuál fue probablemente la pregunta?",
        hint: "La respuesta indica una altura aproximada de 'un metro ochenta y pico'.",
        answers: [
            { text: "你几岁了？(Nǐ jǐ suì le?)", correct: false, rationale: "Esta pregunta es sobre la edad." },
            { text: "他多高？(Tā duō gāo?)", correct: true, rationale: "¡Correcto! La respuesta es una altura, por lo que la pregunta debe haber sido sobre la altura." },
            { text: "这是什么？(Zhè shì shénme?)", correct: false, rationale: "Esta pregunta significa '¿Qué es esto?'." },
            { text: "他是不是一米八？(Tā shì bu shì yī mǐ bā?)", correct: false, rationale: "Esta pregunta es para confirmar si mide exactamente 1.80m, mientras que la respuesta es aproximada." }
        ]
    },
    {
        question: "La pregunta '你多大？' se usa principalmente para:",
        hint: "Piensa en el ejemplo: 'A: 你多大？ B: 我16岁。'",
        answers: [
            { text: "Preguntar el tamaño de algo.", correct: false, rationale: "Aunque '大' significa 'grande', en este contexto específico se refiere a la edad." },
            { text: "Preguntar el precio de algo.", correct: false, rationale: "Para el precio se usa '多少钱' (duōshao qián)." },
            { text: "Preguntar la edad de alguien (generalmente mayor de 10).", correct: true, rationale: "¡Correcto! Es la forma más común de preguntar la edad a adolescentes y adultos." },
            { text: "Preguntar la altura de alguien.", correct: false, rationale: "Para la altura se usa '多高' (duō gāo)." }
        ]
    }
];

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.innerText = 'Siguiente →';
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
    
    // Resetear la sección de la pista 
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
    
    //Ocultar el botón de pista después de responder 
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