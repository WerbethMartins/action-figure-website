import { useEffect, useState } from "react";
import { listarProdutos, adicionarProdutoAPI, atualizarProdutoAPI, removerProdutoAPI } from "../services/api";
import type { IProduto } from "../interface/produto-interface";

export function useProdutos() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [loading, setLoading] = useState(true);

    async function carregarProdutos(){
        try{
            const data = await listarProdutos();
            setProdutos(data);
        }catch(error){
            console.error("Erro ao carregar produtos", error);
        }finally{
            setLoading(false);
        }
    }

    async function adicionarProduto(produto: IProduto) {
        try {
            const novoProduto = await adicionarProdutoAPI(produto);
            setProdutos(prev => [...prev, novoProduto]);    
        } catch (error) {
            console.error("Erro ao adicionar produto", error);
        }
    }

    async function atualizarProduto(id: number, produto: IProduto){
        try {
            const produtoAtualizado = await atualizarProdutoAPI(produto);
            setProdutos(prev => prev.map(p => p.id === id ? produtoAtualizado : p));
        } catch (error) {
            console.error("Erro ao atualizar produto", error);
        }
    }

    async function removerProduto(id: number){
        try {
            await removerProdutoAPI();
            setProdutos(prev => prev.filter(p => p.id !== id));
            // Alternativa sem refazer a lista completa:    
            setProdutos(prev => {
                const index = prev.findIndex(p => p.id === id);
                if (index === -1) return prev; // Produto não encontrado, retorna lista original
                const novaLista = [...prev];
                novaLista.splice(index, 1); // Remove o produto do array
                return novaLista;
            });
        }catch(error){
            console.log("Erro ao tentar remover um produto!", error);
        }
    }

    useEffect(() => {
        carregarProdutos();
    }, []);

    return{
        produtos,
        setProdutos,
        loading,
        carregarProdutos,
        adicionarProduto,
        atualizarProduto,
        removerProduto
    };
}
