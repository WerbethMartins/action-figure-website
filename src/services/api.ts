import type { IPedido } from "../interface/pedidoInterface";
import type { IProduto } from "../interface/produto-interface";


// Tipo do item no carrinho 
export interface ICarrinhoItem  {
    id: number;
    produtoId: number;
    quantidade: number;
}

const API_URL = "http://localhost:3000";

// ===== PRODUTOS =====
export async function listarProdutos(): Promise<IProduto[]> {
    const response = await fetch(`${API_URL}/produtos`);
    return await response.json();
}

export async function adicionarProdutoAPI(produto: IProduto): Promise<IProduto> {
  const response = await fetch(`${API_URL}/produtos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error("Erro ao salvar produto na API");
  return await response.json();
}

// ===== CARRINHO =====

// Atualiza quantidade no carrinho
export async function atualizarQuantidadeCarrinho(id: number, quantidade: number) {
  const response = await fetch(`${API_URL}/carrinho/${id}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantidade })
  });

  return response.json();
}

export async function listarCarrinho(): Promise<ICarrinhoItem[]> {
    const response = await fetch(`${API_URL}/carrinho`);
    return await response.json();
}

// Lista carrinho e já retorna itens completos com dados do produto
export async function listarCarrinhoCompleto() {
  const [produtos, carrinho] = await Promise.all([
    listarProdutos(),
    listarCarrinho()
  ]);

  return carrinho.map(item => {
    const produto = produtos.find(p => p.id === item.produtoId);

    return {
      ...item,
      produto, // adiciona o objeto completo do produto
    };
  });
}

// ===== CHECKOUT ===== 

export async function criarPedido(pedido: IPedido){
  const response = await fetch(`${API_URL}/pedidos`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(pedido)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar pedido");
  }

  return response.json();
}

export async function limpaCarrinho(){
  const response = await fetch("http://localhost:3000/carrinho");
  
  if(!response.ok){
    throw new Error("Erro ao buscar carrinho!");
  }

  const itens = await response.json();

  await Promise.all(
    itens.map((item: any) => {
      fetch(`${API_URL}/carrinho/${item.id}`, {
        method: "DELETE"
      })
    })
  );
}

export async function adicionarAoCarrinho(
  item: ICarrinhoItem
): Promise<ICarrinhoItem> {
  const response = await fetch(`${API_URL}/carrinho`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item)
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar ao carrinho");
  }

  return response.json();
}

export async function removerDoCarrinho(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/carrinho/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao remover item do carrinho");
  }
}

// ===== PEDIDOS =====
export async function listarPedidos(): Promise<IPedido[]> {
  const response = await fetch(`${API_URL}/pedidos`);

  if(!response.ok){
    throw new Error("Erro ao listar pedidos");
  }

  return await response.json();
}
