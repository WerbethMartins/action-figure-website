import { useEffect, useState } from "react";

// Context
import { useAuth } from "../context/AuthContext";

// Api
import { listarPedidosPorUsuario, listarProdutos } from "../services/api";

// Interfaces
import type { IPedido } from "../interface/pedidoInterface";
import type { IProduto } from "../interface/produto-interface";

// Imagens
import defaultImage from "../assets/img/commercial.png";
import Footer from "../componentes/Footer";

function MeusPedidos(){
    const {usuario} = useAuth();
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [produtos, setProdutos] = useState<IProduto[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPorPagina = 4;

    useEffect(() => {
        async function carregarDados() {
            try {
                const [pedidosData, produtosData] = await Promise.all([
                    listarPedidosPorUsuario(usuario?.email || ""),
                    listarProdutos()
                ]);

                // Filtrando os pedidos por usuário
                const meusPedidos = pedidosData.filter(
                    (pedido: IPedido) => pedido.clienteEmail === usuario?.email
                )

                console.log("Pedidos:", pedidos);
                console.log("Produtos:", produtos);
                setPedidos(meusPedidos);
                setProdutos(produtosData);

            } catch (error) {
                console.error("Erro ao carregar dados!", error);
            } finally {
                setLoading(false);
            }
        }

        if(usuario) carregarDados(); // Só carrega se houver usuário
    }, [usuario]);

    if(loading) {
        return <p>Carregando pedidos...</p>;
    }


    // Lógica de paginação
    const indiceUltimoItem = paginaAtual * itemsPorPagina;
    const indicePrimeiroItem = indiceUltimoItem - itemsPorPagina;

    // Filtra os pedidos para exibir apenas os do cliente logado
    const pedidosPagina = pedidos.slice(indicePrimeiroItem, indiceUltimoItem);

    // Calcula o total de páginas
    const totalPaginas = Math.ceil(pedidos.length / itemsPorPagina);

    // Se não houver pedidos, botões de navegação ficam desabilitados
    if (pedidos.length === 0) {
        return (
            <>
                <div className="orders-container">
                    <h1 style={{ fontSize: "40px" }}>📦 Meus Pedidos</h1>
                    <p>Você ainda não realizou nenhum pedido.</p>
                </div>
                <footer style={{width: "100%"}}>
                    <Footer />
                </footer>
            </>
        );
    }

    return (
        <>
            <div className="orders-container">
                <h1 style={{ fontSize: "40px" }}>📦 Meus Pedidos</h1>

                {pedidos.length === 0 && (
                    <p>Você ainda não realizou nenhum pedido.</p>
                )}

                {/* Páginação */}
                {pedidosPagina.map((pedido) => {
                    const primeiroItem = pedido.itens?.[0];

                    const produto = produtos.find(
                        (p) => String(p.id) === String(primeiroItem?.produtoId)
                    );

                    const imagemPedido = produto?.image || defaultImage;

                    return (
                        <div className="orders-card" key={pedido.id}>

                            <div className="card-header">
                                <span>
                                    <strong style={{fontSize: "1.2rem", color: "#ee545c"}}>
                                        Pedido #{pedido.id}
                                    </strong>
                                </span>
                                <span>
                                    {new Date(pedido.data).toLocaleString()}
                                </span>
                            </div>

                            <div className="orders-body">

                                <div className="orders-image">
                                    <img
                                        src={imagemPedido}
                                        alt={`Pedido ${pedido.id}`}
                                        style={{
                                            width: "150px",
                                            height: "150px",
                                            objectFit: "cover",
                                            borderRadius: "8px"
                                        }}
                                    />
                                </div>

                                <div className="orders-info">
                                    <p>
                                        <strong>Itens:</strong> {pedido.itens.length}
                                    </p>

                                    <p>
                                        <strong>Subtotal:</strong> R$ {pedido.subTotal.toFixed(2)}
                                    </p>

                                    {pedido.desconto > 0 && (
                                        <p>
                                            <strong>Desconto:</strong> -R$ {pedido.desconto.toFixed(2)}
                                        </p>
                                    )}

                                    <div className="total-information">
                                        <p className="total">
                                            <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                                        </p>
                                        <p>em</p>
                                        <p>
                                            {pedido.parcelas}x de R$ {pedido.valorParcela.toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                                <div className="orders-status">
                                    
                                </div>

                            </div>

                        </div>
                    );
                })}
                
                {/* Páginação */}
                <div className="pagination">
                    <button
                        disabled={paginaAtual === 1}
                        onClick={() => setPaginaAtual(paginaAtual - 1)}
                    >
                        ⬅ Anterior
                    </button>
                    <span>
                        Página {paginaAtual} de {totalPaginas}
                    </span>
                    <button
                        disabled={paginaAtual === totalPaginas}
                        onClick={() => setPaginaAtual(paginaAtual + 1)}
                    >
                        Próxima ➡
                    </button>
                </div>
            </div>
            <footer style={{width: "100%"}}>
                <Footer />
            </footer>
        </>
    );
}

export default MeusPedidos;