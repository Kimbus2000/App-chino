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
        question: "Completa la oración: 我 _____ 去商店买东西 (Wǒ _____ qù shāngdiàn mǎi dōngxi.)",
        hint: "Necesitas el verbo auxiliar que indica 'querer hacer algo'.",
        answers: [
            { text: "要", correct: true, rationale: "¡Correcto! Esta es la forma correcta de expresar el deseo de ir a la tienda." },
            { text: "是", correct: false, rationale: "'是' (shì) significa 'ser' y no se usa para expresar un deseo de acción." },
            { text: "很", correct: false, rationale: "'很' (hěn) significa 'muy' y es un adverbio de grado, no un verbo auxiliar." },
            { text: "在", correct: false, rationale: "'在' (zài) indica ubicación o una acción en progreso, no un deseo." }
        ]
    },
    {
        question: "¿Cuál es la forma negativa correcta de '我要吃米饭' (Quiero comer arroz)?",
        hint: "La forma negativa para expresar 'no querer' es '不想'.",
        answers: [
            { text: "我不要吃米饭。", correct: false, rationale: "Aunque '不要' puede usarse para rechazar algo, '不想' es la forma más común y correcta para negar el deseo de hacer la acción." },
            { text: "我不想吃米饭。", correct: true, rationale: "¡Correcto! Esta es la negación estándar para expresar que no se tiene el deseo de hacer algo." },
            { text: "我没要吃米饭。", correct: false, rationale: "'没' (méi) se usa para negar acciones pasadas o posesión, no para negar un deseo presente." },
            { text: "我不吃米饭。", correct: false, rationale: "Esto simplemente declara el hecho 'No como arroz', pero no expresa la falta de deseo en el momento." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Él quiere aprender chino.'",
        hint: "El verbo auxiliar '要' se coloca antes del verbo principal 'aprender'.",
        answers: [
            { text: "他学习要汉语。", correct: false, rationale: "El orden es incorrecto. '要' debe ir antes del verbo '学习' (aprender)." },
            { text: "他要学习汉语。", correct: true, rationale: "¡Correcto! Esta oración sigue la estructura correcta: Sujeto + 要 + Verbo + Objeto." },
            { text: "他是要学习汉语。", correct: false, rationale: "Añadir '是' (shì) aquí es innecesario y cambia el énfasis de la oración." },
            { text: "汉语他要学习。", correct: false, rationale: "Aunque es posible para enfatizar el objeto, la estructura más común y natural es diferente." }
        ]
    },
    {
        question: "Completa el diálogo: A: 你要不要喝茶？ B: 我 _____ 喝，谢谢。(Wǒ _____ hē, xièxie.)",
        hint: "La pregunta es '¿Quieres o no quieres beber té?'. La respuesta indica que sí quiere.",
        answers: [
            { text: "不想", correct: false, rationale: "Esto significaría 'No quiero beber', lo cual contradice el 'gracias'." },
            { text: "不是", correct: false, rationale: "'不是' (bú shì) se usa para negar 'ser', no un deseo." },
            { text: "要", correct: true, rationale: "¡Correcto! Esta es la respuesta afirmativa para confirmar que sí quiere beber." },
            { text: "没有", correct: false, rationale: "'没有' (méiyǒu) se usa para negar posesión o acciones pasadas." }
        ]
    },
    {
        question: "¿Qué oración expresa un deseo?",
        hint: "Busca la oración que contenga el verbo auxiliar '要' seguido de otro verbo.",
        answers: [
            { text: "我有一个苹果。(Wǒ yǒu yí ge píngguǒ.)", correct: false, rationale: "Esta oración expresa posesión ('Tengo una manzana'), no un deseo." },
            { text: "他在看书。(Tā zài kàn shū.)", correct: false, rationale: "Esta oración describe una acción en progreso ('Él está leyendo'), no un deseo." },
            { text: "我们是学生。(Wǒmen shì xuéshēng.)", correct: false, rationale: "Esta oración indica identidad ('Nosotros somos estudiantes'), no un deseo." },
            { text: "她要买新衣服。(Tā yào mǎi xīn yīfu.)", correct: true, rationale: "¡Correcto! Esta oración utiliza '要' para expresar el deseo de comprar ropa nueva." }
        ]
    },
    {
        question: "A: 你要去北京吗？ B: _____，我不想去。(_____, wǒ bù xiǎng qù.)",
        hint: "La respuesta es negativa. ¿Cómo se responde 'no' a una pregunta con '吗'?",
        answers: [
            { text: "是", correct: false, rationale: "'是' (shì) significa 'sí' y contradice el resto de la respuesta." },
            { text: "对", correct: false, rationale: "'对' (duì) significa 'correcto', pero no es la forma habitual de responder negativamente a esta pregunta." },
            { text: "不", correct: true, rationale: "¡Correcto! La respuesta corta '不' (bù) es la forma correcta de negar el verbo principal de la pregunta ('去')." },
            { text: "没", correct: false, rationale: "'没' (méi) no se usa para negar un deseo o acción futura de esta manera." }
        ]
    },
    {
        question: "¿Cuál es la forma interrogativa correcta para 'Compramos unas sillas nuevas'?",
        hint: "Puedes formar una pregunta de opción A/no A con '要不要'.",
        answers: [
            { text: "我们要不要买几个新的椅子？", correct: true, rationale: "¡Correcto! Esta estructura 'Sujeto + 要不要 + Verbo...' es una forma común de hacer una pregunta de elección." },
            { text: "我们要买几个新的椅子吗？", correct: false, rationale: "Esta también es una pregunta correcta, pero la opción con '要不要' se ajusta mejor al ejemplo dado." },
            { text: "我们是不是要买几个新的椅子？", correct: false, rationale: "Esta estructura con '是不是' es gramatical, pero '要不要' es más directa para preguntar sobre el deseo." },
            { text: "我们买几个新的椅子要不要？", correct: false, rationale: "El orden es incorrecto. '要不要' debe ir antes del verbo '买' (comprar)." }
        ]
    },
    {
        question: "Completa la oración negativa: 他们 _____ 看电影。(Tāmen _____ kàn diànyǐng.)",
        hint: "Usa la forma negativa de 'querer', que es '不想'.",
        answers: [
            { text: "不要", correct: false, rationale: "'不要' (bú yào) se usa más a menudo como una orden ('no lo hagas'), mientras que '不想' expresa la falta de deseo." },
            { text: "不想", correct: true, rationale: "¡Correcto! Esta es la negación correcta para expresar que 'Ellos no quieren ver una película'." },
            { text: "不是", correct: false, rationale: "'不是' (bú shì) niega el verbo 'ser', no el deseo de hacer una acción." },
            { text: "没想", correct: false, rationale: "'没想' (méi xiǎng) significaría 'no pensé' o 'no he pensado', refiriéndose a una acción mental, no a un deseo." }
        ]
    },
    {
        question: "¿Qué significa '王方要学习英语' (Wáng Fāng yào xuéxí Yīngyǔ)?",
        hint: "El verbo auxiliar '要' indica un deseo o intención.",
        answers: [
            { text: "Wang Fang está estudiando inglés.", correct: false, rationale: "Para expresar una acción en progreso se usaría '在' (zài), no '要' (yào)." },
            { text: "Wang Fang puede estudiar inglés.", correct: false, rationale: "Para expresar habilidad se usaría '会' (huì) o '能' (néng)." },
            { text: "Wang Fang quiere estudiar inglés.", correct: true, rationale: "¡Correcto! Esta es la traducción correcta, ya que '要' expresa el deseo de realizar la acción." },
            { text: "A Wang Fang le gusta estudiar inglés.", correct: false, rationale: "Para expresar que algo le gusta se usaría '喜欢' (xǐhuān)." }
        ]
    },
    {
        question: "A: 你要去商店吗？(¿Quieres ir a la tienda?) B: 我不去，我 _____ 买东西。(Wǒ bú qù, wǒ _____ mǎi dōngxi.)",
        hint: "La persona no va a la tienda porque no tiene el deseo de comprar. ¿Cómo se expresa 'no querer'?",
        answers: [
            { text: "不想", correct: true, rationale: "¡Correcto! Esta opción completa la frase lógicamente: 'No voy, no quiero comprar cosas'." },
            { text: "不要", correct: false, rationale: "Aunque cercano, '不想' encaja mejor para expresar la falta de deseo personal en esta explicación." },
            { text: "不爱", correct: false, rationale: "'不爱' (bú ài) significa 'no amar' o 'no gustar', lo cual es una afirmación más general que no encaja aquí." },
            { text: "不是", correct: false, rationale: "'不是' (bú shì) se usa para negar 'ser' y no tiene sentido antes de un verbo como 'comprar'." }
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