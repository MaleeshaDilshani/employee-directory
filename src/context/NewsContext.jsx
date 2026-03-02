import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NewsContext = createContext();

export function NewsProvider({ children }) {

  const [news, setNews] = useLocalStorage("news", []);

  const addNews = (item) => {
    setNews(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const updateNews = (updatedItem) => {
    setNews(prev =>
      prev.map(n => n.id === updatedItem.id ? updatedItem : n)
    );
  };

  const deleteNews = (id) => {
    setNews(prev =>
      prev.filter(n => n.id !== id)
    );
  };

  return (
    <NewsContext.Provider value={{
      news,
      addNews,
      updateNews,
      deleteNews
    }}>
      {children}
    </NewsContext.Provider>
  );
}
