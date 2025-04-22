let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
const form = document.querySelector('form');
const lista = document.getElementById('lista');
const totalDisplay = document.getElementById('total');


function atualizarLista() {
  lista.innerHTML = '';
  let total = 0;
  
  gastos.forEach((gasto, index) => {
    total += gasto.valor;
    lista.innerHTML += `
      <tr>
        <td>${gasto.descricao}</td>
        <td>R$ ${gasto.valor.toFixed(2)}</td>
        <td><button class="delete" data-id="${index}">X</button></td>
      </tr>
    `;
  });
  
  totalDisplay.textContent = total.toFixed(2);
  localStorage.setItem('gastos', JSON.stringify(gastos));
}


function adicionarGasto(e) {
  e.preventDefault();
  
  const descricao = document.getElementById('descricao').value.trim();
  const valor = parseFloat(document.getElementById('valor').value);
  
  if (descricao && !isNaN(valor) && valor > 0) {
    gastos.push({ descricao, valor });
    form.reset();
    atualizarLista();
  } else {
    alert('Preencha descrição e valor válido!');
  }
}


function removerGasto(index) {
  if (confirm('Remover este gasto?')) {
    gastos.splice(index, 1);
    atualizarLista();
  }
}


form.addEventListener('submit', adicionarGasto);
lista.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    removerGasto(e.target.dataset.id);
  }
});


atualizarLista();