import React from "react";

// Context
import { useAuth } from "../context/AuthContext";

// Pop-up
import Popup from "./Popup";

// Interface
import type { IProduto } from "../interface/produto-interface";

// Services
import { toggleDestaqueProduto, toggleFavoritoProduto } from "../services/api"; 

// Interface para as props do Card, estendendo IProduto e adicionando funções opcionais para ações
interface cardProps extends IProduto {
    onAddCarrinho?: (produto: IProduto) => void;
    onRemoveProduto?: (id: number) => void;
    onEditarProduto?: (produto: IProduto) => void;
    destaque?: boolean;
    favorito?: boolean;
}

function Card({ image, nome, price, description, id, onAddCarrinho, onRemoveProduto, onEditarProduto, destaque, favorito }: cardProps) {

    const {usuario} = useAuth();

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
    }

    // Função para lidar com a adição ao carrinho
    function handleAdd(){
        if(onAddCarrinho) {
            onAddCarrinho({ id, image, nome, price, description });
            exibirMensagem("Produto adicionado ao carrinho!", "sucesso");
        }
    }

    // Função para lidar com a edição do produto
    function handleUpdate(){
        if(onEditarProduto){
            onEditarProduto({ id, image, nome, price, description });
            exibirMensagem("Produto carregado para edição!", "sucesso");
        }
    }

    // Função para lidar com a remoção do produto
    function handleRemove(){
        if(onRemoveProduto){
            onRemoveProduto(id);
            exibirMensagem("Produto removido!", "sucesso");
        }
    }

    async function handleToggleDestaque() {
        try {
            await toggleDestaqueProduto({
                id,
                nome,
                description,
                price,
                image,
                destaque
            });

            exibirMensagem("Destaque atualizado!", "sucesso");

        } catch {
            exibirMensagem("Erro ao atualizar destaque", "erro");
        }
    }

    async function handleToggleFavorite() {
        try {
            await toggleFavoritoProduto({
                id,
                nome,
                description,
                price, 
                image, 
                favorito
            });

            exibirMensagem("Produto favoritado!", "sucesso");
        }catch{
            exibirMensagem("erro ao favoritar o produto", "erro");
        }
    }

    return (
         <>      
            <div className="card">
                <div className="card-header">
                    {usuario?.role === 'admin' && (
                        <button
                        className="star-btn"
                        onClick={() => handleToggleDestaque()}
                    >
                        {destaque ? "⭐" : "☆"}
                    </button>
                    )}
                    {usuario && (
                        <button
                            className="heart-btn"
                            onClick={() => handleToggleFavorite()}
                        >
                            {favorito ? "❤️" : "🤍"}
                        </button>
                    )}
                    <img src={image} />
                </div>

                <div className="card-title">
                    <h3>{nome}</h3>
                </div>

                <div className="card-description">
                    <p>{description}</p>
                </div>

                <div className="card-footer">
                    <strong>Preço:  R$ {price}</strong>
                </div>
                <div className="card-button">
                    <button className="add-button" onClick={handleAdd}> <strong className="card-icon"> 🛒 </strong></button>
                    <button className="remove-button" onClick={() => handleRemove()}>X</button>
                    <button className="update-button" onClick={() => handleUpdate()}>✏️</button>
                </div>
            </div>

            {/* Popup */}
            <Popup 
                visivel={popupConfig.visivel}
                mensagem={popupConfig.mensagem}
                tipo={popupConfig.tipo}
            />
       </>
    );
}

export default Card;

