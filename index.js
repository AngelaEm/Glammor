const produkter = [
    { namn: "Avokado", pris: 50, beskrivning: "Fina hängen som passar i alla lägen.", bild: "Images/avokado.png" },
    { namn: "Snöflingor", pris: 50, beskrivning: "Snygga snöflingor i vitt och guld.", bild: "Images/snoflinga.png" },
    { namn: "Spöken", pris: 50, beskrivning: "Söta spöken som finns i svart och vitt.", bild: "Images/spoken.png" },
    { namn: "Godisbjörnar", pris: 50, beskrivning: "Godisbjörnar som finns i många färger!", bild: "Images/rosabjornar.png" },
    { namn: "Tomtar", pris: 50, beskrivning: "Såklart man vill ha tomtar i öronen till jul.", bild: "Images/tomtar.png" },
    { namn: "Planeter", pris: 50, beskrivning: "Svarta planeter som passar till det mesta.", bild: "Images/planeter.png" },
    { namn: "Blixtar", pris: 50, beskrivning: "Coola blixtformade örhängen. Finns i olika färger.", bild: "Images/blixtar.png" },
    { namn: "Hundtassar", pris: 50, beskrivning: "Söta hundtassar till hundälskaren.", bild: "Images/tassar.png" },
];

visaProdukter();

function visaProdukter() {
    const container = document.getElementById('produkterContainer');
    container.innerHTML = '';
    
    produkter.forEach(produkt => {
        const kort = `
            <div class="col-sm-6 col-md-4 col-lg-3">
                <div class="card">
                    <img src="${produkt.bild}" class="card-img-top" alt="${produkt.namn}">
                    <div class="card-body">
                        <h5 class="card-title">${produkt.namn}</h5>
                        <p class="card-text">${produkt.beskrivning}</p>
                        <a href="#" onclick="laggTillIKundvagn('${produkt.namn}')" class="btn btn-light">Lägg till</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += kort;
    });
}

function uppdateraKundkorg() {
    const kundkorgLista = document.getElementById('kundkorgLista');
    kundkorgLista.innerHTML = '';

    kundvagn.forEach(produkt => {
        const li = document.createElement('li');
        li.innerText = `${produkt.namn} - ${produkt.pris} kr`; 
        li.className = 'list-group-item';
        kundkorgLista.appendChild(li);
    });
}


let kundvagn = [];

function laggTillIKundvagn(produktNamn) {
    const produkt = produkter.find(p => p.namn === produktNamn);
    if (produkt) {
        kundvagn.push(produkt);
        uppdateraKundkorg(); 
    }
}


function visaKundkorg() {
    const container = document.getElementById('kundkorglista');
    container.innerHTML = '';
    
    kundvagn.forEach(produkt => {
        const vara = `
            <div>
                <p>Namn: ${produkt.namn}</p>
                <p>Antal: 1</p>
                <p>Pris: ${produkt.pris} kr</p>
            </div>
        `;
        container.innerHTML += vara;
    });
}

document.getElementById('visaKundkorgKnapp').addEventListener('click', visaKundkorg);



