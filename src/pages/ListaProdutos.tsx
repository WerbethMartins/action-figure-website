import { useState, useEffect } from "react";
import type { IProduto } from "../interface/produto-interface";

// Componentes
import Card from "../componentes/productCard";
import Footer from "../componentes/Footer";

function ListaProdutos() {
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState<String | null>(null)

    useEffect(() => {
        async function fetchProdutos() {
            try {
                const response = await fetch("http://localhost:3000/produtos");
                if (!response.ok) throw new Error("Erro ao carregar produtos");
                const data = await response.json();
                setProdutos(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }   
        }

        fetchProdutos();
    }, []);

    if (loading) return <p>Carregando produtos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <h1>Cadastro de Produtos</h1>

            <div className="lista-produtos">
                {produtos.map((item) => (
                    <Card 
                        key={item.id}
                        id={item.id}
                        image={item.image}
                        nome={item.nome}
                        description={item.description}
                        price={item.price}
                    />
                ))}
            </div>

            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default ListaProdutos;
