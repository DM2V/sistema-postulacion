import PocketBase from "pocketbase";

export const BACKEND_ADDRESS = "http://127.0.0.1:8090"

export const pb = new PocketBase(BACKEND_ADDRESS);


export function getLinkForImage(imageName: string, collection: string, recordId: string) {
    return `${BACKEND_ADDRESS}/api/files/${collection}/${recordId}/${imageName}`
}
