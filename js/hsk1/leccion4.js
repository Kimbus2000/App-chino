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
        question: "Completa la pregunta: ___ 是你的汉语老师？(___ shì nǐ de Hànyǔ lǎoshī?)",
        hint: "La pregunta es sobre la identidad de una persona ('¿_____ es tu profesor de chino?').",
        answers: [
            { text: "什么 (shénme)", correct: false, rationale: "'什么' significa 'qué' y se usa para cosas, no para preguntar por la identidad de una persona." },
            { text: "谁 (shéi)", correct: true, rationale: "¡Correcto! '谁' significa 'quién' y se usa para preguntar por la identidad de una persona." },
            { text: "哪 (nǎ)", correct: false, rationale: "'哪' significa 'cuál' o 'qué' y necesita ir seguido de un sustantivo o clasificador." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula para preguntas de sí/no y no encaja en este espacio en blanco." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿De qué país eres?'",
        hint: "Recuerda la estructura '哪 + sustantivo' para preguntar 'cuál' o 'qué'.",
        answers: [
            { text: "你是谁？(Nǐ shì shéi?)", correct: false, rationale: "Esto significa '¿Quién eres?'." },
            { text: "你是中国人吗？(Nǐ shì Zhōngguó rén ma?)", correct: false, rationale: "Esto significa '¿Eres chino?'. Es una pregunta de sí/no." },
            { text: "你是哪国人？(Nǐ shì nǎ guó rén?)", correct: true, rationale: "¡Perfecto! Esta es la estructura correcta para preguntar la nacionalidad de alguien." },
            { text: "你是什么人？(Nǐ shì shénme rén?)", correct: false, rationale: "Aunque se puede entender, '哪国人' es la forma estándar y educada de preguntar la nacionalidad." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '她是我的朋友。(Tā shì wǒ de péngyǒu.)'?",
        hint: "La respuesta identifica la relación de una persona. La pregunta debe ser sobre la identidad de esa persona.",
        answers: [
            { text: "她是谁？(Tā shì shéi?)", correct: true, rationale: "¡Correcto! La pregunta '¿Quién es ella?' se responde lógicamente con 'Ella es mi amiga'." },
            { text: "她是哪国人？(Tā shì nǎ guó rén?)", correct: false, rationale: "Esta pregunta ('¿De qué país es ella?') no corresponde con la respuesta." },
            { text: "她叫什么名字？(Tā jiào shénme míngzi?)", correct: false, rationale: "La respuesta no da el nombre de la persona, sino su relación contigo." },
            { text: "她是学生吗？(Tā shì xuéshēng ma?)", correct: false, rationale: "La respuesta no es de tipo 'sí' o 'no'." }
        ]
    },
    {
        question: "Completa la pregunta: 你想喝 ___ 杯茶？(Nǐ xiǎng hē ___ bēi chá?)",
        hint: "Necesitas una palabra que signifique 'cuál' antes del clasificador '杯' (taza).",
        answers: [
            { text: "谁 (shéi)", correct: false, rationale: "'谁' (quién) no tiene sentido en el contexto de elegir una taza de té." },
            { text: "哪 (nǎ)", correct: true, rationale: "¡Muy bien! '哪' se usa antes de un clasificador (杯 bēi) para preguntar 'cuál'. '¿Qué/cuál taza de té quieres beber?'." },
            { text: "什么 (shénme)", correct: false, rationale: "Se usaría '什么' si no hubiera un clasificador, como en '你想喝什么？' (¿Qué quieres beber?)." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' va al final de la oración para preguntas de sí/no." }
        ]
    },
    {
        question: "Elige la oración que está gramaticalmente mal construida.",
        hint: "Revisa las opciones. '谁' (shéi) ya implica 'qué persona', por lo que no necesita ir acompañado de '人' (rén) inmediatamente después.",
        answers: [
            { text: "谁是医生？(Shéi shì yīshēng?)", correct: false, rationale: "Esta oración es correcta y significa '¿Quién es el doctor?'." },
            { text: "那个人是谁？(Nà ge rén shì shéi?)", correct: false, rationale: "Esta oración es correcta y significa '¿Quién es esa persona?'." },
            { text: "你是谁人？(Nǐ shì shéi rén?)", correct: true, rationale: "¡Correcto! Esta oración es incorrecta. No se coloca '人' (persona) después de '谁' en este tipo de pregunta. La forma correcta es simplemente '你是谁？'." },
            { text: "李月是谁？(Lǐ Yuè shì shéi?)", correct: false, rationale: "Esta oración es correcta y significa '¿Quién es Li Yue?'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 你是哪国人？(Nǐ shì nǎ guó rén?) B: 我是______。",
        hint: "La pregunta es sobre tu nacionalidad. Debes responder con un país.",
        answers: [
            { text: "中国人 (Zhōngguó rén)", correct: true, rationale: "¡Perfecto! 'Chino' es una nacionalidad y una respuesta lógica a la pregunta." },
            { text: "老师 (lǎoshī)", correct: false, rationale: "'Profesor' es una profesión, no una nacionalidad." },
            { text: "李月 (Lǐ Yuè)", correct: false, rationale: "Este es un nombre propio, no una nacionalidad." },
            { text: "是 (shì)", correct: false, rationale: "Una respuesta de solo 'sí' no contesta a la pregunta '¿De qué país eres?'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: '¿Quién come manzanas?'",
        hint: "Simplemente reemplaza el sujeto (la persona que come) con la palabra '谁' (quién).",
        answers: [
            { text: "谁是苹果？(Shéi shì píngguǒ?)", correct: false, rationale: "Esto significa '¿Quién es una manzana?', lo cual no tiene sentido." },
            { text: "你吃苹果吗？(Nǐ chī píngguǒ ma?)", correct: false, rationale: "Esto significa '¿Comes manzanas?'. Pregunta por la acción, no por la persona." },
            { text: "谁吃苹果？(Shéi chī píngguǒ?)", correct: true, rationale: "¡Correcto! '谁' puede actuar como el sujeto de la oración para preguntar quién realiza una acción." },
            { text: "什么吃苹果？(Shénme chī píngguǒ?)", correct: false, rationale: "Esto significa '¿Qué come manzanas?'. Se usa '什么' para cosas, no personas." }
        ]
    },
    {
        question: "¿Qué pregunta harías para saber cuál de varias personas es Li Yue?",
        hint: "Necesitas usar la palabra para 'cuál', seguida del clasificador '个' (gè) y el sustantivo '人' (rén).",
        answers: [
            { text: "哪个人是李月？(Nǎ ge rén shì Lǐ Yuè?)", correct: true, rationale: "¡Muy bien! Esta estructura '哪 + clasificador + sustantivo' es perfecta para preguntar 'cuál' de un grupo." },
            { text: "谁是李月？(Shéi shì Lǐ Yuè?)", correct: false, rationale: "Esta es una pregunta más general. Se usaría si no supieras nada de Li Yue. La otra opción es mejor para señalar dentro de un grupo." },
            { text: "李月是人吗？(Lǐ Yuè shì rén ma?)", correct: false, rationale: "Esto pregunta '¿Es Li Yue una persona?', lo cual no es la intención." },
            { text: "什么人是李月？(Shénme rén shì Lǐ Yuè?)", correct: false, rationale: "La estructura correcta para preguntar 'cuál' de un grupo es con '哪', no con '什么'." }
        ]
    },
    {
        question: "Completa la pregunta: 这是 ___ 的书？(Zhè shì ___ de shū?)",
        hint: "La pregunta es sobre a quién le pertenece el libro ('¿El libro de _____?').",
        answers: [
            { text: "谁 (shéi)", correct: true, rationale: "¡Correcto! '谁的' significa 'de quién' y se usa para preguntar por la posesión." },
            { text: "哪 (nǎ)", correct: false, rationale: "'哪' necesitaría un clasificador aquí, como en '哪本书' (cuál libro). No encaja en esta estructura." },
            { text: "什么 (shénme)", correct: false, rationale: "Se podría preguntar '这是什么书？' (¿Qué libro es este?), pero '什么' no encaja con '的' de esta forma." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' iría al final de la oración, no en medio." }
        ]
    },
    {
        question: "Tu profesor te pregunta '谁不是学生？' (Shéi bú shì xuéshēng? - ¿Quién no es estudiante?). ¿Cómo respondes 'Él no es estudiante'?",
        hint: "La pregunta pide identificar a la persona que no es estudiante. La respuesta debe tener esa estructura.",
        answers: [
            { text: "他是学生。(Tā shì xuéshēng.)", correct: false, rationale: "Esto contradice la pregunta. Significa 'Él es estudiante'." },
            { text: "他不是学生。(Tā bú shì xuéshēng.)", correct: true, rationale: "¡Perfecto! Esta es la respuesta directa y lógica a la pregunta." },
            { text: "谁是学生？(Shéi shì xuéshēng?)", correct: false, rationale: "Esto es una pregunta, no una respuesta." },
            { text: "他不是谁。(Tā bú shì shéi.)", correct: false, rationale: "Esta oración significa 'Él no es nadie', lo cual no es una respuesta apropiada aquí." }
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