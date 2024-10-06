import { ICommonVar } from "../../../common/types/Global-types"



export type IBlockMessage = {
	interCode: ICommonVar['interCode'];
	description: string;
	unlockTime: ICommonVar['unlockTime'];
}
