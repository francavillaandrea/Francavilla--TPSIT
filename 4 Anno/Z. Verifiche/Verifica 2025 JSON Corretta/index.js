let peopleData = [];
let currentNation = 'tutti';
const RECORDS_PER_PAGE = 5;

// 1. Carica i dati da localStorage o dalla variabile data
loadData();

// 2. Popola il ListBox delle nazionalità
populateNationsList();

// 3. Carica la nazionalità salvata
loadSavedNation();

// 4. Visualizza i primi 5 record
displayTable();

// 5. Gestisce il cambio di selezione nel ListBox
lstNations.addEventListener('change', onNationChange);

// 6. Nascondi il detailsWrapper all'avvio
detailsWrapper.style.display = 'none';

// Carica i dati da localStorage o dalla variabile data
function loadData() {
    const savedData = localStorage.getItem('peopleDatabase');
    if (savedData) {
        peopleData = JSON.parse(savedData);
    } else {
        const jsonData = JSON.parse(data);
        peopleData = jsonData.results;
        // Salva in localStorage
        localStorage.setItem('peopleDatabase', JSON.stringify(peopleData));
    }
}

function populateNationsList() {
    //Crea un vettore e lo carica con person.nat e tramite il Set rimuove i duplicati, lo ordina e con 
    // lo spread operator (i 3 puntini all'inizio) diventa un array poi fa un foreach e carica il listbox.
    //La freccia => (Arrow Function [Operatore Lamda]) serve sostanzialmente a non fare un metodo sia nel foreach
    //sia nel person.map()
    //La versione senza arrow function sarebbe
    /*
    const nations = [...new Set(peopleData.map(function(person) {
        return person.nat;
    }))].sort();

    nations.forEach(function(nat) {
        const option = document.createElement('option');
        option.value = nat;
        option.textContent = nat;
        lstNations.appendChild(option);
    });
    */
    const nations = [...new Set(peopleData.map(person => person.nat))].sort();

    nations.forEach(nat => {
        const option = document.createElement('option');
        option.value = nat;
        option.textContent = nat;
        lstNations.appendChild(option);
    });
}

function loadSavedNation() {
    const savedNation = localStorage.getItem('selectedNation');
    if (savedNation) {
        currentNation = savedNation;
        lstNations.value = savedNation;
    }
}

function onNationChange(event) {
    currentNation = event.target.value;

    localStorage.setItem('selectedNation', currentNation);

    displayTable();

    detailsWrapper.style.display = 'none';
}

function displayTable() {
    const tbody = document.querySelector('table tbody');
    tbody.innerHTML = '';

    let filteredData = currentNation == 'tutti'
        ? peopleData
        : peopleData.filter(person => person.nat == currentNation);

    const displayData = filteredData.slice(0, RECORDS_PER_PAGE);

    displayData.forEach((person, index) => {
        const tr = document.createElement('tr');

        // Colonna name
        const tdName = document.createElement('td');
        tdName.textContent = `${person.name.first} ${person.name.last}`;
        tr.appendChild(tdName);

        // Colonna username
        const tdUsername = document.createElement('td');
        tdUsername.textContent = person.login.username;
        tr.appendChild(tdUsername);

        // Colonna state
        const tdState = document.createElement('td');
        tdState.textContent = person.location.state;
        tr.appendChild(tdState);

        // Colonna nat
        const tdNat = document.createElement('td');
        tdNat.textContent = person.nat;
        tr.appendChild(tdNat);

        // Colonna img
        const tdImg = document.createElement('td');
        const img = document.createElement('img');
        img.src = person.picture.large;
        img.width = 50;
        img.height = 50;
        tdImg.appendChild(img);
        tr.appendChild(tdImg);

        tr.addEventListener('click', () => showDetails(person));

        tbody.appendChild(tr);
    });

    if (currentNation == 'tutti') {
        buttonsWrapper.style.display = 'block';
    } else {
        buttonsWrapper.style.display = 'none';
    }
}

function showDetails(person) {
    detailsWrapper.innerHTML = '';
    detailsWrapper.style.display = 'block';

    let img = document.createElement("img");
    img.src = person.picture.large;
    detailsWrapper.appendChild(img);

    let br = document.createElement("br");
    detailsWrapper.appendChild(br);

    let p = document.createElement("p");
    p.textContent = `${person.name.first} ${person.name.last}`;
    detailsWrapper.appendChild(p);

    p = document.createElement("p");
    p.textContent = person.email;
    detailsWrapper.appendChild(p);

    p = document.createElement("p");
    p.textContent = "phone: ";
    let inputPhone = document.createElement("input");
    inputPhone.id = "editPhone";
    inputPhone.value = person.phone;
    p.appendChild(inputPhone);
    detailsWrapper.appendChild(p);

    p = document.createElement("p");
    p.textContent = "cell: ";
    let inputCell = document.createElement("input");
    inputCell.id = "editCell";
    inputCell.value = person.cell;
    p.appendChild(inputCell);
    detailsWrapper.appendChild(p);

    let btnSave = document.createElement("button");
    btnSave.textContent = "Salva";
    btnSave.id = "btnSave";
    btnSave.addEventListener('click', () => savePerson(person));
    detailsWrapper.appendChild(btnSave);

    let btnDelete = document.createElement("button");
    btnDelete.textContent = "Elimina";
    btnDelete.id = "btnDelete";
    btnDelete.addEventListener('click', () => deletePerson(person));
    detailsWrapper.appendChild(btnDelete);
}

function savePerson(person) {
    const newPhone = document.getElementById('editPhone').value;
    const newCell = document.getElementById('editCell').value;

    const index = peopleData.findIndex(p => p.login.username == person.login.username);
    if (index != -1) {
        peopleData[index].phone = newPhone;
        peopleData[index].cell = newCell;

        localStorage.setItem('peopleDatabase', JSON.stringify(peopleData));

        alert('Dati salvati correttamente');

        displayTable();
    }
}

function deletePerson(person) {
    const index = peopleData.findIndex(p => p.login.username == person.login.username);

    if (index != -1) {
        const personNat = peopleData[index].nat;

        peopleData.splice(index, 1);

        localStorage.setItem('peopleDatabase', JSON.stringify(peopleData));

        alert('Persona eliminata correttamente');

        const remainingWithSameNat = peopleData.filter(p => p.nat == personNat).length;

        if (remainingWithSameNat == 0 && currentNation != 'tutti') {
            const optionToRemove = lstNations.querySelector(`option[value="${personNat}"]`);
            if (optionToRemove) {
                optionToRemove.remove();
            }

            currentNation = 'tutti';
            lstNations.value = 'tutti';
            localStorage.setItem('selectedNation', 'tutti');
        }

        displayTable();

        detailsWrapper.style.display = 'none';
    }
}