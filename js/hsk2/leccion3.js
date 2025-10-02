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
        question: "Completa la oración: 我想买 _____ 本书。(Wǒ xiǎng mǎi _____ běn shū.)",
        hint: "Para un número indefinido y pequeño (menor que 10), se usa '几' seguido del clasificador.",
        answers: [
            { text: "多", correct: false, rationale: "'多' (duō) no se usa solo antes de un clasificador para indicar 'unos pocos'." },
            { text: "几", correct: true, rationale: "¡Correcto! '几本书' significa 'unos cuantos libros'." },
            { text: "吗", correct: false, rationale: "'吗' (ma) es una partícula interrogativa y no encaja aquí." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy' y no se usa para contar." }
        ]
    },
    {
        question: "¿Cómo se diría 'más de veinte yuanes' correctamente?",
        hint: "Cuando el número es 10 o mayor, '多' se coloca antes del clasificador.",
        answers: [
            { text: "二十块多钱 (èrshí kuài duō qián)", correct: false, rationale: "Incorrecto. Para números enteros mayores que 10, '多' va antes del clasificador '块'." },
            { text: "二十多块钱 (èrshí duō kuài qián)", correct: true, rationale: "¡Perfecto! La estructura 'Número + 多 + Clasificador' es la correcta para números mayores de 10." },
            { text: "二十块钱多 (èrshí kuài qián duō)", correct: false, rationale: "El orden es incorrecto. '多' no va al final de la frase." },
            { text: "多二十块钱 (duō èrshí kuài qián)", correct: false, rationale: "El orden es incorrecto. '多' va después del número." }
        ]
    },
    {
        question: "La frase '十几个人' (shí jǐ ge rén) significa:",
        hint: "Cuando '几' se usa después de '十' (diez), indica un rango específico.",
        answers: [
            { text: "Exactamente 10 personas.", correct: false, rationale: "Esto sería '十个人'." },
            { text: "Unas pocas personas (menos de 10).", correct: false, rationale: "Esto sería '几个人'." },
            { text: "Más de 10 pero menos de 20 personas.", correct: true, rationale: "¡Correcto! '十几' se refiere a un número entre 11 y 19." },
            { text: "Docenas de personas (20, 30, 40...).", correct: false, rationale: "Eso se expresaría como '几十个人'." }
        ]
    },
    {
        question: "Elige la forma correcta de decir 'más de tres semanas'.",
        hint: "Para números menores que 10, '多' se coloca después del clasificador.",
        answers: [
            { text: "三多星期 (sān duō xīngqī)", correct: false, rationale: "Incorrecto. '星期' no es el clasificador aquí. Se necesita '个'." },
            { text: "三个多星期 (sān ge duō xīngqī)", correct: true, rationale: "¡Correcto! La estructura es 'Número + Clasificador + 多 + Sustantivo'." },
            { text: "三多哥星期 (sān duō ge xīngqī)", correct: false, rationale: "El orden de '多' es incorrecto. Debe ir después del clasificador." },
            { text: "三个星期多 (sān ge xīngqī duō)", correct: false, rationale: "Aunque a veces se escucha, la posición gramaticalmente estándar de '多' es justo después del clasificador." }
        ]
    },
    {
        question: "Completa la oración: 我们班有 _____ 个学生。(Wǒmen bān yǒu _____ ge xuéshēng.)",
        hint: "La frase 'veintitantos' se forma con '二十多'.",
        answers: [
            { text: "二十个多", correct: false, rationale: "Incorrecto. Para números mayores que 10, '多' va antes del clasificador." },
            { text: "二十多", correct: true, rationale: "¡Correcto! '二十多个学生' significa 'más de veinte estudiantes'." },
            { text: "二十几", correct: true, rationale: "¡También es correcto! Para números mayores de 10, '多' y '几' son intercambiables en esta posición. Ambas opciones son válidas." },
            { text: "个二十多", correct: false, rationale: "El clasificador '个' no puede ir al principio." }
        ]
    },
    {
        question: "¿Qué significa '几十本书' (jǐ shí běn shū)?",
        hint: "Cuando '几' se coloca antes de '十' (diez), indica un múltiplo de diez.",
        answers: [
            { text: "Más de 10 pero menos de 20 libros.", correct: false, rationale: "Eso sería '十几本书'." },
            { text: "Unos pocos libros (menos de 10).", correct: false, rationale: "Eso sería '几本书'." },
            { text: "Docenas de libros (20, 30, 40...).", correct: true, rationale: "¡Exacto! '几十' indica un número indefinido de decenas." },
            { text: "Exactamente 10 libros.", correct: false, rationale: "Eso sería '十本书'." }
        ]
    },
    {
        question: "Elige la oración gramaticalmente INCORRECTA.",
        hint: "Revisa la posición de '多' en relación con el clasificador para números grandes y pequeños.",
        answers: [
            { text: "他有三十多块钱。", correct: false, rationale: "Esta oración es correcta y significa 'Él tiene más de treinta yuanes'." },
            { text: "我学了五年多汉语。", correct: false, rationale: "Esta oración es correcta y significa 'He estudiado chino por más de cinco años'." },
            { text: "这里有八十多个人。", correct: false, rationale: "Esta oración es correcta y significa 'Aquí hay más de ochenta personas'." },
            { text: "我想买七多本书。", correct: true, rationale: "¡Correcto, esta es la incorrecta! Para números menores de 10, '多' debe ir después del clasificador. Lo correcto sería '七本多书' o, más comúnmente, '七八本书'." }
        ]
    },
    {
        question: "Completa la oración: 他 _____ 岁了。(Tā _____ suì le.)",
        hint: "Para 'treinta y tantos años de edad', la estructura es '三十多'.",
        answers: [
            { text: "三十岁多", correct: false, rationale: "Incorrecto. '岁' es el clasificador. Para números mayores de 10, '多' va antes del clasificador." },
            { text: "三十多岁", correct: true, rationale: "¡Correcto! '三十多岁' significa 'más de treinta años de edad'." },
            { text: "三十几岁", correct: true, rationale: "¡También correcto! '多' y '几' son intercambiables en esta posición." },
            { text: "岁三十多", correct: false, rationale: "El orden es incorrecto." }
        ]
    },
    {
        question: "La expresión 'más de seis meses' se traduce como:",
        hint: "Seis es un número menor que 10. ¿Dónde va '多'?",
        answers: [
            { text: "六个多月 (liù ge duō yuè)", correct: true, rationale: "¡Correcto! Número + Clasificador + 多 + Sustantivo." },
            { text: "六多个月 (liù duō ge yuè)", correct: false, rationale: "Incorrecto, '多' debe ir después del clasificador '个'." },
            { text: "六月多个 (liù yuè duō ge)", correct: false, rationale: "El orden de las palabras es incorrecto." },
            { text: "多个六月 (duō ge liù yuè)", correct: false, rationale: "El orden es incorrecto." }
        ]
    },
    {
        question: "Para números mayores que 10, '多' y '几' son a menudo intercambiables. ¿Cuál de las siguientes frases es un ejemplo de esto?",
        hint: "Busca una opción donde tanto '二十多' como '二十几' tendrían sentido.",
        answers: [
            { text: "两个苹果", correct: false, rationale: "Esto significa 'dos manzanas' y no usa '多' o '几'." },
            { text: "五个多星期", correct: false, rationale: "Aquí no se puede usar '几'. '五几星期' no es gramatical." },
            { text: "八十多个人", correct: true, rationale: "¡Correcto! Se puede decir '八十多个人' y también '八十多个人' para significar 'ochenta y tantas personas'." },
            { text: "几个人", correct: false, rationale: "Aquí '几' significa 'unos pocos' y no es intercambiable con '多'." }
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