import React, { useState } from "react";

import { Link } from "react-router-dom";

// Navegação
import { useNavigate } from "react-router-dom"; 

// Importação das funções de validação
import { validateForm } from "../hooks/useFormValidation";

// Hooks
import { useAuth } from "../context/AuthContext";

// Interfaces
import { type FormData, type FormErrors } from "../types/formTypes"; 
import Footer from "./Footer";

// Define o estado inicial do formulário
const initialFormData: FormData = {
    nome: "",
    email: "",
    senha: "",
};

// Define o estado inicial dos erros (vazio)
const initialFormErrors: FormErrors = {};

function Formulario() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [errors, setErrors] = useState<FormErrors>(initialFormErrors);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<String | null>(null); // Erro de login

    const { login } = useAuth();
    const navigate = useNavigate();

    // Função genérica para lidar com a mudança nos inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));

        // Limpa o erro de campo enquanto o usuário digita
        if(errors[name as keyof FormErrors]){
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        const validationErrors = validateForm(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
                // Simulando a lógica de login com o Context
                // Aqui é passado os dados para a função criada no AuthContext
                const sucesso = await login(formData.email, formData.senha);

                if (sucesso != null) {
                    navigate("/"); // Manda para a Home após logar
                } else {
                    setApiError("E-mail ou senha inválidos.");
                }
            } catch (error) {
                setApiError("Ocorreu um erro ao conectar ao servidor.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <>
            <section className="form-container">
                <form className="form-login" onSubmit={handleSubmit}>
                    <h2>Entrar na Animes Actions</h2>

                    {/* Exibe o erro geral da API se existi */}
                    {apiError && <p className="error-message-main">{apiError}</p>}
                    
                    <div className="input-group">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Seu nome completo"
                            value={formData.nome}
                            onChange={handleChange}
                            className={errors.nome ? "input-error" : ""}
                        />
                        {errors.nome && <p style={{ color: 'red' }}>{errors.nome}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="exemplo@email.com"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? "input-error" : ""}
                        />
                        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
                    </div>
                    
                    <div className="input-group">
                        <label htmlFor="senha">Senha:</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Sua senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className={errors.senha ? "input-error" : ""}
                        />
                        {errors.senha && <p style={{ color: 'red' }}>{errors.senha}</p>}
                    </div>

                    <button className="btn-submit" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Autenticando..." : "Enviar"}
                    </button>

                    <div className="ask-account-section">
                        <Link to={"criar-conta"}>
                            <p>Não tem cadastro? Criar uma conta!</p>
                        </Link>
                    </div>
                </form>
            </section>

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default Formulario;