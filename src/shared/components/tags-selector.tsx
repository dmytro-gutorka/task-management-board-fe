import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { useState } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import type { TaskFormValues } from '@/pages/tasks/TasksPage/model/task-form/tasks-form.types';
import { type KeyboardEvent } from 'react';

interface TagsSelectorProps {
    form: UseFormReturn<TaskFormValues>;
}

export function TagsSelector({ form }: TagsSelectorProps) {
    const [tagInput, setTagInput] = useState('');

    const { setValue, watch } = form;
    const errors = form.formState.errors.tags;
    const tags = watch('tags');

    function handleAddTag() {
        const normalized = tagInput.trim();

        if (!normalized) return;

        if (tags.includes(normalized)) {
            setTagInput('');
            return;
        }

        setValue('tags', [...tags, normalized], { shouldValidate: true, shouldDirty: true });
        setTagInput('');
    }

    function handleRemoveTag(tagToRemove: string) {
        const filteredTags = tags.filter((tag) => tag !== tagToRemove);

        setValue('tags', filteredTags, { shouldValidate: true, shouldDirty: true });
    }

    function handleKeyUp(e: KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    }

    return (
        <div className="space-y-3">
            <label className="text-sm font-medium">Tags</label>

            <div className="flex gap-2">
                <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add tag"
                    onKeyUp={(e: KeyboardEvent) => handleKeyUp(e)}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                    Add
                </Button>
            </div>

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

            {errors ? <p className="text-sm text-destructive">{errors.message}</p> : null}
        </div>
    );
}
