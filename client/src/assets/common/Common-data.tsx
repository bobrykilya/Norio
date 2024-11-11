import React from "react"
import { IoHome } from "react-icons/io5"
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
		id: 'home_page',
		label: 'Главная',
		icon: <IoHome className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tasks_page',
		label: 'Задачи',
		icon: <BsCheckCircleFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'chats_page',
		label: 'Чаты',
		icon: <BsChatTextFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'calendar_page',
		label: 'Календарь',
		icon: <BsCalendar2DateFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'notes_page',
		label: 'Заметки',
		icon: <FaFilePen className='fa-icon'/>,
		link: '',
	},
	{
		id: 'reporting_page',
		label: 'Отчётность',
		icon: <HiDocumentSearch className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tables_page',
		label: 'Таблицы',
		icon: <TbTableFilled className='fa-icon'/>,
		link: '',
	},
	{
		id: 'analytics_page',
		label: 'Аналитика',
		icon: <IoMdAnalytics className='fa-icon'/>,
		link: '',
	},
	{
		id: 'company_page',
		label: 'Компания',
		icon: <FaBuildingUser className='fa-icon'/>,
		link: '',
	},
	{
		id: 'apps_page',
		label: 'Приложения',
		icon: <RiAppsFill className='fa-icon'/>,
		link: '',
	},
]