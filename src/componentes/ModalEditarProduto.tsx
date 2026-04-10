import React, { useState, useEffect } from "react";

/* Dados da API FAKE */
import type { IProduto } from "../interface/produto-interface";
import { atualizarProdutoAPI } from "../services/api";

interface ModalEditarProdutoProps {
    produto: IProduto | null;
    onClose: () => void;
    onProdutoAtualizado: (produto: IProduto) => void;
}

function ModalEditarProduto({ produto, onClose, onProdutoAtualizado }: ModalEditarProdutoProps) {
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        if (produto) {
            setNome(String(produto.nome));
            setDescription(String(produto.description));
            setPrice(produto.price.toString());
        }
    }, [produto]);

    if(!produto) return null;

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        if(!produto) return;

        const produtoAtualizado: IProduto = {
            id: produto.id,
            nome,
            description,
            price: parseFloat(price),
            image: produto.image,
            thumbnails: produto.thumbnails,
        };

        try {
            const atualizado = await atualizarProdutoAPI(produtoAtualizado);
            onProdutoAtualizado(atualizado);
            onClose();
        }catch(error){
            console.log("Erro ao atualizar o produto!", error);
        }
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>Editar Produto</h2>

                <form className="form" onSubmit={handleSubmit}>
                    <input
                        className="input-text"
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome"
                    />
                    <textarea
                        className="input-text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className="modal-buttons">

                        <button className="save-button" type="submit">Salvar</button>

                        <button className="cancel-button" type="button" onClick={onClose}>
                            Cancelar
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalEditarProduto;