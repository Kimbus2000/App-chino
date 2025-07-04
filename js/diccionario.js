const { createApp } = Vue;

createApp({
  data() {
    return {
      allWords: [],
      filteredWords: [],
      searchQuery: '',
      currentHSK: 'all',
      loading: true
    };
  },
  methods: {
    normalizeText(text) {
      return text
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, "")
        .toLowerCase();
    },
    setHSKLevel(level) {
      this.currentHSK = level;
      this.filterWords();
    },
    filterWords() {
      let results = this.allWords;
      
      if (this.currentHSK !== 'all') {
        results = results.filter(word => word.hsk === this.currentHSK);
      }
      
      if (this.searchQuery) {
        const query = this.normalizeText(this.searchQuery);
        results = results.filter(word => 
          this.normalizeText(word.hanzi).includes(query) ||
          this.normalizeText(word.pinyin).includes(query) ||
          this.normalizeText(word.significado).includes(query)
        );
      }
      
      this.filteredWords = results;
    }
  },
  async created() {
    try {
      const response = await fetch('./data/diccionario.json');
      const data = await response.json();
      
      // Solo procesa los niveles que existen
      this.allWords = [];
      
      if (data.hsk1) {
        this.allWords = this.allWords.concat(data.hsk1.map(word => ({ ...word, hsk: 'hsk1' })));
      }
      
      if (data.hsk2) {
        this.allWords = this.allWords.concat(data.hsk2.map(word => ({ ...word, hsk: 'hsk2' })));
      }
      
      this.filteredWords = this.allWords;
    } catch (error) {
      console.error("Error cargando datos:", error);
    } finally {
      this.loading = false;
    }
  }
}).mount('#app');

