
const synth = window.speechSynthesis;
const languageMap = {
    'en': 'en-US',
    'hi': 'hi-IN',
    'kn': 'kn-IN',
    'ml': 'ml-IN'
};

function speakResults() {
    const selectedLanguage = document.getElementById("language")?.value || 'en';
    const prediction = document.getElementById("prediction").innerText;
    const confidence = document.getElementById("confidence").innerText;
    const description = document.getElementById("description").innerText;
    const precautions = document.getElementById("precautions").innerText;
    const textToSpeak = `${prediction}. ${confidence}. ${description}. ${precautions}`;

    fetch('/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: encodeURIComponent(textToSpeak), language: selectedLanguage })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            showPopup(data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = languageMap[selectedLanguage] || 'en-US';
        synth.speak(utterance);
        showPopup("Audio generated locally.");
    });
}

function showPopup(message) {
    document.getElementById("popup-message").innerText = message;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}
