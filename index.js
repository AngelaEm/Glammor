
// Array med produkter
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

// Visa produkter
visaProdukter();

// Funtion för att visa alla produkter som ett kort med namn, beskrivning, pris och en knapp för att lägga till
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
                        <a href="javascript:void(0);" onclick="laggTillIKundvagn('${produkt.namn}')" class="btn btn-light">Lägg till</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += kort;
    });
}

// Funktion för att uppdatera kundkorgen
function uppdateraKundkorg() {
    const kundkorgLista = document.getElementById('kundkorgLista');
    kundkorgLista.innerHTML = '';

    kundvagn.forEach(produkt => {
        const li = document.createElement('li');
        li.innerText = `${produkt.namn} - ${produkt.pris} kr`; 
        li.className = 'list-group-item';
        kundkorgLista.appendChild(li);
    });

    localStorage.setItem('kundvagn', JSON.stringify(kundvagn));
}

let kundvagn = [];

// Funktion för att lägga till i kundkorgen
function laggTillIKundvagn(produktNamn) {
    const produktIndex = kundvagn.findIndex(item => item.produkt.namn === produktNamn);
    if (produktIndex > -1) {
        kundvagn[produktIndex].antal +=1;
    }
    else{
        const produkt = produkter.find(p => p.namn === produktNamn);
        if(produkt){
            kundvagn.push({produkt, antal: 1});
        }  
        uppdateraKundkorg(); 
    }

}

// Funktion för att visa kundkorgen
function visaKundkorg() {
    const container = document.getElementById('kundkorgLista');
    container.innerHTML = '';
    let totalSumma = 0;
    
    kundvagn.forEach(item => {
        const totalPris = item.produkt.pris * item.antal;
        totalSumma += totalPris;
        const vara = `
            <div class="row mb-2 align-items-center">   
                <div class="col-2">
                    <img src="${item.produkt.bild}" alt="${item.produkt.namn}" class="img-fluid">
                </div>
                <div class="col-3">
                    <span>${item.produkt.namn}</span>
                </div>
                <div class="col-2">
                    <input type="number" class="form-control" value="${item.antal}" min="1" onchange="andraAntal('${item.produkt.namn}', this.value)">
                </div>
                <div class="col-3">
                    <span>Pris: ${item.produkt.pris} kr/st</span>
                </div>
                <div class="col-2">
                    <button class="btn btn-danger" onclick="taBortUrKundvagn('${item.produkt.namn}')">Ta bort</button>
                </div>
            </div>
        `;
        container.innerHTML += vara;
    });

    container.innerHTML += `<p>Totalsumma: ${totalSumma} kr</p>`;
}

// Funktion för när man ändrar antal i kundkorgen
function andraAntal(produktNamn, nyttAntal) {
    const produktIndex = kundvagn.findIndex(item => item.produkt.namn === produktNamn);
    if (produktIndex > -1) {
        kundvagn[produktIndex].antal = parseInt(nyttAntal);
        uppdateraKundkorg();
        visaKundkorg();
    }
}

// Funktion för när man tar bort ur kundkorgen
function taBortUrKundvagn(produktNamn) {
    const produktIndex = kundvagn.findIndex(item => item.produkt.namn === produktNamn);
    if (produktIndex > -1) {
        kundvagn.splice(produktIndex, 1);
        uppdateraKundkorg();
        visaKundkorg();
    }
}


// Visa kundkorgen från två olika knappar
document.getElementById('visaKundkorgKnapp').addEventListener('click', visaKundkorg);
document.getElementById('visaKundkorgKnapp2').addEventListener('click', visaKundkorg);


// Funktion som tömmer kundkorgen
function clearKundkorg(){
    kundvagn=[];
    uppdateraKundkorg();
}

// Funtion som visar att man köpt och sedan tömmer kundkorgen
function buy(){
    alert("Köp genomfört!")
    kundvagn=[];
    uppdateraKundkorg();
}

// Hämtar lokalt sparad kundkorg om sidan laddats om
document.addEventListener('DOMContentLoaded', (event) => {
    if (localStorage.getItem('kundvagn')) {
        kundvagn = JSON.parse(localStorage.getItem('kundvagn'));
        uppdateraKundkorg();
    }
});


