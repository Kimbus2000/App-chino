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
        question: "Completa la oración: 这个苹果 _____ 大。(Zhège píngguǒ _____ dà.)",
        hint: "Necesitas la palabra que significa 'el más' para formar el superlativo.",
        answers: [
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy', pero no 'el más'." },
            { text: "最", correct: true, rationale: "¡Correcto! '最大' (zuì dà) significa 'el más grande'." },
            { text: "多", correct: false, rationale: "'多' (duō) significa 'mucho' o 'cuánto', y no encaja en esta estructura." },
            { text: "太", correct: false, rationale: "'太' (tài) significa 'demasiado', que indica exceso, no un superlativo." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Lo que más me gusta es beber té.'",
        hint: "La estructura es 'Sujeto + 最 + Verbo + Objeto'.",
        answers: [
            { text: "我喜欢最喝茶。", correct: false, rationale: "El orden es incorrecto. '最' debe ir directamente antes del verbo '喜欢' (gustar)." },
            { text: "我最喜欢喝茶。", correct: true, rationale: "¡Correcto! Esta oración sigue la estructura 'Yo más gusto beber té'." },
            { text: "我喜欢喝茶最。", correct: false, rationale: "Incorrecto. '最' no se coloca al final de la oración en este caso." },
            { text: "最我喜欢喝茶。", correct: false, rationale: "'最' es un adverbio y debe colocarse después del sujeto y antes del verbo." }
        ]
    },
    {
        question: "¿Qué significa '他的汉语最好' (Tā de Hànyǔ zuì hǎo)?",
        hint: "'最好' significa 'el mejor'.",
        answers: [
            { text: "Su chino es bueno.", correct: false, rationale: "Esto sería '他的汉语很好' (Tā de Hànyǔ hěn hǎo)." },
            { text: "Su chino es muy bueno.", correct: false, rationale: "Esto también se traduciría como '他的汉语很好'." },
            { text: "Su chino es el mejor.", correct: true, rationale: "¡Perfecto! '最好' (zuì hǎo) es el superlativo de 'bueno'." },
            { text: "Su chino no es bueno.", correct: false, rationale: "La oración es afirmativa, no negativa." }
        ]
    },
    {
        question: "Completa la oración: 你的眼睛 _____ 漂亮。(Nǐ de yǎnjīng _____ piàoliang.)",
        hint: "Usa la palabra que intensifica el adjetivo al grado más alto.",
        answers: [
            { text: "不", correct: false, rationale: "'不' (bù) es una negación." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy', que es un grado alto, pero no el más alto." },
            { text: "也", correct: false, rationale: "'也' (yě) significa 'también'." },
            { text: "最", correct: true, rationale: "¡Correcto! '最漂亮' (zuì piàoliang) significa 'los más bonitos'." }
        ]
    },
    {
        question: "¿Qué oración utiliza '最' correctamente?",
        hint: "'最' debe ir antes de un adjetivo o un verbo psicológico como 'gustar'.",
        answers: [
            { text: "我吃最米饭。", correct: false, rationale: "Incorrecto. '最' no modifica directamente al sustantivo '米饭' (arroz)." },
            { text: "汉语是大卫的好最。", correct: false, rationale: "El orden de las palabras es incorrecto." },
            { text: "我最是学生。", correct: false, rationale: "Incorrecto. '最' no se usa para modificar el verbo '是' (ser) de esta manera." },
            { text: "今天天气最好。", correct: true, rationale: "¡Correcto! Esta oración significa 'El tiempo de hoy es el mejor'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 你最喜欢什么水果？ B: 我最喜欢 _____。(Wǒ zuì xǐhuān _____.)",
        hint: "La pregunta es '¿Cuál es tu fruta favorita?'. La respuesta debe ser una fruta.",
        answers: [
            { text: "老师", correct: false, rationale: "'老师' (lǎoshī) significa 'profesor', no es una fruta." },
            { text: "苹果", correct: true, rationale: "¡Correcto! '苹果' (píngguǒ) es 'manzana' y es una respuesta lógica." },
            { text: "看书", correct: false, rationale: "'看书' (kàn shū) es una acción 'leer libros', no una fruta." },
            { text: "最", correct: false, rationale: "Repetir '最' no tiene sentido en la respuesta." }
        ]
    },
    {
        question: "Elige la oración que significa 'Este es el libro más pequeño'.",
        hint: "Recuerda que 'pequeño' es '小' (xiǎo).",
        answers: [
            { text: "这是最小的书。", correct: true, rationale: "¡Correcto! La estructura '最 + adjetivo + 的 + sustantivo' es correcta." },
            { text: "这是书最小的。", correct: false, rationale: "El orden es incorrecto." },
            { text: "这是很小的书。", correct: false, rationale: "Esto significa 'Este es un libro muy pequeño', no 'el más pequeño'." },
            { text: "最小的书是这。", correct: false, rationale: "La estructura es poco natural. La primera opción es la más común." }
        ]
    },
    {
        question: "Completa: 在我们家，妈妈做的菜 _____ 好吃。(Zài wǒmen jiā, māma zuò de cài _____ hǎochī.)",
        hint: "La oración quiere decir que, de toda la familia, la comida de mamá es la más deliciosa.",
        answers: [
            { text: "最", correct: true, rationale: "¡Correcto! '最好吃' (zuì hǎochī) significa 'la más deliciosa'." },
            { text: "太", correct: false, rationale: "'太' (tài) significaría 'demasiado deliciosa'." },
            { text: "不", correct: false, rationale: "'不' (bù) negaría el adjetivo, lo cual no tiene sentido en este contexto." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy deliciosa', pero '最' indica el grado superlativo." }
        ]
    },
    {
        question: "¿Cuál NO es un uso correcto de '最'?",
        hint: "Piensa si '最' puede modificar a cualquier tipo de palabra.",
        answers: [
            { text: "他跑得最快。(Tā pǎo de zuì kuài.)", correct: false, rationale: "Este uso es correcto. Significa 'Él corre lo más rápido'." },
            { text: "我最爱我的妈妈。(Wǒ zuì ài wǒ de māma.)", correct: false, rationale: "Este uso es correcto. Significa 'Amo más a mi mamá'." },
            { text: "他最看书。(Tā zuì kàn shū.)", correct: true, rationale: "¡Correcto! Este uso es incorrecto. '最' no suele modificar verbos de acción general como '看' (ver/leer). Se usaría con verbos como 'gustar' o 'amar'." },
            { text: "那家饭店最贵。(Nà jiā fàndiàn zuì guì.)", correct: false, rationale: "Este uso es correcto. Significa 'Ese restaurante es el más caro'." }
        ]
    },
    {
        question: "A: 你最喜欢谁？(Nǐ zuì xǐhuān shéi?) B: 我最喜欢 _____。(Wǒ zuì xǐhuān _____.)",
        hint: "La pregunta es '¿A quién quieres más?'. La respuesta debería ser una persona.",
        answers: [
            { text: "米饭", correct: false, rationale: "'米饭' (mǐfàn) es 'arroz', una cosa, no una persona." },
            { text: "我的朋友", correct: true, rationale: "¡Correcto! '我的朋友' (wǒ de péngyou) significa 'mis amigos' y es una respuesta lógica." },
            { text: "最漂亮", correct: false, rationale: "'最漂亮' (zuì piàoliang) es un adjetivo que significa 'la más bonita', no una respuesta a 'quién'." },
            { text: "喝茶", correct: false, rationale: "'喝茶' (hē chá) es una acción 'beber té'." }
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