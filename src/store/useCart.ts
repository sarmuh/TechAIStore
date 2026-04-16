import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Mahsulot turi
export type CartItem = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

// Store interfeysi
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      // Savatga qo'shish logikasi
      addItem: (item) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((i) => i.id === item.id);
        
        if (existingItem) {
          // Agar bor bo'lsa, sonini bittaga oshiramiz
          set({
            items: currentItems.map((i) => 
              i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            )
          });
        } else {
          // Yo'q bo'lsa, yangi qo'shamiz
          set({ items: [...currentItems, { ...item, quantity: 1 }] });
        }
      },

      // Savatdan o'chirish logikasi
      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      // Savatni tozalash
      clearCart: () => set({ items: [] }),

      // Umumiy summani hisoblash
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
    }),
    {
      name: 'techstore-cart', // LocalStorage'da shu nom bilan saqlanadi
    }
  )
);