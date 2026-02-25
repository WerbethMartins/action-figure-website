import { useEffect, useState } from "react";
import { listarPedidos } from "../services/api";
import type { IPedido } from "../interface/pedidoInterface";

function MeusPedidos(){
    const [pedidos, setPedidos] = useState<IPedido[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarPedidos() {
            try {
                const data = await listarPedidos();
                setPedidos(data);
            }catch(error){
                console.error("Erro ao carregar pedidos!", error);
            }finally {
                setLoading(false);
            }
        }

        carregarPedidos();
    }, []);

    if(loading) {
        return <p>Carregando pedidos...</p>;
    }

    return (
        <div className="orders-container">
            <h1>📦 Meus Pedidos</h1>

            {pedidos.length === 0 && (
                <p>Você ainda não realizou nenhum pedido.</p>
            )}

            {pedidos.map((pedido) => (
                <div className="orders-card" key={pedido.id}>
                <div className="card-header">
                    <span>
                    <strong>Pedido #{pedido.id}</strong>
                    </span>
                    <span>{new Date(pedido.data).toLocaleString()}</span>
                </div>

                <div className="orders-body">
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

                    <p className="total">
                    <strong>Total:</strong> R$ {pedido.total.toFixed(2)}
                    </p>

                    <p>
                    {pedido.parcelas}x de R$ {pedido.valorParcela.toFixed(2)}
                    </p>
                </div>

                <button
                    className="btn-details"
                    onClick={() => alert("Vamos implementar detalhes depois 😄")}
                >
                    Ver detalhes
                </button>
                </div>
            ))}
        </div>
    );
}

export default MeusPedidos;