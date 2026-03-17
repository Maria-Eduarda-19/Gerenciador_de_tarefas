// ── CONFIGURAÇÃO DOS NÍVEIS ──────────────────────────────
const LEVELS = [
  { nome: "Peão Iniciante",   peça: "♟", threshold: 0.00 },
  { nome: "Torre Ascendente", peça: "♜", threshold: 0.20 },
  { nome: "Cavalo Veloz",     peça: "♞", threshold: 0.40 },
  { nome: "Bispo Iluminado",  peça: "♝", threshold: 0.60 },
  { nome: "Rainha Poderosa",  peça: "♛", threshold: 0.80 },
  { nome: "CHECKMATE",        peça: "♚", threshold: 1.00 },
];

// ── ESTADO ───────────────────────────────────────────────
let tasks      = [];
let nextId     = 1;
let ultimoNivel = 0;

// ── CÁLCULOS ─────────────────────────────────────────────
function countConcluido() {
  return tasks.filter(t => t.concluido).length;
}

function calcProgress() {
  return tasks.length ? countConcluido() / tasks.length : 0;
}

function getCurrentLevel(p) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (p >= LEVELS[i].threshold) return i;
  }
  return 0;
}

function getWithinLevel(p, idx) {
  if (idx >= LEVELS.length - 1) return 100;
  const lo = LEVELS[idx].threshold;
  const hi = LEVELS[idx + 1].threshold;
  return Math.round(((p - lo) / (hi - lo)) * 100);
}

// ── RENDERIZAÇÃO ─────────────────────────────────────────
function renderProgress() {
  const p         = calcProgress();
  const idx       = getCurrentLevel(p);
  const lvl       = LEVELS[idx];
  const pct       = getWithinLevel(p, idx);
  const concluido = countConcluido();
  const isCM      = idx === LEVELS.length - 1;

  document.getElementById("icon-peca").textContent           = lvl.peça;
  document.getElementById("nome-peca").textContent           = lvl.nome;
  document.getElementById("peca").textContent                = concluido; // ← só o número
  // ✅ Mostra % total geral
const pctTotal = Math.round(p * 100);
document.getElementById("progress-barra-fill").style.width = `${pctTotal}%`;
document.getElementById("prog-percent").textContent = isCM ? "♚ 100%" : `${pctTotal}%`;

  const badge       = document.getElementById("nivel-badge");
  badge.textContent = `Nível ${idx + 1}/6`;
  badge.className   = isCM ? "badge checkmate" : "badge";

  document.body.classList.toggle("checkmate-mode", isCM);
    console.log("tasks:", tasks);
  console.log("concluídas:", countConcluido());
  console.log("progresso:", calcProgress())
}

function mostrarToast(mensagem) {
  const toast = document.getElementById("toast");
  toast.textContent = mensagem;
  toast.classList.add("visivel");

  // Some depois de 2.5 segundos
  setTimeout(() => {
    toast.classList.remove("visivel");
  }, 2500);
}

// ── ADICIONAR TAREFA ─────────────────────────────────────
function addTask() {
  const input = document.getElementById("taskInput");
  const text  = input.value.trim();

  if (text === "") return;

  // 1. Adiciona no array com ID único
  const tarefa = { id: nextId++, texto: text, concluido: false };
  tasks.push(tarefa);
  mostrarToast("✅ Tarefa adicionada!")

  // 2. Cria o elemento visual
  const li       = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type  = "checkbox";

  const span         = document.createElement("span");
  span.textContent   = text;

  const deleteBtn         = document.createElement("button");
  deleteBtn.textContent   = "X";

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("pendingList").appendChild(li);
  input.value = "";

  verificarLista();
  renderProgress(); // ← Atualiza a barra ao adicionar

  // 3. Ao marcar/desmarcar: atualiza o array E move o item
  checkbox.addEventListener("change", function () {
    tarefa.concluido = this.checked; // ← Sincroniza com o array

    if (this.checked) {
      document.getElementById("completedList").appendChild(li);
      mostrarToast("✅Tarefa concluída com sucesso!");
    } else {
      document.getElementById("pendingList").appendChild(li);
      mostrarToast("↩️Tarefa voltou para pendente!");
    }

    verificarLista();
    verificarConcluidos();
    renderProgress(); // ← Atualiza a barra ao marcar
  });

  // 4. Ao deletar: remove do array E da tela
  deleteBtn.addEventListener("click", function () {
    tasks = tasks.filter(t => t.id !== tarefa.id); // ← Remove do array
    li.remove();
    verificarLista();
    verificarConcluidos();
    renderProgress(); // ← Atualiza a barra ao deletar
    mostrarToast("🗑️ Tarefa removida!")
  });
}



// ── VERIFICAÇÕES DE LISTA VAZIA ───────────────────────────
function verificarLista() {
  const lista    = document.getElementById("pendingList");
  const mensagem = document.getElementById("mensag");
  mensagem.style.display = lista.children.length === 0 ? "block" : "none";
}

function verificarConcluidos() {
  const lista    = document.getElementById("completedList");
  const mensagem = document.getElementById("mensagc");
  mensagem.style.display = lista.children.length === 0 ? "block" : "none";
}
  document.getElementById("addTaskBtn").addEventListener("click", addTask);
  console.log("JS carregado!");
console.log("botão:", document.getElementById("addTaskBtn"));
console.log("input:", document.getElementById("taskInput"));
