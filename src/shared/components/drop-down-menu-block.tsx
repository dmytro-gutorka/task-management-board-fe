import {
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from '@/shared/components/shadcn/ui/dropdown-menu';

type FilterDropdownOption<T extends string = string> = {
    value: T;
    title: string;
};

interface DropDownMenuBlockProps<T extends string> {
    title: string;
    value: T;
    onChange: (value: T) => void;
    options: readonly FilterDropdownOption<T>[];
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
