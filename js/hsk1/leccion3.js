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
        question: "Completa la pregunta: 你是老师 ___？ (Nǐ shì lǎoshī ___?)",
        hint: "¿Qué partícula transforma una afirmación en una pregunta de 'sí' o 'no'?",
        answers: [
            { text: "的 (de)", correct: false, rationale: "'的' es una partícula posesiva, no se usa para hacer preguntas." },
            { text: "吗 (ma)", correct: true, rationale: "¡Correcto! '吗' se añade al final de una oración declarativa para convertirla en una pregunta de sí/no." },
            { text: "不 (bù)", correct: false, rationale: "'不' es un adverbio de negación, no una partícula para hacer preguntas." },
            { text: "很 (hěn)", correct: false, rationale: "'很' significa 'muy' y se usa con adjetivos." }
        ]
    },
    {
        question: "¿Cómo se convierte la oración '他是学生 (Tā shì xuéshēng)' en una pregunta?",
        hint: "Solo necesitas añadir una partícula al final de la oración original, sin cambiar el orden de las otras palabras.",
        answers: [
            { text: "他学生是吗？(Tā xuéshēng shì ma?)", correct: false, rationale: "El orden de las palabras es incorrecto. El verbo '是' debe ir antes del objeto '学生'." },
            { text: "吗他是学生？(Ma tā shì xuéshēng?)", correct: false, rationale: "La partícula '吗' siempre va al final de la oración." },
            { text: "他是学生吗？(Tā shì xuéshēng ma?)", correct: true, rationale: "¡Perfecto! Simplemente se añade '吗' al final de la oración afirmativa." },
            { text: "他是学生不？(Tā shì xuéshēng bù?)", correct: false, rationale: "Esta estructura no es gramaticalmente correcta para formar una pregunta." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Ella es tu amiga?'",
        hint: "Construye la oración afirmativa 'Ella es tu amiga' y luego añade la partícula interrogativa.",
        answers: [
            { text: "她是你的朋友。(Tā shì nǐ de péngyǒu.)", correct: false, rationale: "Esta es una afirmación, no una pregunta. Significa 'Ella es tu amiga'." },
            { text: "她是不是你的朋友？(Tā shì bú shì nǐ de péngyǒu?)", correct: false, rationale: "Esta es otra forma de preguntar, pero no usa la partícula '吗'." },
            { text: "她是你的朋友吗？(Tā shì nǐ de péngyǒu ma?)", correct: true, rationale: "Esta es la traducción exacta y más común, usando '吗' al final." },
            { text: "你的朋友是她吗？(Nǐ de péngyǒu shì tā ma?)", correct: false, rationale: "Esto significa '¿Tu amiga es ella?', que tiene un énfasis ligeramente diferente." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '是，我喝水。(Shì, wǒ hē shuǐ.)'?",
        hint: "La respuesta empieza con '是' (Sí), lo que indica que la pregunta era de tipo sí/no.",
        answers: [
            { text: "你喝什么？(Nǐ hē shénme?)", correct: false, rationale: "Esta pregunta ('¿Qué bebes?') se respondería con '我喝水', pero no con '是' (Sí)." },
            { text: "你喝水吗？(Nǐ hē shuǐ ma?)", correct: true, rationale: "¡Correcto! Esta pregunta de sí/no ('¿Bebes agua?') es la que se responde con 'Sí, bebo agua'." },
            { text: "谁喝水？(Shéi hē shuǐ?)", correct: false, rationale: "Esta pregunta ('¿Quién bebe agua?') se respondería con '我喝水', pero no con '是' (Sí)." },
            { text: "你喝不喝水？(Nǐ hē bù hē shuǐ?)", correct: false, rationale: "Esta pregunta se responde directamente con '喝' o '不喝', no típicamente con '是'." }
        ]
    },
    {
        question: "¿Qué oración es una pregunta gramaticalmente correcta?",
        hint: "Revisa la posición de la partícula '吗' y la puntuación final.",
        answers: [
            { text: "你吗是中国人？(Nǐ ma shì Zhōngguó rén?)", correct: false, rationale: "La partícula '吗' debe ir al final de la oración." },
            { text: "你是中国人吗。(Nǐ shì Zhōngguó rén ma.)", correct: false, rationale: "Aunque la estructura es correcta, una pregunta debe terminar con un signo de interrogación (？)." },
            { text: "你是中国人吗？(Nǐ shì Zhōngguó rén ma?)", correct: true, rationale: "Esta oración tiene la estructura correcta (Sujeto + Verbo + Objeto + 吗) y la puntuación adecuada." },
            { text: "你是吗中国人？(Nǐ shì ma Zhōngguó rén?)", correct: false, rationale: "'吗' no puede colocarse en medio de la oración, debe ir al final." }
        ]
    },
    {
        question: "Completa el diálogo: A: __________？ B: 不，我不是美国人。(Bù, wǒ bú shì Měiguó rén.)",
        hint: "La respuesta es 'No, no soy americano'. ¿Cuál es la pregunta más directa para obtener esa respuesta?",
        answers: [
            { text: "你是美国人。(Nǐ shì Měiguó rén.)", correct: false, rationale: "Esto es una afirmación, no una pregunta que provoque la respuesta 'No...'." },
            { text: "你是美国人吗？(Nǐ shì Měiguó rén ma?)", correct: true, rationale: "¡Exacto! Esta pregunta ('¿Eres estadounidense?') encaja perfectamente con la respuesta negativa." },
            { text: "你是不是美国人？(Nǐ shì bú shì Měiguó rén?)", correct: false, rationale: "Esta pregunta es correcta, pero la respuesta típica sería '不是' en lugar de '不，...'" },
            { text: "谁是美国人？(Shéi shì Měiguó rén?)", correct: false, rationale: "La pregunta '¿Quién es estadounidense?' no se responde con 'No, yo no soy estadounidense'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Comes manzanas?'",
        hint: "Recuerda la estructura: Sujeto + Verbo + Objeto + 吗?",
        answers: [
            { text: "你吃苹果。(Nǐ chī píngguǒ.)", correct: false, rationale: "Esta es la afirmación 'Tú comes manzanas'." },
            { text: "你吃苹果吗？(Nǐ chī píngguǒ ma?)", correct: true, rationale: "¡Muy bien! Esta es la traducción correcta, añadiendo '吗' a la oración 'Tú comes manzanas'." },
            { text: "你吗吃苹果？(Nǐ ma chī píngguǒ?)", correct: false, rationale: "La partícula '吗' debe ir al final de la frase." },
            { text: "你吃吗苹果？(Nǐ chī ma píngguǒ?)", correct: false, rationale: "'吗' no puede interrumpir el verbo y su objeto." }
        ]
    },
    {
        question: "¿Qué pregunta está mal formulada?",
        hint: "La partícula '吗' no se puede usar si ya existe otra palabra interrogativa (como 'qué', 'quién', 'dónde') en la oración.",
        answers: [
            { text: "这是你的猫吗？(Zhè shì nǐ de māo ma?)", correct: false, rationale: "Esta pregunta es correcta y significa '¿Este es tu gato?'." },
            { text: "你喜欢他吗？(Nǐ xǐhuān tā ma?)", correct: false, rationale: "Esta pregunta es correcta y significa '¿Te gusta él?'." },
            { text: "他叫大卫吗？(Tā jiào Dàwèi ma?)", correct: false, rationale: "Esta pregunta es correcta y significa '¿Se llama él David?'." },
            { text: "你叫什么名字吗？(Nǐ jiào shénme míngzi ma?)", correct: true, rationale: "¡Correcto! Esta pregunta está mal formulada. No se puede usar '吗' en una oración que ya tiene otra palabra interrogativa como '什么' (qué)." }
        ]
    },
    {
        question: "Completa la pregunta: 你好 ___？ (Nǐ hǎo ___?)",
        hint: "Para preguntar '¿cómo estás?', se añade una partícula al saludo '你好'.",
        answers: [
            { text: "吗 (ma)", correct: true, rationale: "Esta es la forma correcta de convertir el saludo '你好' (Hola) en la pregunta '¿Cómo estás?'." },
            { text: "的 (de)", correct: false, rationale: "La partícula posesiva '的' no tiene sentido en este contexto." },
            { text: "是 (shì)", correct: false, rationale: "'是' es el verbo 'ser' y no encaja en esta estructura de saludo." },
            { text: "不 (bù)", correct: false, rationale: "La negación '不' no se usa para formar esta pregunta." }
        ]
    },
    {
        question: "Un amigo te ofrece una taza de té. ¿Cómo le preguntas '¿Es esto té?'?",
        hint: "Identifica la oración 'Esto es té' (这是茶) y luego conviértela en una pregunta de sí/no.",
        answers: [
            { text: "这是茶。(Zhè shì chá.)", correct: false, rationale: "Esto es una afirmación: 'Esto es té'." },
            { text: "这是什么？(Zhè shì shénme?)", correct: false, rationale: "Esta pregunta significa '¿Qué es esto?', que es una pregunta válida pero no la que se pide." },
            { text: "这是茶吗？(Zhè shì chá ma?)", correct: true, rationale: "¡Correcto! Esta es la forma precisa de preguntar '¿Es esto té?'." },
            { text: "这不是茶。(Zhè bú shì chá.)", correct: false, rationale: "Esta es una negación: 'Esto no es té'." }
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