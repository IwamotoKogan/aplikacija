// Funkcija za izračunavanje cene na osnovu dimenzija
const dezen1Price = 0;   // Osnovni dezen
const dezen2Price = 50;  // Crni kamen
const dezen3Price = 70;  // Beli mermer

function calculatePrice(height, width, depth) {
    const basePrice = 1000;
    const increment = 20;
    const limit = 5;

    const heightDifference = height - 90;
    const widthDifference = width - 100;
    const depthDifference = depth - 30;

    const heightPrice = heightDifference >= 0 ? Math.floor(heightDifference / limit) * increment : 0;
    const widthPrice = widthDifference >= 0 ? Math.floor(widthDifference / limit) * increment : 0;
    const depthPrice = depthDifference >= 0 ? Math.floor(depthDifference / limit) * increment : 0;

    const totalPrice = basePrice + heightPrice + widthPrice + depthPrice;
    return totalPrice;
}

// Funkcija koja proverava da li su unete vrednosti numeričkog tipa
function isValidNumber(value) {
    return !isNaN(value);
}

// Funkcija koja proverava da li su unete dimenzije unutar dozvoljenog opsega
function isValidDimensions(height, width, depth) {
    const minHeight = 90;
    const maxHeight = 200;
    const minWidth = 100;
    const maxWidth = 250;
    const minDepth = 30;
    const maxDepth = 60;

    return height >= minHeight && height <= maxHeight &&
        width >= minWidth && width <= maxWidth &&
        depth >= minDepth && depth <= maxDepth;
}

// Funkcija koja se poziva prilikom klika na dugme za izračunavanje cene
function calculate() {
    const heightInput = document.getElementById('height');
    const widthInput = document.getElementById('width');
    const depthInput = document.getElementById('depth');

    const height = parseInt(heightInput.value);
    const width = parseInt(widthInput.value);
    const depth = parseInt(depthInput.value);

    if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
        document.getElementById('price').innerText = "Niste uneli validne podatke";
        return;
    }

    if (!isValidDimensions(height, width, depth)) {
        document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
        return;
    }

    const totalPrice = calculatePrice(height, width, depth);

    document.getElementById('price').innerText = `Cena: ${totalPrice} evra`;

    // Izračunajte preporučene dimenzije fronta
    const recommendedFrontDimensions = calculateRecommendedFrontDimensions(height, width, depth);

    // Prikaz preporučenog fronta ispod cene
    const recommendedFront = document.getElementById('recommended-front');
    recommendedFront.innerHTML = `Dimenzije fronta za ovaj element visina ${recommendedFrontDimensions.recommendedHeight}cm i širina ${recommendedFrontDimensions.recommendedWidth}cm`;
}

document.getElementById('calculate-btn').addEventListener('click', calculate);

// Kreiramo objekat za čuvanje podataka o kuhinji
let kuhinjaData = {
    height: 0,
    width: 0,
    depth: 0,
    price: 0
};

function addToCart() {
    const heightInput = document.getElementById('height');
    const widthInput = document.getElementById('width');
    const depthInput = document.getElementById('depth');

    const height = parseInt(heightInput.value);
    const width = parseInt(widthInput.value);
    const depth = parseInt(depthInput.value);

    if (!isValidNumber(height) || !isValidNumber(width) || !isValidNumber(depth)) {
        document.getElementById('price').innerText = "Niste uneli validne podatke";
        return;
    }

    if (!isValidDimensions(height, width, depth)) {
        document.getElementById('price').innerText = "Dimenzije koje ste uneli su izvan dozvoljenog opsega";
        return;
    }

    const totalPrice = calculatePrice(height, width, depth);

    kuhinjaData.height = height;
    kuhinjaData.width = width;
    kuhinjaData.depth = depth;
    kuhinjaData.price = totalPrice;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerText = parseInt(cartItems.innerText) + 1;

    const cartButton = document.getElementById('cart-button');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = '+1';
    cartButton.appendChild(notification);

    // Izračunajte preporučene dimenzije fronta
    const recommendedFrontDimensions = calculateRecommendedFrontDimensions(height, width, depth);

    // Dodajte preporučene dimenzije fronta u objekat kuhinjaData
    kuhinjaData.recommendedFrontDimensions = recommendedFrontDimensions;

    // Sačuvajmo podatke u localStorage
    localStorage.setItem('kuhinjaData', JSON.stringify(kuhinjaData));

    const newItem = {
        height: height,
        width: width,
        depth: depth,
        price: totalPrice
    };

    // Uzmi postojeće elemente iz localStorage ili inicijalizuj prazno ako ih nema
    const savedItems = JSON.parse(localStorage.getItem('items')) || [];

    // Dodaj novi element u listu sačuvanih elemenata
    savedItems.push(newItem);

    // Sačuvaj ažuriranu listu elemenata u localStorage
    localStorage.setItem('items', JSON.stringify(savedItems));

    // Redirektuj na stranicu pregled_kuhinja.html
    location.reload();
}

const kupiBtn = document.getElementById('kupi-btn');
kupiBtn.addEventListener('click', addToCart);

// Nakon izračunavanja cene, izračunajte preporučene dimenzije fronta
function calculateRecommendedFrontDimensions(height, width, depth) {
    const recommendedHeight = height - 0.4; // Smanjite visinu za 4mm
    const recommendedWidth = width - 0.4; // Smanjite širinu za 4mm
    return { recommendedHeight, recommendedWidth };
}
