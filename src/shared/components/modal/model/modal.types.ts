export interface IBaseModal {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
}
