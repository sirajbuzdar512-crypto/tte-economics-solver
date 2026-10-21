window.TTE_Economics_Engine = (function() {
    'use strict';

    return {
        parseAndSolve: async function(userInput) {
            const outBox = document.getElementById("tte-output");
            if (outBox) {
                outBox.innerHTML = "<p style='color: #1e562a; font-weight: bold;'>⏳ Engine is processing your economics request... Please wait...</p>";
            }

            // ⚠️ INSERT YOUR GOOGLE GEMINI API KEY HERE
            const API_KEY = "YOUR_GEMINI_API_KEY_HERE"; 
            
            // Standard dynamic base endpoint
            const url = `https://googleapis.com{API_KEY}`;

            const systemPrompt = "You are an expert Economics, Islamic Banking, Business Finance, and International Trade professor. " +
                                 "Answer this question comprehensively with structural steps, examples, or numerical calculations if needed. " +
                                 "CRITICAL RULE: Do NOT mention Google, Gemini, AI, or any large language model. Do not include any logos, watermarks, branding, or AI symbols. " +
                                 "Keep the response completely independent, white-labeled, and professional under the TTE engine brand. " +
                                 "Output using clear HTML formatting tags like <strong>, <br>, or <ul>: ";

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ 
                            parts: [{ 
                                text: systemPrompt + userInput 
                            }] 
                        }]
                    })
                });

                const data = await response.json();
                
                if (data.error) {
                    this.renderOutput("API Configuration Error", "Configuration Issue", `<strong>System Error:</strong> ${data.error.message}`);
                    return;
                }

                const aiResponse = data.candidates[0].content.parts[0].text;
                this.renderOutput("TTE Economics Engine Resolution", "Analytical Reference Data", aiResponse);
            } catch (error) {
                console.error("Connection Error:", error);
                this.renderOutput("System Connection Timeout", "Error Processing Request", "Could not connect to the global analytical nodes. Please check your API key configuration or network connection.");
            }
        },

        renderOutput: function(title, summary, analyticSteps) {
            const outBox = document.getElementById("tte-output");
            if (outBox) {
                outBox.innerHTML = `<div style="font-family: Arial, sans-serif; padding: 5px;">` +
                                   `<h4 style="color: #1e562a; margin-top: 0; font-size: 16px;">${title}</h4>` +
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
            if (!inputField || !inputField.value.trim()) {
                alert("The inputs field cannot be left blank.");
                return;
            }
            window.TTE_Economics_Engine.parseAndSolve(inputField.value);
        });
    }
});
