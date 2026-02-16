import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../components/ProductsList";

type ProductWithQty = Product & { quantity: number };

const initialState: { value: ProductWithQty[]; isOpen: boolean } = {
  value: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      const product = state.value.find((item) => item.id === action.payload.id);
      if (product) {
        product.quantity = product.quantity + 1;
      } else {
        state.value.push({ ...action.payload, quantity: 1 });
      }
      state.isOpen = true;
    },
    removeProduct: (state, action: PayloadAction<Product>) => {
      state.value = state.value.filter((item) => item.id !== action.payload.id);
    },
    toggleDrawer: (state) => {
      state.isOpen = !state.isOpen;
    },
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>,
    ) => {
      state.value = state.value.map((item) => {
        if (item.id === action.payload.productId) {
          item.quantity = action.payload.quantity;
        }
        return item;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, toggleDrawer, setOpen, setQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
