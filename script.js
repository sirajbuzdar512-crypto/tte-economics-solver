/* ====== SETTINGS ====== */
const API_KEY = "AQ.Ab8RN6Kj5fwB_zPj1QZorjapj_A0Cskcb5hopubUCqxFj0appg";
// Fallback list, used only if the page cannot fetch the live model list from Google
const MODELS = ["gemini-flash-latest", "gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-2.0-flash"];

const SYSTEM_PROMPT =
  "You are an expert economics tutor covering microeconomics, macroeconomics, international trade, " +
  "development, public finance, monetary economics, econometrics and Islamic economics. " +
  "For numerical questions: list the given data, state the formula, solve step by step, and give the final answer clearly. " +
  "For theory questions: give a clear structured explanation with definitions, key points and a short example. " +
  "Reply in the same language the user writes in (English, Urdu or Roman Urdu). Be accurate and balanced on contested topics.";

/* ====== HELPERS ====== */
const out = document.getElementById("out");
const btn = document.getElementById("btn");
const qbox = document.getElementById("q");

function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}

function md(text){
  let t = esc(text);
  t = t.replace(/^### (.*)$/gm,"<h4>$1</h4>").replace(/^## (.*)$/gm,"<h4>$1</h4>").replace(/^# (.*)$/gm,"<h4>$1</h4>");
  t = t.replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>");
  t = t.replace(/`([^`]+)`/g,"<code>$1</code>");
  t = t.replace(/^\s*[\*\-] (.*)$/gm,"&bull; $1");
  return t.replace(/\n/g,"<br>");
}

function showError(msg){
  out.innerHTML = '<div class="err"><strong>Error:</strong><br>' + esc(msg).replace(/\n/g,"<br>") + '</div>';
}

function clearAll(){
  qbox.value = "";
  out.textContent = "Your answer will appear here.";
  qbox.focus();
}

async function callModel(model, question){
  const url = "https://generativelanguage.googleapis.com/v1beta/models/" + model + ":generateContent";
  const res = await fetch(url, {
    method: "POST",
    headers: {"Content-Type":"application/json", "x-goog-api-key": API_KEY},
    body: JSON.stringify({
      systemInstruction: {parts:[{text: SYSTEM_PROMPT}]},
      contents: [{role:"user", parts:[{text: question}]}],
      generationConfig: {temperature: 0.3, maxOutputTokens: 4096}
    })
  });
  const data = await res.json().catch(()=>({}));
  if(!res.ok){
    const e = new Error((data.error && data.error.message) || ("HTTP " + res.status));
    e.status = res.status;
    throw e;
  }
  const parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
  if(!parts) throw new Error("Empty response received (possibly a safety filter). Please rephrase your question and try again.");
  return parts.map(p=>p.text||"").join("");
}

let cachedModels = null;

// Ask Google which models this key can actually use, then rank them (flash first)
async function discoverModels(){
  if(cachedModels) return cachedModels;
  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models?pageSize=200", {
    headers: {"x-goog-api-key": API_KEY}
  });
  const data = await res.json().catch(()=>({}));
  if(!res.ok){
    const e = new Error((data.error && data.error.message) || ("HTTP " + res.status));
    e.status = res.status;
    throw e;
  }
  const names = (data.models || [])
    .filter(m => (m.supportedGenerationMethods || []).includes("generateContent"))
    .map(m => m.name.replace("models/", ""))
    .filter(n => /^gemini/.test(n) && !/(image|tts|live|audio|embedding|robotics|computer|learnlm|vision|thinking|exp)/.test(n));
  const rank = n => (/latest/.test(n) ? 0 : 10) + (/flash-lite/.test(n) ? 5 : /flash/.test(n) ? 0 : 20);
  names.sort((x, y) => rank(x) - rank(y) || y.localeCompare(x));
  if(!names.length) throw new Error("No usable Gemini models found for this API key.");
  cachedModels = names.slice(0, 6);
  return cachedModels;
}

async function solve(){
  const q = qbox.value.trim();
  if(!q){showError("Please type a question first.");return;}
  btn.disabled = true;
  out.textContent = "Analyzing...";

  let models;
  try{
    models = await discoverModels();
  }catch(e){
    if([400,401,403].includes(e.status)){ showError(e.message); btn.disabled = false; return; }
    models = MODELS;
  }

  const errors = [];
  for(const m of models){
    try{
      const answer = await callModel(m, q);
      out.innerHTML = md(answer);
      btn.disabled = false;
      return;
    }catch(e){
      errors.push(m + ": " + e.message);
      // A bad or restricted key will fail for every model, so stop early
      if([400,401,403].includes(e.status)) break;
    }
  }
  showError(errors.join("\n"));
  btn.disabled = false;
}

// Ctrl+Enter submits
qbox.addEventListener("keydown", function(e){ if(e.ctrlKey && e.key==="Enter") solve(); });