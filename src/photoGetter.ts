import { Photo } from "./Photo"
import { downloadString, isNullOrEmpty } from "./Utils"
import {sourceUrls} from "./config";

interface Error
{
	stat: string;
	code: number;
	message: string;
}

export async function getPhotos(): Promise<Photo[]>
{
	let photos:Photo[] = [];

	for (let url of sourceUrls) {
		let json = await downloadString(url);
		let data = JSON.parse(json);
		let error = data as Error;
		if(!isNullOrEmpty(error.message)) {
			console.error(`Failed to load photos from url: ${url} due to error: ${error.message}`);
		}
		photos = photos.concat(data.photos);
	}
	return photos;
}
