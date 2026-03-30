export interface IProduto {
    id: number;
    image: string;
    nome: String;
    description: string;
    price: number;
    destaque?: boolean;
    favorito?: boolean;
}