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
        question: "Completa la oración: 我 _____ 六点起床。(Wǒ _____ liù diǎn qǐchuáng.)",
        hint: "Necesitas la palabra que significa 'cada día'.",
        answers: [
            { text: "每天", correct: true, rationale: "¡Correcto! '每天' (měitiān) significa 'cada día' y encaja perfectamente en la oración." },
            { text: "每年", correct: false, rationale: "'每年' (měinián) significa 'cada año', lo cual es poco probable para la hora de levantarse." },
            { text: "每个", correct: false, rationale: "'每个' (měi ge) necesita un sustantivo después, como '每个星期' (cada semana)." },
            { text: "每", correct: false, rationale: "'每' (měi) requiere un clasificador o una unidad de tiempo después, como '每天'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Él va a China todos los años.'",
        hint: "'Todos los años' se dice '每年'.",
        answers: [
            { text: "他每天都去中国。", correct: false, rationale: "Esto significa 'Él va a China todos los días'." },
            { text: "他每年都去中国。", correct: true, rationale: "¡Correcto! Esta es la traducción precisa de la oración." },
            { text: "他每个月都去中国。", correct: false, rationale: "Esto significa 'Él va a China todos los meses'." },
            { text: "他每年要去中国。", correct: false, rationale: "Aunque gramaticalmente posible ('quiere ir cada año'), el uso de '都' (dōu) es más común para enfatizar 'todos y cada uno' de los años." }
        ]
    },
    {
        question: "¿Cuál es la forma correcta de decir 'cada estudiante'?",
        hint: "Necesitas '每' seguido del clasificador para personas, '个' (ge).",
        answers: [
            { text: "每学生", correct: false, rationale: "Incorrecto. '每' debe ir seguido de un clasificador antes del sustantivo." },
            { text: "学生每", correct: false, rationale: "El orden es incorrecto. '每' va al principio." },
            { text: "每个学生", correct: true, rationale: "¡Correcto! La estructura '每 + Clasificador + Sustantivo' es la correcta." },
            { text: "个每学生", correct: false, rationale: "El orden de '每' y el clasificador es incorrecto." }
        ]
    },
    {
        question: "Completa la pregunta: 你 _____ 星期六都工作吗？ (Nǐ _____ xīngqīliù dōu gōngzuò ma?)",
        hint: "Para decir 'cada sábado', se necesita la estructura 'cada' + 'clasificador' + 'semana'.",
        answers: [
            { text: "每", correct: false, rationale: "Incompleto. Se necesita un clasificador después de '每'." },
            { text: "每个", correct: true, rationale: "¡Correcto! '每个星期六' significa 'cada sábado'." },
            { text: "每天", correct: false, rationale: "'每天' (měitiān) significa 'cada día', no 'cada sábado'." },
            { text: "每年", correct: false, rationale: "'每年' (měinián) significa 'cada año'." }
        ]
    },
    {
        question: "¿Qué significa '我们每个月看一次电影' (Wǒmen měi ge yuè kàn yí cì diànyǐng)?",
        hint: "'每个月' (měi ge yuè) significa 'cada mes'. '一次' (yí cì) significa 'una vez'.",
        answers: [
            { text: "Vemos una película cada semana.", correct: false, rationale: "'Cada semana' sería '每个星期' (měi ge xīngqī)." },
            { text: "Vemos una película cada día.", correct: false, rationale: "'Cada día' sería '每天' (měitiān)." },
            { text: "Vemos una película cada mes.", correct: true, rationale: "¡Correcto! Esta es la traducción exacta de la oración." },
            { text: "Vemos muchas películas este mes.", correct: false, rationale: "La oración especifica que es 'una vez' al mes." }
        ]
    },
    {
        question: "Completa la oración: 这家商店 _____ 东西都很贵。(Zhè jiā shāngdiàn _____ dōngxi dōu hěn guì.)",
        hint: "Para decir 'cada cosa' u 'todas las cosas', se usa '每' con el clasificador '件' (jiàn) o '个' (ge).",
        answers: [
            { text: "每件", correct: true, rationale: "¡Correcto! '每件东西' (měi jiàn dōngxi) es una forma común de decir 'cada artículo' o 'todas las cosas'." },
            { text: "每天", correct: false, rationale: "'每天' (měitiān) se refiere al tiempo ('cada día'), no a los objetos." },
            { text: "都", correct: false, rationale: "'都' (dōu) ya está en la oración para enfatizar 'todas', pero se necesita '每' al principio." },
            { text: "是", correct: false, rationale: "'是' (shì) significa 'ser' y no encaja en esta estructura." }
        ]
    },
    {
        question: "Elige la oración que utiliza '每' INCORRECTAMENTE.",
        hint: "Recuerda que '每' generalmente necesita un clasificador después.",
        answers: [
            { text: "我每天都喝咖啡。", correct: false, rationale: "Esta oración es correcta y significa 'Bebo café todos los días'." },
            { text: "每个星期天我们都休息。", correct: false, rationale: "Esta oración es correcta y significa 'Descansamos todos los domingos'." },
            { text: "他有每本书。", correct: true, rationale: "¡Correcto, esta es la incorrecta! Falta el clasificador para libros, '本' (běn). Lo correcto sería '他有每本书' (Tā yǒu měi běn shū)." },
            { text: "这里的每个人我都不认识。", correct: false, rationale: "Esta oración es correcta y significa 'No conozco a ninguna persona de aquí'." }
        ]
    },
    {
        question: "Completa: _____ 年春天, 我都去北京。(_____ nián chūntiān, wǒ dōu qù Běijīng.)",
        hint: "Para decir 'cada año' o 'todos los años', se usa '每年'.",
        answers: [
            { text: "每", correct: false, rationale: "Aunque '年' (nián) puede actuar como su propio clasificador, '每年' es la forma fija y más común." },
            { text: "每个", correct: false, rationale: "No se dice '每个年'. '每年' es la expresión correcta." },
            { text: "每年", correct: true, rationale: "¡Correcto! '每年春天' significa 'cada primavera'." },
            { text: "每天", correct: false, rationale: "Esto significaría 'cada día', lo cual no concuerda con 'primavera'." }
        ]
    },
    {
        question: "La frase 'Trabajo de lunes a viernes' se puede expresar con '每' como:",
        hint: "Piensa en cómo se diría 'Cada día de la semana (laborable)' voy a trabajar.",
        answers: [
            { text: "我每个月都工作。", correct: false, rationale: "Esto significa 'Trabajo todos los meses'." },
            { text: "我每天都工作。", correct: true, rationale: "¡Correcto! Aunque literalmente significa 'trabajo todos los días', en muchos contextos se usa para referirse a la rutina diaria de trabajo, implicando los días laborables." },
            { text: "我每年都工作。", correct: false, rationale: "Esto significa 'Trabajo todos los años'." },
            { text: "我每个星期六都工作。", correct: false, rationale: "Esto significa 'Trabajo todos los sábados'." }
        ]
    },
    {
        question: "A: 你每天都运动吗？(¿Haces ejercicio todos los días?) B: 不, 我 _____ 运动。",
        hint: "Si la respuesta es no, ¿cómo negarías la frecuencia 'todos los días'?",
        answers: [
            { text: "每天不", correct: false, rationale: "La negación '不' (bù) generalmente va antes del verbo." },
            { text: "不每天", correct: true, rationale: "¡Correcto! '不每天运动' significa 'No hago ejercicio todos los días', implicando que lo hace algunos días pero no todos." },
            { text: "没每天", correct: false, rationale: "'没' (méi) no se usa de esta manera para negar la frecuencia con '每'." },
            { text: "每天没", correct: false, rationale: "El orden es incorrecto." }
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