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
        question: "Completa el diálogo: A: 我是学生。(Wǒ shì xuéshēng.) B: 你 ___？",
        hint: "Necesitas la partícula que se usa para preguntar '¿Y tú?' después de que alguien ha compartido información sobre sí mismo.",
        answers: [
            { text: "的 (de)", correct: false, rationale: "'的' es la partícula posesiva y no se usa para hacer este tipo de preguntas." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' forma una pregunta de sí/no. '你吗？' no es una pregunta completa ni correcta." },
            { text: "呢 (ne)", correct: true, rationale: "¡Correcto! '呢' se usa para devolver la pregunta al interlocutor, significando '¿Y tú?'." },
            { text: "不 (bù)", correct: false, rationale: "'不' es una partícula de negación." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'Él es un profesor. ¿Y ella?'",
        hint: "Usa el pronombre para 'ella' seguido de la partícula interrogativa de seguimiento.",
        answers: [
            { text: "他是老师。她是吗？(Tā shì lǎoshī. Tā shì ma?)", correct: false, rationale: "'她是吗？' significaría '¿Ella lo es?', que es una pregunta de sí/no, no la pregunta de seguimiento '¿Y ella?'." },
            { text: "他是老师。她呢？(Tā shì lǎoshī. Tā ne?)", correct: true, rationale: "¡Perfecto! Esta es la forma más natural y correcta de hacer la pregunta de seguimiento sobre otra persona." },
            { text: "他是老师。她是谁？(Tā shì lǎoshī. Tā shì shéi?)", correct: false, rationale: "Esto significa 'Él es un profesor. ¿Quién es ella?'. Es una pregunta diferente." },
            { text: "他是老师。她的呢？(Tā shì lǎoshī. Tā de ne?)", correct: false, rationale: "'她的' es posesivo ('suyo de ella'), lo cual no tiene sentido aquí." }
        ]
    },
    {
        question: "En un diálogo, si alguien te dice '我喜欢中国菜' (Me gusta la comida china), ¿cuál es la forma más corta y común de preguntar 'Y a ti'?",
        hint: "La partícula '呢' es ideal para hacer preguntas cortas de seguimiento.",
        answers: [
            { text: "你喜欢吗？(Nǐ xǐhuān ma?)", correct: false, rationale: "Esto significa '¿Te gusta?', es una pregunta de sí/no un poco ambigua sin contexto." },
            { text: "你呢？(Nǐ ne?)", correct: true, rationale: "¡Correcto! Esta es la forma más eficiente de devolver el tema de conversación a la otra persona." },
            { text: "你是什么？(Nǐ shì shénme?)", correct: false, rationale: "Esto significa '¿Qué eres?', lo cual no tiene sentido." },
            { text: "你喜欢。(Nǐ xǐhuān.)", correct: false, rationale: "Esto es una afirmación: 'A ti te gusta'." }
        ]
    },
    {
        question: "Completa: 我爸爸是医生。你爸爸 ___？(Wǒ bàba shì yīshēng. Nǐ bàba ___?)",
        hint: "La pregunta sigue el patrón 'A es X. ¿Y B?'.",
        answers: [
            { text: "吗 (ma)", correct: false, rationale: "'你爸爸吗？' ('¿Tu papá?') no es una pregunta completa en este contexto." },
            { text: "的 (de)", correct: false, rationale: "'的' es una partícula posesiva." },
            { text: "谁 (shéi)", correct: false, rationale: "'谁' (quién) no encaja aquí. Se preguntaría '谁是医生？' (¿Quién es doctor?)." },
            { text: "呢 (ne)", correct: true, rationale: "¡Muy bien! '呢' se usa para preguntar sobre el mismo tema pero aplicado a un sujeto diferente. 'Mi papá es doctor. ¿Y tu papá?'." }
        ]
    },
    {
        question: "¿Qué pregunta está mal formulada en el contexto de HSK1?",
        hint: "Recuerda que para hacer una pregunta simple de sí/no, se utiliza '吗' (ma), no '呢' (ne).",
        answers: [
            { text: "我叫大卫。你呢？(Wǒ jiào Dàwèi. Nǐ ne?)", correct: false, rationale: "Esta es una pregunta de seguimiento perfectamente correcta." },
            { text: "你是老师呢？(Nǐ shì lǎoshī ne?)", correct: true, rationale: "¡Correcto! Para preguntar '¿Eres profesor?', se usa la partícula '吗' (ma) al final. '呢' no se usa para este tipo de preguntas de sí/no." },
            { text: "我的猫在这儿。你的猫呢？(Wǒ de māo zài zhèr. Nǐ de māo ne?)", correct: false, rationale: "Esta es una pregunta correcta que significa 'Mi gato está aquí. ¿Y el tuyo?'." },
            { text: "他呢？(Tā ne?)", correct: false, rationale: "Dentro de un contexto apropiado (por ejemplo, después de hablar de otras personas), esta pregunta es correcta." }
        ]
    },
    {
        question: "Completa el diálogo: A: 我的书在那儿。(Wǒ de shū zài nàr.) B: 我的 ___？",
        hint: "La pregunta de B es '¿Y el mío?'. Necesitas repetir el sustantivo y añadir la partícula de seguimiento.",
        answers: [
            { text: "书呢 (shū ne)", correct: true, rationale: "¡Perfecto! '我的书呢？' (Wǒ de shū ne?) significa '¿Y mi libro?', preguntando por su ubicación en base a la información anterior." },
            { text: "书吗 (shū ma)", correct: false, rationale: "'我的书吗？' ('¿Mi libro?') es una pregunta extraña en este contexto. No pregunta por la ubicación." },
            { text: "书的 (shū de)", correct: false, rationale: "La partícula posesiva '的' no tiene sentido al final de la pregunta." },
            { text: "是谁 (shì shéi)", correct: false, rationale: "'我的 是谁？' ('¿Mi es quién?') no tiene sentido." }
        ]
    },
    {
        question: "La pregunta '他呢？' (Tā ne?) es una forma corta de preguntar...",
        hint: "Piensa en el rol de '呢' para continuar una conversación o preguntar por algo/alguien mencionado implícitamente.",
        answers: [
            { text: "¿Quién es él? (他是谁？)", correct: false, rationale: "Para preguntar 'quién es', se usa '谁' (shéi)." },
            { text: "¿Qué le pasa a él? o ¿Y él?", correct: true, rationale: "¡Correcto! Dependiendo del contexto anterior, '他呢？' puede significar '¿Y qué hay de él?' o '¿Dónde está él?'." },
            { text: "¿Es él? (是他吗？)", correct: false, rationale: "Para preguntar '¿es él?', se usa '吗' (ma)." },
            { text: "¿Es suyo (de él)? (是他的吗？)", correct: false, rationale: "Esta pregunta usa '的' y '吗' para hablar de posesión." }
        ]
    },
    {
        question: "Estás en una tienda con un amigo. Tu amigo dice: '我喜欢这个。' (Wǒ xǐhuān zhège. - Me gusta este). ¿Cómo le preguntas por su opinión sobre otro objeto?",
        hint: "Usa la palabra para 'aquel' (那个) seguida de la partícula para hacer una pregunta de seguimiento.",
        answers: [
            { text: "那个呢？(Nàge ne?)", correct: true, rationale: "¡Muy bien! Señalando otro objeto, puedes preguntar '¿Y aquel?' usando '呢' para continuar la conversación." },
            { text: "那个吗？(Nàge ma?)", correct: false, rationale: "'¿Aquel?' es una pregunta un poco incompleta y no es la forma natural de pedir una opinión." },
            { text: "谁是那个？(Shéi shì nàge?)", correct: false, rationale: "Esto significa '¿Quién es aquel?', que se usa para personas, no objetos." },
            { text: "那个的？(Nàge de?)", correct: false, rationale: "La partícula posesiva '的' no tiene sentido aquí." }
        ]
    },
    {
        question: "Completa la pregunta: 我是中国人，你是美国人。她 ___？ (Wǒ shì Zhōngguó rén, nǐ shì Měiguó rén. Tā ___?)",
        hint: "Se está continuando un patrón de descripción. ¿Qué partícula se usa para decir '¿Y ella?'",
        answers: [
            { text: "呢 (ne)", correct: true, rationale: "¡Correcto! Después de describir a dos personas, es natural usar '呢' para preguntar por la tercera." },
            { text: "是 (shì)", correct: false, rationale: "Simplemente 'ella es' no forma una pregunta completa." },
            { text: "的 (de)", correct: false, rationale: "'的' es la partícula posesiva." },
            { text: "吗 (ma)", correct: false, rationale: "Se podría preguntar '她是中国人吗？' (¿Es ella china?), pero '呢' es la mejor opción para continuar la secuencia." }
        ]
    },
    {
        question: "¿En qué situación NO usarías '呢' (ne)?",
        hint: "'呢' es una partícula de seguimiento, lo que implica que necesita algo a lo que 'seguir'.",
        answers: [
            { text: "Para devolver una pregunta a tu interlocutor.", correct: false, rationale: "Este es uno de los usos principales de '呢', como en '我很好，你呢？'." },
            { text: "Para iniciar una conversación sin ningún contexto previo.", correct: true, rationale: "¡Correcto! '呢' necesita un tema o contexto previo para funcionar. No puedes empezar una conversación diciendo '你呢？'." },
            { text: "Para preguntar por la ubicación de algo que se ha mencionado.", correct: false, rationale: "Este es un uso común, como en '我的书呢？' (¿Y mi libro? / ¿Dónde está mi libro?)." },
            { text: "Para preguntar sobre una tercera persona después de hablar de ti mismo.", correct: false, rationale: "Este es un uso correcto, como en '我是学生。他呢？'." }
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