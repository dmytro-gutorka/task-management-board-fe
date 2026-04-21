import {
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { type TaskDropdownOption } from '@/pages/tasks/TasksPage/model/tasks.types';

interface DropDownMenuBlockProps<T extends string> {
    title: string;
    value: T;
    onChange: (value: T) => void;
    options: readonly TaskDropdownOption<T>[];
}

export function DropDownMenuBlock<T extends string>({
    title,
    value,
    onChange,
    options,
}: DropDownMenuBlockProps<T>) {
    return (
        <>
            <DropdownMenuLabel>{title}</DropdownMenuLabel>

            <DropdownMenuRadioGroup value={value} onValueChange={(val) => onChange(val as T)}>
                {options.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                        {option.title}
                    </DropdownMenuRadioItem>
                ))}
            </DropdownMenuRadioGroup>
        </>
    );
}
