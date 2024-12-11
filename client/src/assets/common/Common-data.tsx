import React from "react"
import { FaHome } from "react-icons/fa"
import { BsCalendar2DateFill, BsChatTextFill, BsCheckCircleFill } from "react-icons/bs"
import { FaBuildingUser, FaFilePen } from "react-icons/fa6"
import { HiDocumentSearch } from "react-icons/hi"
import { TbTableFilled } from "react-icons/tb"
import { IoMdAnalytics } from "react-icons/io"
import { RiAppsFill } from "react-icons/ri"
import { ICommonVar } from "../../../../common/types/Global-types"
import { IDeviceCity } from "../../types/Device-types"



type INavBarDataListElement = {
	id: string;
	title: string;
	icon: ICommonVar['icon'];
	link: string;
}
export const NAV_BAR_LIST: INavBarDataListElement[] = [
	{
		id: 'home',
		title: 'Главная',
		icon: <FaHome className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tasks',
		title: 'Задачи',
		icon: <BsCheckCircleFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'chats',
		title: 'Чаты',
		icon: <BsChatTextFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'calendar',
		title: 'Календарь',
		icon: <BsCalendar2DateFill className='fa-icon'/>,
		link: '',
	},
	{
		id: 'notes',
		title: 'Заметки',
		icon: <FaFilePen className='fa-icon'/>,
		link: '',
	},
	{
		id: 'reporting',
		title: 'Отчётность',
		icon: <HiDocumentSearch className='fa-icon'/>,
		link: '',
	},
	{
		id: 'tables',
		title: 'Таблицы',
		icon: <TbTableFilled className='fa-icon'/>,
		link: '',
	},
	{
		id: 'analytics',
		title: 'Аналитика',
		icon: <IoMdAnalytics className='fa-icon'/>,
		link: '',
	},
	{
		id: 'company',
		title: 'Компания',
		icon: <FaBuildingUser className='fa-icon'/>,
		link: '',
	},
	{
		id: 'apps',
		title: 'Приложения',
		icon: <RiAppsFill className='fa-icon'/>,
		link: '',
	},
]

export const CITIES_LIST: IDeviceCity[] = [
	{
		id: 'molodechno',
		title: 'Молодечно',
	},
	{
		id: 'krasnoe',
		title: 'Красное',
	},
	{
		id: 'polock',
		title: 'Полоцк',
	},
	{
		id: 'glubokoe',
		title: 'Глубокое',
	},
	{
		id: 'radoshkovochi',
		title: 'Радошковичи',
	},
	{
		id: 'turly',
		title: 'Тюрли',
	},
]