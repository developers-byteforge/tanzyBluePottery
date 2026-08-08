import { getImages } from '@/lib/getImages';
import CollectionClient from '../CollectionClient';

export default function PotteryRakhiCollectionPage() {
    const images = getImages('collections/pottery-rakhi');
    return <CollectionClient collectionKey="pottery-rakhi" images={images} />;
}
