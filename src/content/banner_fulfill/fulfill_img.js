/**
 * Ta funkcja ma za zadanie znaleźć główny input do wgrywania pliku
 * i dodać do niego nasłuchiwanie na zmiany.
 */
function attachImageUploader() {
  // 1. Znajdź główny input pliku.
  const mainImageInput = document.querySelector('input[name="main_pic"]');

  // 2. Jeśli elementu jeszcze nie ma na stronie, zakończ funkcję.
  //    Skrypt spróbuje ponownie za chwilę.
  if (!mainImageInput) {
    return;
  }

  // 3. Jeśli element został znaleziony, przestań go szukać.
  //    Czyścimy interwał, aby nie obciążać przeglądarki.
  clearInterval(findUploaderInterval);
  
  // 4. Dodaj nasłuchiwanie na zdarzenie 'change' (wybranie pliku).
  mainImageInput.addEventListener('change', function() {
    
    // Pobierz wgrane pliki z głównego pola.
    const filesToCopy = this.files;

    // Znajdź WSZYSTKIE inputy, które mają atrybut 'name' zaczynający się od "pic[".
    // Obejmie to pic[german], pic[french] itd.
    const allLanguageInputs = document.querySelectorAll('input[name^="pic["]');

    // Sprawdź, czy plik został faktycznie wybrany.
    if (filesToCopy.length > 0) {
      
      // Przejdź pętlą przez każdy znaleziony input językowy...
      allLanguageInputs.forEach(input => {
        // ...i przypisz mu te same pliki, które wgrano w "Main Image".
        input.files = filesToCopy;
      });

      // Poinformuj użytkownika, że operacja się udała.
      alert('Grafika została skopiowana do wszystkich wersji językowych!');
    }
  });
}

/**
 * Uruchamiaj funkcję attachImageUploader co 250 milisekund,
 * dopóki nie znajdzie ona szukanego elementu i sama się nie wyłączy.
 */
const findUploaderInterval = setInterval(attachImageUploader, 250);