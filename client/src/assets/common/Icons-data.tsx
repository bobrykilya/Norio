import React from "react"
import { GrUserExpert, GrUserWorker } from "react-icons/gr"
import { HiOutlineHome } from "react-icons/hi"
import { MdEmail, MdInstallDesktop, MdOutlineWaterDrop, MdOutlineWorkOutline } from "react-icons/md"
import { BsArrowUpRight, BsCloudRain, BsPassport } from "react-icons/bs"
import { LiaBirthdayCakeSolid } from "react-icons/lia"
import { FiCheckCircle, FiPhoneCall, FiWind } from "react-icons/fi"
import { BiBadgeCheck, BiLogInCircle, BiSolidCopy } from "react-icons/bi"
import { FaKey, FaLock, FaUser } from "react-icons/fa"
import {
	FaAngleLeft,
	FaAngleRight,
	FaArrowRightLong,
	FaInfo,
	FaLocationDot,
	FaUserGear,
	FaUserPen,
} from "react-icons/fa6"
import { LuBadgeInfo, LuCheckCircle, LuLogOut } from "react-icons/lu"
import { VscEye, VscEyeClosed } from "react-icons/vsc"
import {
	IoAdd,
	IoArrowBackCircleOutline,
	IoArrowUndoSharp,
	IoClose,
	IoCloseCircleOutline,
	IoNotificationsSharp,
	IoSnowOutline,
} from "react-icons/io5"
import { PiSealWarning, PiUser, PiWarning, PiWarningCircleBold, PiWarningFill } from "react-icons/pi"
import {
	TbInfoSquareRoundedFilled,
	TbLockSquareRounded,
	TbSettings,
	TbSettingsFilled,
	TbTrashXFilled,
} from "react-icons/tb"
import { HiDocumentText } from "react-icons/hi2"
import { IoIosSave, IoMdArrowRoundDown, IoMdArrowRoundUp } from "react-icons/io"
import { RxCopy } from "react-icons/rx"



export const ICONS = {
	name: <GrUserExpert className='input_field-icon' />,
	job: <GrUserWorker className='input_field-icon' />,
	company: <MdOutlineWorkOutline className='input_field-icon' />,
	birthday: <LiaBirthdayCakeSolid className="input_field-icon" />,
	store: <HiOutlineHome className='input_field-icon' />,
	phone: <FiPhoneCall className='input_field-icon' />,
	user: <FaUser className='input_field-icon' />,
	password: <FaKey className='input_field-icon'/>,
	prevPassword: <FaLock className='input_field-icon'/>,
	email: <MdEmail className='input_field-icon'/>,
	passport: <BsPassport className='fa-icon' />,
	enter: <BiLogInCircle className='fa-icon' />,
	check: <LuCheckCircle className='fa-icon' />,
	next: <FaArrowRightLong className='fa-icon' />,
	eyeOpened: <VscEye className='fa-icon' />,
	eyeClosed: <VscEyeClosed className='fa-icon' />,
	closeCircled: <IoCloseCircleOutline className='fa-icon' />,
	error: <PiWarningCircleBold className='error message-icon fa-icon' />,
	info: <LuBadgeInfo className='info message-icon fa-icon' />,
	warning: <PiSealWarning className='warning message-icon fa-icon' />,
	block: <TbLockSquareRounded className='block message-icon fa-icon' />,
	success: <FiCheckCircle className='success message-icon fa-icon' />,
	notification: <IoNotificationsSharp className='fa-icon' />,
	document: <HiDocumentText className='fa-icon' />,
	logBook: <PiWarning className='fa-icon' />,
	logBookFilled: <PiWarningFill className='fa-icon' />,
	settings: <TbSettings className='fa-icon' />,
	settingsFilled: <TbSettingsFilled className='fa-icon' />,
	instructions: <FaInfo className='fa-icon'/>,
	instructionsFilled: <TbInfoSquareRoundedFilled className='fa-icon' />,
	close: <IoClose className='fa-icon close-icon' />,
	link: <BsArrowUpRight strokeWidth={0.5} className='fa-icon link-icon' />,
	arrowUp: <IoMdArrowRoundUp className='fa-icon' />,
	arrowDown: <IoMdArrowRoundDown className='fa-icon' />,
	copyFilled: <BiSolidCopy className='fa-icon' />,
	copy: <RxCopy className='fa-icon' />,
	location: <FaLocationDot className={'fa-icon'} />,
	userEdit: <FaUserPen className='fa-icon' />,
	accountEdit: <FaUserGear className='fa-icon' />,
	logout: <LuLogOut className='fa-icon' />,
	emptyAvatar: <PiUser className='fa-icon' />,
	arrowLeft: <FaAngleLeft className='fa-icon' />,
	arrowRight: <FaAngleRight className='fa-icon' />,
	trash: <TbTrashXFilled className='fa-icon' />,
	add: <IoAdd className='fa-icon' />,
	backCircled: <IoArrowBackCircleOutline className='fa-icon' />,
	desktop: <MdInstallDesktop className='fa-icon'/>,
	save: <IoIosSave className='fa-icon' />,
	ok: <BiBadgeCheck className='fa-icon' />,
	undo: <IoArrowUndoSharp className='fa-icon' />,
	humidity: <MdOutlineWaterDrop className='fa-icon' />,
	wind: <FiWind className='fa-icon' />,
	rain: <BsCloudRain className='fa-icon' />,
	snow: <IoSnowOutline className='fa-icon' />,

}