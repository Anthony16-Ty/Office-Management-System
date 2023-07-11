import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { AiFillProject } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaUserFriends } from "react-icons/fa";
import { SiReacthookform } from 'react-icons/si';
import { FaWpforms } from 'react-icons/fa';
import Logo from '../assets/images/logo.svg';
import HamburgerButton from './HamburgerMenuButton/HamburgerButton';

const StaffSide = ({ dashboardType, updateLoggedIn }) => {
  const [open, setOpen] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const location = useLocation();

  const navigate = useNavigate()


  function handlelogout() {
    updateLoggedIn(false)
    navigate("/")
  }

  const Menus = [
    { title: "Profile", path: '/profile', src: <FaUserFriends />},
    { title: 'Projects', path: '/projects', src: <AiFillProject /> },
    { title: 'Tasks', path: '/tasks', src: <FaTasks /> },
    { title: 'TimeSheets', path: '/timesheets', src: <AiOutlineFieldTime /> },
    { title: 'Leave Forms', path: '/leave-form', src: <SiReacthookform /> },
    { title: 'Leave Reports', path: '/leave-report', src: <FaWpforms /> },
  ];

  return (
    <>
      <div
        className={`${
          open ? 'w-60' : 'w-fit'
        } hidden sm:block fixed top-0 left-0 h-screen duration-300 bg-gray-800 border-r border-gray-200 dark:border-gray-600 p-5 dark:bg-gray-900`}
      >
        <BsArrowLeftCircle
          className={`${
            !open && 'rotate-180'
          } absolute text-3xl bg-white fill-slate-800 rounded-full cursor-pointer top-9 -right-4 dark:fill-gray-400 dark:bg-gray-800`}
          onClick={() => setOpen(!open)}
        />
        <Link to="/">
          <div className={`flex ${open && 'gap-x-4'} items-center`}>
            <img src={Logo} alt="" className="pl-2" />
            {open && (
              <span className="text-xl font-medium whitespace-nowrap dark:text-white">
                OMS
              </span>
            )}
          </div>
        </Link>
        <button
            className="text-sm text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-full"
            onClick={handlelogout}
          >
            Logout
          </button>

        <ul className="pt-6">
          {Menus.map((menu, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-6 p-4 text-base font-normal rounded-lg cursor-pointer dark:text-white hover:bg-gray-700
              ${menu.gap ? 'mt-9' : 'mt-2'} ${
                location.pathname ===
                (dashboardType === 'staff'
                  ? `/stdashboard${menu.path}`
                  : `/admindashboard${menu.path}`)
                  ? 'bg-black dark:bg-gray-700'
                  : ''
              }`}
            >
              <Link
                to={
                  dashboardType === 'staff'
                    ? `/stdashboard${menu.path}`
                    : `/admindashboard${menu.path}`
                }
                className="flex items-center gap-x-2"
              >
                <span className="text-2xl">{menu.src}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left duration-300 hover:block`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          ))}


        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="pt-3">
        <HamburgerButton
          setMobileMenu={setMobileMenu}
          mobileMenu={mobileMenu}
        />
      </div>
      <div className="sm:hidden">
        <div
          className={`${
            mobileMenu ? 'flex' : 'hidden'
          } absolute z-50 flex-col items-center self-end py-8 mt-16 space-y-6 font-bold sm:w-auto left-6 right-6 dark:text-white bg-gray-900 drop-shadow md rounded-xl`}
        >
          {Menus.map((menu, index) => (
            <Link
              to={
                dashboardType === 'staff'
                  ? `/stdashboard${menu.path}`
                  : `/admindashboard${menu.path}`
              }
              key={index}
              onClick={() => setMobileMenu(false)}
            >
              <span
                className={` ${
                  location.pathname ===
                  (dashboardType === 'staff'
                    ? `/stdashboard${menu.path}`
                    : `/admindashboard${menu.path}`)
                    ? 'bg-gray-700'
                    : ''
                } p-2 rounded-xl hover:bg-gray-700`}
              >
                {menu.title}
              </span>
            </Link>

          ))}
        </div>
      </div>
    </>
  );
};

export default StaffSide;
