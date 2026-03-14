// configurações dos níveis do progresso

const niveis = [
    {nome:"Peão Iniciante", peça:"♟", porcenMin: 0.00}, //Nível 1
    {nome: "Torre Ascendente", peça: "♜", porcenMin: 0.20}, //Nível 2
    {nome: "Cavalo Veloz", peça: "♞", porcenMin: 0.40}, //Nível 3
    {nome: "Bispo Iluminado", peça: "♝", porcenMin: 0.60}, //Nível 4
    {nome: "Rainha Poderosa", peça: "♛", porcenMin: 0.80}, //Nível 5
    {nome: "CHECKMATE", peça: "♚", porcenMin: 1.00} //Nível 6
];

function addTask(){

    const input = document.getElementById("taskInput");
    const text = input.value;

    if(text === "") return;

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑";

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    document.getElementById("pendingList").appendChild(li);

    input.value = "";

    verificarLista();

    checkbox.addEventListener("change", function(){

    if(this.checked){
        document.getElementById("completedList").appendChild(li);
    }else{
        document.getElementById("pendingList").appendChild(li);
    }

    verificarLista();
    verificarConcluidos();

});

   deleteBtn.addEventListener("click", function(){
    li.remove();
    verificarLista();
    verificarConcluidos();
});

}

function verificarLista(){

    const lista = document.getElementById("pendingList");
    const mensagem = document.getElementById("mensag");

    if(lista.children.length === 0){
        mensagem.style.display = "block";
    }else{
        mensagem.style.display = "none";
    }

}
function verificarConcluidos(){

    const lista = document.getElementById("completedList");
    const mensagem = document.getElementById("mensagc");

    if(lista.children.length === 0){
        mensagem.style.display = "block";
    }else{
        mensagem.style.display = "none";
    }

}