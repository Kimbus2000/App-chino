document.addEventListener('DOMContentLoaded', () => {

    // Define aquí las respuestas correctas para cada pregunta
    const correctAnswers = {
        q1: 'B',
        q2: 'A',
        q3: 'B',
        q4: 'B',
        q5: 'A',
        q6: 'A',
        q7: 'B',
        q8: 'A',
        q9: 'B',
        q10: 'A',
        q11: 'F',
        q12: 'A',
        q13: 'C',
        q14: 'E',
        q15: 'B',
        q16: 'B',
        q17: 'E',
        q18: 'C',
        q19: 'A',
        q20: 'D',
        q21: 'C',
        q22: 'B',
        q23: 'A',
        q24: 'C',
        q25: 'A',
        q26: 'A',
        q27: 'B',
        q28: 'B',
        q29: 'C',
        q30: 'C',
        q31: 'A',
        q32: 'A',
        q33: 'B',
        q34: 'B',
        q35: 'C'
    };

    const checkButton = document.getElementById('check-btn');
    const resultsDiv = document.getElementById('results');

    checkButton.addEventListener('click', () => {
        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;

        // Limpiar resultados y estilos anteriores
        resultsDiv.textContent = '';
        document.querySelectorAll('.question-block').forEach(block => {
            block.classList.remove('correct', 'incorrect');
        });

        // Iterar sobre cada pregunta para verificar la respuesta
        for (const questionName in correctAnswers) {
            const correctAnswer = correctAnswers[questionName];
            
            // Encontrar la opción seleccionada por el usuario
            const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
            
            const questionBlock = document.getElementById(questionName.replace('q', 'question'));

            if (selectedOption) {
                if (selectedOption.value === correctAnswer) {
                    score++;
                    questionBlock.classList.add('correct');
                } else {
                    questionBlock.classList.add('incorrect');
                }
            } else {
                // Si una pregunta no fue respondida, se marca como incorrecta
                questionBlock.classList.add('incorrect');
            }
        }

        // Mostrar el puntaje final
        resultsDiv.textContent = `Tu puntaje es: ${score} de ${totalQuestions}`;
        if (score === totalQuestions) {
            resultsDiv.style.color = '#2ecc71'; // Verde
        } else {
            resultsDiv.style.color = '#e74c3c'; // Rojo
        }
    });

});