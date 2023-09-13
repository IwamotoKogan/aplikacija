document.addEventListener('DOMContentLoaded', function () {
    let selectedDezenPrice = 0;
    let selectedDezen;

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

    // Dohvatanje JSON podataka o dezenima i generisanje HTML-a
    fetch("dezeni.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (dezeni) {
            const dezeniContainer = document.querySelector(".pattern-grid");
            let html = "";

            dezeni.forEach(function (dezen) {
                html += `
                    <div class="pattern">
                        <img src="${dezen.image}" alt="${dezen.name}">
                        <p>${dezen.name}</p>
                    </div>
                `;
            });

            dezeniContainer.innerHTML = html;

            const patterns = document.querySelectorAll('.pattern');
            patterns.forEach(pattern => {
                pattern.addEventListener('click', () => {
                    selectedImage.src = pattern.querySelector('img').src;
                    selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                    selectedPattern.style.display = 'block';
                    patternPopup.classList.remove('active');

                    const patternName = pattern.querySelector('p').textContent;
                    selectedDezen = dezeni.find(dezen => dezen.name === patternName);

                    if (selectedDezen) {
                        selectedDezenPrice = selectedDezen.price;
                    } else {
                        selectedDezenPrice = 0;
                    }

                    updateTotalPrice();
                });
            });

            updateTotalPrice();
        })
        .catch(function (error) {
            console.error("Greška pri dohvatanju podataka: " + error);
        });

    const selectText = document.getElementById('select-text');
    const chooseButton = document.getElementById('choose-pattern');
    const patternPopup = document.getElementById('pattern-popup');
    const closePopupButton = document.getElementById('close-popup');
    const patternGrid = document.querySelector('.pattern-grid');
    const selectedPattern = document.getElementById('selected-pattern');
    const selectedImage = document.getElementById('selected-image');
    const selectedPatternTitle = document.getElementById('selected-pattern-title');

    // Prikažite pop-up prozor kada se klikne na dugme "Odaberi dezen"
    chooseButton.addEventListener('click', () => {
        patternPopup.classList.add('active');
    });

    // Zatvorite pop-up prozor kada se klikne na dugme "Zatvori"
    closePopupButton.addEventListener('click', () => {
        patternPopup.classList.remove('active');
        selectText.style.display = 'block'; // Ponovo prikažite tekst "Odaberite dezen fronta"
    });
});
/*KRAVA*/
