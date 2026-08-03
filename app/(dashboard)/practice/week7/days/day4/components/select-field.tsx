import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { Control, Controller, FieldValues, FieldPath } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  placeholder: string;
  control: Control<T>;
  values: readonly { value: string; label: string }[];
}

const SelectField = <T extends FieldValues>({ name, placeholder, control, values }: SelectFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {values.map(({ value, label }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};
export default SelectField;
