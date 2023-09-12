document.addEventListener('DOMContentLoaded', function () {
    let additionalDezenPrice = 0;
    let calculatedPrice = 0; // Dodajte promenljivu za praćenje cene na osnovu dimenzija

    /*fetch*/
    // Dohvatanje JSON podataka o dezenima
    fetch("dezeni.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (dezeni) {
            let dezeniContainer = document.querySelector(".pattern-grid");
            let html = "";

            // Iteriranje kroz svaki dezen i generisanje HTML za svaki od njih
            dezeni.forEach(function (dezen) {
                html += `
        <div class="pattern">
          <img src="${dezen.image}" alt="${dezen.name}">
          <p>${dezen.name}</p>
        </div>
      `;
            });

            // Postavljanje generisanog HTML-a unutar odgovarajućeg kontejnera
            dezeniContainer.innerHTML += html;

            // Dodajte event listenere za interakciju sa odabranim dezenom
            const patterns = document.querySelectorAll('.pattern');
            patterns.forEach(pattern => {
                pattern.addEventListener('click', () => {
                    selectedImage.src = pattern.querySelector('img').src;
                    selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                    selectedPattern.style.display = 'block'; // Prikažite odabrani dezen
                    patternPopup.classList.remove('active'); // Zatvorite popup prozor

                    // Dobijte naziv odabranog dezena
                    const patternName = pattern.querySelector('p').textContent;

                    // Pronađite dezen sa datim nazivom u JSON-u
                    const selectedDezen = dezeni.find(dezen => dezen.name === patternName);

                    if (selectedDezen) {
                        additionalDezenPrice = selectedDezen.price; // Koristite cenu iz JSON-a ako postoji
                    } else {
                        additionalDezenPrice = 0; // Ako dezen nije pronađen ili nema cene, postavite cenu na 0 ili drugu podrazumevanu vrednost
                    }

                    // Ažurirajte ukupnu cenu tako što ćete dodati cenu odabranog dezena na cenu na osnovu dimenzija
                    const totalPrice = calculatedPrice + additionalDezenPrice;

                    // Postavite tekst konačne cene u odgovarajući element na stranici
                    document.getElementById('price').innerText = `Cena: ${totalPrice} evra`;
                });
            });

            // Dodajte ovo kako biste definisali visinu, širinu i dubinu
            const height = 0; // Postavite željenu visinu
            const width = 0; // Postavite željenu širinu
            const depth = 0; // Postavite željenu dubinu

            // Funkcija za ažuriranje ukupne cene
            function updateTotalPrice(height, width, depth) {
                // Implementirajte logiku za izračunavanje cene na osnovu dimenzija ovde
                calculatedPrice = calculatePrice(height, width, depth);

                // Postavite tekst konačne cene u odgovarajući element na stranici, dodajući cenu odabranog dezena na cenu na osnovu dimenzija
                const totalPrice = calculatedPrice + additionalDezenPrice;
                document.getElementById('price').innerText = `Cena: ${totalPrice} evra`;
            }

            // Dodajte ovo kako biste definisali visinu, širinu i dubinu
            //const height = 0; // Postavite željenu visinu
            //const width = 0; // Postavite željenu širinu
            //const depth = 0; // Postavite željenu dubinu

            // Dodajte event listenere za promene u dimenzijama
            const heightInput = document.getElementById('height');
            const widthInput = document.getElementById('width');
            const depthInput = document.getElementById('depth');

            heightInput.addEventListener('input', () => {
                const newHeight = parseFloat(heightInput.value);
                updateTotalPrice(newHeight, width, depth);
            });

            widthInput.addEventListener('input', () => {
                const newWidth = parseFloat(widthInput.value);
                updateTotalPrice(height, newWidth, depth);
            });

            depthInput.addEventListener('input', () => {
                const newDepth = parseFloat(depthInput.value);
                updateTotalPrice(height, width, newDepth);
            });

            /*promena cene*/
        })
        .catch(function (error) {
            console.error("Greška pri dohvatanju podataka: " + error);
        });

    const selectText = document.getElementById('select-text');
    const chooseButton = document.getElementById('choose-pattern');
    const patternPopup = document.getElementById('pattern-popup');
    const closePopupButton = document.getElementById('close-popup');
    const selectedPattern = document.getElementById('selected-pattern');
    const selectedImage = document.getElementById('selected-image');
    const selectedPatternTitle = document.getElementById('selected-pattern-title');

    /*dodato*/
    const element = document.getElementById('pattern-popup');

    // Prikažite pop-up prozor kada se klikne na dugme "Odaberi dezen"
    chooseButton.addEventListener('click', () => {
        patternPopup.classList.add('active');
    });

    // Zatvorite pop-up prozor kada se klikne na dugme "Zatvori"
    closePopupButton.addEventListener('click', () => {
        patternPopup.classList.remove('active');
        selectText.style.display = 'block'; // Ponovo prikažite tekst "Odaberite dezen fronta"
    });

    /*dodato*/
    /* 8====D  */
});
