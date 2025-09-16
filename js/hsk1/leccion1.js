// Nuevos elementos del DOM ---
const hintButton = document.getElementById('hint-btn');
const hintSection = document.getElementById('hint-section');
const hintTextElement = document.getElementById('hint-text');

// Elementos del DOM existentes ---
const questionTextElement = document.getElementById('question-text');
const questionCounterElement = document.getElementById('question-counter');
const answerButtonsElement = document.getElementById('answer-buttons');
const feedbackElement = document.getElementById('feedback-section');
const rationaleTextElement = document.getElementById('rationale-text');
const nextButton = document.getElementById('next-btn');

// 'hint' a los datos del Cuestionario ---
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
        question: "¿Cuál es la pregunta correcta para la respuesta '这是苹果 (Zhè shì píngguǒ - Esto es una manzana)'?",
        hint: "La respuesta habla de un objeto, no de una persona o un lugar.",
        answers: [
            { text: "这是谁？", correct: false, rationale: "Esta pregunta significa '¿Quién es este?', y se usa para personas." },
            { text: "这是什么？", correct: true, rationale: "¡Exacto! Esta es la pregunta correcta, '¿Qué es esto?', que corresponde a la respuesta." },
            { text: "你叫什么名字？", correct: false, rationale: "Esta pregunta significa '¿Cómo te llamas?' y no se relaciona con la respuesta." },
            { text: "这是哪儿？", correct: false, rationale: "Esta pregunta significa '¿Dónde es esto?', y la respuesta no indica un lugar." }
        ]
    },
    {
        question: "Completa la oración: 她是 _____ 人？ (Tā shì _____ rén?)",
        hint: "Para preguntar la nacionalidad, se usa una palabra interrogativa específica antes de '国人'.",
        answers: [
            { text: "什么", correct: false, rationale: "Aunque es posible en algunos dialectos, '哪国' (nǎ guó) es la forma estándar para preguntar la nacionalidad." },
            { text: "哪国", correct: true, rationale: "¡Correcto! '哪国人' (nǎ guó rén) es la forma correcta de preguntar '¿de qué país es ella?'." },
            { text: "吗", correct: false, rationale: "'吗' (ma) formaría una pregunta de sí/no, que no tiene sentido aquí." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy' y no se usa para hacer preguntas de este tipo." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Qué quieres comer?'",
        hint: "El pronombre interrogativo '什么' generalmente se coloca donde estaría la respuesta en una oración declarativa.",
        answers: [
            { text: "你想吃什么？ (Nǐ xiǎng chī shénme?)", correct: true, rationale: "¡Muy bien! Esta es la traducción correcta y natural." },
            { text: "你吃想什么？ (Nǐ chī xiǎng shénme?)", correct: false, rationale: "El orden de los verbos es incorrecto; el verbo auxiliar '想' (querer) va antes de '吃' (comer)." },
            { text: "什么你想吃？ (Shénme nǐ xiǎng chī?)", correct: false, rationale: "El pronombre interrogativo '什么' debe ir al final de la frase, como objeto del verbo." },
            { text: "你想什么吃？ (Nǐ xiǎng shénme chī?)", correct: false, rationale: "El objeto '什么' debe ir después del verbo '吃'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 这是什么菜？ (Zhè shì shénme cài?) B: ______",
        hint: "La pregunta es '¿Qué plato es este?'. La respuesta debería nombrar un tipo de comida.",
        answers: [
            { text: "这是米饭 (Zhè shì mǐfàn)", correct: true, rationale: "Esta es una respuesta lógica y gramaticalmente correcta a la pregunta." },
            { text: "我叫大卫 (Wǒ jiào Dàwèi)", correct: false, rationale: "Esta respuesta dice 'Me llamo David' y no contesta a la pregunta sobre la comida." },
            { text: "他是老师 (Tā shì lǎoshī)", correct: false, rationale: "Esta respuesta dice 'Él es profesor' y no tiene relación con la pregunta." },
            { text: "是 (Shì)", correct: false, rationale: "Una simple respuesta de 'sí' no es suficiente para contestar '¿Qué plato es este?'." }
        ]
    },
    {
        question: "Completa la oración: 他在商店买 _____？ (Tā zài shāngdiàn mǎi _____?)",
        hint: "La oración necesita una palabra para preguntar sobre el objeto que se está comprando.",
        answers: [
            { text: "吗", correct: false, rationale: "'吗' (ma) crearía una pregunta de sí/no, pero la estructura sugiere preguntar 'qué'." },
            { text: "谁", correct: false, rationale: "'谁' (shéi) significa 'quién'. No se puede 'comprar quién'." },
            { text: "什么", correct: true, rationale: "¡Perfecto! Esta es la opción correcta para preguntar '¿Qué compra él en la tienda?'." },
            { text: "哪儿", correct: false, rationale: "'哪儿' (nǎr) significa 'dónde'. La pregunta ya establece que está 'en la tienda'." }
        ]
    },
    {
        question: "¿Qué oración es gramaticalmente incorrecta?",
        hint: "Revisa el orden de las palabras. '什么' puede ir solo o antes de un sustantivo, pero no después.",
        answers: [
            { text: "你爱吃什么水果？ (Nǐ ài chī shénme shuǐguǒ?)", correct: false, rationale: "Esta oración es correcta y significa '¿Qué fruta te gusta comer?'." },
            { text: "你做什么工作？ (Nǐ zuò shénme gōngzuò?)", correct: false, rationale: "Esta oración es correcta y significa '¿En qué trabajas?'." },
            { text: "这是书什么？ (Zhè shì shū shénme?)", correct: true, rationale: "¡Correcto! '什么' debe preceder al sustantivo '书' o ir solo después del verbo. La forma correcta sería '这是什么书？'." },
            { text: "那是什么？ (Nà shì shénme?)", correct: false, rationale: "Esta oración es correcta y significa '¿Qué es eso?'." }
        ]
    },
    {
        question: "Completa la oración: 你的猫叫 _____ 名字？",
        hint: "La estructura para preguntar un nombre es la misma para personas y animales.",
        answers: [
            { text: "谁", correct: false, rationale: "'谁' (shéi) significa 'quién' y no se usa para preguntar el nombre." },
            { text: "什么", correct: true, rationale: "Esta es la opción correcta. '什么名字' (shénme míngzì) se usa para preguntar el nombre." },
            { text: "几", correct: false, rationale: "'几' (jǐ) se usa para preguntar 'cuántos' (para números pequeños)." },
            { text: "哪儿", correct: false, rationale: "'哪儿' (nǎr) significa 'dónde' y no encaja en este contexto." }
        ]
    },
    {
        question: "Elige la pregunta que se responde con '我学习汉语 (Wǒ xuéxí Hànyǔ - Yo estudio chino)'.",
        hint: "La respuesta indica el objeto de estudio. La pregunta debe indagar sobre ese objeto.",
        answers: [
            { text: "你在哪儿学习？(Nǐ zài nǎr xuéxí?)", correct: false, rationale: "Esta pregunta es '¿Dónde estudias?', y la respuesta no indica un lugar." },
            { text: "你学习什么？(Nǐ xuéxí shénme?)", correct: true, rationale: "¡Bien hecho! Esta es la pregunta correcta '¿Qué estudias?', que se responde con 'Estudio chino'." },
            { text: "你是谁？(Nǐ shì shéi?)", correct: false, rationale: "Esta pregunta es '¿Quién eres?' y no se relaciona con la respuesta." },
            { text: "你学习吗？(Nǐ xuéxí ma?)", correct: false, rationale: "Esta es una pregunta de sí/no, '¿Estudias?', y la respuesta es más específica." }
        ]
    },
    {
        question: "Completa: A: 你看！ (Nǐ kàn! - ¡Mira!) B: 是 _____？",
        hint: "Cuando alguien llama tu atención para que mires algo, ¿cuál es la pregunta más inmediata que harías?",
        answers: [
            { text: "谁", correct: false, rationale: "Si bien podría ser posible, preguntar 'qué' es más general y común en esta situación." },
            { text: "什么", correct: true, rationale: "¡Correcto! Cuando alguien te pide que mires algo, una reacción natural es preguntar '¿Qué es?'." },
            { text: "吗", correct: false, rationale: "Preguntar '¿Es?' no tiene sentido en este contexto sin más información." },
            { text: "哪儿", correct: false, rationale: "Preguntar '¿Dónde?' podría ser una opción, pero '¿Qué?' es una reacción más directa." }
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