import React from 'react'

import { Circles, ThreeDots } from 'react-loader-spinner'



type LoaderOptions = 'dots' | 'circles'
type LoaderProps = {
	type?: LoaderOptions
	contClassName?: string;
	color?: string;
	width?: string;
}
export const Loader = ({ type, contClassName, color, width }: LoaderProps) => {


	const getLoader = (type: LoaderOptions) => {

		const defaultProps = {
			color: color || '#e9edf0cc',
			width: width || '60',
		}

		switch (type) {
			case 'circles':
				return <Circles
					{...defaultProps}
				/>
			default:
				return <ThreeDots
					{...defaultProps}
				/>
		}
	}

	return (
		<div
			className={`${contClassName || ''} cont`}
		>
			{getLoader(type)}
		</div>
	)
}