import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as SiIcons from 'react-icons/si';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <AiIcons.AiFillProject />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon:<AiIcons.AiOutlineLogin/>,
    cName: 'nav-text'
  },
  {
    title: 'Signup',
    path: '/signup',
    icon: <SiIcons.SiGnuprivacyguard />,
    cName: 'nav-text'
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <FaIcons.FaTasks />,
    cName: 'nav-text'
  },
  {
    title: 'Staff',
    path: '/staff',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },

  {
    title: 'Leave Form ',
    path: '/leave-form ',
    icon: <AiIcons.AiOutlineForm />,
    cName: 'nav-text'
  },
  {
    title: 'Leave Requests ',
    path: '/leave-request ',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Leave Type ',
    path: '/leave-type ',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Timesheets',
    path: '/timesheets',
    icon: <AiIcons.AiOutlineFieldTime />,
    cName: 'nav-text'
  }
];






