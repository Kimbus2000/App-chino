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
        question: "Completa la oración: 我 ___ 说汉语。(Wǒ ___ shuō Hànyǔ.)",
        hint: "Necesitas el verbo modal que significa 'saber hacer' una habilidad aprendida.",
        answers: [
            { text: "是 (shì)", correct: false, rationale: "'是' significa 'ser'. No se usa para indicar una habilidad." },
            { text: "会 (huì)", correct: true, rationale: "¡Correcto! '会' se coloca antes del verbo '说' (hablar) para indicar que se tiene la habilidad de hablar chino." },
            { text: "有 (yǒu)", correct: false, rationale: "'有' significa 'tener'. No se usa para expresar una habilidad." },
            { text: "想 (xiǎng)", correct: false, rationale: "'想' significa 'querer'. '我想说汉语' significaría 'Quiero hablar chino', lo cual es diferente a 'Sé hablar chino'." }
        ]
    },
    {
        question: "Elige la traducción correcta para: 'No sé hacer comida china'.",
        hint: "La forma negativa de '会' es '不会', y esta va directamente antes del verbo de la acción.",
        answers: [
            { text: "我做不会中国菜。(Wǒ zuò bú huì Zhōngguó cài.)", correct: false, rationale: "El orden es incorrecto. La negación '不会' debe ir antes del verbo '做' (hacer)." },
            { text: "我不会做中国菜。(Wǒ bú huì zuò Zhōngguó cài.)", correct: true, rationale: "¡Perfecto! Esta es la estructura correcta: Sujeto + 不会 + Verbo + Objeto." },
            { text: "我会不做中国菜。(Wǒ huì bú zuò Zhōngguó cài.)", correct: false, rationale: "La negación '不' debe ir junto a '会', formando '不会'." },
            { text: "我不做会中国菜。(Wǒ bú zuò huì Zhōngguó cài.)", correct: false, rationale: "El orden de la negación y el verbo modal es incorrecto." }
        ]
    },
    {
        question: "¿Cómo se forma la pregunta de la oración '他会写汉字。(Tā huì xiě Hànzì.)'?",
        hint: "Para convertir una afirmación con '会' en una pregunta de sí/no, solo tienes que añadir una partícula al final.",
        answers: [
            { text: "他会写汉字呢？(Tā huì xiě Hànzì ne?)", correct: false, rationale: "'呢' se usa para preguntas de seguimiento, no para este tipo de pregunta de sí/no." },
            { text: "谁会写汉字？(Shéi huì xiě Hànzì?)", correct: false, rationale: "Esta es una pregunta diferente: '¿Quién sabe escribir caracteres chinos?'." },
            { text: "他会写汉字吗？(Tā huì xiě Hànzì ma?)", correct: true, rationale: "¡Correcto! Simplemente se añade la partícula '吗' (ma) al final de la oración afirmativa." },
            { text: "他会吗写汉字？(Tā huì ma xiě Hànzì?)", correct: false, rationale: "La partícula '吗' (ma) siempre va al final de la oración." }
        ]
    },
    {
        question: "Completa el diálogo: A: 你会读这个汉字吗？(Nǐ huì dú zhège Hànzì ma?) B: (Respuesta negativa) ___，我不会。",
        hint: "La respuesta es '..., no sé'. ¿Qué palabra educada se usaría para empezar una negación como esta?",
        answers: [
            { text: "是 (shì)", correct: false, rationale: "'是' significa 'sí', lo cual contradice la segunda parte de la respuesta." },
            { text: "对不起 (duìbuqǐ)", correct: true, rationale: "¡Correcto! '对不起' (Lo siento / Perdón) es una forma educada de empezar una respuesta negativa a una pregunta sobre una habilidad." },
            { text: "谢谢 (xièxie)", correct: false, rationale: "'谢谢' significa 'gracias' y no encaja en este contexto." },
            { text: "没关系 (méi guānxi)", correct: false, rationale: "'没关系' significa 'de nada' o 'no importa', y se usa como respuesta a una disculpa." }
        ]
    },
    {
        question: "La palabra '会' (huì) se usa para expresar...",
        hint: "Piensa en la diferencia entre 'poder' levantar algo pesado y 'saber' hablar un idioma.",
        answers: [
            { text: "Posesión de un objeto.", correct: false, rationale: "Para la posesión se usa '有' (yǒu) o la partícula '的' (de)." },
            { text: "Una habilidad adquirida a través del aprendizaje.", correct: true, rationale: "¡Exacto! Este es el propósito principal de '会', como saber un idioma, cocinar, etc." },
            { text: "Un deseo o un plan.", correct: false, rationale: "Para expresar un deseo o un plan se usa '想' (xiǎng) o '要' (yào)." },
            { text: "Permiso para hacer algo.", correct: false, rationale: "Para pedir o dar permiso se suele usar '可以' (kěyǐ)." }
        ]
    },
    {
        question: "Elige la oración que está gramaticalmente correcta.",
        hint: "Recuerda que la negación '不会' actúa como un bloque que va justo antes del verbo de la acción.",
        answers: [
            { text: "我会不说汉语。(Wǒ huì bù shuō Hànyǔ.)", correct: false, rationale: "La negación es incorrecta. '不' debe ir antes de '会'." },
            { text: "我说汉语不会。(Wǒ shuō Hànyǔ bú huì.)", correct: false, rationale: "La estructura verbal '不会说' no puede separarse de esta manera." },
            { text: "我不会说汉语。(Wǒ bú huì shuō Hànyǔ.)", correct: true, rationale: "¡Correcto! La estructura Sujeto + 不会 + Verbo es la correcta." },
            { text: "不我说会汉语。(Bù wǒ shuō huì Hànyǔ.)", correct: false, rationale: "La negación debe ir después del sujeto y antes de '会'." }
        ]
    },
    {
        question: "¿Cuál es la pregunta correcta para la respuesta '会，我妈妈会做饭。(Huì, wǒ māma huì zuòfàn.)'?",
        hint: "La respuesta empieza con '会' (sí, sé/sabe), por lo que la pregunta debe ser sobre una habilidad y usar la estructura con '吗'.",
        answers: [
            { text: "你妈妈是谁？(Nǐ māma shì shéi?)", correct: false, rationale: "Esta pregunta ('¿Quién es tu mamá?') no se responde con 'Sí, sabe cocinar'." },
            { text: "你妈妈做饭了？(Nǐ māma zuòfàn le?)", correct: false, rationale: "Esta pregunta ('¿Tu mamá ha cocinado?') pregunta por una acción completada, no por la habilidad." },
            { text: "你妈妈会做饭吗？(Nǐ māma huì zuòfàn ma?)", correct: true, rationale: "¡Perfecto! Esta pregunta ('¿Tu mamá sabe cocinar?') es la que se responde con 'Sí, mi mamá sabe cocinar'." },
            { text: "你妈妈喜欢做饭吗？(Nǐ māma xǐhuān zuòfàn ma?)", correct: false, rationale: "Esta pregunta ('¿A tu mamá le gusta cocinar?') es diferente a preguntar si 'sabe' cocinar." }
        ]
    },
    {
        question: "Ordena las palabras para formar una oración correcta: 他 / 名字 / 写 / 不会 / 的 / 他",
        hint: "Empieza con el sujeto (quién realiza la acción), seguido de la habilidad negada (不会), el verbo y finalmente el objeto.",
        answers: [
            { text: "他不会的写他名字。(Tā bú huì de xiě tā míngzi.)", correct: false, rationale: "El orden es incorrecto, '的' no debe ir ahí." },
            { text: "他不会写他的名字。(Tā bú huì xiě tā de míngzi.)", correct: true, rationale: "¡Correcto! Esta oración sigue el orden lógico: Sujeto + 不会 + Verbo + Objeto." },
            { text: "他的名字不会写他。(Tā de míngzi bú huì xiě tā.)", correct: false, rationale: "Esto significaría 'Su nombre no sabe escribirlo a él', lo cual no tiene sentido." },
            { text: "写不会他的名字他。(Xiě bú huì tā de míngzi tā.)", correct: false, rationale: "El sujeto '他' (él) debe ir al principio." }
        ]
    },
    {
        question: "Completa: 我朋友 ___ 读汉字，但是他 ___ 说汉语。",
        hint: "La palabra '但是' (dànshì - pero) indica un contraste entre la primera y la segunda parte de la oración.",
        answers: [
            { text: "会...不会 (huì...bú huì)", correct: true, rationale: "¡Muy bien! Esta opción crea una oración lógica: 'Mi amigo sabe leer caracteres, pero no sabe hablar chino'." },
            { text: "不会...不会 (bú huì...bú huì)", correct: false, rationale: "Esta opción diría que no sabe hacer ninguna de las dos cosas." },
            { text: "会...会 (huì...huì)", correct: false, rationale: "'Pero' (但是) indica un contraste, por lo que no es lógico que sepa hacer ambas cosas." },
            { text: "不会...会 (bú huì...huì)", correct: false, rationale: "Esto significaría 'No sabe leer, pero sabe hablar', que es una posibilidad, pero la opción A es un escenario muy común para estudiantes de chino." }
        ]
    },
    {
        question: "Tu amigo te pregunta: '你会写这个吗？' (¿Sabes escribir esto?). Si sí sabes, ¿cuál es la respuesta corta y afirmativa más común?",
        hint: "A menudo, la respuesta más simple a una pregunta es repetir el verbo (modal) que se usó en ella.",
        answers: [
            { text: "是 (shì)", correct: false, rationale: "Aunque significa 'sí', cuando la pregunta usa un verbo como '会', es más natural responder con el mismo verbo." },
            { text: "会 (huì)", correct: true, rationale: "¡Correcto! Es muy común responder a una pregunta con '会...吗？' simplemente con '会' (sé) o '不会' (no sé)." },
            { text: "好 (hǎo)", correct: false, rationale: "'好' significa 'bien' u 'ok', y no responde directamente a la pregunta sobre tu habilidad." },
            { text: "写 (xiě)", correct: false, rationale: "Simplemente decir 'escribir' es una respuesta incompleta." }
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