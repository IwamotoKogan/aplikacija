// Unutar funkcije koja se poziva kada se klikne na dezen, ažurirajte izabrani dezen i njegovu cenu
patterns.forEach(pattern => {
    pattern.addEventListener('click', () => {
        selectedImage.src = pattern.querySelector('img').src;
        selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
        selectedPattern.style.display = 'block'; // Prikažite odabrani dezen
        patternPopup.classList.remove('active'); // Zatvorite popup prozor

        // Dobijte naziv odabranog dezena
        const patternName = pattern.querySelector('p').textContent;

        // Pronađite dezen sa datim nazivom u JSON-u
        selectedDezen = dezeni.find(dezen => dezen.name === patternName);

        if (selectedDezen) {
            selectedDezenPrice = selectedDezen.price; // Koristite cenu iz JSON-a
        } else {
            selectedDezenPrice = 0; // Ako dezen nije pronađen, postavite cenu na 0 ili drugu podrazumevanu vrednost
        }

        // Ažurirajte ukupnu cenu
        updateTotalPrice();
    });
});

// Funkcija za ažuriranje ukupne cene
function updateTotalPrice() {
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

    document.getElementById('price').innerText = `Cena: ${totalPrice + selectedDezenPrice} evra`;
}

