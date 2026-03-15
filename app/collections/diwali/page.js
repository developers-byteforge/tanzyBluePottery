import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function DiwaliCollectionPage() {
    const images = getImages('collections/diwali');
    return <CollectionClient collectionKey="diwali" images={images} />;
}
