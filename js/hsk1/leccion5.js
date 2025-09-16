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
        question: "Completa la oración: 这是我 ___ 书。(Zhè shì wǒ ___ shū.)",
        hint: "Para decir 'mi libro', necesitas la partícula que indica posesión después de 'yo'.",
        answers: [
            { text: "是 (shì)", correct: false, rationale: "'是' es el verbo 'ser'. La oración ya tiene un verbo, por lo que no es necesario otro." },
            { text: "的 (de)", correct: true, rationale: "¡Correcto! '的' se usa después de un pronombre o sustantivo para indicar posesión. '我的书' significa 'mi libro'." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula para hacer preguntas y va al final de la oración." },
            { text: "不 (bù)", correct: false, rationale: "'不' es un adverbio de negación y no indica posesión." }
        ]
    },
    {
        question: "¿En cuál de estas frases se puede omitir '的' (de) para que suene más natural?",
        hint: "Recuerda que '的' se puede omitir cuando el sustantivo que le sigue se refiere a una persona muy cercana.",
        answers: [
            { text: "我的电脑 (wǒ de diànnǎo)", correct: false, rationale: "No se puede omitir '的' aquí, ya que '电脑' (ordenador) es un objeto general, no una persona cercana." },
            { text: "老师的书 (lǎoshī de shū)", correct: false, rationale: "Para indicar que el libro pertenece al profesor, '的' es necesario." },
            { text: "他的猫 (tā de māo)", correct: false, rationale: "Aunque es una mascota, generalmente se mantiene '的' para indicar posesión de animales." },
            { text: "我的妈妈 (wǒ de māma)", correct: true, rationale: "¡Correcto! Cuando hablamos de familiares cercanos o amigos, '的' se puede omitir. Decir '我妈妈' (wǒ māma) es muy común y natural." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'El profesor de Li Yue'",
        hint: "La estructura es siempre: [Quien posee] + 的 + [Lo poseído].",
        answers: [
            { text: "老师的李月 (Lǎoshī de Lǐ Yuè)", correct: false, rationale: "Esto significaría 'Li Yue del profesor', lo cual invierte la relación de posesión." },
            { text: "李月老师 (Lǐ Yuè lǎoshī)", correct: false, rationale: "Esto se traduce como 'Profesor/a Li Yue', que es una forma de dirigirse a la persona, no de expresar posesión." },
            { text: "李月的老师 (Lǐ Yuè de lǎoshī)", correct: true, rationale: "¡Exacto! La estructura 'Poseedor + 的 + Poseído' es la correcta. En este caso, 'Li Yue' es la poseedora." },
            { text: "李月是老师 (Lǐ Yuè shì lǎoshī)", correct: false, rationale: "Esta es una oración completa que significa 'Li Yue es profesora'." }
        ]
    },
    {
        question: "Completa el diálogo: A: 这是谁的猫？(Zhè shì shéi de māo?) B: 这是他___猫。(Zhè shì tā ___ māo.)",
        hint: "La pregunta es '¿De quién es este gato?'. La respuesta debería ser 'Este es su gato (de él)'.",
        answers: [
            { text: "的 (de)", correct: true, rationale: "¡Muy bien! La respuesta sigue la misma estructura posesiva de la pregunta." },
            { text: "不 (bù)", correct: false, rationale: "La negación no tiene sentido en esta respuesta afirmativa." },
            { text: "是 (shì)", correct: false, rationale: "El verbo '是' ya está presente en la oración, no es necesario repetirlo aquí." },
            { text: "吗 (ma)", correct: false, rationale: "La respuesta es una afirmación, no una pregunta." }
        ]
    },
    {
        question: "¿Qué oración está gramaticalmente mal construida?",
        hint: "Revisa el orden de las palabras en la estructura posesiva.",
        answers: [
            { text: "他是我的朋友。(Tā shì wǒ de péngyǒu.)", correct: false, rationale: "Esta oración es correcta." },
            { text: "这是老师的书。(Zhè shì lǎoshī de shū.)", correct: false, rationale: "Esta oración es correcta." },
            { text: "那是我爸爸。(Nà shì wǒ bàba.)", correct: false, rationale: "Esta oración es correcta, con la omisión natural de '的'." },
            { text: "这是书我的。(Zhè shì shū wǒ de.)", correct: true, rationale: "¡Correcto! Esta oración está mal. El poseedor (我) y la partícula (的) deben ir antes del objeto poseído (书). La forma correcta es '这是我的书'." }
        ]
    },
    {
        question: "La frase '我同学' (wǒ tóngxué) es una forma abreviada de...",
        hint: "Piensa en la regla de omisión de '的' con relaciones personales.",
        answers: [
            { text: "我的同学 (wǒ de tóngxué)", correct: true, rationale: "¡Correcto! 'Compañero de clase' (同学) es una relación personal donde '的' puede omitirse." },
            { text: "我是同学 (wǒ shì tóngxué)", correct: false, rationale: "Esto significa 'Yo soy un compañero de clase', lo cual es una oración diferente." },
            { text: "同学的我 (tóngxué de wǒ)", correct: false, rationale: "El orden de la posesión está invertido." },
            { text: "我的学 (wǒ de xué)", correct: false, rationale: "'学' por sí solo significa 'estudiar', no 'compañero de clase'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Esa no es la silla de mi amigo'.",
        hint: "Primero, construye la frase 'la silla de mi amigo'. Luego, colócala en la estructura negativa 'Esa no es...'",
        answers: [
            { text: "那是我朋友的椅子。(Nà shì wǒ péngyǒu de yǐzi.)", correct: false, rationale: "Esta oración es afirmativa, no negativa." },
            { text: "那不是我朋友的椅子。(Nà bú shì wǒ péngyǒu de yǐzi.)", correct: true, rationale: "¡Perfecto! Esta oración combina correctamente la negación '不是' con la estructura posesiva '我朋友的椅子'." },
            { text: "那是我不朋友的椅子。(Nà shì wǒ bù péngyǒu de yǐzi.)", correct: false, rationale: "La negación '不' debe ir antes del verbo '是', no dentro de la frase posesiva." },
            { text: "那不是我的朋友椅子。(Nà bú shì wǒ de péngyǒu yǐzi.)", correct: false, rationale: "Falta la partícula '的' después de '朋友' para indicar que la silla le pertenece al amigo." }
        ]
    },
    {
        question: "Completa la pregunta: 那是 ___ 的学校？(Nà shì ___ de xuéxiào?)",
        hint: "La estructura '___ 的' se usa para preguntar '¿de quién?'.",
        answers: [
            { text: "谁 (shéi)", correct: true, rationale: "¡Muy bien! La pregunta '¿De quién es...?' se forma con '谁的...?' (shéi de...)." },
            { text: "什么 (shénme)", correct: false, rationale: "'什么' (qué) no se usa para preguntar por el poseedor." },
            { text: "哪 (nǎ)", correct: false, rationale: "'哪' (cuál) necesitaría ir seguido de un sustantivo o clasificador." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' es una partícula interrogativa que va al final de la oración." }
        ]
    },
    {
        question: "¿Qué frase significa 'el nombre de ella'?",
        hint: "Usa el pronombre para 'ella', la partícula posesiva y la palabra para 'nombre'.",
        answers: [
            { text: "她的名字 (tā de míngzi)", correct: true, rationale: "Esta es la estructura posesiva correcta: Pronombre + 的 + Sustantivo." },
            { text: "她叫名字 (tā jiào míngzi)", correct: false, rationale: "Esto se traduciría extrañamente como 'Ella se llama nombre'." },
            { text: "名字的她 (míngzi de tā)", correct: false, rationale: "El orden de la posesión está invertido." },
            { text: "她是名字 (tā shì míngzi)", correct: false, rationale: "Esto significa 'Ella es un nombre', lo cual no tiene sentido." }
        ]
    },
    {
        question: "Completa: 他是我爸爸，不是我___。(Tā shì wǒ bàba, bú shì wǒ ___.)",
        hint: "La segunda parte de la oración debe seguir una estructura similar a la primera ('我爸爸'), donde '的' se omite.",
        answers: [
            { text: "老师的 (lǎoshī de)", correct: false, rationale: "A esta frase le falta el objeto. Sería '不是我的老师' (bú shì wǒ de lǎoshī)." },
            { text: "老师 (lǎoshī)", correct: true, rationale: "¡Correcto! En esta frase paralela, '的' se omite de forma natural, igual que en '我爸爸'. Significa 'Él es mi papá, no mi profesor'." },
            { text: "是老师 (shì lǎoshī)", correct: false, rationale: "El verbo '是' ya está implícito en la negación '不是'." },
            { text: "我的 (wǒ de)", correct: false, rationale: "Esta frase está incompleta. ¿'Mi' qué?" }
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