import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const NewsContext = createContext();

export function NewsProvider({ children }) {

  const dummyNews = [
    {
      id: 1,
      title: "Welcome New Marketing Director",
      description: "New director joined company",
      category: "Company",
      image: "https://source.unsplash.com/400x300/?office",
      date: "2026-02-25"
    }
  ];

  const [news, setNews] =
    useLocalStorage("news", dummyNews);

  const addNews = (item) =>
    setNews(prev => [...prev, { ...item, id: Date.now() }]);

  const updateNews = (updated) =>
    setNews(prev =>
      prev.map(n =>
        n.id === updated.id ? updated : n
      )
    );

  const deleteNews = (id) =>
    setNews(prev =>
      prev.filter(n => n.id !== id)
    );

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