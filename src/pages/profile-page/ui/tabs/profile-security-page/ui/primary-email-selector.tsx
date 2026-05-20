import { CheckCircle2, Loader2, Mail } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Badge } from '../../../../../../shared/components/shadcn/ui/badge.tsx';
import { Button } from '../../../../../../shared/components/shadcn/ui/button.tsx';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../../../../../shared/components/shadcn/ui/select.tsx';
import type { PrimaryEmailOptionsResponse } from '../../../../../../shared/infrastructure/auth/auth.api-types.ts';

interface PrimaryEmailSelectorProps {
    options: PrimaryEmailOptionsResponse | null;
    isLoading: boolean;
    isUpdating: boolean;
    onUpdate: (email: string) => Promise<void>;
}

export function PrimaryEmailSelector({
    options,
    isLoading,
    isUpdating,
    onUpdate,
}: PrimaryEmailSelectorProps) {
    const [selectedEmail, setSelectedEmail] = useState('');

    const currentSelectedEmail = selectedEmail || options?.primaryEmail || '';

    const selectedEmailOption = useMemo(
        () => options?.emails.find((emailOption) => emailOption.email === currentSelectedEmail),
        [currentSelectedEmail, options?.emails],
    );

    const hasEmailOptions = Boolean(options?.emails.length);
    const isPrimarySelected = currentSelectedEmail === options?.primaryEmail;
    const isSubmitDisabled = isLoading || isUpdating || !currentSelectedEmail || isPrimarySelected;

    async function handleSubmit() {
        if (!currentSelectedEmail || isPrimarySelected) return;

        await onUpdate(currentSelectedEmail);
    }

    return (
        <div className="rounded-lg border p-4">
            <div className="space-y-4">
                <div className="space-y-1">
                    <h3 className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="size-4" />
                        Primary email
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        Choose which linked email should be displayed in the app and used as your
                        main contact email.
                    </p>
                </div>

                {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="size-4 animate-spin" />
                        Loading email options...
                    </div>
                )}

                {!isLoading && !hasEmailOptions && (
                    <div className="rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                        No linked emails were found for this account.
                    </div>
                )}

                {!isLoading && hasEmailOptions && (
                    <div className="space-y-3">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                            <Select value={currentSelectedEmail} onValueChange={setSelectedEmail}>
                                <SelectTrigger className="w-full md:w-80">
                                    <SelectValue placeholder="Select primary email" />
                                </SelectTrigger>
                                <SelectContent>
                                    {options?.emails.map((emailOption) => (
                                        <SelectItem
                                            key={emailOption.email}
                                            value={emailOption.email}
                                        >
                                            {emailOption.email}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button
                                type="button"
                                disabled={isSubmitDisabled}
                                onClick={() => void handleSubmit()}
                            >
                                {isUpdating ? (
                                    <Loader2 className="mr-2 size-4 animate-spin" />
                                ) : (
                                    <CheckCircle2 className="mr-2 size-4" />
                                )}
                                Set as primary
                            </Button>
                        </div>

                        {selectedEmailOption && (
                            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span>Linked providers:</span>
                                {selectedEmailOption.providers.map((provider) => (
                                    <Badge
                                        key={provider}
                                        variant="secondary"
                                        className="capitalize"
                                    >
                                        {provider}
                                    </Badge>
                                ))}
                                {selectedEmailOption.isPrimary && (
                                    <Badge variant="outline">Current primary</Badge>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
