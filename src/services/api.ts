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
    if (!response.ok) throw new Error("Erro ao listar produtos");
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

export async function atualizarProdutoAPI(id: number, produto: IProduto): Promise<IProduto> {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(produto),
  });
  if (!response.ok) throw new Error("Erro ao atualizar produto na API");
  return await response.json();
}

export async function removerProdutoAPI(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/produtos/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Erro ao remover produto da API");
}

export async function toggleDestaqueProduto(produto: IProduto): Promise<IProduto> {
  const response = await fetch(`${API_URL}/produtos/${produto.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      destaque: !produto.destaque
    })
  });

  if (!response.ok) throw new Error("Erro ao atualizar destaque");

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

// ===== USUÁRIOS E AUTENTICAÇÃO =====
export async function loginUsuario(email: string, senha: string) {
  const response = await fetch(`${API_URL}/usuarios?email=${email}&senha=${senha}`);
  
  if (!response.ok) throw new Error("Erro ao conectar com o servidor");
  
  const usuarios = await response.json();
  
  // O json-server retorna um array. Se estiver vazio, as credenciais estão incorretas.
  if (usuarios.length === 0) {
    throw new Error("E-mail ou senha inválidos");
  }
  
  return usuarios[0]; // Retorna o usuário encontrado
}

export async function cadastrarUsuario(dados: any) {
  // Verifica se o email já existe antes de cadastrar
  const checkResponse = await fetch(`${API_URL}/usuarios?email=${dados.email}`);
  const existing = await checkResponse.json();
  
  if (existing.length > 0) {
    throw new Error("Este e-mail já está cadastrado");
  }

  const response = await fetch(`${API_URL}/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });

  return await response.json();
}
