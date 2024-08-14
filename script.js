//Define
document.getElementById('define-btn').addEventListener('click', function() {
    var word = document.getElementById('word-input').value.trim();

    if (word === '') {
        document.getElementById('definition-result').innerText = 'Please enter a word.';
        return;
    }

    var url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Word not found.');
            }
            return response.json();
        })
        .then(data => {
            var meanings = data[0].meanings;
            var resultHtml = `<h3>Definition of ${word}:</h3>`;
            
            meanings.forEach(meaning => {
                resultHtml += `<h4>${meaning.partOfSpeech}</h4><ul>`;
                meaning.definitions.forEach(def => {
                    resultHtml += `<li>${def.definition}</li>`;
                });
                resultHtml += `</ul>`;
            });

            document.getElementById('definition-result').innerHTML = resultHtml;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('definition-result').innerText = 'Word not found or an error occurred.';
        });
});



document.getElementById('speak-btn').addEventListener('click', function() {
    var textToSpeak = document.getElementById('text-to-translate').value;
    var targetLanguage = document.getElementById('target-language-select').value;
    
   
    var utterance = new SpeechSynthesisUtterance(textToSpeak);

   
    switch(targetLanguage) {
        case 'en':
            utterance.lang = 'en-US';
            break;
        case 'es':
            utterance.lang = 'es-ES';
            break;
        case 'fr':
            utterance.lang = 'fr-FR';
            break;
        case 'de':
            utterance.lang = 'de-DE';
            break;
      
        default:
            utterance.lang = 'en-US';
    }

   
    window.speechSynthesis.speak(utterance);
});

document.getElementById('stop-btn').addEventListener('click', function() {
   
    window.speechSynthesis.cancel();
});

//Language 

   
    document.getElementById('translate-btn').addEventListener('click', function() {
        const textToTranslate = document.getElementById('text-to-translate').value;
        const sourceLang = document.getElementById('source-language-select').value;
        const targetLang = document.getElementById('target-language-select').value;
    
      
        const options = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization : 'a_1yHLIEf358lz8CWO6lHM28qZTMhKP0R66PIQk9sQFf4ja8rWFUKHy7K0NxYPopVkWskQBtEKagV2WSRK'  
            },
            body: JSON.stringify({
                from: sourceLang,
                to: targetLang,
                data: textToTranslate,
                platform: 'api'
            })
        };
    
      
        fetch('https://api-b2b.backenster.com/b1/api/v3/translate', options)
            .then(response => response.json())
            .then(data => {
                const translatedText = data.result;
                document.getElementById('translated-text').innerText = translatedText;
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('translated-text').innerText = 'Translation failed. Please try again.';
            });
    });