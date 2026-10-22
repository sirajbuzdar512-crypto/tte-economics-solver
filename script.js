/* ====== SETTINGS ====== */
const WORKER_URL = "https://tte-solver.sirajbuzdar512.workers.dev";

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

async function solve(){
  const q = qbox.value.trim();
  if(!q){showError("Please type a question first.");return;}
  btn.disabled = true;
  out.textContent = "Analyzing...";
  try{
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({question: q})
    });
    const data = await res.json().catch(()=>({}));
    if(!res.ok || !data.text){
      showError(data.error || ("Request failed (HTTP " + res.status + ")"));
    }else{
      out.innerHTML = md(data.text);
    }
  }catch(e){
    showError("Could not reach the server. Please check your internet connection and try again.");
  }
  btn.disabled = false;
}

// Ctrl+Enter submits
qbox.addEventListener("keydown", function(e){ if(e.ctrlKey && e.key==="Enter") solve(); });
