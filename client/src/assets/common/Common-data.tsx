import React from "react"
import { FaHome } from "react-icons/fa"
import { BsCalendar2DateFill, BsChatTextFill, BsCheckCircleFill } from "react-icons/bs"
import { FaBuildingUser, FaFilePen } from "react-icons/fa6"
import { HiDocumentSearch } from "react-icons/hi"
import { TbTableFilled } from "react-icons/tb"
import { IoMdAnalytics } from "react-icons/io"
import { RiAppsFill } from "react-icons/ri"



type INavBarDataListElement = {
	id: string;
	label: string;
	icon: React.ReactElement;
	link: string;
}
export const NAV_BAR_LIST: INavBarDataListElement[] = [
	{
		id: 'home',
		label: 'Главная',
		icon: <FaHome className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tasks',
		label: 'Задачи',
		icon: <BsCheckCircleFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'chats',
		label: 'Чаты',
		icon: <BsChatTextFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'calendar',
		label: 'Календарь',
		icon: <BsCalendar2DateFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'notes',
		label: 'Заметки',
		icon: <FaFilePen className='fa-icon'/>,
		link: '',
	},
	{
		id: 'reporting',
		label: 'Отчётность',
		icon: <HiDocumentSearch className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tables',
		label: 'Таблицы',
		icon: <TbTableFilled className='fa-icon'/>,
		link: '',
	},
	{
		id: 'analytics',
		label: 'Аналитика',
		icon: <IoMdAnalytics className='fa-icon'/>,
		link: '',
	},
	{
		id: 'company',
		label: 'Компания',
		icon: <FaBuildingUser className='fa-icon'/>,
		link: '',
	},
	{
		id: 'apps',
		label: 'Приложения',
		icon: <RiAppsFill className='fa-icon'/>,
		link: '',
	},
]