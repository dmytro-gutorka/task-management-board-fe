export function createImage(imageSrc: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', reject);
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = imageSrc;
    });
}
