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
        question: "Completa la oración: 你 _____ 喜欢喝茶？(Nǐ _____ xǐhuān hē chá?)",
        hint: "Usa la estructura que pide confirmación sobre un hecho que crees que es cierto.",
        answers: [
            { text: "吗", correct: false, rationale: "'吗' (ma) es para preguntas generales, mientras que '是不是' es para confirmar una suposición." },
            { text: "是不是", correct: true, rationale: "¡Correcto! '你是不是喜欢喝茶？' significa '¿A ti te gusta beber té, verdad?', buscando confirmar una idea." },
            { text: "什么", correct: false, rationale: "'什么' (shénme) significa 'qué' y se usa para preguntar por información, no para confirmar." },
            { text: "要不要", correct: false, rationale: "'要不要' (yàobuyào) pregunta sobre un deseo o voluntad, no sobre un hecho." }
        ]
    },
    {
        question: "¿Dónde puede colocarse '是不是' en la oración '明天爸爸休息' (Mañana papá descansa)?",
        hint: "'是不是' es flexible y puede ir al principio, en medio o al final.",
        answers: [
            { text: "Solo al principio.", correct: false, rationale: "Puede ir al principio, pero no es la única posición posible." },
            { text: "Solo al final.", correct: false, rationale: "Puede ir al final, pero también en otras posiciones." },
            { text: "Solo antes del verbo '休息'.", correct: false, rationale: "Esta es una posición correcta, pero no la única." },
            { text: "Al principio, antes del verbo, o al final.", correct: true, rationale: "¡Correcto! Las tres formas (是不是明天..., 明天是不是..., 明天休息, 是不是?) son correctas para confirmar." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Vas a la tienda, ¿verdad?'",
        hint: "Esta es una pregunta de confirmación. Puedes añadir '是不是' al final.",
        answers: [
            { text: "你去商店吗？", correct: false, rationale: "Esta es una pregunta general ('¿Vas a la tienda?'), no una de confirmación." },
            { text: "你去商店，是不是？", correct: true, rationale: "¡Exacto! Añadir '是不是' al final convierte la afirmación en una pregunta para confirmar." },
            { text: "你为什么去商店？", correct: false, rationale: "Esto significa '¿Por qué vas a la tienda?'." },
            { text: "你是去商店？", correct: false, rationale: "Esta estructura no es la forma estándar de hacer esta pregunta de confirmación." }
        ]
    },
    {
        question: "Completa la oración: _____ 他今天很高兴？(_____ tā jīntiān hěn gāoxìng?)",
        hint: "Para confirmar una suposición al inicio de la frase, se usa '是不是'.",
        answers: [
            { text: "是不是", correct: true, rationale: "¡Correcto! '是不是他今天很高兴？' significa '¿Es verdad que él está muy contento hoy?'." },
            { text: "他", correct: false, rationale: "Esto convertiría la frase en una afirmación, no una pregunta." },
            { text: "吗", correct: false, rationale: "'吗' (ma) siempre va al final de la oración." },
            { text: "很", correct: false, rationale: "'很' (hěn) es un adverbio que significa 'muy' y no forma una pregunta." }
        ]
    },
    {
        question: "¿Qué oración se usa para confirmar una suposición que se cree cierta?",
        hint: "Busca la oración que contenga la estructura 'sí o no' (是不是).",
        answers: [
            { text: "你喜欢运动吗？", correct: false, rationale: "Esta es una pregunta abierta sobre si le gusta el deporte." },
            { text: "你是不是喜欢运动？", correct: true, rationale: "¡Correcto! Esta pregunta implica que el hablante ya cree que a la otra persona le gusta el deporte y solo busca confirmación." },
            { text: "你喜欢什么运动？", correct: false, rationale: "Esta pregunta pide información sobre qué deportes le gustan." },
            { text: "你喜欢不喜欢运动？", correct: false, rationale: "Esta pregunta A-no-A es similar a usar '吗', pero '是不是' implica una suposición más fuerte." }
        ]
    },
    {
        question: "Completa el diálogo: A: 我们星期一去北京, _____? B: 对！",
        hint: "El hablante A está afirmando un plan y buscando la confirmación de B. '是不是' al final funciona como '¿verdad?'.",
        answers: [
            { text: "吗", correct: false, rationale: "Aunque gramaticalmente posible, '是不是' es más natural aquí para confirmar un plan ya establecido." },
            { text: "好吗", correct: false, rationale: "'好吗' (hǎo ma) pide aprobación ('¿te parece bien?'), mientras que '是不是' confirma un hecho." },
            { text: "是不是", correct: true, rationale: "¡Correcto! Es la forma perfecta de pedir confirmación al final de una frase." },
            { text: "什么", correct: false, rationale: "'什么' (shénme) no tiene sentido en este contexto." }
        ]
    },
    {
        question: "Elige la oración gramaticalmente INCORRECTA.",
        hint: "Revisa la posición de '是不是'. ¿Puede ir después del verbo?",
        answers: [
            { text: "你是不是学生？", correct: false, rationale: "Esta oración es correcta y significa '¿Eres estudiante, verdad?'." },
            { text: "是不是你是学生？", correct: false, rationale: "Esta oración también es correcta, poniendo énfasis en la confirmación." },
            { text: "你是学生，是不是？", correct: false, rationale: "Esta oración es correcta, con '是不是' al final para confirmar." },
            { text: "你是是不是学生？", correct: true, rationale: "¡Correcto, esta es la incorrecta! '是不是' no puede colocarse entre el verbo '是' y el objeto '学生'." }
        ]
    },
    {
        question: "Completa: 你 _____ 昨天没来学校？(Nǐ _____ zuótiān méi lái xuéxiào?)",
        hint: "Estás tratando de confirmar por qué alguien no vino ayer.",
        answers: [
            { text: "是不是", correct: true, rationale: "¡Correcto! '你是不是昨天没来学校？' es una pregunta de confirmación perfecta para esta situación." },
            { text: "是", correct: false, rationale: "Usar solo '是' (shì) crearía una frase gramaticalmente extraña." },
            { text: "不", correct: false, rationale: "'不' (bù) se usaría para negar, no para preguntar de esta forma." },
            { text: "呢", correct: false, rationale: "'呢' (ne) se usa al final de la oración para otro tipo de preguntas." }
        ]
    },
    {
        question: "La pregunta 'Casi nunca te enfermas, ¿será que te gusta hacer ejercicio?' se puede traducir como:",
        hint: "'是不是' puede usarse para conectar una observación con una suposición.",
        answers: [
            { text: "你很少生病，喜欢运动吗？", correct: false, rationale: "Esto sonaría como dos ideas separadas. '是不是' las conecta mejor." },
            { text: "你很少生病，你喜欢运动。", correct: false, rationale: "Esto es una afirmación, no una pregunta." },
            { text: "你很少生病，是不是喜欢运动？", correct: true, rationale: "¡Correcto! '是不是' conecta la observación ('casi nunca te enfermas') con la suposición ('te gusta hacer ejercicio')." },
            { text: "是不是你很少生病？", correct: false, rationale: "Esto solo pregunta '¿Es verdad que casi nunca te enfermas?', pero no lo conecta con el ejercicio." }
        ]
    },
    {
        question: "A: 他是中国人, 是不是？ B: _____, 他是美国人。",
        hint: "La pregunta confirma si él es chino. La respuesta lo niega.",
        answers: [
            { text: "是", correct: false, rationale: "'是' (shì) significa 'sí', lo cual contradice el resto de la respuesta." },
            { text: "对", correct: false, rationale: "'对' (duì) significa 'correcto', que también contradice la respuesta." },
            { text: "不是", correct: true, rationale: "¡Correcto! '不是' (bú shì) es la forma directa de negar la suposición hecha con '是不是'." },
            { text: "没错", correct: false, rationale: "'没错' (méi cuò) significa 'no está mal' o 'es correcto', lo cual no encaja." }
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