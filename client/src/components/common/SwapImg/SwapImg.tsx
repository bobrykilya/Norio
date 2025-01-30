import React, { useEffect, useRef, useState } from 'react'
import timeout from "../../../utils/timeout"



type SwapImgProps = {
	path: string;
}
const SwapImg = ({ path }: SwapImgProps) => {

	const imgRef = useRef(null)
	const [pathState, setPathState] = useState(path)

	const swapImg = async (path: string) => {
		imgRef.current?.classList.add('hide')
		await timeout(300)

		setPathState(path)
		imgRef.current?.classList.remove('hide')
	}

	useEffect(() => {
		swapImg(path)
	}, [path])


	return (
			<img
				className={'swap-img'}
				src={pathState}
				ref={imgRef}
				alt="SwapIMG Error"
			/>
	)
}

export default SwapImg