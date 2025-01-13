import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess} from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };

  return (
    <aside className="w-full md:w-56 bg-gray-100 dark:bg-gray-900 h-full p-4">
      <ul className="space-y-2">
        {currentUser && currentUser.isAdmin && (
          <li>
            <Link
              to="/dashboard?tab=dash"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                tab === "dash" || !tab
                  ? "bg-blue-500 text-white"
                  : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
              }`}
            >
              <HiChartPie className="text-xl" />
              Dashboard
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/dashboard?tab=profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
              tab === "profile"
                ? "bg-blue-500 text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
            }`}
          >
            <HiUser className="text-xl" />
            Profile
            {currentUser.isAdmin ? (
              <span className="ml-auto text-sm px-2 py-0.5 bg-gray-300 rounded-full dark:bg-gray-800">
                Admin
              </span>
            ) : (
              <span className="ml-auto text-sm px-2 py-0.5 bg-gray-300 rounded-full dark:bg-gray-800">
                User
              </span>
            )}
          </Link>
        </li>
        {currentUser.isAdmin && (
          <>
            <li>
              <Link
                to="/dashboard?tab=posts"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  tab === "posts"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                }`}
              >
                <HiDocumentText className="text-xl" />
                Posts
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=users"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  tab === "users"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                }`}
              >
                <HiOutlineUserGroup className="text-xl" />
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard?tab=comments"
                className={`flex items-center gap-3 px-4 py-2 rounded-lg ${
                  tab === "comments"
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-800"
                }`}
              >
                <HiAnnotation className="text-xl" />
                Comments
              </Link>
            </li>
          </>
        )}
        <li>
          <button
            onClick={handleSignout}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-100 dark:hover:bg-red-800"
          >
            <HiArrowSmRight className="text-xl text-red-500" />
            Sign Out
          </button>
        </li>
      </ul>
    </aside>
  );
}
