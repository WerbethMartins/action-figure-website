import type { IPedido } from "../interface/pedidoInterface";
import type { IProduto } from "../interface/produto-interface";
import { PRODUTOS_MOCK } from "../datas/MockDatas";


// Tipo do item no carrinho 
export interface ICarrinhoItem  {
    id: number;
    produtoId: number;
    quantidade: number;
}

// Chaves para o o localStorage
const STORAGE_KEYS = {
  CARRINHO: "@AnimesActions:carrinho",
  PEDIDOS: "@AnimesActions:pedidos",
  USUARIOS: "@AnimesActions:usuarios"
}

// Simula atraso de red para manter os loadins
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms)); 

// ===== Destaques e Favoritos ===== 

// Alterna destaque do produto
export async function toggleDestaqueProduto(produto: IProduto): Promise<IProduto>{
  return { ...produto, destaque: !produto.destaque};
} 

// Função para alternar o status de favorito do produto
export async function toggleFavoritoProduto(produto: IProduto): Promise<IProduto>{
  return {...produto, favorito: !produto.favorito};
}

// ===== PRODUTOS =====
export async function listarProdutos(): Promise<IProduto[]> {
    await delay();
    return PRODUTOS_MOCK;
}

// Funções Placeholder para evitar erros de importação em outros componentes
export async function adicionarProdutoAPI(produto: IProduto): Promise<IProduto> {
    console.warn("Função adicionarProdutoAPI desativada no modo Mock/Deploy");
    return produto;
}

export async function atualizarProdutoAPI(produto: IProduto): Promise<IProduto> {
    console.warn("Função atualizarProdutoAPI desativada no modo Mock/Deploy");
    return produto;
}

export async function removerProdutoAPI(): Promise<void> {
    console.warn("Função removerProdutoAPI desativada no modo Mock/Deploy");
}

// ===== CARRINHO =====

export async function listarCarrinho(): Promise<ICarrinhoItem[]> {
  const dados = localStorage.getItem(STORAGE_KEYS.CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

export async function adicionarAoCarrinho(item: ICarrinhoItem): Promise<ICarrinhoItem> {
  const carrinho = await listarCarrinho();
  const indexExistente = carrinho.findIndex(c => c.produtoId === item.produtoId);
  
  if (indexExistente !== -1) {
        carrinho[indexExistente].quantidade += item.quantidade;
    } else {
        carrinho.push({ ...item, id: Date.now() }); // Gera um ID único simples
    }

    localStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(carrinho));
    return item;
}

// Atualiza quantidade no carrinho
export async function atualizarQuantidadeCarrinho(id: number | string, quantidade: number) {
  // Garantindo que o ID seja uma string limpa para a URL
  const carrinho = await listarCarrinho();
  const novoCarrinho = carrinho.map(item => 
    item.id === Number(id) ? { ...item, quantidade } : item
  );

  localStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(novoCarrinho));
  return { id, quantidade };
}

export async function removerDoCarrinho(id: number): Promise<void> {
  const carrinho = await listarCarrinho();
  const novocarrinho = carrinho.filter(item => item.id !== id);
  localStorage.setItem(STORAGE_KEYS.CARRINHO, JSON.stringify(novocarrinho))
}

// Lista carrinho e já retorna itens completos com dados do produto
export async function listarCarrinhoCompleto() {
  const [produtos, carrinho] = await Promise.all([
        listarProdutos(),
        listarCarrinho()
    ]);

    return carrinho.map(item => ({
        ...item,
        produto: produtos.find(p => p.id === item.produtoId),
    }));
}

export async function limpaCarrinho(){
  localStorage.removeItem(STORAGE_KEYS.CARRINHO);
}

// ===== CHECKOUT ===== 
export async function criarPedido(pedido: IPedido){
  await delay(800);
  const pedidos = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEDIDOS) || "[]");
  pedidos.push({...pedido, id: Date.now() });
  localStorage.setItem(STORAGE_KEYS.PEDIDOS, JSON.stringify(pedidos));
  await limpaCarrinho();
  return pedido;
}

// ===== PEDIDOS =====
export async function listarPedidosPorUsuario(email: string): Promise<IPedido[]> {
    const pedidos = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEDIDOS) || "[]");
    return pedidos.filter((p: IPedido) => p.clienteEmail === email);
}

// ===== USUÁRIOS E AUTENTICAÇÃO =====
export async function loginUsuario(email: string, senha: string) {
  await delay(1000);
  const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS) || "[]");
  const usuarioEncontrado = usuarios.find((u: any) => u.email === email);

  if (!usuarioEncontrado) throw new Error("E-mail não encontrado");
  if (usuarioEncontrado.senha !== senha) throw new Error("Senha incorreta");

  const { senha: _, ...userWithoutPassword } = usuarioEncontrado;
  return userWithoutPassword;

}

export async function cadastrarUsuario(dados: any) {
  await delay(1000);
  const usuarios = JSON.parse(localStorage.getItem(STORAGE_KEYS.USUARIOS) || "[]");

  if(usuarios.find((u: any) => u.email === dados.email)){
    throw new Error("Este e-mail já está cadastrado");
  }

  usuarios.push(dados);
  localStorage.setItem(STORAGE_KEYS.USUARIOS, JSON.stringify(usuarios));

  return dados;
}
