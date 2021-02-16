import type { SelectOptions } from '../components/select/Select'
import { NONE_SELECT_VALUE } from '../stores/user/intialState'
import data from '../source/town.json'
import { getTownsFromList } from '../helpers/town'

export const townListOptions: SelectOptions[] = [
  { title: '---', value: NONE_SELECT_VALUE, disabled: true },
  ...getTownsFromList(data.list).map((town) => ({
    title: town,
    value: town,
  })),
]

export const townList: string[] = getTownsFromList(data.list).map(
  (town) => town
)
