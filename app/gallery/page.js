import { getImages } from '@/lib/getImages';
import GalleryClient from './GalleryClient';

const GALLERY_CATEGORIES = [
    { key: 'atelier-collection', title: 'The Atelier Collection', description: 'Signature studio pieces crafted with artistic precision' },
    { key: 'dining-edit', title: 'Dining Edit', description: 'Elegant tableware for everyday luxury' },
    { key: 'home-decor', title: 'Home Decor', description: 'Handcrafted accents to elevate your living spaces' },
    { key: 'festive-collection', title: 'Festive Collection', description: 'Celebrate every occasion with artisanal pottery' },
    { key: 'utility-and-gifting', title: 'Utility & Gifting', description: 'Functional art perfect for gifting and daily use' },
    { key: 'pichwai-collection', title: 'Pichwai Collection', description: 'Traditional Pichwai art reimagined in blue pottery' },
];

export default function GalleryPage() {
    const categories = GALLERY_CATEGORIES.map((cat) => ({
        ...cat,
        images: getImages(`gallery/${cat.key}`),
    }));

    return <GalleryClient categories={categories} />;
}
