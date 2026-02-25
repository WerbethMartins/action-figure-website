import { useLocation, useNavigate } from "react-router-dom";

function PedidoConcluido(){
    const navigate = useNavigate();
    const location = useLocation();

    // Dados do pedido enviado via navigate
    const pedido = location.state?.pedido;

    return(
        <div className="order-container">
            <div className="order-card">
                <div className="card-header">
                    <h3 className="title">Resumo da Compra</h3>
                    <p className="sub-title">Seu pedido foi realizado com sucesso.</p>
                </div>

                {pedido  && (
                    <div className="order-summary list">
                        <div className="item-list order-summary__date">
                            <strong>Data:</strong>
                            <p>{new Date(pedido.data).toLocaleString()}</p>
                        </div>
                        <div className="item-list order-summary__items">
                            <strong>Itens:</strong>
                            <p> {pedido.itens.length}</p>
                        </div>
                        <div className="item-list order-summary__subtotal">
                            <strong>Subtotal:</strong>
                            <p> R$ {pedido.subTotal.toFixed(2)}</p>
                        </div>

                        {pedido.desconto > 0 && (
                            <div className="item-list order-summary__discount">
                                <strong>Desconto:</strong>
                                <p>R$ {pedido.desconto.toFixed(2)}</p>
                            </div>
                        )}
                        <div className="item-list order-summary__total">
                            <strong>Total:</strong>
                            <p> R$ {pedido.total.toFixed(2)}</p>
                        </div> 
                        <div className="item-list order-summary__payment">
                            <strong>Pagamento:</strong>
                            {pedido.parcelas}x de R$ {pedido.valorParcela.toFixed(2)}
                        </div>
                        <div className="item-list order-summary__status">
                            <strong>Status:</strong>
                            <p className="status">Pendente</p>
                        </div>   
                    </div>
                )}

                <div className="button-actions-section">
                    <button className="actions-button" onClick={() => navigate("/pedidos")}>
                        Ver meus pedidos
                    </button>
                    <button className="actions-button" style={{ backgroundColor: "#ff3c3c", color: "#fff" }} onClick={() => navigate("/produtos")}>
                        Cancelar Pedido
                    </button> 

                    <button className="actions-button" onClick={() => navigate("/")}>
                        Voltar para produtos
                    </button>
                </div>

                <div className="thanks-section">
                    <h4 className="title">Agradecemos pela sua compra!</h4>
                    <p className="sub-title">Em breve, você receberá um e-mail com os detalhes do seu pedido.</p>
                </div>
            </div>
        </div>
    );
}

export default PedidoConcluido;