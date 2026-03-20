import React, { useState } from "react";
import type { IProduto } from "../interface/produto-interface";

// Hooks
import { useProdutos } from "../hooks/useProdutos";

// Imagens
import cadastroFigure from '../assets/img/cadastro-figure.jpg';

// Componentes
import Popup from '../componentes/Popup';
import Footer from "./Footer";

function Cadastro() {
    const { adicionarProduto, atualizarProduto} = useProdutos();
    const [nome, setNome] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [imagem, setImagem] = useState<string>("");

    const [produtoEditando, setProdutoEditando] = useState<IProduto | null>(null);

    const [popupConfig, setPopupConfig] = React.useState({
        visivel: false,
        mensagem: '',
        tipo: '' as 'sucesso' | 'erro' | ''
    });

    const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
        setPopupConfig({ visivel: true, mensagem:  msg, tipo: tipo});
        setTimeout(() => setPopupConfig(prev => ({...prev, visivel: false })), 3000);
    }

    // Função para criar URL da imagem ao criar um novo Produto
    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagem(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    // Função para lidar com o envio do formulário e salvar ou atualizar o produto na API
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!nome || !description || !price) {
            alert("Preencha todos os campos");
            return;
        }

        const novoProduto: IProduto = {
            id: Date.now(),
            nome,
            description,
            price: parseFloat(price),
            image: imagem,
            destaque: false
        };

        try {
            if(produtoEditando){
                await atualizarProduto(produtoEditando.id, novoProduto);
                exibirMensagem("Produto atualizado com sucesso!", "sucesso");
            } else {
                await adicionarProduto(novoProduto);
                exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
            }

            // limpa o form
            setNome("");
            setDescription("");
            setPrice("");
            setImagem("");
            setProdutoEditando(null);

        } catch (error) {
            console.error("Erro ao salvar produto:", error);
            alert("Erro ao salvar produto.");
        }
    }

    return (
        <>
            <div className='formulario-section'>
                <form className="formulario" onSubmit={handleSubmit}>

                    <label htmlFor="">Imagem do Produto</label>
                    <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />

                    {imagem && (
                        <img
                            src={imagem}
                            alt="preview"
                            style={{ width: "50px", marginTop: "-10px", marginLeft: "5px", borderRadius: "8px" }}
                        />
                    )}

                    <label>Informe o nome do produto</label>
                    <input 
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <div className="desciption-label__header">
                        <label>Informe a descrição</label>
                        <p className="description-label__aviso">A descrição deve ter no máximo 100 caracteres</p>
                    </div>
                    <textarea 
                        className="text-area"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <label>Informe o preço</label>
                    <input 
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                    <button 
                        type="submit" 
                        className="submit-button"
                    >
                        {produtoEditando ? "Atualizar produto" : "Cadastrar produto"}
                    </button>
                </form>
                <div className="image-animated-section">
                    <img src={cadastroFigure} alt="Figura de cadastro" />
                </div>  
            </div>

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>

            {/* Popup */}
            <Popup 
                visivel={popupConfig.visivel}
                mensagem={popupConfig.mensagem}
                tipo={popupConfig.tipo}
            />
        </>
    );
}

export default Cadastro;
