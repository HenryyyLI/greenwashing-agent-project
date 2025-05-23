import { create } from 'zustand';

const useContext = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

    messages: [],
    setMessages: (messages) => set({ messages }),

    fileResponse: null,
    setFileResponse: (text) => set({ fileResponse: text }),
}));

export default useContext;
