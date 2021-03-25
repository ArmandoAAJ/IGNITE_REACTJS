import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/api";
import { Product, Stock } from "../types";

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}


interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      const productInToCart = cart.find((product) => product.id === productId);

      if (!productInToCart) {
        const { data: product } = await api.get<Product>(
          `/products/${productId}`
        );
        const { data: stock } = await api.get<Stock>(`/stock/${productId}`);
        if (stock.amount > 0) {
          const newProduct = {
            ...product,
            amount: 1,
          };
          localStorage.setItem(
            "@RocketShoes:cart",
            JSON.stringify([...cart, newProduct])
          );
          setCart([...cart, newProduct]);
          toast.success("Producto adicionado com sucesso.");
        }
      }

      if (productInToCart) {
        const { data: stock } = await api.get<Stock>(`/stock/${productId}`);
        if (stock.amount > productInToCart.amount) {
          const updateProduct = cart.map((product) =>
            product.id === productId
              ? {
                  ...product,
                  amount: product.amount + 1,
                }
              : product
          );
          localStorage.setItem(
            "@RocketShoes:cart",
            JSON.stringify(updateProduct)
          );
          setCart(updateProduct);
          toast.success("Producto adicionado com sucesso.");
        } else {
          toast.error("Quantidade solicitada fora de estoque");
        }
      }
    } catch {
      toast.error("Erro na adição do produto");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExist = cart.some((product) => product.id === productId);
      if (!productExist) {
        toast.error("Erro na remoção do produto");
        return;
      }
      const newProduct = cart.filter((product) => product.id !== productId);
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(newProduct));
      setCart(newProduct);
    } catch {
      toast.error("Erro na remoção do produto");
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if (amount < 1) {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      const response = await api.get<Stock>(`/stock/${productId}`);
      const productAmount = response.data.amount;
      const stockNotAvalable = amount > productAmount;
      if (stockNotAvalable) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const productExist = cart.some((product) => product.id === productId);
      if (!productExist) {
        toast.error("Erro na alteração de quantidade do produto");
        return;
      }

      const updateProduct = cart.map((product) =>
        product.id === productId
          ? {
              ...product,
              amount: amount,
            }
          : product
      );
      localStorage.setItem("@RocketShoes:cart", JSON.stringify(updateProduct));
      setCart(updateProduct);
    } catch {
      toast.error("Erro na alteração de quantidade do produto");
    }
  };

 
  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        updateProductAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
