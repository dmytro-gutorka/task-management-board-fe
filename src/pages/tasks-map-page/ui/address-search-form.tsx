import { Button } from '@/shared/components/shadcn/ui/button';
import { Alert, AlertDescription } from '../../../shared/components/shadcn/ui/alert.tsx';
import { useState, type SyntheticEvent } from 'react';
import { Input } from '../../../shared/components/shadcn/ui/input.tsx';
import { Search } from 'lucide-react';
import type { Nullable } from '../../../shared/types/common.ts';

interface AddressSearchFormProps {
    isLoading: boolean;
    error: Nullable<string>;
    onSearch: (address: string) => void;
}

export function AddressSearchForm({ isLoading, error, onSearch }: AddressSearchFormProps) {
    const [address, setAddress] = useState('');

    function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
        event.preventDefault();
        onSearch(address);
    }

    return (
        <div className="space-y-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="Enter address, city or place"
                    disabled={isLoading}
                    aria-label="Search address"
                />

                <Button type="submit" disabled={isLoading}>
                    <Search className="h-4 w-4" />
                    {isLoading ? 'Searching...' : 'Search'}
                </Button>
            </form>

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}
        </div>
    );
}
