import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  option: readonly { value: string; label: string }[];
  placeholder: string;
}

export const FormSelect = <T extends FieldValues>({
  control,
  name,
  option,
  placeholder,
}: FormSelectProps<T>) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          return (
            <Select onValueChange={field.onChange} value={field.value ?? ''}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {option.map(({ value, label }) => {
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
      ></Controller>
    </>
  );
};
