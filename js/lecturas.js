
function toggleTexto() {
    const info = document.getElementById("infoTexto");
    if (info.style.display === "none") {
        info.style.display = "block";
    } else {
        info.style.display = "none";
    }
}

 /*Palabras significado cuando paso cursor del mouse*/
const tooltip = document.getElementById("tooltip");
let diccionario = {};

// Cargar el JSON
fetch("./data/diccionario.json")
    .then(res => res.json())
    .then(data => {
        diccionario = data.hsk1.reduce((acc, item) => {
            acc[item.hanzi] = {
                pinyin: item.pinyin,
                significado: item.significado
            };
            return acc;
        }, {});
    });


    
document.querySelectorAll(".hanzi").forEach(span => {
    span.addEventListener("mouseenter", e => {
        const texto = e.target.innerText;
        if (diccionario[texto]) {
            const { pinyin, significado } = diccionario[texto];
            tooltip.innerHTML = `<strong>${pinyin}</strong><br>${significado}`;
            tooltip.style.display = "block";
        }
    });

    span.addEventListener("mousemove", e => {
        tooltip.style.top = `${e.pageY + 10}px`;
        tooltip.style.left = `${e.pageX + 10}px`;
    });

    span.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});