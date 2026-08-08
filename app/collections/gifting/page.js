import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function GiftingCollectionPage() {
    const images = getImages('collections/gifting');
    return <CollectionClient collectionKey="gifting" images={images} />;
}
