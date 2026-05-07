import { useState } from 'react';
import { useModalState } from '../../../../../shared/components/modal/model/hooks/useStateModal.ts';
import type { Task } from '../../../../../shared/modules/tasks/common/model/task.types.ts';
import type { Nullable } from '../../../../../shared/types/common.ts';

export function useTaskModals() {
    const [selectedTask, setSelectedTask] = useState<Nullable<Task>>(null);

    const createModal = useModalState();
    const editModal = useModalState();
    const deleteModal = useModalState();

    const openEditModal = (task: Task) => {
        setSelectedTask(task);
        editModal.openModal();
    };

    const openDeleteModal = (task: Task) => {
        setSelectedTask(task);
        deleteModal.openModal();
    };

    const closeEditModal = () => {
        setSelectedTask(null);
        editModal.closeModal();
    };

    const closeDeleteModal = () => {
        setSelectedTask(null);
        deleteModal.closeModal();
    };

    return {
        selectedTask,
        setSelectedTask,
        createModal,
        editModal,
        deleteModal,
        openEditModal,
        openDeleteModal,
        closeEditModal,
        closeDeleteModal,
    };
}
