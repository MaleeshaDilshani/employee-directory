import { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { AuthContext } from "../context/AuthContext";
import { Newspaper, PlusCircle, Pencil, Trash2 } from "lucide-react";

function CompanyNews() {

  const { news, addNews, updateNews, deleteNews } = useContext(NewsContext);
  const { user } = useContext(AuthContext);

  // Modal states
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  // Delete modal
  const [deleteItem, setDeleteItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    category: ""
  });

  /* ADD / EDIT HANDLERS */

  const openAddModal = () => {
    setEditing(null);
    setForm({
      title: "",
      description: "",
      image: "",
      category: ""
    });
    setIsOpen(true);
  };

  const openEditModal = (item) => {
    setEditing(item);
    setForm(item);
    setIsOpen(true);
  };

  const handleSubmit = () => {

    if (!form.title || !form.description) return;

    const newItem = {
      ...form,
      date: new Date().toLocaleDateString()
    };

    if (editing) {
      updateNews({ ...editing, ...newItem });
    } else {
      addNews(newItem);
    }

    setIsOpen(false);
  };

  /* DELETE HANDLERS  */

  const confirmDelete = (item) => {
    setDeleteItem(item);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deleteItem) {
      deleteNews(deleteItem.id);
    }

    setDeleteItem(null);
    setShowDeleteModal(false);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-yellow-100 to-orange-100 p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-700 flex gap-3 items-center">
          <Newspaper size={36} />
          Company News
        </h1>

        {user?.role === "admin" && (
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            <PlusCircle size={18} />
            Add News
          </button>
        )}
      </div>

      {/* News Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {news.map((item) => (
          <div
            key={item.id}
            className="backdrop-blur-lg bg-white/40 border border-white/30 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition"
          >

            <img
              src={item.image || "https://source.unsplash.com/400x300/?office"}
              alt=""
              className="rounded-xl mb-4 h-40 w-full object-cover"
            />

            <span className="bg-indigo-600 text-white px-3 py-1 text-xs rounded-full">
              {item.category || "General"}
            </span>

            <h2 className="text-xl font-bold mt-3 mb-2">
              {item.title}
            </h2>

            <p className="text-gray-700 mb-2">
              {item.description}
            </p>

            <p className="text-sm text-gray-500 mb-3">
              {item.date}
            </p>

            {user?.role === "admin" && (
              <div className="flex gap-4 mt-3">

                <button
                  onClick={() => openEditModal(item)}
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Pencil size={16} /> Edit
                </button>

                <button
                  onClick={() => confirmDelete(item)}
                  className="flex items-center gap-1 text-red-600 hover:underline"
                >
                  <Trash2 size={16} /> Delete
                </button>

              </div>
            )}

          </div>
        ))}
      </div>

      {/*  MODAL ADD / EDIT  */}

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">

            <h2 className="text-xl font-bold mb-4">
              {editing ? "Edit News" : "Add News"}
            </h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              placeholder="Image URL"
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              placeholder="Category"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full border p-2 rounded mb-3"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>

            </div>

          </div>
        </div>
      )}

      {/*  DELETE CONFIRM MODAL  */}

      {showDeleteModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-96 text-center shadow-xl">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Delete News ?
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this news article?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg"
              >
                Delete
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CompanyNews;
