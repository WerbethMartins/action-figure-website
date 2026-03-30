import type { ICarrinhoItem } from './carrinho-interface';

export interface IPedido {
  id?: number;
  image: string;
  data: string;
  clienteEmail: string;
  itens: ICarrinhoItem[];
  subTotal: number;
  desconto: number;
  total: number;
  parcelas: number;
  valorParcela: number;
}