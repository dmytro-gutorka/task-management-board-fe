import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import Cropper, { type Area } from 'react-easy-crop';
import { ActionModal } from '../../../../../../../../shared/components/modal/ui/action-modal.tsx';
import { Slider } from '../../../../../../../../shared/components/shadcn/ui/slider.tsx';
import type { Nullable } from '../../../../../../../../shared/types/common.ts';

interface AvatarCropDialogProps {
    imageSrc: Nullable<string | undefined>;
    isOpen: boolean;
    onCancel: () => void;
    isCropping: boolean;
    croppedAreaPixels: Nullable<Area>;
    setCroppedAreaPixels: (croppedAreaPixels: Nullable<Area>) => void;
    onApply: () => Promise<void>;
}

export function AvatarCropDialog({
    imageSrc,
    isOpen,
    onCancel,
    setCroppedAreaPixels,
    isCropping,
    croppedAreaPixels,
    onApply,
}: AvatarCropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    return (
        <ActionModal
            title="Crop avatar"
            description="Select the area of the image you want to use as your avatar."
            open={isOpen}
            onOpenChange={(open) => !open && onCancel()}
            onSubmit={onApply}
            onCancel={onCancel}
            isSubmitDisabled={!croppedAreaPixels || isCropping}
            isCancelDisabled={!croppedAreaPixels}
            cancelLabel="Cancel"
            submitLabel={
                <>
                    {isCropping && <Loader2 className="mr-2 size-4 animate-spin" />}
                    Apply crop
                </>
            }
        >
            <div className="relative h-80 overflow-hidden rounded-lg bg-muted">
                {imageSrc && (
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropShape="round"
                        showGrid={false}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={(_, croppedPixels) => setCroppedAreaPixels(croppedPixels)}
                    />
                )}
            </div>

            <div className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                    <span className="text-sm text-muted-foreground">Zoom</span>
                    <span className="text-xs text-muted-foreground">{zoom}x</span>
                </div>

                <Slider
                    min={1}
                    max={3}
                    step={0.1}
                    value={[zoom]}
                    disabled={isCropping}
                    onValueChange={([value]) => value && setZoom(value)}
                />
            </div>
        </ActionModal>
    );
}
