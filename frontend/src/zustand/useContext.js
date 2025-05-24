import { create } from 'zustand';

const useContext = create((set) => ({
    data: null,
    setData: (text) => set({ data: text }),

    newData: null,
    setNewData: (text) => set({ newData: text }),

    history: null,
    setHistory: (text) => set({ history: text }),
}));

export default useContext;