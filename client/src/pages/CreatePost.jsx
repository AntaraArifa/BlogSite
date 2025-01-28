import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
  });
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold text-gray-900 dark:text-gray-100">
        Create a post
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            required
            className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="education">Education</option>
            <option value="health">Health & Wellness</option>
            <option value="travel">Travel & Adventure</option>
            <option value="food">Food & Recipes</option>
            <option value="personal-development">Personal Development</option>
            <option value="entertainment">Entertainment</option>
            <option value="finance">Finance & Business</option>
            <option value="sports">Sports & Fitness</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          required
          onChange={(value) => setFormData({ ...formData, content: value })}
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-400 via-blue-600 to-blue-900 hover:opacity-90 transition mt-4"
        >
          Publish
        </button>
        {publishError && (
          <div className="mt-5 text-red-500 dark:text-red-400 font-medium">
            {publishError}
          </div>
        )}
      </form>
    </div>
  );
}