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
        question: "Completa la pregunta: 你有 ___ 个朋友？(Nǐ yǒu ___ ge péngyǒu?)",
        hint: "Necesitas la palabra que se usa para preguntar '¿cuántos?' por un número pequeño.",
        answers: [
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula para preguntas de sí/no y va al final de la oración." },
            { text: "几 (jǐ)", correct: true, rationale: "¡Correcto! '几' se usa para preguntar 'cuántos' por una cantidad generalmente pequeña, y va seguido de un clasificador como '个'." },
            { text: "谁 (shéi)", correct: false, rationale: "'谁' significa 'quién' y se usa para preguntar por personas." },
            { text: "呢 (ne)", correct: false, rationale: "'呢' se usa para preguntas de seguimiento ('¿Y tú?') y no para preguntar por una cantidad." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Cuántos años tiene tu hija?'",
        hint: "Recuerda la estructura especial para preguntar la edad de los niños.",
        answers: [
            { text: "你女儿是吗？(Nǐ nǚ'ér shì ma?)", correct: false, rationale: "Esto significa '¿Es tu hija?', una pregunta de sí/no." },
            { text: "你女儿叫什么？(Nǐ nǚ'ér jiào shénme?)", correct: false, rationale: "Esto significa '¿Cómo se llama tu hija?'." },
            { text: "你女儿几岁了？(Nǐ nǚ'ér jǐ suì le?)", correct: true, rationale: "¡Perfecto! '几岁' (jǐ suì) es la forma estándar de preguntar la edad a un niño." },
            { text: "谁是你的女儿？(Shéi shì nǐ de nǚ'ér?)", correct: false, rationale: "Esto significa '¿Quién es tu hija?'." }
        ]
    },
    {
        question: "¿Qué palabra falta en la oración: '他想买几 ___ 书？' (Tā xiǎng mǎi jǐ ___ shū?)",
        hint: "Después de '几', casi siempre se necesita un clasificador. ¿Cuál es el clasificador para los libros?",
        answers: [
            { text: "个 (gè)", correct: false, rationale: "'个' es un clasificador general, pero para los libros se usa uno más específico." },
            { text: "本 (běn)", correct: true, rationale: "¡Correcto! '本' es el clasificador que se usa para objetos como libros." },
            { text: "口 (kǒu)", correct: false, rationale: "'口' es el clasificador que se usa para miembros de la familia." },
            { text: "岁 (suì)", correct: false, rationale: "'岁' se usa para la edad." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '我家有五口人。(Wǒ jiā yǒu wǔ kǒu rén.)'?",
        hint: "La respuesta utiliza el clasificador '口' (kǒu). La pregunta debería usar el mismo clasificador.",
        answers: [
            { text: "你家是谁？(Nǐ jiā shì shéi?)", correct: false, rationale: "Esta pregunta ('¿Quién es tu familia?') no es gramaticalmente correcta para este contexto." },
            { text: "你家有几个人？(Nǐ jiā yǒu jǐ ge rén?)", correct: false, rationale: "Aunque se podría entender, '口' (kǒu) es el clasificador tradicional y correcto para miembros de la familia." },
            { text: "你家有几口人？(Nǐ jiā yǒu jǐ kǒu rén?)", correct: true, rationale: "¡Exacto! Esta pregunta usa el clasificador correcto '口' (kǒu) para preguntar por el número de personas en una familia." },
            { text: "你家有人吗？(Nǐ jiā yǒu rén ma?)", correct: false, rationale: "Esta es una pregunta de sí/no: '¿Hay personas en tu casa?' o '¿Tienes familia?'." }
        ]
    },
    {
        question: "El pronombre '几' (jǐ) se usa generalmente para preguntar por números...",
        hint: "Piensa si usarías '几' para preguntar cuántas personas hay en un estadio de fútbol.",
        answers: [
            { text: "Mayores que 100", correct: false, rationale: "Para números grandes se usa '多少' (duōshao)." },
            { text: "Menores que 10", correct: true, rationale: "¡Correcto! Esta es la regla general para el uso de '几'." },
            { text: "Pares o impares", correct: false, rationale: "'几' no tiene relación con si el número es par o impar." },
            { text: "Negativos", correct: false, rationale: "'几' se usa para contar, por lo que se refiere a números positivos." }
        ]
    },
    {
        question: "Elige la oración que está gramaticalmente mal construida.",
        hint: "Recuerda la estructura fundamental: 几 + Clasificador + Sustantivo.",
        answers: [
            { text: "你有几个苹果？(Nǐ yǒu jǐ ge píngguǒ?)", correct: false, rationale: "Esta oración es correcta." },
            { text: "他女儿几岁了？(Tā nǚ'ér jǐ suì le?)", correct: false, rationale: "Esta oración es correcta." },
            { text: "你想喝几杯水？(Nǐ xiǎng hē jǐ bēi shuǐ?)", correct: false, rationale: "Esta oración es correcta. '杯' (bēi) es el clasificador para 'taza' o 'vaso'." },
            { text: "你有几老师？(Nǐ yǒu jǐ lǎoshī?)", correct: true, rationale: "¡Correcto! Esta oración está mal porque le falta el clasificador '个' (gè) entre '几' (jǐ) y el sustantivo '老师' (lǎoshī)." }
        ]
    },
    {
        question: "Completa el diálogo: A: 这些都是你的学生吗？(Zhèxiē dōu shì nǐ de xuéshēng ma?) B: 是。 A: 你有___学生？",
        hint: "La pregunta es sobre el número de estudiantes. ¿Cuál es el clasificador más común para personas?",
        answers: [
            { text: "几个 (jǐ ge)", correct: true, rationale: "¡Perfecto! Para preguntar 'cuántos estudiantes', se usa '几个'." },
            { text: "几岁 (jǐ suì)", correct: false, rationale: "'几岁' se usa para preguntar la edad." },
            { text: "几口 (jǐ kǒu)", correct: false, rationale: "'几口' se usa para preguntar por miembros de la familia." },
            { text: "几本 (jǐ běn)", correct: false, rationale: "'几本' se usa para preguntar por libros." }
        ]
    },
    {
        question: "Si ves tres gatos, ¿qué pregunta harías?",
        hint: "Usa la palabra 'aquí' (这儿), el verbo 'tener/haber' (有), y la estructura para preguntar 'cuántos'.",
        answers: [
            { text: "这是几口猫？(Zhè shì jǐ kǒu māo?)", correct: false, rationale: "'口' es el clasificador para miembros de la familia, no para animales." },
            { text: "这儿有几个猫？(Zhèr yǒu jǐ ge māo?)", correct: true, rationale: "¡Correcto! Esta pregunta usa la estructura correcta ('几' + '个' + sustantivo) para preguntar '¿cuántos gatos hay aquí?'." },
            { text: "猫是几岁？(Māo shì jǐ suì?)", correct: false, rationale: "Esto pregunta por la edad del gato, no por la cantidad." },
            { text: "猫是谁的？(Māo shì shéi de?)", correct: false, rationale: "Esto pregunta '¿de quién es el gato?'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Cuántos de estos son tus amigos?'",
        hint: "La estructura 'Hay + cuántos + de tus amigos' es una buena guía.",
        answers: [
            { text: "这几个是你的朋友吗？(Zhè jǐ ge shì nǐ de péngyǒu ma?)", correct: false, rationale: "Esta es una pregunta de sí/no: '¿Son estos (pocos) tus amigos?'." },
            { text: "谁是你的朋友？(Shéi shì nǐ de péngyǒu?)", correct: false, rationale: "Esto significa '¿Quién es tu amigo?'." },
            { text: "这儿有几个你的朋友？(Zhèr yǒu jǐ ge nǐ de péngyǒu?)", correct: true, rationale: "¡Correcto! Esta es una forma natural de preguntar '¿Cuántos de tus amigos hay aquí?'. '这儿' puede referirse a 'aquí' o al grupo presente." },
            { text: "你的朋友是几个人？(Nǐ de péngyǒu shì jǐ ge rén?)", correct: false, rationale: "La estructura de esta pregunta es poco natural." }
        ]
    },
    {
        question: "Si tu amigo tiene 20 libros y quieres preguntar cuántos tiene, ¿qué palabra interrogativa es más apropiada que '几' (jǐ)?",
        hint: "Recuerda que '几' se usa para números pequeños. Hay otra palabra para preguntar por números grandes.",
        answers: [
            { text: "什么 (shénme)", correct: false, rationale: "'什么' significa 'qué', no 'cuántos'." },
            { text: "谁 (shéi)", correct: false, rationale: "'谁' significa 'quién', no 'cuántos'." },
            { text: "哪 (nǎ)", correct: false, rationale: "'哪' significa 'cuál', no 'cuántos'." },
            { text: "多少 (duōshao)", correct: true, rationale: "¡Correcto! '多少' también significa 'cuántos', pero se usa para preguntar por cantidades mayores (generalmente más de 10) y no requiere obligatoriamente un clasificador." }
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