import React from "react"
import { FaHome } from "react-icons/fa"
import { BsCalendar2DateFill, BsChatTextFill, BsCheckCircleFill } from "react-icons/bs"
import { FaBuildingUser, FaFilePen } from "react-icons/fa6"
import { HiDocumentSearch } from "react-icons/hi"
import { TbTableFilled } from "react-icons/tb"
import { IoMdAnalytics } from "react-icons/io"
import { RiAppsFill } from "react-icons/ri"
import { IoFemaleOutline, IoMaleFemaleOutline, IoMaleOutline } from "react-icons/io5"
import { ICommonVar } from "../../../../common/types/Global-types"
import { IDeviceLocation } from "../../../../common/types/Device-types"
import { ISelectDropDownOptionListElem } from "../../components/common/SelectDropDown/SelectDropDown"



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

export const LOCATIONS_LIST: IDeviceLocation[] = [
	{
		city: {
			id: 'maladzyechna',
			title: 'Молодечно',
		},
		coords: {
			lat: 54.307332,
			lon: 26.838939,
		}
	},
	{
		city: {
			id: 'krasnaye',
			title: 'Красное',
		},
		coords: {
			lat: 54.248907,
			lon: 27.077756,
		}
	},
	{
		city: {
			id: 'polatsk',
			title: 'Полоцк',
		},
		coords: {
			lat: 55.485576,
			lon: 28.768349,
		}
	},
	{
		city: {
			id: 'hlybokaye',
			title: 'Глубокое',
		},
		coords: {
			lat: 55.138799,
			lon: 27.685843,
		}
	},
	{
		city: {
			id: 'radashkovichy',
			title: 'Радошковичи',
		},
		coords: {
			lat: 54.156384,
			lon: 27.242273,
		}
	},
	{
		city: {
			id: 'turly', //* ??????? "village": "Цюрлі", "city": "Цюрлёўскі сельскі Савет"
			title: 'Тюрли',
		},
		coords: {
			lat: 54.282272,
			lon: 26.820829,
		}
	},
]


export const GENDER_LIST: ISelectDropDownOptionListElem[] = [
	{
		id: 'male',
		title: 'Муж',
		icon: <IoMaleOutline className={'fa-icon'} />,
	},
	{
		id: 'female',
		title: 'Жен',
		icon: <IoFemaleOutline className={'fa-icon'} />,
	},
	{
		id: 'gay',
		title: 'Аниме',
		icon: <IoMaleFemaleOutline className={'fa-icon'} />,
	},
]
