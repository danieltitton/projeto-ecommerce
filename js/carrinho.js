/* 
Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o contador, adicionar o produto no localstorage e atualizar a tabela HTML do carrinho:
- Parte 1: vamos adicionar +1 no icone do carrinho
Passo 1: pegar os botoes de adicionar ao carrinho no HTML
Passo 2: adicionar um evento de escuta nesses botoes pra cquando clicar disparar uma ação
passo 3: pegar as informações do produto clicado e adicionar ao localstorage
passo 4: atualizar o contador do carrinho de compras
passo 5: renderizar a tabela do carrinho de compras



Objetivo 2 - remover produtos do carrinho
Passo 1: pegar botao de deletar do HTML
Passo 2: adicionar evento de escuta no botao
Passo 3: remover o produto do logalstorage
Passo 4: atualizar o HTML do carrinho retirando o produto
Passo 5: atualizar o valor

Objetivo 3 - atualizar valores do carrinho
Passo 1: pegar o input de quantidade do carrinho
Passo 2: adicionar evento de escuta no input
Passo 3: atualizar valor total do produto
Passo 4: atualizar valor total do carrinho

*/


// Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o contador, adicionar o produto no localstorage e atualizar a tabela HTML do carrinho:
// - Parte 1: vamos adicionar +1 no icone do carrinho
// Passo 1: pegar os botoes de adicionar ao carrinho no HTML

const botoesAdicionarCarrinho = document.querySelectorAll('.adicionar-carrinho');