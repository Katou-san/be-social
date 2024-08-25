import { createId } from 'src/utils/createId';

export const createNameFile = (type: string) => {
    return type != 'audio' && type != 'image' && type != 'video'
        ? createId('file')
        : createId(type);
};
