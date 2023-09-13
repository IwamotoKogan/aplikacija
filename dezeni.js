document.addEventListener('DOMContentLoaded', function () {



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

                    /*premesten*/
                    // Dodajte event listenere za interakciju sa odabranim dezenom
                    const patterns = document.querySelectorAll('.pattern');
                    patterns.forEach(pattern => {
                        pattern.addEventListener('click', () => {
                            selectedImage.src = pattern.querySelector('img').src;
                            selectedPatternTitle.textContent = pattern.querySelector('p').textContent;
                            selectedPattern.style.display = 'block'; // Prikažite odabrani dezen
                            patternPopup.classList.remove('active'); // Zatvorite popup prozor
                        });
                    });


                    /*pretraga dezena***********/

                    // Dobijte referencu na input polje za pretragu
                    const searchInput = document.getElementById('search-pattern');

                    // Dodajte event listener za promene u input polju
                    searchInput.addEventListener('input', () => {
                        const searchValue = searchInput.value.toLowerCase(); // Dobijte vrednost pretrage i pretvorite je u mala slova

                        // Dobijte sve dezeni
                        const patterns = document.querySelectorAll('.pattern');

                        // Iterirajte kroz svaki dezen i sakrijte one koji ne odgovaraju unosu pretrage
                        patterns.forEach(pattern => {
                            const name = pattern.querySelector('p').textContent.toLowerCase(); // Dobijte ime dezena

                            if (name.includes(searchValue)) {
                                pattern.style.display = 'block'; // Prikaži dezen ako odgovara pretrazi
                            } else {
                                pattern.style.display = 'none'; // Sakrij dezen ako ne odgovara pretrazi
                            }
                        });
                    });

                    /*pretraga dezena*/

                    /*promena cene*/
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
                            
                        });
                    });

                    // Funkcija za ažuriranje ukupne cene
                    

                    /*promena cene*/
                    /*premesten*/
                })
                .catch(function (error) {
                    console.error("Greška pri dohvatanju podataka: " + error);
                });

            /*fetch*/
            const selectText = document.getElementById('select-text');
            const chooseButton = document.getElementById('choose-pattern');
            const patternPopup = document.getElementById('pattern-popup');
            const closePopupButton = document.getElementById('close-popup');
            const patternGrid = document.querySelector('.pattern-grid');
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





            /*dodatoooooooo*/


        });
