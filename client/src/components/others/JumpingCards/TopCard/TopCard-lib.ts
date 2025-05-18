import { FormStatusButOptions } from './EditForms/common/FormStatusButton/FormStatusButton'
import { showSnackMessage } from '@features/showSnackMessage/showSnackMessage'
import { ICommonVar } from '@shared/types/Global-types'
import { useJwtInfoListState } from '@stores/Auth-store'



export type TopCardFormsProps = {
	statusState: FormStatusButOptions;
	setStatusState: (state: FormStatusButOptions) => void;
}

export const fastSessionTestForDataEditing = (userId: ICommonVar['id']) => {
	const { getJwtInfoState } = useJwtInfoListState.getState()
	if (getJwtInfoState(userId).isFast) {
		showSnackMessage({
			type: 'e',
			message: 'Вы не можете редактировать информацию аккаунта и пользователя во время быстрой сессии',
		})
		throw new Error('Forbidden operation of data editing')
	}
}