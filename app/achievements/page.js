import { getImages } from '@/lib/getImages';
import AchievementsClient from './AchievementsClient';

const ACHIEVEMENT_CAPTIONS = {
    'achievement0': 'A token of appreciation at the Princess Artisan Collective (PAC) by the Princess Diya Kumari Foundation (PDKF)',
    'achievement1': 'Presenting our most revered piece to the Honourable CM of Rajasthan — Shri Bhajan Lal Sharma',
    'achievement2': 'In conversation with Col. Raghvendra Rathore',
    'achievement3': 'With Subah Saraf',
    'achievement4': 'Felicitated at the India Institute Design Conclave (IIDC)',
    'achievement5': 'Our co-founder, Reema Bhasin with our specially designed 48 Kali Scalloped Plate',
    'achievement6': 'Vartika Singh — Journalist',
    'achievement7': 'In the Spotlight — An Interview at the Jaigarh Heritage Festival',
    'achievement8': 'With Sanjoy Roy (CEO, TeamWork Arts)',
    'achievement9': 'HH Padmnabh Singh',
    'achievement10': 'Interview for DD National',
};

export default function AchievementsPage() {
    const imagePaths = getImages('achievements');

    const achievements = imagePaths.map((src) => {
        const filename = src.split('/').pop().replace(/\.[^.]+$/, '');
        return {
            src,
            caption: ACHIEVEMENT_CAPTIONS[filename] || '',
        };
    });

    // Sort by numeric part of filename so achievement10 comes after achievement9
    achievements.sort((a, b) => {
        const numA = parseInt(a.src.match(/achievement(\d+)/)?.[1] ?? '0', 10);
        const numB = parseInt(b.src.match(/achievement(\d+)/)?.[1] ?? '0', 10);
        return numA - numB;
    });

    return <AchievementsClient achievements={achievements} />;
}
