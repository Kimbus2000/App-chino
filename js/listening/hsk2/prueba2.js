document.addEventListener('DOMContentLoaded', () => {

    // Define aquí las respuestas correctas para cada pregunta
    const correctAnswers = {
        q1: 'B',
        q2: 'A',
        q3: 'B',
        q4: 'A',
        q5: 'A',
        q6: 'A',
        q7: 'B',
        q8: 'B',
        q9: 'A',
        q10: 'B',
        q11: 'C',
        q12: 'B',
        q13: 'F',
        q14: 'A',
        q15: 'E',
        q16: 'E',
        q17: 'D',
        q18: 'B',
        q19: 'C',
        q20: 'A',
        q21: 'C',
        q22: 'A',
        q23: 'B',
        q24: 'B',
        q25: 'B',
        q26: 'A',
        q27: 'A',
        q28: 'B',
        q29: 'B',
        q30: 'C',
        q31: 'A',
        q32: 'C',
        q33: 'C',
        q34: 'C',
        q35: 'A'
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