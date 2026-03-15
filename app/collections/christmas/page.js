import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function ChristmasCollectionPage() {
    const images = getImages('collections/christmas');
    return <CollectionClient collectionKey="christmas" images={images} />;
}
