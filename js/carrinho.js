const botoesAdicionarAoCarrinho = document.querySelectorAll(".adicionar-ao-carrinho");

// OBJETIVO 1: Adicionar produtos ao carrinho
// Adiciona evento de clique em todos os botões "Adicionar ao Carrinho"
botoesAdicionarAoCarrinho.forEach(botao => {
    botao.addEventListener("click", evento => {
        // Extrai dados do produto a partir do elemento DOM
        const elementoProduto = evento.target.closest(".produto");
        const dadosProduto = extrairDadosProduto(elementoProduto);

        // Obtém carrinho atual e adiciona/atualiza o produto
        const carrinho = obterProdutosDoCarrinho();
        adicionarOuAtualizarProdutoNoCarrinho(carrinho, dadosProduto);

        // Salva mudanças e atualiza a interface
        salvarProdutosNoCarrinho(carrinho);
        atualizarCarrinhoETabela();
    }); 
});

// FUNÇÃO AUXILIAR: Extrai informações do produto do DOM
// Melhoria: Centralizou a lógica de extração em uma função reutilizável
function extrairDadosProduto(elementoProduto) {
    // Remove caracteres especiais do preço para converter corretamente em número
    const preco = elementoProduto.querySelector(".preco").textContent
        .replace("R$ ", "")
        .replace(".", "")
        .replace(",", ".");

    return {
        id: elementoProduto.dataset.id,
        nome: elementoProduto.querySelector(".nome").textContent,
        imagem: elementoProduto.querySelector("img").getAttribute("src"),
        preco: parseFloat(preco),
    };
}

// FUNÇÃO AUXILIAR: Adiciona ou atualiza produto no carrinho
// Melhoria: Separou a lógica de adicionar/atualizar do evento principal
function adicionarOuAtualizarProdutoNoCarrinho(carrinho, dadosProduto) {
    const existeProduto = carrinho.find(produto => produto.id === dadosProduto.id);

    if (existeProduto) {
        existeProduto.quantidade += 1;
    } else {
        carrinho.push({
            ...dadosProduto,
            quantidade: 1,
        });
    }
}


// FUNÇÕES DE GERENCIAMENTO DO LOCALSTORAGE
// Melhoria: Separou a lógica de persistência em funções bem nomeadas

// Salva o carrinho no localStorage como JSON
function salvarProdutosNoCarrinho(carrinho) {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}   

// Recupera o carrinho do localStorage com tratamento de erros
// Melhoria: Adicionada verificação para evitar JSON.parse("undefined")
function obterProdutosDoCarrinho() {
    const produtos = localStorage.getItem("carrinho");
    return (produtos && produtos !== "undefined") ? JSON.parse(produtos) : [];
}

// OBJETIVO 2: Atualizar a interface do carrinho

// Atualiza o contador de itens no ícone do carrinho
// Melhoria: Extraído em função separada para reutilização
function atualizarContadorCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const total = produtos.reduce((acc, produto) => acc + produto.quantidade, 0);
    document.getElementById("contador-carrinho").textContent = total;
}

// Renderiza a tabela do carrinho com todos os produtos
// Melhoria: Usa template literals para melhor legibilidade
function renderizarTabelaDoCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    const corpoTabela = document.querySelector("#modal-1-content table tbody");

    corpoTabela.innerHTML = ""; // Limpa tabela antes de renderizar

    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        const precoUnitario = produto.preco.toFixed(2).replace(".", ",");
        const precoTotal = (produto.preco * produto.quantidade).toFixed(2).replace(".", ",");

        tr.innerHTML = `
            <td class="td-produto">
                <img src="${produto.imagem}" alt="${produto.nome}"/>
            </td>
            <td>${produto.nome}</td>
            <td class="td-preco-unitario">R$ ${precoUnitario}</td>
            <td class="td-quantidade">
                <input type="number" class="input-quantidade" data-id="${produto.id}" value="${produto.quantidade}" min="1" />
            </td>
            <td class="td-preco-total">R$ ${precoTotal}</td>
            <td><button class="btn-remover" data-id="${produto.id}" id="deletar"></button></td>
        `;
        corpoTabela.appendChild(tr);
    });
}


//Objetivo 2 - remover produtos do carrinho
//Passo 1: pegar botao de deletar do HTML

const corpoTabela = document.querySelector("#modal-1-content tbody");

//passo 2 adicionar evento de escuta do tbody

corpoTabela.addEventListener("click", evento => {
    if (evento.target.classList.contains("btn-remover")) {
        const id = evento.target.dataset.id;

        //passo 3 remover o produto do logalstorage
        removerProdutoDoCarrinho(id);
    }

    
});

corpoTabela.addEventListener("input", evento => {
    
    if(evento.target.classList.contains("input-quantidade")){
        const produtos = obterProdutosDoCarrinho();
        const produto = produtos.find(produto => produto.id === evento.target.dataset.id);
        let novaQuantidade = parseInt(evento.target.value);

        if(produto) {
            produto.quantidade = novaQuantidade;


    }
    salvarProdutosNoCarrinho(produtos);
    atualizarCarrinhoETabela();
}

    });

//passo 4 atualizar o html do carrinho retirando o produto
function removerProdutoDoCarrinho(id) {
    const produtos = obterProdutosDoCarrinho();

    //filtrar os produtos que nao tem id passado por parametro
    const carrinhoAtualizado = produtos.filter(produto => produto.id !== id);

    salvarProdutosNoCarrinho(carrinhoAtualizado);
    atualizarCarrinhoETabela();
}

// passo 3 atualizar o valor total do carrinho
function atualizarValorTotalCarrinho() {
    const produtos = obterProdutosDoCarrinho();
    let total = 0;

    produtos.forEach(produto => {
        total += produto.preco * produto.quantidade;
    });

    document.querySelector("#total-carrinho").textContent = `Total: R$ ${total.toFixed(2).replace(".",",")}`;
}

function atualizarCarrinhoETabela() {
    atualizarContadorCarrinho();
    renderizarTabelaDoCarrinho();
    atualizarValorTotalCarrinho();
}

atualizarCarrinhoETabela();