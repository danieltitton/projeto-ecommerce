/* 
Objetivo 1 - quando clicar no botao de adicionar ao carrinho temos que atualizar o contador, adicionar o produto no localstorage e atualizar a tabela HTML do carrinho:
- Parte 1: vamos adicionar +1 no icone do carrinho
Passo 1: pegar os botoes de adicionar ao carrinho no HTML
Passo 2: adicionar um evento de escuta nesses botoes pra quando clicar disparar uma ação
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

const botoesAdicionarAoCarrinho = document.querySelectorAll(".adicionar-ao-carrinho");

// Passo 2: adicionar um evento de escuta nesses botoes pra quando clicar disparar uma ação


botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener("click", evento => {
        //passo 3: pegar as informações do produto clicado e adicionar ao localstorage
        const elementoProduto = evento.target.closest(".produto");
        const produtoId = elementoProduto.dataset.id;
        const produtoNome = elementoProduto.querySelector(".nome").textContent;
        const produtoImagem = elementoProduto.querySelector("img").getAttribute("src");
        const produtoPreco = parseFloat(elementoProduto.querySelector(".preco").textContent.replace("R$ ","").replace(".","").replace(",", "."));

        //buscar a lista de produtos no localstorage

        const carrinho = obterProdutosDoCarrinho();

        //testar se o produoto ja existe no carrinho

        const existeProduto = carrinho.find(produto => produto.id === produtoId);

        if (existeProduto) {
            existeProduto.quantidade += 1;
        } else {
            const produto = {
                id: produtoId,
                nome: produtoNome,  
                imagem: produtoImagem,
                preco: produtoPreco,
                quantidade: 1,
            };
            carrinho.push(produto);
        }   
        //salvar o carrinho atualizado no localstorage
       salvarProdutosNoCarrinho(carrinho);
       atualizarContadorCarrinho();
       renderizarTabelaDoCarrinho();
    }); 
});

function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}   

function obterProdutosDoCarrinho() {
            const produtos = localStorage.getItem("carrinho");
            return produtos ? JSON.parse(produtos) : [];

}

//passo 4: atualizar o contador do carrinho de compras
function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.quantidade;
    });

    document.getElementById("contador-carrinho").textContent = total;

// Atualiza o contador ao carregar a página//atualizarContadorCarrinho();
} 

atualizarContadorCarrinho();

//passo 5: renderizar a tabela do carrinho de compras
function renderizarTabelaDoCarrinho() {
    const carrinho = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector("#modal-1-content tbody");

    console.log(corpoTabela);
    corpoTabela.innerHTML = ""; //limpar tabela antes de renderizar

    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td class="td-produto">
        <img
        src="${produto.imagem}"
        alt="${produto.nome}">
        </td>
        <td>${produto.nome}</td>
        <td class="td-preco-unitario">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
        <td class="td-quantidade">
            <input type="number" value="${produto.quantidade}" min="1" />
            </td>
            <td class="td-preco-total">R$ ${produto.preco.toFixed(2).replace(".", ",")}</td>
            <td><button class="btn-remover" data-id="${produto.id}" id="deletar"></button></td>`;
        corpoTabela.appendChild(tr);
    });
    
    

}

renderizarTabelaDoCarrinho();