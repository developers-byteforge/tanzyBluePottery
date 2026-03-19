import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function PichwaiCollectionPage() {
    const images = getImages('collections/Pichwai-collection');
    return <CollectionClient collectionKey="pichwai" images={images} />;
}
