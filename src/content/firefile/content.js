// Funkcja realizująca logikę rozszerzenia
function initializeTranscriptionExporter() {
    console.log("Fireflies Transcription Exporter: Skrypt wstrzyknięty.");

    // --- KLASY I STAŁE ---
    const CONTAINER_ID = 'ff-transcription-exporter-container';
    const PREPARE_BUTTON_ID = 'ff-prepare-md-button';
    const DOWNLOAD_BUTTON_ID = 'ff-download-md-button';

    // Selekcje są dostosowane do RZECZYWISTEJ struktury Fireflies (bez data-testid)
    // Główny kontener transkrypcji - używamy klas które faktycznie istnieją
    const TRANSCRIPT_CONTAINER_SELECTOR = '.body-section-content-transcriptContent, .radix-rrh-content-transcript, [class*="transcript-content"], [class*="transcriptContent"]';
    
    // SELEKTOR dla pojedynczych segmentów transkrypcji
    // Szukamy divów zawierających timestamp i tekst
    const TRANSCRIPT_SEGMENT_SELECTOR = '[class*="transcript-item"], [class*="transcript-row"], [class*="transcript-segment"]';
    
    let markdownContent = null; // Zmienna do przechowywania gotowej zawartości MD
    let downloadLink = null; // Zmienna do przechowywania URL-a do pobrania

    // --- POMOCNICZE FUNKCJE INTERFEJSU ---

    /**
     * Tworzy i wstrzykuje interfejs użytkownika do pobierania.
     */
    function injectInterface() {
        // Używamy setTimeout, aby dać czas na załadowanie się głównej aplikacji (React/SPA)
        setTimeout(() => {
            if (document.getElementById(CONTAINER_ID)) return; // Zapobiega wielokrotnemu wstrzykiwaniu

            const container = document.createElement('div');
            container.id = CONTAINER_ID;
            container.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 10000;
                display: flex;
                flex-direction: column;
                gap: 8px;
                padding: 10px;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            `;

            const prepareButton = document.createElement('button');
            prepareButton.id = PREPARE_BUTTON_ID;
            prepareButton.textContent = 'Przygotuj plik MD';
            prepareButton.className = 'ff-exporter-button';
            prepareButton.style.cssText = `
                padding: 10px 15px;
                background-color: #4CAF50; /* Aktywny kolor - zielony */
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-weight: 600;
                transition: background-color 0.2s, opacity 0.2s;
            `;
            prepareButton.onmouseover = function() { this.style.backgroundColor = '#45a049'; };
            prepareButton.onmouseout = function() { this.style.backgroundColor = '#4CAF50'; };

            const downloadButton = document.createElement('button');
            downloadButton.id = DOWNLOAD_BUTTON_ID;
            downloadButton.textContent = 'Pobierz plik';
            downloadButton.className = 'ff-exporter-button';
            downloadButton.disabled = true;
            downloadButton.style.cssText = `
                padding: 10px 15px;
                background-color: #007bff; /* Nieaktywny/niebieski */
                color: white;
                border: none;
                border-radius: 6px;
                opacity: 0.5; /* Nieaktywny */
                cursor: not-allowed;
                font-weight: 600;
                transition: opacity 0.2s;
            `;

            container.appendChild(prepareButton);
            container.appendChild(downloadButton);

            document.body.appendChild(container);

            // Dodawanie słuchaczy zdarzeń
            prepareButton.addEventListener('click', prepareMarkdownFile);
            downloadButton.addEventListener('click', downloadMarkdownFile);
        }, 500); // Małe opóźnienie, aby upewnić się, że DOM jest stabilny po wstrzyknięciu
    }

    /**
     * Aktualizuje stan przycisków na interfejsie.
     * @param {boolean} isReady - Czy plik MD jest gotowy do pobrania.
     */
    function updateButtonState(isReady) {
        const prepareBtn = document.getElementById(PREPARE_BUTTON_ID);
        const downloadBtn = document.getElementById(DOWNLOAD_BUTTON_ID);

        if (prepareBtn) {
            prepareBtn.disabled = isReady;
            prepareBtn.style.opacity = isReady ? '0.5' : '1.0';
            prepareBtn.style.cursor = isReady ? 'not-allowed' : 'pointer';
            prepareBtn.textContent = isReady ? 'MD Gotowy!' : 'Przygotuj plik MD';
        }

        if (downloadBtn) {
            downloadBtn.disabled = !isReady;
            downloadBtn.style.opacity = isReady ? '1.0' : '0.5';
            downloadBtn.style.cursor = isReady ? 'pointer' : 'not-allowed';
            // Utrzymaj stały kolor dla wizualnego rozróżnienia (aktywny/nieaktywny kontroluje opacity)
            downloadBtn.style.backgroundColor = '#007bff';
        }
    }

    // --- GŁÓWNA LOGIKA ---

    /**
     * Ekstrahuje i konwertuje transkrypcję do formatu Markdown.
     * @returns {string | null} Zawartość Markdown lub null w przypadku błędu.
     */
    function extractAndConvertTranscript() {
        console.log("🔍 [FF EXPORTER] Rozpoczynam ekstrakcję transkrypcji...");

        // DEBUGOWANIE: Sprawdźmy co jest na stronie
        console.log("🔍 [FF EXPORTER] === DEBUGOWANIE STRUKTURY STRONY ===");
        
        // 1. Sprawdź wszystkie data-testid
        const allTestIds = Array.from(document.querySelectorAll('[data-testid]'));
        console.log(`📊 [FF EXPORTER] Znaleziono ${allTestIds.length} elementów z data-testid`);
        if (allTestIds.length > 0) {
            const testIdNames = allTestIds.map(el => el.getAttribute('data-testid')).slice(0, 20);
            console.log("📋 [FF EXPORTER] Pierwsze 20 data-testid:", testIdNames);
        }
        
        // 2. Sprawdź elementy zawierające "transcript"
        const transcriptElements = Array.from(document.querySelectorAll('*')).filter(el => {
            const className = el.className?.toString() || '';
            const id = el.id || '';
            return className.toLowerCase().includes('transcript') || id.toLowerCase().includes('transcript');
        });
        console.log(`📝 [FF EXPORTER] Znaleziono ${transcriptElements.length} elementów zawierających 'transcript'`);
        if (transcriptElements.length > 0) {
            console.log("📝 [FF EXPORTER] Pierwsze 3 elementy:", transcriptElements.slice(0, 3));
        }
        
        // 3. Sprawdź główne kontenery
        const mainContainers = document.querySelectorAll('main, [role="main"], .main-content, #main, .transcript-container');
        console.log(`🏠 [FF EXPORTER] Znaleziono ${mainContainers.length} głównych kontenerów`);
        
        // 4. Sprawdź czy są jakieś divy z tekstem (potencjalne segmenty transkrypcji)
        const allDivs = document.querySelectorAll('div');
        console.log(`📦 [FF EXPORTER] Całkowita liczba divów na stronie: ${allDivs.length}`);

        // Próba znalezienia głównego kontenera
        console.log("🔍 [FF EXPORTER] Szukam kontenera z selektorem:", TRANSCRIPT_CONTAINER_SELECTOR);
        const mainTranscriptContainer = document.querySelector(TRANSCRIPT_CONTAINER_SELECTOR);
        
        if (!mainTranscriptContainer) {
            console.error("❌ [FF EXPORTER] Nie znaleziono głównego kontenera transkrypcji z selektorem:", TRANSCRIPT_CONTAINER_SELECTOR);
            
            // Spróbuj znaleźć alternatywne kontenery
            console.log("💡 [FF EXPORTER] Próbuję znaleźć alternatywne kontenery...");
            
            // Szukaj kontenerów z dużą ilością tekstu (prawdopodobnie transkrypcja)
            let largestTextContainer = null;
            let maxTextLength = 0;
            
            document.querySelectorAll('div, section, article').forEach(el => {
                const textLength = el.textContent?.length || 0;
                if (textLength > maxTextLength && textLength > 1000) {
                    maxTextLength = textLength;
                    largestTextContainer = el;
                }
            });
            
            if (largestTextContainer) {
                console.log(`✅ [FF EXPORTER] Znaleziono największy kontener tekstowy (${maxTextLength} znaków):`, largestTextContainer);
                console.log("🔍 [FF EXPORTER] Klasy kontenera:", largestTextContainer.className);
                console.log("🔍 [FF EXPORTER] ID kontenera:", largestTextContainer.id);
                console.log("💡 [FF EXPORTER] Spróbuj użyć tego kontenera zamiast oryginalnego selektora");
            }
            
            return null;
        }
        
        console.log("✅ [FF EXPORTER] Znaleziono główny kontener transkrypcji:", mainTranscriptContainer);
        console.log("🔍 [FF EXPORTER] Klasy kontenera:", mainTranscriptContainer.className);
        console.log("🔍 [FF EXPORTER] ID kontenera:", mainTranscriptContainer.id);

        // POWRÓT DO DZIAŁAJĄCEGO PODEJŚCIA - ale z lepszym parsowaniem
        // Używamy dzieci pierwszego kontenera jako segmentów
        console.log("🔍 [FF EXPORTER] Szukam segmentów w dzieciach głównego kontenera...");
        
        const directChildren = mainTranscriptContainer.children;
        console.log(`📦 [FF EXPORTER] Bezpośrednie dzieci kontenera: ${directChildren.length}`);
        
        let segments = [];
        
        if (directChildren.length > 0 && directChildren[0].children.length > 1) {
            // Pierwsze dziecko jest kontenerem ze wszystkimi segmentami
            console.log("📝 [FF EXPORTER] Używam dzieci pierwszego kontenera");
            segments = Array.from(directChildren[0].children);
        } else {
            // Użyj bezpośrednich dzieci
            segments = Array.from(directChildren);
        }
        
        console.log(`✅ [FF EXPORTER] Znaleziono ${segments.length} segmentów do przetworzenia`);
        
        if (segments.length === 0) {
            console.error("❌ [FF EXPORTER] Nie znaleziono żadnych segmentów");
            return null;
        }

        const transcriptSegments = [];
        let currentSpeaker = '';

        console.log(`🔄 [FF EXPORTER] Rozpoczynam przetwarzanie ${segments.length} segmentów...`);

        // Funkcja czyszcząca śmieci z tekstu (CSS, JS, HTML)
        function cleanText(text) {
            // Usuń CSS/JS/HTML ze strony
            text = text.replace(/\[data-[^\]]+\]\{[^}]+\}/g, ''); // CSS selectors
            text = text.replace(/\{[^}]+scrollbar[^}]+\}/g, ''); // CSS rules
            text = text.replace(/<[^>]+>/g, ''); // HTML tags
            text = text.replace(/Transcript AskFred/g, ''); // Specyficzny śmieć Fireflies
            
            // Usuń długie ciągi znaków bez spacji (prawdopodobnie kod)
            const lines = text.split('\n');
            const cleanedLines = lines.filter(line => {
                const trimmed = line.trim();
                // Odrzuć linie będące kodem (zawierają { } ; bez spacji)
                if (trimmed.includes('{') || trimmed.includes('}') || trimmed.includes(';')) {
                    const hasSpaces = (trimmed.match(/ /g) || []).length > 3;
                    if (!hasSpaces) return false;
                }
                return true;
            });
            
            return cleanedLines.join(' ').replace(/\s+/g, ' ').trim();
        }

        segments.forEach((segment, index) => {
            if (index === 0) {
                console.log(`\n📝 [FF EXPORTER] === ANALIZA PIERWSZEGO SEGMENTU ===`);
                console.log("🔍 Długość tekstu:", segment.textContent?.length || 0);
                console.log("🔍 Pierwsze 200 znaków:", segment.textContent.substring(0, 200));
            }
            
            let fullText = cleanText(segment.textContent.trim());
            
            // NOWE: Sprawdź czy to jest JEDEN wielki segment ze wszystkimi wypowiedziami
            // Wzorzec wypowiedzi: "SpeakerX 00:00 tekst" LUB "SSpeakerX00:00Text" (bez spacji)
            const entriesPattern = /(S?Speaker\s*\d+|Mówca\s*\d+)\s*(\d{1,2}:\d{2}(:\d{2})?)/gi;
            const matches = fullText.match(entriesPattern);
            
            if (index === 0) {
                console.log(`🔍 Znaleziono ${matches ? matches.length : 0} wzorców wypowiedzi`);
            }
            
            // Jeśli to wielki segment z wieloma wypowiedziami, rozdziel go
            if (fullText.length > 3000 && matches && matches.length > 5) {
                console.log("🎯 [FF EXPORTER] Wykryto wielki segment - rozdzielam na wypowiedzi");
                
                // Znajdź wszystkie pozycje gdzie zaczynają się wypowiedzi
                const regex = /(S?Speaker\s*\d+|Mówca\s*\d+)\s*(\d{1,2}:\d{2}(:\d{2})?)/gi;
                let match;
                const entries = [];
                let lastIndex = 0;
                
                while ((match = regex.exec(fullText)) !== null) {
                    if (lastIndex > 0) {
                        // Zapisz poprzednią wypowiedź
                        const entryText = fullText.substring(lastIndex, match.index).trim();
                        if (entryText.length > 0) {
                            entries.push({
                                index: lastIndex,
                                text: entryText
                            });
                        }
                    }
                    lastIndex = match.index;
                }
                // Ostatnia wypowiedź
                if (lastIndex < fullText.length) {
                    entries.push({
                        index: lastIndex,
                        text: fullText.substring(lastIndex).trim()
                    });
                }
                
                console.log(`✅ Rozdzielono na ${entries.length} wypowiedzi`);
                
                // Przetwórz każdą wypowiedź osobno
                entries.forEach((entry, entryIdx) => {
                    const entryText = entry.text;
                    
                    // Wyciągnij mówcę, timestamp i tekst
                    // Format może być: "Speaker 1 00:00" LUB "SSpeaker100:00" (bez spacji)
                    const combinedMatch = entryText.match(/^(S?Speaker\s*\d+|Mówca\s*\d+)\s*(\d{1,2}:\d{2}(:\d{2})?)/i);
                    
                    let speakerName = 'Mówca Nieznany';
                    let timestamp = '00:00';
                    let text = entryText;
                    
                    if (combinedMatch) {
                        // Znaleziono mówcę i timestamp
                        speakerName = combinedMatch[1].trim().replace(/^S/, ''); // Usuń początkowe 'S' z SSpeaker
                        timestamp = combinedMatch[2].trim();
                        
                        // Tekst zaczyna się po mówcy i timestampie
                        text = entryText.substring(combinedMatch[0].length).trim();
                    } else {
                        // Fallback - spróbuj osobno
                        const speakerMatch = entryText.match(/^(S?Speaker\s*\d+|Mówca\s*\d+)/i);
                        const timestampMatch = entryText.match(/\d{1,2}:\d{2}(:\d{2})?/);
                        
                        if (speakerMatch) {
                            speakerName = speakerMatch[1].trim().replace(/^S/, '');
                            text = text.substring(speakerMatch[0].length).trim();
                        }
                        if (timestampMatch) {
                            timestamp = timestampMatch[0];
                            text = text.replace(timestampMatch[0], '').trim();
                        }
                    }
                    
                    // Dodaj tylko jeśli tekst nie jest śmieciem i ma sensowną długość
                    const isGarbage = text.includes('{') || text.includes('}') || text.includes('scrollbar') || text.includes('[data-');
                    
                    if (text.length > 3 && !isGarbage) {
                        if (speakerName !== currentSpeaker) {
                            transcriptSegments.push(`\n---\n\n### ${speakerName}\n`);
                            currentSpeaker = speakerName;
                        }
                        transcriptSegments.push(`**[${timestamp}]**\n${text}\n`);
                    }
                });
                
                return; // Zakończ przetwarzanie tego segmentu
            }
            
            // STARE PODEJŚCIE dla pojedynczych segmentów
            // Spróbuj najpierw wyciągnąć mówcę + timestamp jednocześnie
            const combinedMatch = fullText.match(/^(S?Speaker\s*\d+|Mówca\s*\d+)\s*(\d{1,2}:\d{2}(:\d{2})?)/i);
            
            let speakerName = 'Mówca Nieznany';
            let timestamp = '00:00';
            let text = fullText;
            
            if (combinedMatch) {
                speakerName = combinedMatch[1].trim().replace(/^S/, ''); // Usuń początkowe 'S'
                timestamp = combinedMatch[2].trim();
                text = fullText.substring(combinedMatch[0].length).trim();
            } else {
                // Fallback - tradycyjne podejście
                const timestampMatch = fullText.match(/\b(\d{1,2}:\d{2}(:\d{2})?)\b/);
                timestamp = timestampMatch ? timestampMatch[1] : '00:00';
                
                const speakerMatch = fullText.match(/^(S?Speaker\s*\d+|Mówca\s*\d+|[^\d:]+?)(?=\d{1,2}:\d{2})/i);
                if (speakerMatch) {
                    speakerName = speakerMatch[1].trim().replace(/^S/, '');
                    text = text.replace(speakerMatch[0], '').trim();
                }
                
                text = text.replace(/\b\d{1,2}:\d{2}(:\d{2})?\b/, '').trim();
            }
            
            // Sprawdź czy tekst nie jest śmieciem (CSS, JS, HTML)
            const isGarbage = text.includes('{') || text.includes('}') || text.includes('scrollbar') || 
                            text.includes('[data-') || text.includes('webkit') || text.length < 3;
            
            if (isGarbage) {
                console.log("🗑️ [FF EXPORTER] Segment zawiera śmieci, pomijam");
                return;
            }
            
            console.log(`📝 [${index + 1}] ${speakerName} [${timestamp}]: ${text.substring(0, 50)}...`);

            // Pomijamy segmenty bez tekstu (np. puste divy lub błędy parsowania)
            if (text.length === 0) {
                console.log("⏭️ [FF EXPORTER] Segment pusty, pomijam");
                return;
            }

            // Formatowanie do Markdown
            if (speakerName !== currentSpeaker) {
                // Nowy mówca - dodaj nagłówek Markdown z dodatkową linią odstępu
                transcriptSegments.push(`\n---\n\n### ${speakerName}\n`);
                currentSpeaker = speakerName;
            }

            // Dodaj segment jako akapit z czasem i podwójną nową linią dla czytelności
            transcriptSegments.push(`**[${timestamp}]**\n${text}\n`);
        });

        if (transcriptSegments.length === 0) {
            console.error("Wszystkie znalezione segmenty były puste po przetworzeniu.");
            return null;
        }
        
        // Wstaw tytuł na początku dokumentu MD (np. z tytułu strony)
        const title = document.title.replace(' | Fireflies.ai', '').trim() || 'Transkrypcja Spotkania';
        const date = new Date().toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        
        let markdown = `# ${title}\n\n`;
        markdown += `**Data:** ${date}\n\n`;
        markdown += `*Wygenerowano za pomocą Fireflies Transcription Exporter*\n\n---\n`;
        markdown += transcriptSegments.join('\n');

        return markdown;
    }

    /**
     * Obsługa kliknięcia "Przygotuj plik MD".
     */
    function prepareMarkdownFile() {
        markdownContent = extractAndConvertTranscript();

        if (markdownContent) {
            // Tworzenie Blob-a i URL-a do pobrania
            const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
            
            // Usuwamy stary link, jeśli istnieje
            if (downloadLink) {
                URL.revokeObjectURL(downloadLink);
            }
            
            downloadLink = URL.createObjectURL(blob);
            
            console.log("Plik Markdown gotowy do pobrania.");
            updateButtonState(true);
        } else {
            // Utrzymujemy pierwotny komunikat błędu, zgodnie z logiką
            alert("Nie udało się wyodrębnić transkrypcji. Spróbuj przewinąć stronę i upewnić się, że transkrypcja jest w pełni załadowana.");
            updateButtonState(false);
        }
    }

    /**
     * Obsługa kliknięcia "Pobierz plik".
     */
    function downloadMarkdownFile() {
        if (!downloadLink) {
            alert("Najpierw przygotuj plik Markdown.");
            return;
        }

        const title = document.title.replace(' | Fireflies.ai', '').trim() || 'Transkrypcja_Spotkania';
        const filename = `${title.replace(/[^a-z0-9]/gi, '_')}_transkrypcja.md`;

        const a = document.createElement('a');
        a.href = downloadLink;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Opcjonalnie: Resetujemy stan po pobraniu, aby użytkownik mógł wygenerować ponownie
        markdownContent = null;
        URL.revokeObjectURL(downloadLink);
        downloadLink = null;
        updateButtonState(false);
    }

    // --- INICJALIZACJA ---
    // Czekaj, aż strona będzie gotowa, zanim wstrzykniesz interfejs
    if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => initializeTranscriptionExporter());
    } else {
        injectInterface();
    }
}

// Uruchomienie skryptu. W trybie service worker jest to robione przez background.js
// Tutaj jednak robimy to bezpośrednio po wstrzyknięciu skryptu zawartości.
// initializeTranscriptionExporter(); 

// Rozszerzenie jest wstrzykiwane, więc wystarczy wywołać funkcję inicjalizacyjną
initializeTranscriptionExporter();