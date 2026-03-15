import { getImages } from '@/lib/getImages';
import GalleryClient from './GalleryClient';

export default function GalleryPage() {
    const images = getImages('gallery');
    return <GalleryClient images={images} />;
}
