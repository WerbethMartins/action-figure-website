import React, { useState } from "react";

// Navigation
import { Link, useNavigate } from "react-router-dom";

// Context
import { useAuth } from "../context/AuthContext";

// Hooks
import { validateForm } from "../hooks/useFormValidation";

// Componentes
import Popup from "../componentes/Popup";
import Footer from "../componentes/Footer";

function CadastrarUsuario() {
    const [errors, setErrors] = useState<any>({});
    const [apiError, setApiError] = useState<string | null>(null);
    const { cadastrar, loading } = useAuth(); // Função que vamos adicionar no Context
    const navigate = useNavigate();

    // Estado do formulário
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmarSenha: ""
    });

    // Pop-up
    const [PopupConfig, setPopupConfig] = React.useState({
        visiviel: false,
        mensagem: '',
        tipo: '' as 'sucesso' | 'erro' | ''   
    });

    // Função utilitaria
    const exibirMensagem = (msg: string, tipo: 'sucesso' | 'erro') => {
        setPopupConfig({ visiviel: true, mensagem: msg, tipo: tipo});
        setTimeout(() => setPopupConfig(prev => ({ ...prev, visiviel: false})), 3000);
    }

    // Função genérica para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        // Validação básica
        const validationErrors = validateForm(formData);
        
        // Validação extra: Senhas iguais
        if (formData.senha !== formData.confirmarSenha) {
            validationErrors.validarSenha = "As senhas não coincidem.";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            try {
                // Aqui chamamos a lógica de cadastro (Firebase/API)
                const sucesso = await cadastrar(formData.email, formData.senha, formData.nome);
                if (sucesso) {
                    exibirMensagem("Usuário criado com sucesso!", 'sucesso');
                    navigate("/");
                } else {
                    setApiError("Este e-mail já está em uso.");
                }
            } catch (err: any) {
                setApiError(err.message || "Erro ao criar conta. Tente novamente mais tarde.");
            } finally {
                // Limpa erros anteriores ao tentar novamente
                setErrors({});
            }
        }
    };

    return (
        <>
            <div className="auth-page">
                <form className="form-register" onSubmit={handleSubmit}>
                    <h2 className="form-title">Criar Conta</h2>
                    <p className="subtitle">Junte-se à comunidade Animes Actions.F</p>

                    {apiError && <p className="error-message-main">{apiError}</p>}

                    <div className="input-group">
                        <label>Nome Completo</label>
                        <input
                            type="text"
                            name="nome"
                            placeholder="Ex: Fernando Silva"
                            value={formData.nome}
                            onChange={handleChange}
                            className={errors.nome ? "input-error" : ""}
                        />
                        {errors.nome && <span className="error-text">{errors.nome}</span>}
                    </div>

                    <div className="input-group">
                        <label>E-mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="seu@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label>Senha</label>
                        <input
                            type="password"
                            name="senha"
                            placeholder="Mínimo 6 caracteres"
                            value={formData.senha}
                            onChange={handleChange}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <span className="error-text">{errors.senha}</span>}
                    </div>

                    <div className="input-group">
                        <label>Confirmar Senha</label>
                        <input
                            type="password"
                            name="confirmarSenha"
                            placeholder="Repita sua senha"
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            className={errors.confirmarSenha ? "input-error" : ""}
                        />
                        {errors.confirmarSenha && <span className="error-text">{errors.confirmarSenha}</span>}
                    </div>

                    <button type="submit" disabled={loading} className="btn-submit">
                        {loading ? <div className="spinner"></div> : "Criar Conta"}
                    </button>

                    <div className="form-footer">
                        <p>Já tem uma conta? <Link to="/entrar">Faça Login</Link></p>
                    </div>
                </form>
            </div>

            {/* Popup */}
            <Popup 
                visivel={PopupConfig.visiviel}
                mensagem={PopupConfig.mensagem}
                tipo={PopupConfig.tipo}
            />

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default CadastrarUsuario;