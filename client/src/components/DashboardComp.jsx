import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashboardComp() {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/user/getusers?limit=5');
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts?limit=5');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    const fetchComments = async () => {
      try {
        const res = await fetch('/api/comment/getcomments?limit=5');
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        {[{ label: 'Total Users', value: totalUsers, lastMonth: lastMonthUsers, icon: <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' /> },
          { label: 'Total Comments', value: totalComments, lastMonth: lastMonthComments, icon: <HiAnnotation className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' /> },
          { label: 'Total Posts', value: totalPosts, lastMonth: lastMonthPosts, icon: <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' /> }]
          .map((item, index) => (
            <div key={index} className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
              <div className='flex justify-between'>
                <div>
                  <h3 className='text-gray-500 text-md uppercase'>{item.label}</h3>
                  <p className='text-2xl'>{item.value}</p>
                </div>
                {item.icon}
              </div>
              <div className='flex gap-2 text-sm'>
                <span className='text-green-500 flex items-center'>
                  <HiArrowNarrowUp />
                  {item.lastMonth}
                </span>
                <div className='text-gray-500'>Last month</div>
              </div>
            </div>
          ))}
      </div>
      
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        {[{ title: 'Recent users', data: users, link: '/dashboard?tab=users', headers: ['User image', 'Username'], renderRow: user => ([<img src={user.profilePicture} alt='user' className='w-10 h-10 rounded-full bg-gray-500' />, user.username]) },
          { title: 'Recent comments', data: comments, link: '/dashboard?tab=comments', headers: ['Comment content', 'Likes'], renderRow: comment => ([<p className='line-clamp-2'>{comment.content}</p>, comment.numberOfLikes]) },
          { title: 'Recent posts', data: posts, link: '/dashboard?tab=posts', headers: ['Post image', 'Post Title', 'Category'], renderRow: post => ([<img src={post.image} alt='post' className='w-14 h-10 rounded-md bg-gray-500' />, post.title, post.category]) }]
          .map((section, index) => (
            <div key={index} className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
              <div className='flex justify-between p-3 text-sm font-semibold'>
                <h1 className='text-center p-2'>{section.title}</h1>
                <Link to={section.link} className='text-purple-600 border border-purple-600 px-3 py-1 rounded-md hover:bg-purple-600 hover:text-white'>See all</Link>
              </div>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='border-b'>
                    {section.headers.map((header, idx) => <th key={idx} className='p-2'>{header}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {section.data.map((item, idx) => (
                    <tr key={idx} className='border-b'>
                      {section.renderRow(item).map((cell, cellIdx) => <td key={cellIdx} className='p-2'>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </div>
    </div>
  );
}
