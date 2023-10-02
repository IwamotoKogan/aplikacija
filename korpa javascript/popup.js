// Na vrhu skripte na stranici pregled_kuhinja.html
function calculateRecommendedFrontDimensions(height, width, depth) {
    const recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
    const recommendedWidth = width - 0.4; // Smanjite širinu za 4mm
    return { recommendedHeight, recommendedWidth };
}
const kuhinjaDetailsDiv1 = document.getElementById('kuhinja-details');
const savedItems = JSON.parse(localStorage.getItem('items')) || [];
const kuhinjaData = JSON.parse(localStorage.getItem('kuhinjaData')); // Dodajte ovu liniju

if (savedItems.length > 0) {
    kuhinjaDetailsDiv1.innerHTML = '<h2>Moja korpa</h2>';
    savedItems.forEach((item, index) => {
        const itemDetails = document.createElement('div');
        itemDetails.className = 'item-details';

        // Izračunajte preporučene dimenzije fronta na osnovu unetih dimenzija
        const recommendedFrontDimensions = calculateRecommendedFrontDimensions(item.height, item.width, item.depth);

        itemDetails.innerHTML = `
            <p>Kreirali ste element: ${item.height}cm x ${item.width}cm x ${item.depth}cm, cena vašeg elementa je ${item.price} evra.</p>
            <p>Front: Preporučene dimenzije visina ${recommendedFrontDimensions.recommendedHeight}cm i širina ${recommendedFrontDimensions.recommendedWidth}cm.</p>
            <p>Dezen koji ste izabrali: ${item.dezen}</p>
            <button class="order-button" data-index="${index}">Naruči</button>
            <button class="delete-button" data-index="${index}">Izbriši</button>
        `;
        kuhinjaDetailsDiv1.appendChild(itemDetails);

        /* Dodato */
        // Dodajte preporučene dimenzije u lokalno skladište za svaki element
        savedItems[index].recommendedFrontDimensions = recommendedFrontDimensions;
        localStorage.setItem('items', JSON.stringify(savedItems));
        /* Dodato */
    });
} else {
    kuhinjaDetailsDiv1.innerHTML = "<p>Nemate nijedan element u korpi.</p>";
}

// Dodatni kod za prikaz ukupne cene
const totalPriceDiv = document.createElement('div');
totalPriceDiv.id = 'total-price';
totalPriceDiv.textContent = 'Ukupna cena: 0 evra';
kuhinjaDetailsDiv1.appendChild(totalPriceDiv);

// Funkcija za ažuriranje ukupne cene
function updateTotalPrice() {
    const totalAmount = savedItems.reduce((total, item) => total + item.price, 0);
    totalPriceDiv.textContent = `Ukupna cena: ${totalAmount} evra`;
}

// Dodajte događaj za naručivanje svih elemenata odjednom
const orderAllButton = document.createElement('button');
orderAllButton.id = 'order-all-button';
orderAllButton.textContent = 'Naruči sve elemente';
orderAllButton.addEventListener('click', function () {
    // Ovde možete poslati podatke o svim elementima (sadržaj "savedItems") na server
    // i obraditi narudžbu za sve elemente odjednom
    // Nakon što je narudžba uspešno poslata, možete izbrisati sve elemente iz korpe
    savedItems.splice(0, savedItems.length);
    localStorage.setItem('items', JSON.stringify(savedItems));
    kuhinjaDetailsDiv1.innerHTML = "<p>Nemate nijedan element u korpi.</p>";
    updateTotalPrice(); // Ažurirajte prikaz ukupne cene
});

kuhinjaDetailsDiv1.appendChild(orderAllButton);

// ... Ostatak vašeg koda ...

const orderButtons = document.querySelectorAll('.order-button');
orderButtons.forEach(button => {
    button.addEventListener('click', function () {
        const itemIndex = parseInt(button.getAttribute('data-index'));
        const selectedItem = savedItems[itemIndex];

        // Prikazujemo popup
        showPopup();

        // Ažuriramo vrednosti u popup prozoru na osnovu izabranog elementa
        const popupContent = document.getElementById('popup-content');
        popupContent.innerHTML = `
            <span id="zatvori">&times;</span>
            <p>Unesite vaše podatke i potvrdite narudžbinu:</p>
            <p>Dimenzije elementa: ${selectedItem.height} x ${selectedItem.width} x ${selectedItem.depth}</p>
            <p>Cena elementa: ${selectedItem.price} evra</p>
            <p>Preporučene dimenzije fronta: visina ${selectedItem.recommendedFrontDimensions.recommendedHeight}cm i širina ${selectedItem.recommendedFrontDimensions.recommendedWidth}cm</p>
            <form action="https://formsubmit.co/filip.jovetic753@gmail.com" method="POST">
                <input type="hidden" name="height" value="${selectedItem.height}">
                <input type="hidden" name="width" value="${selectedItem.width}">
                <input type="hidden" name="depth" value="${selectedItem.depth}">
                <input type="hidden" name="price" value="${selectedItem.price}">
                <input type="hidden" name="recommendedHeight" value="${selectedItem.recommendedFrontDimensions.recommendedHeight}">
                <input type="hidden" name="recommendedWidth" value="${selectedItem.recommendedFrontDimensions.recommendedWidth}">
                <input type="hidden" name="_next" value="https://iwamotokogan.github.io/DIPO/thanks.html">
                <input type="text" name="ime" placeholder="Ime" required>
                <input type="text" name="prezime" placeholder="Prezime" required>
                <input type="email" name="email" placeholder="Email Adresa" required>
                <input type="tel" name="telefon" placeholder="Broj Telefona" required>
                <button type="submit">Naruči</button>
            </form>
        `;
    });
});



// JavaScript kod za prikazivanje/sakrivanje popup prozora
//const orderButton = document.getElementById('order-button');
const popup = document.getElementById('popup');
const confirmOrderButton = document.getElementById('confirm-order-button');

// Funkcija za prikazivanje popup prozora
function showPopup() {
    popup.style.display = 'block';
}

// Funkcija za sakrivanje popup prozora
function hidePopup() {
    popup.style.display = 'none';
}

// Postavljanje događaja "click" na dugme "Naruči" za prikazivanje popup prozora

//orderButton.addEventListener('click', showPopup);

// Postavljanje događaja "click" na dugme "Naruči" unutar popup prozora za sakrivanje popup prozora
confirmOrderButton.addEventListener('click', function () {
    hidePopup();
    sendOrderEmail();
});
// Postavljanje događaja "click" na X dugme za zatvaranje popup prozora
const closeButton = document.getElementById('close-popup');
closeButton.addEventListener('click', closePopup);
// Funkcija za zatvaranje popup prozora
function closePopup() {
    popup.style.display = 'none';
}







/**delete button************* */

// Prikazivanje modalnog prozora
function showDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex';
}

// Sakrivanje modalnog prozora
function hideDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'none';
}

// Dohvatimo sva dugmad "Izbriši"
const deleteButtons = document.querySelectorAll('.delete-button');
deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Prikazujemo modalni prozor kada korisnik klikne "Izbriši"
        
        showDeleteModal();

        // Obrada klika na dugme "Da"
        const deleteYesButton = document.getElementById('deleteYes');
        deleteYesButton.addEventListener('click', function () {
            // Ovde treba da dodate logiku za brisanje elementa
           hideDeleteModal();
            location.reload();
            // Implementirajte brisanje elementa iz liste (savedItems)
            const itemIndex = parseInt(button.getAttribute('data-index'));
            if (!isNaN(itemIndex) && itemIndex >= 0 && itemIndex < savedItems.length) {
        savedItems.splice(itemIndex, 1); // Uklonite element iz niza
        localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište
    }
            // Sakrijte modalni prozor nakon brisanja
              
        });

        // Obrada klika na dugme "Ne"
        const deleteNoButton = document.getElementById('deleteNo');
        deleteNoButton.addEventListener('click', function () {
            // Samo sakrijemo modalni prozor
            hideDeleteModal();
        });
    });
});

// Dohvatanje "X" simbola i dodavanje događaja za zatvaranje modalnog prozora
const closeModalButton = document.querySelector('.close-modal');
closeModalButton.addEventListener('click', hideDeleteModal);

/**delete button************* */



















/*DODATO BRISANJE ZA SUBMITOVANJEeeeEEE NASTAVITI DALJE HOSTOVATI OVO NA GITHUB I VIDETI DA LI RADI**********
*****************************************************************/
/**************************************PROCITATI GORE*********************************************************/
// Funkcija za brisanje elementa iz korpe
function deleteItem(index) {
    savedItems.splice(index, 1); // Uklonite element iz niza
    localStorage.setItem('items', JSON.stringify(savedItems)); // Ažurirajte lokalno skladište

    // Ovde možete dodati kod za osvežavanje prikaza korpe ili bilo koji drugi odgovarajući korak
    location.reload(); // Osveži stranicu kako bi se prikaz korpe ažurirao
}

// ...

// Unutar funkcije za potvrdu narudžbine (kada se klikne na dugme "Naruči"), dodajte sledeći kod:
confirmOrderButton.addEventListener('click', function () {
    // ...
    // Vaša postojeća logika za slanje podataka putem forme
    // ...

    // Nakon uspešnog slanja, brišemo element iz korpe
    deleteItem(itemIndex);

    // Nakon brisanja, preusmeravamo korisnika na stranicu "https://iwamotokogan.github.io/DIPO/thanks.html"
    window.location.href = "https://iwamotokogan.github.io/DIPO/thanks.html";
});

/*DODATO BRISANJE ZA SUBMITOVANJE*/

