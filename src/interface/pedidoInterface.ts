import type { ICarrinhoItem } from './carrinho-interface';

export interface IPedido {
  id?: number;
  data: string;
  itens: ICarrinhoItem[];
  subTotal: number;
  desconto: number;
  total: number;
  parcelas: number;
  valorParcela: number;
}