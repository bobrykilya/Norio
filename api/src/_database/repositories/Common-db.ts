import { ICommonVar } from '@shared/types/Global-types.ts'
import queryDB from '@utils/queryDB.ts'



export function camelToSnake(str: string): string {
	return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}

type IUpdateFieldsById<T> = {
	data: T;
	id: ICommonVar['id'];
	tableName: string;
	idFieldName: string;
}

class CommonRepository {

	static async updateFieldsById<T extends Record<string, any>>({
																	 data,
																	 id,
																	 tableName,
																	 idFieldName,
																 }: IUpdateFieldsById<T>) {
		const fields = Object.keys(data)

		if (fields.length === 0) {
			return
		}

		const query = `
			UPDATE ${tableName}
			SET ${fields.map((field, i) => `"${camelToSnake(field)}" = $${i + 1}`).join(', ')}
			WHERE "${idFieldName}" = $${fields.length + 1}
	  	`

		const values = Object.values(data)
		values.push(id)
		// console.log({ query, values })

		await queryDB(query, values)
	}
}

export default CommonRepository
