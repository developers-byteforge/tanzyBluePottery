import { getImages } from '@/lib/getImages';
import HandsOnClient from './HandsOnClient';

export default function HandsOnPage() {
    const images = getImages('hands-on');
    return <HandsOnClient images={images} />;
}
