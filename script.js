```javascript
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const languageSelect = document.getElementById("language");
const statusText = document.getElementById("status");
const detectedLanguage = document.getElementById("detectedLanguage");
const transcriptText = document.getElementById("transcript");

const languageNames = {
    "en-IN": "English 🇬🇧",
    "ta-IN": "Tamil 🇮🇳",
    "te-IN": "Telugu 🇮🇳",
    "hi-IN": "Hindi 🇮🇳",
    "ml-IN": "Malayalam 🇮🇳",
    "kn-IN": "Kannada 🇮🇳",
    "bn-IN": "Bengali 🇮🇳"
};

const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    statusText.textContent =
        "Speech recognition is not supported. Please use Google Chrome.";
    startBtn.disabled = true;
} else {

    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = languageSelect.value;

    languageSelect.addEventListener("change", function () {
        recognition.lang = this.value;

        if (detectedLanguage.textContent !== "---") {
            detectedLanguage.textContent =
                languageNames[this.value];
        }
    });

    recognition.onstart = function () {
        statusText.textContent = "🎙️ Listening... Please speak now.";
        startBtn.disabled = true;
        detectedLanguage.textContent =
            languageNames[languageSelect.value];
    };

    recognition.onresult = function (event) {
        let transcript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        transcriptText.textContent = transcript;
    };

    recognition.onerror = function (event) {
        statusText.textContent =
            "❌ Error: " + event.error;
        startBtn.disabled = false;
    };

    recognition.onend = function () {
        statusText.textContent =
            "✅ Speech detection stopped.";
        startBtn.disabled = false;
    };

    startBtn.addEventListener("click", function () {
        recognition.lang = languageSelect.value;
        recognition.start();
    });

    stopBtn.addEventListener("click", function () {
        recognition.stop();
    });
}
```
