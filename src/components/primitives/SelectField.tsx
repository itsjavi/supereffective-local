import { cn } from '@/lib/utils'
import { ComponentPropsWithoutRef } from 'react'
import styles from './SelectField.module.scss'

type SelectFieldOption = { value: string | number; label?: string }

type SelectFieldProps = {
  label?: React.ReactNode
  value?: string | number
  options: SelectFieldOption[]
} & Omit<
  ComponentPropsWithoutRef<'select'>,
  'children' | 'selected' | 'value' | 'defaultValue' | 'defaultChecked' | 'onSelect'
>

export type SelectFieldPropsWithoutOptions = Omit<SelectFieldProps, 'options' | 'children'>

export const OPTIONS_LOADING: SelectFieldOption[] = [{ value: '', label: 'Loading...' }]
export const OPTIONS_ERROR: SelectFieldOption[] = [{ value: '', label: '~Loading Error~' }]
export const OPTIONS_DATA_NOT_LOADED: SelectFieldOption[] = [{ value: '', label: '~Data not Loaded~' }]
export const OPTIONS_NO_DATA: SelectFieldOption[] = [{ value: '', label: '~No Data~' }]

export default function SelectField({ className, options, ...props }: SelectFieldProps) {
  const optionsToRender = options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label ?? option.value}
    </option>
  ))

  const labelElement = props.label ? <label className={styles.label}>{props.label}</label> : null
  const selectedOption = options?.find((option) => option.value === props.value)

  return (
    <div className={styles.box} title={selectedOption?.label}>
      {labelElement}
      <select className={cn(styles.field, className)} {...props}>
        {optionsToRender}
      </select>
    </div>
  )
}
