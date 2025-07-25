const carrinho = [];
    const listaCarrinho = document.getElementById("lista-carrinho");
    const totalCarrinho = document.getElementById("total-carrinho");
    const contadorItens = document.getElementById("contador-itens");
    const overlay = document.getElementById("overlay");
    const carrinhoContainer = document.getElementById("carrinho-container");
    const abrirCarrinhoBtn = document.getElementById("abrir-carrinho");
    const fecharCarrinhoBtn = document.getElementById("fechar-carrinho");
    const botaoZap = document.getElementById("enviar-zap");
    const numeroWhatsApp = "5599999999999"; // Substitua pelo seu número com DDD

    // Mostrar carrinho
    abrirCarrinhoBtn.onclick = () => {
      carrinhoContainer.classList.add("aberto");
      overlay.style.display = "block";
    };

    // Fechar carrinho
    fecharCarrinhoBtn.onclick = () => {
      carrinhoContainer.classList.remove("aberto");
      overlay.style.display = "none";
    };

    overlay.onclick = () => {
      carrinhoContainer.classList.remove("aberto");
      overlay.style.display = "none";
    };

    // Adicionar ao carrinho
    document.querySelectorAll(".adicionar-carrinho").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const nome = btn.getAttribute("data-nome");
        const preco = parseFloat(btn.getAttribute("data-preco"));
        carrinho.push({ nome, preco });
        atualizarCarrinho();
      });
    });

    function atualizarCarrinho() {
      listaCarrinho.innerHTML = "";
      let total = 0;
      carrinho.forEach((item, index) => {
        total += item.preco;
        const li = document.createElement("li");
        li.innerHTML = `
          ${item.nome} - R$ ${item.preco.toFixed(2)}
          <button class="btn-remover" data-index="${index}">X</button>
        `;
        listaCarrinho.appendChild(li);
      });
      totalCarrinho.textContent = "Total: R$ " + total.toFixed(2);
      contadorItens.textContent = carrinho.length;
      adicionarEventosRemover();
    }

    function adicionarEventosRemover() {
      document.querySelectorAll(".btn-remover").forEach(btn => {
        btn.onclick = () => {
          const index = btn.getAttribute("data-index");
          carrinho.splice(index, 1);
          atualizarCarrinho();
        };
      });
    }

    botaoZap.onclick = () => {
      if (carrinho.length === 0) {
        alert("Carrinho vazio!");
        return;
      }
      let mensagem = "Olá! Gostaria de comprar:\n\n";
      let total = 0;
      carrinho.forEach(item => {
        mensagem += `• ${item.nome} - R$ ${item.preco.toFixed(2)}\n`;
        total += item.preco;
      });
      mensagem += `\nTotal: R$ ${total.toFixed(2)}\nAguardo retorno.`;
      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
      window.open(url, "_blank");
    };