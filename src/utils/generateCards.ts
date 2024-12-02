import { levels } from "../App";

export type CardType = {
    id: number;
    image: string;
    flipped: boolean;
    matched: boolean;
};

const importImages = import.meta.glob("../assets/*.{jpeg,jpg,png}", { eager: true });
const images = Object.values(importImages).map((mod: any) => mod.default);

export function generateCards(level: keyof typeof levels): CardType[] {
    const numPairs = levels[level].pairs;

    const selectedImages = images.slice(0, numPairs);

    const cards = [...selectedImages, ...selectedImages].map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false,
    }));

    return cards.sort(() => Math.random() - 0.5);
}
