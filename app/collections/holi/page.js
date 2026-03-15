import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function HoliCollectionPage() {
    const images = getImages('collections/holi');
    return <CollectionClient collectionKey="holi" images={images} />;
}
