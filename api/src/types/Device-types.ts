import { ICommonVar } from '@shared/types/Global-types'



export type IBlockMessage = {
	interCode: ICommonVar['interCode'];
	description: string;
	unlockTime: ICommonVar['unlockTime'];
}
