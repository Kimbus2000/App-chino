const { createApp } = Vue;

createApp({
    data() {
        return {
            allWords: [],
            deck: [],
            currentCard: null,
            isFlipped: false,
            currentHSK: 'hsk1',
            loading: true,
            stats: {
                correct: 0,
                wrong: 0
            },
            reviewQueue: [],
            isBusy: false,
            audio: null
        };
    },
    methods: {
        loadDeck() {
            let deck = this.allWords;

            if (this.currentHSK !== 'all') {
                deck = deck.filter(word => word.hsk === this.currentHSK);
            }

            this.deck = this.shuffle([...deck]);
            this.currentCard = this.deck.pop();
            this.isFlipped = false;
        },


        shuffleDeck() {

            this.loadDeck();
            this.stats = { correct: 0, wrong: 0 };
            this.reviewQueue = [];
        },

        shuffle(array) {
            const newArray = [...array];
            for (let i = newArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
            }
            return newArray;
        },
        flipCard() {
            this.isFlipped = !this.isFlipped;
        },
        handleResponse(correct) {
            if (this.isBusy) return;
            this.isBusy = true; 

            if (correct) {
                this.stats.correct++;
                setTimeout(() => this.reviewQueue.push(this.currentCard), 10 * 60 * 1000);
            } else {
                this.stats.wrong++;
                setTimeout(() => this.reviewQueue.push(this.currentCard), 60 * 1000);
            }

            this.nextCard();
        },
        nextCard() {
            if (this.reviewQueue.length > 0) {
                this.currentCard = this.reviewQueue.shift();
            }
            else if (this.deck.length > 0) {
                this.currentCard = this.deck.pop();
            }
            else {
                this.currentCard = null;
            }
            this.isFlipped = false;
            
            // Habilitamos la interacción para la nueva tarjeta después de una breve transición
            setTimeout(() => {
                this.isBusy = false;
            }, 500);
        },
        resetDeck() {
            this.loadDeck();
            this.stats = { correct: 0, wrong: 0 };
            this.reviewQueue = [];
        },
        playAudio() {
            console.log('Intentando reproducir audio para:', this.currentCard.hanzi);
            let audioFile = this.currentCard.audio;

            if (audioFile && !audioFile.match(/\.(mp3|wav|ogg)$/)) {
                audioFile += '.mp3';
            }

            const audioPath = `${audioFile}`;
            console.log('Ruta del audio:', audioPath);

            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }

            if (audioFile) {
                this.audio = new Audio(audioPath);
                this.audio.play().catch(error => {
                    console.error("Error al reproducir audio:", error);
                });
            } else {
                this.useTextToSpeech();
            }
        },
        useTextToSpeech() {
            if ('speechSynthesis' in window && this.currentCard?.hanzi) {
                const utterance = new SpeechSynthesisUtterance(this.currentCard.hanzi);
                utterance.lang = 'zh-CN';
                speechSynthesis.speak(utterance);
            }
        }
    },

    
    watch: {
        
        currentCard(newCard) {
           
            if (newCard) {
                
                this.$nextTick(() => {
                    // 3. Llamamos a la función para reproducir el audio.
                    this.playAudio();
                });
            }
        }
    },
   

    async created() {
        try {
            const response = await fetch('./data/diccionario.json');
            const data = await response.json();
            this.allWords = [];
            for (let level in data) {
                if (data[level]) {
                    this.allWords = this.allWords.concat(
                        data[level].map(word => ({ ...word, hsk: level }))
                    );
                }
            }
            this.loadDeck();
        } catch (error) {
            console.error("Error cargando datos:", error);
        } finally {
            this.loading = false;
        }
        setInterval(() => {
            if (this.currentCard === null && this.reviewQueue.length > 0) {
                this.nextCard();
            }
        }, 60 * 1000);
    }
}).mount('#app');