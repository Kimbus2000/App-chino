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
        question: "Completa la oración: 我 ___ 学生。(Wǒ ___ xuéshēng.)",
        hint: "La oración necesita el verbo 'ser' para indicar la identidad del sujeto.",
        answers: [
            { text: "是 (shì)", correct: true, rationale: "Esta es la opción correcta para afirmar 'Yo soy estudiante'." },
            { text: "叫 (jiào)", correct: false, rationale: "'叫' se usa para decir el nombre, como en '我叫...'" },
            { text: "很 (hěn)", correct: false, rationale: "'很' significa 'muy' y se usa con adjetivos, no para indicar una identidad o profesión." },
            { text: "的 (de)", correct: false, rationale: "'的' es una partícula que indica posesión, no es un verbo." }
        ]
    },
    {
        question: "¿Cuál es la forma correcta de negar la oración '她是医生 (Tā shì yīshēng)'?",
        hint: "Para negar con '是', se coloca el adverbio '不' justo antes.",
        answers: [
            { text: "她不医生。(Tā bù yīshēng.)", correct: false, rationale: "La negación '不' debe ir antes del verbo '是', no puede omitirse el verbo." },
            { text: "她不是医生。(Tā bú shì yīshēng.)", correct: true, rationale: "Correcto. El adverbio de negación '不' se coloca justo antes de '是'." },
            { text: "是不是她医生。(Shì bú shì tā yīshēng.)", correct: false, rationale: "Esta estructura '是 不是' se usa para formar preguntas, no para hacer una declaración negativa." },
            { text: "她医生不。(Tā yīshēng bù.)", correct: false, rationale: "El adverbio de negación '不' siempre debe preceder al verbo que modifica." }
        ]
    },
    {
        question: "Completa el diálogo: A: 这是你的猫吗？(Zhè shì nǐ de māo ma?) B: 这 ___ 我的猫。(Zhè ___ wǒ de māo.)",
        hint: "La respuesta está negando que el gato le pertenezca. ¿Cómo se dice 'no es'?",
        answers: [
            { text: "不是 (bú shì)", correct: true, rationale: "Esta es una respuesta lógica y completa para negar la pregunta." },
            { text: "是 (shì)", correct: false, rationale: "Si bien es gramaticalmente correcto, la pregunta suele usarse para confirmar algo que no es obvio, por lo que una negación es una respuesta común." },
            { text: "不 (bù)", correct: false, rationale: "A esta respuesta le falta el verbo '是' para ser una oración completa y clara." },
            { text: "没有 (méiyǒu)", correct: false, rationale: "'没有' se usa para negar la posesión ('no tener'), no la identidad ('no ser')." }
        ]
    },
    {
        question: "Elige la traducción correcta para 'Eso no es una silla'.",
        hint: "Recuerda la estructura para una oración negativa: Sujeto + 不是 + Objeto.",
        answers: [
            { text: "那是椅子。(Nà shì yǐzi.)", correct: false, rationale: "Esta oración es afirmativa y significa 'Eso es una silla'." },
            { text: "那不椅子。(Nà bù yǐzi.)", correct: false, rationale: "Falta el verbo '是' después del sujeto y antes de la negación." },
            { text: "那不是椅子。(Nà bú shì yǐzi.)", correct: true, rationale: "Esta es la traducción perfecta, utilizando la estructura de negación correcta." },
            { text: "那椅子不是。(Nà yǐzi bú shì.)", correct: false, rationale: "El orden de las palabras es incorrecto. El sujeto '那' debe ir al principio." }
        ]
    },
    {
        question: "¿Qué oración es gramaticalmente correcta?",
        hint: "Busca la oración que siga el orden: Sujeto + 不是 + Objeto.",
        answers: [
            { text: "我是不中国人。(Wǒ shì bù Zhōngguó rén.)", correct: false, rationale: "El orden de '是' y '不' es incorrecto. La negación siempre va primero." },
            { text: "我中国人不是。(Wǒ Zhōngguó rén bú shì.)", correct: false, rationale: "El objeto '中国人' no debe estar entre el sujeto y el verbo." },
            { text: "我不是中国人。(Wǒ bú shì Zhōngguó rén.)", correct: true, rationale: "Esta oración sigue la estructura gramatical correcta para una negación." },
            { text: "不是我中国人。(Bú shì wǒ Zhōngguó rén.)", correct: false, rationale: "El sujeto '我' debe ir al principio de la oración." }
        ]
    },
    {
        question: "Completa la oración: 这 ___ 水。(Zhè ___ shuǐ.)",
        hint: "La oración está identificando qué es el objeto. Necesitas el verbo 'ser'.",
        answers: [
            { text: "是 (shì)", correct: true, rationale: "Esta opción identifica correctamente al sujeto, significando 'Esto es agua'." },
            { text: "喝 (hē)", correct: false, rationale: "'喝' significa 'beber'. La oración significaría 'Esto bebe agua', lo cual no tiene sentido." },
            { text: "看 (kàn)", correct: false, rationale: "'看' significa 'ver' o 'mirar', y no encaja en este contexto." },
            { text: "叫 (jiào)", correct: false, rationale: "'叫' se usa para nombres de personas o animales, no para identificar un líquido." }
        ]
    },
    {
        question: "Tu amigo señala a una persona y te pregunta '他是老师吗？(Tā shì lǎoshī ma?)'. ¿Cómo respondes 'No, él no es profesor'?",
        hint: "Para responder a una pregunta de 'sí/no' con '吗', a menudo se repite el verbo en forma afirmativa o negativa.",
        answers: [
            { text: "是，他是老师。(Shì, tā shì lǎoshī.)", correct: false, rationale: "Esta es una respuesta afirmativa, que contradice lo que se quiere decir." },
            { text: "不，他不是老师。(Bù, tā bú shì lǎoshī.)", correct: true, rationale: "Esta es la respuesta negativa completa y correcta a la pregunta." },
            { text: "不，他是学生。(Bù, tā shì xuéshēng.)", correct: false, rationale: "Aunque es una respuesta posible, no responde directamente a la pregunta sobre si es profesor." },
            { text: "不是老师。(Bú shì lǎoshī.)", correct: false, rationale: "Esta respuesta es un poco abrupta. Es más completo y natural incluir el sujeto '他'." }
        ]
    },
    {
        question: "Completa: 李月 ___ 我的朋友。(Lǐ Yuè ___ wǒ de péngyǒu.)",
        hint: "La oración establece una relación de identidad entre 'Li Yue' y 'mi amiga'.",
        answers: [
            { text: "很 (hěn)", correct: false, rationale: "'很' se usa con adjetivos. 'Amigo' es un sustantivo, por lo que no es apropiado aquí." },
            { text: "是 (shì)", correct: true, rationale: "Esta es la elección correcta para indicar que 'Li Yue es mi amiga'." },
            { text: "在 (zài)", correct: false, rationale: "'在' indica ubicación ('estar en'), no identidad." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula interrogativa y no encaja en una oración declarativa." }
        ]
    },
    {
        question: "Elige la opción que significa 'Yo no soy de Estados Unidos'.",
        hint: "Para negar la nacionalidad, se usa la misma estructura '不是' que para negar una profesión.",
        answers: [
            { text: "我是美国人。(Wǒ shì Měiguó rén.)", correct: false, rationale: "Esta es la forma afirmativa, 'Yo soy estadounidense'." },
            { text: "我不是美国人。(Wǒ bú shì Měiguó rén.)", correct: true, rationale: "¡Perfecto! Esta es la forma correcta de negar la nacionalidad." },
            { text: "我是不美国人。(Wǒ shì bù Měiguó rén.)", correct: false, rationale: "El orden de la negación es incorrecto; '不' debe ir antes de '是'." },
            { text: "我没有美国人。(Wǒ méiyǒu Měiguó rén.)", correct: false, rationale: "'没有' se usa para negar la existencia o posesión, no la identidad o nacionalidad." }
        ]
    },
    {
        question: "Completa la oración: 那 ___ 我们的学校。(Nà ___ wǒmen de xuéxiào.)",
        hint: "La oración está identificando un lugar. Necesitas el verbo que conecta 'aquello' con 'nuestra escuela'.",
        answers: [
            { text: "不 (bù)", correct: false, rationale: "Falta el verbo '是'. La negación '不' no puede ir sola en esta estructura." },
            { text: "是 (shì)", correct: true, rationale: "Esta es la forma correcta de afirmar que 'Aquella es nuestra escuela'." },
            { text: "去 (qù)", correct: false, rationale: "'去' significa 'ir'. No tiene sentido decir 'Aquella va a nuestra escuela' en este contexto." },
            { text: "的 (de)", correct: false, rationale: "'的' es una partícula posesiva y no puede funcionar como el verbo principal de la oración." }
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