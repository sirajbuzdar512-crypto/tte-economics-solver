window.TTE_Economics_Engine = (function() {
    'use strict';

    return {
        parseAndSolve: async function(userInput) {
            const outBox = document.getElementById("tte-output");
            if (outBox) {
                outBox.innerHTML = "<p style='color: #1e562a; font-weight: bold;'>⏳ Engine is processing your economics request...</p>";
            }

            // Free & Open-Source AI Endpoint (No API Key Required)
            const url = `https://pollinations.ai`;

            const systemPrompt = "You are an expert Economics, Islamic Banking, Business Finance, and International Finance AI engine. " +
                                 "Answer this question comprehensively with structural steps, examples, or numerical calculation steps. " +
                                 "CRITICAL RULE: Do NOT mention Google, Gemini, AI, or any large language model. " +
                                 "Keep the response completely independent, white-labeled, and professional under the Tech And Tips Economy platform. " +
                                 "Output using clear HTML formatting tags like <strong>, <br>, or <ul>.";

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: userInput }
                        ]
                    })
                });

                const aiResponse = await response.text();

                if (aiResponse && aiResponse.trim() !== "") {
                    this.renderOutput("TTE Economics Engine Resolution", "Analytical Reference Data", aiResponse);
                } else {
                    this.renderOutput("Parsing Error", "Response Format Error", "Received unexpected response format structure from the analytical nodes.");
                }

            } catch (error) {
                console.error("Fetch error:", error);
                this.renderOutput("System Connection Timeout", "Error Processing Request", "Could not connect to the global analytical nodes. Please check your network connection.");
            }
        },

        renderOutput: function(title, summary, analyticSteps) {
            const outBox = document.getElementById("tte-output");
            if (outBox) {
                outBox.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 5px;">` +
                                   `<h4 style="color: #1e562a; margin-top: 0; font-size: 16px;">⚡ ${title}</h4>` +
                                   `<p style="font-size: 14px; color: #333; background: #f4f9f5; padding: 10px; border-left: 4px solid #1e562a;">${summary}</p>` +
                                   `<div style="margin-top: 12px; font-size: 13.5px; line-height: 1.6; color: #222;">${analyticSteps}</div>` +
                                   `</div>`;
            }
        }
    };
})();

// DOM Interaction Layout Listeners
document.addEventListener("DOMContentLoaded", function() {
    const processBtnDOM = document.getElementById("process-btn");
    if (processBtnDOM) {
        processBtnDOM.addEventListener("click", function() {
            const inputField = document.getElementById("questionInput");
            if (inputField) {
                if (!inputField.value || inputField.value.trim() === "") {
                    alert("The inputs field cannot be left blank.");
                    return;
                }
                window.TTE_Economics_Engine.parseAndSolve(inputField.value);
            }
        });
    }
});
