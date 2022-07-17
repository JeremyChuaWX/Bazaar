import create from "zustand";

let searchStore = (set) => ({
  items: [],
  nameQuery: "",
  priceRange: { lower: "0", upper: "0" },
  setItems: (newItems) => set({ items: newItems }),
  setNameQuery: (newQuery) => set({ nameQuery: newQuery }),
  setPriceRangeLower: (newLower) =>
    set((state) => ({
      priceRange: {
        ...state.priceRange,
        lower: newLower,
      },
    })),
  setPriceRangeUpper: (newUpper) =>
    set((state) => ({
      priceRange: {
        ...state.priceRange,
        upper: newUpper,
      },
    })),
});

const useSearchStore = create(searchStore);

export default useSearchStore;
