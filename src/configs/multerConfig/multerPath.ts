import { diskStorage } from "multer";
import { extname } from "path";
import { createNameFile } from "src/utils/files";

type Props = {
    folder_name: 'message' | 'playlist' | 'song' | 'user'
}

export const handle_Link = (folder_name: string, type: string) => {
    const lowcase_folder = folder_name.toLowerCase();
    switch (type.toLowerCase()) {
        case "audio":
            return { status: true, url: `./src/assets/${lowcase_folder}/audios` };
        case "image":
            return { status: true, url: `./src/assets/${lowcase_folder}/images` };
        case "video":
            return { status: true, url: `./src/assets/${lowcase_folder}/videos` };
        default: return { status: true, url: `./src/assets/${lowcase_folder}/files` }
    }
};


export const handlePath = ({ folder_name }: Props) => {
    return diskStorage({
        destination: (req, file, callback) => {
            const type = file.mimetype.split('/')[0]
            return callback(null, handle_Link(String(folder_name).toLowerCase(), type).url)
        },
        filename(req, file, callback) {
            const type = file.mimetype.split('/')[0]
            callback(null, `${createNameFile(type)}${extname(file.originalname)}`)
        },
    }
    )
}