import React, { useEffect, useState } from 'react'

// Componentes
import Header from '../componentes/Header';
import Card from "../componentes/productCard";
import ModalEditarProduto from '../componentes/ModalEditarProduto';
import Footer from '../componentes/Footer';

/* Dados da API FAKE */
import type { ICarrinhoItem } from '../interface/carrinho-interface';
import {listarCarrinhoCompleto, removerProdutoAPI } from "../services/api";
import { adicionarAoCarrinho } from '../services/api';

// import { Produtos } from './data/Produtos';
import type { IProduto } from '../interface/produto-interface';
import Popup from '../componentes/Popup';

// Hooks
import { useProdutos } from '../hooks/useProdutos';

function Produto() {
    const { produtos, setProdutos} = useProdutos();
    const [carrinho, setCarrinho] = useState<ICarrinhoItem[]>([]);
    const [produtoEditando, setProdutoEditando] = useState<IProduto | null>(null);

    // Pop-up
    const [popupConfig, setPopupConfig] = React.useState({
      visivel: false,
      mensagem: '',
      tipo: '' as 'sucesso' | 'erro' | ''
    });

    // Função utilitária para não repetir código
    const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
        setPopupConfig({ visivel: true, mensagem: msg, tipo: tipo });
        setTimeout(() => setPopupConfig(prev => ({ ...prev, visivel: false })), 3000);
    };

    const [page, setPage] = useState("produtos"); // Controle da seção atual

    // Carregar produtos da API na inicialização
    useEffect(() => {
        async function carregar() {
          // Carrega produtos e carrinho para garantir que ambos estejam atualizados
          const dadosCarrinho = await listarCarrinhoCompleto();
          setCarrinho(dadosCarrinho)
        }
        carregar();
    }, []);

    async function adicionarCarrinho(produto: IProduto) {
      await adicionarAoCarrinho({
          id: produto.id,
          produtoId: produto.id,
          quantidade: 1
      });

      const dados = await listarCarrinhoCompleto();
      setCarrinho(dados);

      exibirMensagem("Produto adicionado ao carrinho!", "sucesso");
    }

    function editarProduto(produto: IProduto){
      setProdutoEditando(produto);
    }

    function atualizarProdutoLista(produtoAtualizado: IProduto){
      exibirMensagem("Produto atualizado com sucesso!", "sucesso");
      setProdutos(prev =>
        prev.map(p =>
          p.id === produtoAtualizado.id ? produtoAtualizado : p
        )
      );
    }

    return(
        <>
          <Header activePage={page} onChangePage={setPage} carrinhoCount={carrinho.length} />

          {/* Seção dos Cards */}
          {page === "produtos" && (
            <div className="card-section">
              {produtos.map(produto => (
                <Card 
                  key={produto.id} {...produto}  
                  onAddCarrinho={adicionarCarrinho}
                  onEditarProduto={() => editarProduto(produto)}
                  onRemoveProduto={removerProdutoAPI}
                />
              ))}
            </div>
          )}

          <footer style={{width: "100%"}}>
            <Footer />
          </footer>

          {/* Modal de Edição */}
          <ModalEditarProduto
            produto={produtoEditando}
            onClose={() => setProdutoEditando(null)}
            onProdutoAtualizado={atualizarProdutoLista}
          />


          {/* POPUP */}
          <Popup 
            visivel={popupConfig.visivel}
            mensagem={popupConfig.mensagem}
            tipo={popupConfig.tipo}
          />
        </>
    );

}

export default Produto;