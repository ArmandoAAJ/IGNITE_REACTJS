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
      const productExist = cart.filter((product) => product.id === productId);

      if (productExist.length < 1) {
        const storagedCart = localStorage.getItem("@RocketShoes:cart");
        const response = await api.get("/products");
        const product = response.data.filter(
          (product: Product) => product.id === productId
        );

        if (storagedCart) {
          const storagedCartParsed = JSON.parse(storagedCart);
          storagedCartParsed.push(product[0]);

          localStorage.setItem(
            "@RocketShoes:cart",
            JSON.stringify(storagedCartParsed)
          );
          setCart(storagedCartParsed);
        } else {
          localStorage.setItem("@RocketShoes:cart", JSON.stringify(product));
          setCart(product);
        }
      }
    } catch {
      console.tron.log("merdaaaaa");
    }
  };

  const removeProduct = (productId: number) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      // TODO
    } catch {
      // TODO
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
