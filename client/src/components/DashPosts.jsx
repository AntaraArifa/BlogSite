import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  // Fetch posts on component load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        console.log(data); // Log API response
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    if (currentUser?.isAdmin) {
      fetchPosts();
    }
  }, [currentUser]); // Added proper dependency

  // Show more posts
  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      console.log(data); // Log API response for debugging
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      } else {
        console.error('Failed to fetch more posts:', data.message);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error.message);
    }
  };

  // Delete post
  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.error('Failed to delete post:', data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
      }
    } catch (error) {
      console.error('Error deleting post:', error.message);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto">
      {currentUser?.isAdmin && userPosts.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 shadow-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Date Updated</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Post Image</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Post Title</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Category</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Delete</th>
                <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">Edit</th>
              </tr>
            </thead>
            <tbody>
              {userPosts.map((post, index) => (
                <tr
                  key={post._id}
                  className={`text-center ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                  } hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                >
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500 rounded"
                      />
                    </Link>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <Link to={`/post/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:underline">
                      {post.title}
                    </Link>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-gray-900 dark:text-gray-100">{post.category}</td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <button
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600 hover:underline"
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-blue-600 dark:text-blue-400 mt-5 text-sm hover:underline"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-900 dark:text-gray-100">You have no posts yet!</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-96">
            <h3 className="text-lg mb-4 text-gray-900 dark:text-gray-100">Are you sure you want to delete this post?</h3>
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDeletePost}
              >
                Yes, I'm sure
              </button>
              <button
                className="bg-gray-300 dark:bg-gray-600 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100"
                onClick={() => setShowModal(false)}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}