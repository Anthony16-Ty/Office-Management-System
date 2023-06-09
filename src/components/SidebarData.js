import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

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
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Login',
    path: '/login',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Signup',
    path: '/signup',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <FaIcons.FaCartPlus />,
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
    icon: <FaIcons.FaEnvelopeOpenText />,
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
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  }
];