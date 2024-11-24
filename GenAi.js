const API_KEY = "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"; // Replace with your actual API key

function logSuggestion() {
    const datePlace = document.getElementById('DATE-PLACE').value.trim();
    const startDay = document.getElementById('START-DAY').value;
    const endDay = document.getElementById('END-DAY').value;
    const numPeople = document.getElementById('NUMBER-OF-PEOPLE').value.trim();

    if (!datePlace || !startDay || !endDay || !numPeople) {
        alert("Please fill in all fields before requesting a suggestion.");
        return;
    }

    const prompt = `Suggest a fun date idea for ${numPeople} people at ${datePlace} from ${startDay} to ${endDay}.`;

    fetch("https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            inputs: prompt,
            parameters: {
                max_new_tokens: 50
            }
        })
    })
        .then(response => {
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            return response.json();
        })
        .then(suggestionData => {
            console.log(suggestionData); // Log response for debugging
            const suggestion = suggestionData.generated_text || "No suggestion available. Please try again.";
            alert("Date Idea: " + suggestion);
        })
        .catch(error => console.error("Error fetching suggestion:", error));
}

document.getElementById("suggestion-button").addEventListener("click", logSuggestion);
