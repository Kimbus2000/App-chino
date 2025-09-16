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
        question: "Completa la oración: 我朋友的女儿今年五岁___。(Wǒ péngyǒu de nǚ'ér jīnnián wǔ suì ___.)",
        hint: "Necesitas la partícula que indica que se ha producido un cambio o se ha alcanzado un nuevo estado, como una nueva edad.",
        answers: [
            { text: "吗 (ma)", correct: false, rationale: "'吗' se usa para formar preguntas de sí/no." },
            { text: "的 (de)", correct: false, rationale: "'的' es una partícula posesiva." },
            { text: "了 (le)", correct: true, rationale: "¡Correcto! '了' se pone al final para indicar que se ha alcanzado una nueva edad, un cambio de estado." },
            { text: "呢 (ne)", correct: false, rationale: "'呢' se usa para preguntas de seguimiento ('¿Y tú?')." }
        ]
    },
    {
        question: "En la frase '下雨了' (xià yǔ le), ¿qué significa la partícula '了' (le)?",
        hint: "Piensa en '了' como una señal de que la situación ha cambiado con respecto a antes.",
        answers: [
            { text: "Que llovió ayer.", correct: false, rationale: "Para indicar una acción completada en el pasado, '了' suele ir después del verbo, no al final de la frase de esta manera." },
            { text: "Que ha empezado a llover ahora.", correct: true, rationale: "¡Exacto! '了' indica un cambio de estado. Antes no llovía, pero ahora sí. Es una nueva situación." },
            { text: "Que me gusta la lluvia.", correct: false, rationale: "La frase no expresa ninguna emoción o preferencia." },
            { text: "Que la lluvia es muy fuerte.", correct: false, rationale: "No indica la intensidad de la lluvia, solo el comienzo de la acción." }
        ]
    },
    {
        question: "Tu amigo te ofrece comida, pero ya no quieres más. ¿Cómo dices 'No como más'?",
        hint: "Para indicar un cambio de intención (antes quizás querías comer, pero ahora no), añade '了' al final de la negación.",
        answers: [
            { text: "我不吃。(Wǒ bù chī.)", correct: false, rationale: "Esto es una afirmación general ('Yo no como'), pero no indica un cambio de decisión en el momento." },
            { text: "我不吃了。(Wǒ bù chī le.)", correct: true, rationale: "¡Correcto! Añadir '了' a una negación indica que has dejado de hacer algo o que has decidido no hacerlo más. Es un cambio de estado." },
            { text: "我没吃。(Wǒ méi chī.)", correct: false, rationale: "'没' se usa para negar acciones pasadas ('No comí')." },
            { text: "我不吃的。(Wǒ bù chī de.)", correct: false, rationale: "Esta estructura no es la correcta para expresar esta idea." }
        ]
    },
    {
        question: "Elige la traducción correcta para la exclamación '¡Qué bien!' o '¡Genial!'.",
        hint: "Recuerda la estructura fija '太...了' para expresar sorpresa o satisfacción.",
        answers: [
            { text: "太好。(Tài hǎo.)", correct: false, rationale: "Esta frase está incompleta. La estructura '太...' casi siempre va acompañada de '了'." },
            { text: "好吗？(Hǎo ma?)", correct: false, rationale: "Esta es una pregunta: '¿Está bien?'." },
            { text: "是好的。(Shì hǎo de.)", correct: false, rationale: "Esta estructura se usa para dar énfasis, pero no es una exclamación común como '¡Genial!'." },
            { text: "太好了！(Tài hǎo le!)", correct: true, rationale: "¡Perfecto! La estructura '太 + adjetivo + 了' se usa para expresar una exclamación sobre una nueva situación o descubrimiento." }
        ]
    },
    {
        question: "La frase '我不是学生了' (Wǒ bú shì xuéshēng le) significa:",
        hint: "'了' al final de una negación a menudo significa 'ya no'.",
        answers: [
            { text: "Nunca fui estudiante.", correct: false, rationale: "La partícula '了' indica un cambio, por lo que implica que antes sí eras estudiante." },
            { text: "Ya no soy estudiante.", correct: true, rationale: "¡Correcto! Implica un cambio de estado. Antes lo era, pero ahora mi situación ha cambiado y ya no lo soy." },
            { text: "No me gustan los estudiantes.", correct: false, rationale: "La frase habla de la identidad del hablante, no de sus preferencias." },
            { text: "¿No soy estudiante?", correct: false, rationale: "No es una pregunta." }
        ]
    },
    {
        question: "Completa la pregunta que le harías a un niño: 你几岁___？ (Nǐ jǐ suì ___?)",
        hint: "La pregunta sobre la edad se refiere al estado actual que ha cambiado desde el año pasado.",
        answers: [
            { text: "的 (de)", correct: false, rationale: "'的' es la partícula posesiva." },
            { text: "呢 (ne)", correct: false, rationale: "'呢' se usaría para devolver la pregunta, como en '我五岁，你呢？' (Tengo 5 años, ¿y tú?)." },
            { text: "了 (le)", correct: true, rationale: "¡Muy bien! Al preguntar la edad, se usa '了' para preguntar por el estado actual (la nueva edad que se ha alcanzado)." },
            { text: "吗 (ma)", correct: false, rationale: "No se puede usar '吗' en una pregunta que ya tiene otra palabra interrogativa como '几' (cuántos)." }
        ]
    },
    {
        question: "Tu amigo estaba enfermo, pero ahora se encuentra bien. ¿Qué frase usarías?",
        hint: "Para indicar la recuperación (un cambio de 'enfermo' a 'bien'), necesitas añadir '了'.",
        answers: [
            { text: "他好。(Tā hǎo.)", correct: false, rationale: "Esta es una afirmación general ('Él está bien'), pero no resalta el cambio de enfermo a sano." },
            { text: "他好了。(Tā hǎo le.)", correct: true, rationale: "¡Correcto! '好了' indica que ha habido un cambio. Antes estaba mal, ahora está bien. Es una nueva situación." },
            { text: "他好吗？(Tā hǎo ma?)", correct: false, rationale: "Esta es una pregunta: '¿Está él bien?'." },
            { text: "他好呢？(Tā hǎo ne?)", correct: false, rationale: "Esta estructura no es correcta para afirmar que alguien está bien." }
        ]
    },
    {
        question: "¿Qué frase indica que una situación es nueva? Por ejemplo, que ahora eres profesor, pero antes no lo eras.",
        hint: "La partícula '了' al final de la oración es la clave para mostrar un cambio de estado.",
        answers: [
            { text: "我是老师。(Wǒ shì lǎoshī.)", correct: false, rationale: "Esta es una declaración general de tu profesión, no necesariamente nueva." },
            { text: "我是不是老师？(Wǒ shì bú shì lǎoshī?)", correct: false, rationale: "Esta es una pregunta: '¿Soy profesor o no?'." },
            { text: "我是老师了。(Wǒ shì lǎoshī le.)", correct: true, rationale: "¡Exacto! El '了' al final indica que tu situación ha cambiado y ahora eres profesor." },
            { text: "我的老师。(Wǒ de lǎoshī.)", correct: false, rationale: "Esto significa 'mi profesor'." }
        ]
    },
    {
        question: "Completa la frase: 天气太冷___！(Tiānqì tài lěng ___!)",
        hint: "Esta exclamación utiliza la estructura fija '太... ___'.",
        answers: [
            { text: "的 (de)", correct: false, rationale: "'的' no encaja en la estructura '太...'." },
            { text: "吗 (ma)", correct: false, rationale: "'吗' convertiría la frase en una pregunta." },
            { text: "了 (le)", correct: true, rationale: "¡Correcto! '太 + adjetivo + 了' es una estructura muy común para exclamar sobre el estado actual de algo ('¡Hace demasiado frío!')." },
            { text: "呢 (ne)", correct: false, rationale: "'呢' no se usa en este tipo de exclamación." }
        ]
    },
    {
        question: "Ves a tu amigo comiendo. Después de un rato, te dice: '我不吃了。' (Wǒ bù chī le.). ¿Qué significa?",
        hint: "La combinación '不 ... 了' indica que una acción o estado que estaba en curso o era posible, ahora se detiene.",
        answers: [
            { text: "Que no ha comido nada.", correct: false, rationale: "Para decir que no comió, usaría '我没吃' (wǒ méi chī)." },
            { text: "Que ha decidido dejar de comer.", correct: true, rationale: "¡Muy bien! La frase indica un cambio de acción. Estaba comiendo, pero ahora ha decidido parar." },
            { text: "Que por lo general no come.", correct: false, rationale: "Para decir eso, usaría '我不吃' (wǒ bù chī) sin '了'." },
            { text: "Que quiere que tú comas.", correct: false, rationale: "La frase se refiere a su propia acción, no a la tuya." }
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