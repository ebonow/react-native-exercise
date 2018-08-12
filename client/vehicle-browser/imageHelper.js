const PHOTO_RES = {
    LOW: 'low',
    HIGH: 'high'
}

const getPhotoRes = (photos, quality) => photos.map(item => item[quality]);

export function cacheBust(url) {
    return `${url}?r=${Math.random()}`;
}

export function lowRes(photos) {
    return getPhotoRes(photos, PHOTO_RES.LOW).map(cacheBust);
}

export function highRes(photos) {
    return getPhotoRes(photos, PHOTO_RES.HIGH).map(cacheBust);
}