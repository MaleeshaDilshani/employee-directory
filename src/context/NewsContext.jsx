import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

/* ⭐ Dummy Seed Data */
const newsSeedData = [
  {
    id: 1,
    title: "Welcome New Marketing Director",
    description:
      "Please join us in welcoming Aisha Thompson as our new Marketing Director. She brings 12 years of experience in B2B marketing.",
    category: "Company",
    date: "2/5/2026",
    image: "hhttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfHfSl9dGFUAighktQi7Bk88WyDp8LiqFQdg&s"
  },
  {
    id: 2,
    title: "All Hands Meeting Recap",
    description:
      "Quarterly meeting highlights including roadmap updates and company expansion plans.",
    category: "Company",
    date: "2/23/2026",
    image: "https://source.unsplash.com/400x300/?meeting"
  }
];

export const NewsContext = createContext();

export function NewsProvider({ children }) {

  /* ⭐ LocalStorage + Seed Data */
  const [news, setNews] = useLocalStorage("news", newsSeedData);

  /* ⭐ Add News */
  const addNews = (item) => {
    setNews(prev => [
      ...prev,
      {
        ...item,
        id: Date.now(),
        date: new Date().toLocaleDateString()
      }
    ]);
  };

  /* ⭐ Update News */
  const updateNews = (updatedItem) => {
    setNews(prev =>
      prev.map(n =>
        n.id === updatedItem.id ? updatedItem : n
      )
    );
  };

  /* ⭐ Delete News */
  const deleteNews = (id) => {
    setNews(prev => prev.filter(n => n.id !== id));
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