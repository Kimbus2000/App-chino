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
        question: "Completa la pregunta: 你___大了？(Nǐ ___ dà le?)",
        hint: "Necesitas la primera parte de la expresión que significa '¿cuán grande?' para preguntar la edad.",
        answers: [
            { text: "几 (jǐ)", correct: false, rationale: "'几' se usa en la frase '几岁' (jǐ suì) para niños, no se combina directamente con '大' (dà) de esta forma." },
            { text: "多 (duō)", correct: true, rationale: "¡Correcto! '多大' (duō dà) es la frase interrogativa que se usa para preguntar 'qué edad' o 'cuán grande'." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula para preguntas de sí/no y va al final de la oración." },
            { text: "谁 (shéi)", correct: false, rationale: "'谁' significa 'quién' y no se usa para preguntar la edad." }
        ]
    },
    {
        question: "Para preguntar la edad a un adulto (por ejemplo, a un profesor), ¿qué frase es más apropiada?",
        hint: "Hay una forma para preguntar la edad a los niños y otra más general para adolescentes y adultos.",
        answers: [
            { text: "你几岁了？(Nǐ jǐ suì le?)", correct: false, rationale: "'几岁' se usa generalmente para preguntar la edad a niños pequeños (menores de 10 años)." },
            { text: "你多大了？(Nǐ duō dà le?)", correct: true, rationale: "¡Exacto! '多大' es la forma común y apropiada de preguntar la edad a personas mayores de 10 años, incluyendo adultos." },
            { text: "你是谁？(Nǐ shì shéi?)", correct: false, rationale: "Esto significa '¿Quién eres?', no pregunta por la edad." },
            { text: "你好吗？(Nǐ hǎo ma?)", correct: false, rationale: "Esto significa '¿Cómo estás?', es un saludo." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Cuántos años tiene el profesor Li?'",
        hint: "Usa el nombre de la persona como sujeto, seguido de la frase para preguntar la edad a un adulto.",
        answers: [
            { text: "李老师是谁？(Lǐ lǎoshī shì shéi?)", correct: false, rationale: "Esto significa '¿Quién es el profesor Li?'." },
            { text: "李老师几岁了？(Lǐ lǎoshī jǐ suì le?)", correct: false, rationale: "Sería descortés usar '几岁' para un adulto como un profesor." },
            { text: "李老师多大了？(Lǐ lǎoshī duō dà le?)", correct: true, rationale: "¡Perfecto! Esta es la forma correcta y educada de preguntar la edad de un adulto." },
            { text: "李老师的朋友多大了？(Lǐ lǎoshī de péngyǒu duō dà le?)", correct: false, rationale: "Esto pregunta por la edad del amigo del profesor, no del profesor mismo." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '我爸爸今年50岁了。(Wǒ bàba jīnnián 50 suì le.)'?",
        hint: "La respuesta indica la edad de un adulto. La pregunta debe usar la estructura apropiada para ello.",
        answers: [
            { text: "你爸爸是谁？(Nǐ bàba shì shéi?)", correct: false, rationale: "Esta pregunta ('¿Quién es tu padre?') no se contesta con la edad." },
            { text: "你爸爸今年多大了？(Nǐ bàba jīnnián duō dà le?)", correct: true, rationale: "¡Correcto! Esta pregunta ('¿Cuántos años tiene tu padre este año?') corresponde exactamente con la respuesta dada." },
            { text: "你爸爸好吗？(Nǐ bàba hǎo ma?)", correct: false, rationale: "Esta pregunta ('¿Cómo está tu padre?') se contesta con 'bien' o 'mal', no con la edad." },
            { text: "你有爸爸吗？(Nǐ yǒu bàba ma?)", correct: false, rationale: "Esta es una pregunta de sí/no: '¿Tienes padre?'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 那是你的儿子吗？(Nà shì nǐ de érzi ma?) B: 是。 A: 他今年 ___？",
        hint: "Aunque hay dos formas de preguntar la edad, '多大了' es la más versátil y siempre es una opción segura.",
        answers: [
            { text: "几岁了 (jǐ suì le)", correct: false, rationale: "Si bien '多大了' también es posible, '几岁了' es muy común para preguntar la edad de los hijos de otras personas, especialmente si parecen jóvenes." },
            { text: "多大了 (duō dà le)", correct: true, rationale: "¡Correcto! '多大了' es una forma general y segura de preguntar la edad de alguien, ya sea niño o adulto." },
            { text: "谁的 (shéi de)", correct: false, rationale: "Esto significa '¿de quién?' y no encaja en la pregunta." },
            { text: "叫什么 (jiào shénme)", correct: false, rationale: "Esto se usa para preguntar el nombre, no la edad." }
        ]
    },
    {
        question: "Elige la oración que está gramaticalmente mal construida.",
        hint: "Revisa el orden de las palabras en la frase interrogativa '多大'.",
        answers: [
            { text: "你多大了？(Nǐ duō dà le?)", correct: false, rationale: "Esta oración es la forma estándar y correcta." },
            { text: "她女儿今年多大了？(Tā nǚ'ér jīnnián duō dà le?)", correct: false, rationale: "Esta oración es correcta y añade 'este año' para mayor especificidad." },
            { text: "你大了多？(Nǐ dà le duō?)", correct: true, rationale: "¡Correcto! Esta oración está mal. El pronombre interrogativo '多' (duō) debe ir siempre antes del adjetivo '大' (dà)." },
            { text: "医生多大了？(Yīshēng duō dà le?)", correct: false, rationale: "Esta oración es correcta." }
        ]
    },
    {
        question: "Si quieres preguntar la edad de un niño de 4 años, ¿qué opción es la más común y natural?",
        hint: "Hay una expresión específica para preguntar la edad de los niños que usa la palabra para 'cuántos' (números pequeños).",
        answers: [
            { text: "他多大了？(Tā duō dà le?)", correct: false, rationale: "Aunque es gramaticalmente correcto, no es la forma más común de preguntar la edad a un niño tan pequeño." },
            { text: "他几岁了？(Tā jǐ suì le?)", correct: true, rationale: "¡Correcto! '几岁' es la expresión ideal y más utilizada para preguntar la edad de niños pequeños (generalmente menores de 10)." },
            { text: "他今年几？(Tā jīnnián jǐ?)", correct: false, rationale: "Esta pregunta está incompleta, le falta '岁' (suì)." },
            { text: "他是几？(Tā shì jǐ?)", correct: false, rationale: "Esta pregunta no tiene sentido para la edad." }
        ]
    },
    {
        question: "Completa la pregunta: 你的汉语老师今年 ___？(Nǐ de Hànyǔ lǎoshī jīnnián ___?)",
        hint: "Para preguntar la edad de un profesor (un adulto), debes usar la expresión más formal.",
        answers: [
            { text: "是谁 (shì shéi)", correct: false, rationale: "Esto formaría la pregunta '¿Quién es tu profesor de chino?', que no pide la edad." },
            { text: "多大了 (duō dà le)", correct: true, rationale: "¡Perfecto! Esta es la forma completa y correcta de preguntar la edad de tu profesor." },
            { text: "几岁了 (jǐ suì le)", correct: false, rationale: "Se considera poco respetuoso usar '几岁' con un profesor." },
            { text: "的 (de)", correct: false, rationale: "La partícula posesiva '的' no forma una pregunta sobre la edad." }
        ]
    },
    {
        question: "¿Cuál es la respuesta más lógica a la pregunta '你妈妈多大了？' (Nǐ māma duō dà le?)",
        hint: "La pregunta pide una edad ('¿Cuántos años...?'). La respuesta debe contener un número y '岁' (suì).",
        answers: [
            { text: "我妈妈是医生。(Wǒ māma shì yīshēng.)", correct: false, rationale: "Esta respuesta describe la profesión, no la edad." },
            { text: "她四十五岁了。(Tā sìshíwǔ suì le.)", correct: true, rationale: "¡Correcto! Esta respuesta da una edad específica, que es lo que la pregunta requiere." },
            { text: "我没有妈妈。(Wǒ méiyǒu māma.)", correct: false, rationale: "Aunque es una posible respuesta a la vida real, no responde directamente a la pregunta sobre la edad." },
            { text: "是的，她是我妈妈。(Shì de, tā shì wǒ māma.)", correct: false, rationale: "Esta respuesta confirma la identidad, no la edad." }
        ]
    },
    {
        question: "La frase '多大' (duō dà) literalmente se traduce como:",
        hint: "Piensa en el significado de cada caracter por separado: '多' (duō) y '大' (dà).",
        answers: [
            { text: "¿Mucho grande?", correct: true, rationale: "¡Correcto! '多' significa 'mucho' y '大' significa 'grande'. Juntas, forman la pregunta '¿cuán grande?' que se usa para la edad." },
            { text: "¿Qué edad?", correct: false, rationale: "Esta es su función, pero no su traducción literal." },
            { text: "¿Muy grande?", correct: false, rationale: "'Muy grande' sería '很大' (hěn dà), no es una pregunta." },
            { text: "¿Eres grande?", correct: false, rationale: "Eso sería '你大吗？' (Nǐ dà ma?)." }
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