import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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
  const [stock, setStock] = useState<Stock[]>([]);
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem("@RocketShoes:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  useEffect(() => {
    async function loadStock() {
      const response = await api.get("/stock");
      setStock(response.data);
    }
    loadStock();
  }, []);

  const addProduct = async (productId: number) => {
    try {
      const storagedCart = localStorage.getItem("@RocketShoes:cart");
      let storagedCartParsed = storagedCart ? JSON.parse(storagedCart) : [];

      if (storagedCartParsed < 1) {
        const response = await api.get("/products");
        const product = response.data.filter(
          (product: Product) => product.id === productId
        );
        const newArray = {
          id: product[0].id,
          title: product[0].title,
          price: product[0].price,
          image: product[0].image,
          amount: 1,
        };
        storagedCartParsed = newArray;
        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify([storagedCartParsed])
        );
        setCart(storagedCartParsed);
        return;
      }

      const productInToCart = storagedCartParsed.filter(
        (p: Product) => p.id === productId
      );

      if (productInToCart.length < 1) {
        const response = await api.get("/products");
        const product = response.data.filter(
          (product: Product) => product.id === productId
        );
        const newArray = {
          id: product[0].id,
          title: product[0].title,
          price: product[0].price,
          image: product[0].image,
          amount: 1,
        };
        storagedCartParsed.push(newArray);
        localStorage.setItem(
          "@RocketShoes:cart",
          JSON.stringify(storagedCartParsed)
        );
        setCart(storagedCartParsed);
        return;
      }

      const [amount] = productInToCart.map((p: Product) => p.amount);
      await updateProductAmount({ productId, amount });
    } catch {
      console.tron.log("onlysheet");
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
      const amountMaxInToCart = stock.find(
        (product) => product.id === productId
      );

      if (amountMaxInToCart && amountMaxInToCart.amount === amount) {
        toast.error("Quantidade solicitada fora de estoque");
        return;
      }

      const newArray = cart.map((product) => {
        return {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          amount:
            product.id === productId ? product.amount + 1 : product.amount,
        };
      });
      const storagedCart = localStorage.getItem("@RocketShoes:cart");
      let storagedCartParsed = storagedCart && JSON.parse(storagedCart);
      storagedCartParsed = newArray;
      localStorage.setItem(
        "@RocketShoes:cart",
        JSON.stringify(storagedCartParsed)
      );
      setCart(storagedCartParsed);
      return;
    } catch {
      toast.error('Erro na adição do produto');
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
