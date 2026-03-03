import { useState, useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import { PlusCircle } from "lucide-react";

function AddNewsModal() {

  const { addNews } = useContext(NewsContext);
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: "",
    date: new Date().toLocaleDateString()
  });

  const handleSubmit = () => {
    if (!form.title || !form.description) return;

    addNews(form);
    setShow(false);
    setForm({
      title: "",
      description: "",
      image: "",
      category: "",
      date: new Date().toLocaleDateString()
    });
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg"
      >
        <PlusCircle size={18} />
        Add News
      </button>

      {show && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-xl font-bold">Add News</h2>

            <input
              placeholder="Title"
              className="border p-2 w-full rounded"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
              placeholder="Image URL"
              className="border p-2 w-full rounded"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />

            <input
              placeholder="Category"
              className="border p-2 w-full rounded"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <textarea
              placeholder="Description"
              className="border p-2 w-full rounded"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="flex justify-end gap-3">
              <button onClick={() => setShow(false)}>Cancel</button>
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AddNewsModal;
