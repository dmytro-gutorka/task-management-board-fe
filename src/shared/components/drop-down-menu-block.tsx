import {
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu';
import { type TaskFilterDropdownOption } from '@/pages/tasks/TasksPage/model/task-filters/tasks-filter.types';

interface DropDownMenuBlockProps<T extends string> {
    title: string;
    value: T;
    onChange: (value: T) => void;
    options: readonly TaskFilterDropdownOption<T>[];
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
