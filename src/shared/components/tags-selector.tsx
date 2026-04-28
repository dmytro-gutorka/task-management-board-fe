import { useState, type KeyboardEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { X } from 'lucide-react';

import { Input } from '@/shared/components/shadcn/ui/input';
import { Button } from '@/shared/components/shadcn/ui/button';
import { Badge } from '@/shared/components/shadcn/ui/badge';
import {
    Field,
    FieldDescription,
    FieldError,
    FieldLabel,
} from '@/shared/components/shadcn/ui/field';

import type { TaskFormValues } from '@/pages/tasks-page/model/task-form/tasks-form.types';

interface TagsSelectorProps {
    form: UseFormReturn<TaskFormValues>;
}

export function TagsSelector({ form }: TagsSelectorProps) {
    const [tagInput, setTagInput] = useState('');

    const { setValue, watch } = form;
    const errors = form.formState.errors;

    const tags = watch('tags');
    const tagsError = errors.tags;

    function handleAddTag() {
        const normalized = tagInput.trim();

        if (!normalized) return;

        if (tags.includes(normalized)) {
            setTagInput('');
            return;
        }

        setValue('tags', [...tags, normalized], {
            shouldValidate: true,
            shouldDirty: true,
        });

        setTagInput('');
    }

    function handleRemoveTag(tagToRemove: string) {
        const filteredTags = tags.filter((tag) => tag !== tagToRemove);

        setValue('tags', filteredTags, {
            shouldValidate: true,
            shouldDirty: true,
        });
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter' && !e.repeat) {
            e.preventDefault();
            handleAddTag();
        }
    }

    return (
        <Field data-invalid={!!tagsError}>
            <FieldLabel htmlFor="task-form-tag-input">Tags</FieldLabel>

            <div className="flex gap-2">
                <Input
                    id="task-form-tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    onKeyDown={handleKeyDown}
                    aria-invalid={!!tagsError}
                />

                <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                </Button>
            </div>

            <FieldDescription>Add up to 10 tags to better organize the task.</FieldDescription>

            {tags.length ? (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(tag)}
                                className="rounded-sm p-0.5 hover:bg-muted"
                                aria-label={`Remove ${tag}`}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </Badge>
                    ))}
                </div>
            ) : null}

            {tagsError ? <FieldError errors={[tagsError]} /> : null}
        </Field>
    );
}
