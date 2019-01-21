import * as $ from "jquery";
import { getRandom, shuffle } from "./utils";
import { Photo } from "./photo";

import { getPhotos } from "./photoGetter";

import  {interval} from "./config";

var currImageIdx = 0;

$(() =>
{
	// Delay everything until the window is visible on-screen (see the delay in main.ts).
	window.setTimeout(run, 2100);
});

async function run()
{
	setupEvents();

	try
	{
		let photos = await getPhotos();
		if(photos.length === 0) {
			throw new Error("Couldn't find any photos");
		}
		shuffle(photos);
		loadNextImage(photos);
		window.setInterval(() => loadNextImage(photos), interval);
	}
	catch(err)
	{
		window.alert(err.toString());
		window.close();
	}
}

function setupEvents()
{
	$(document).on("click keydown", e => window.close());

	let startPageX: number = null;
	let startPageY: number = null;
	$(document).on("mousemove", e =>
	{
		if((startPageX == null) || (startPageY == null))
		{
			startPageX = e.pageX;
			startPageY = e.pageY;
		}
		else
		{
			const moveThreshold = 20;
			if((Math.abs(e.pageX - startPageX) > moveThreshold) || (Math.abs(e.pageY - startPageY) > moveThreshold))
				window.close();
		}
	});
}

function loadNextImage(
	photos: Photo[])
{
	$(".photo:not(:last)").add("label:not(:last)").remove();

	let photo = photos[currImageIdx];
	console.log(`imageNum: ${currImageIdx} url: ${photo.url}`);

	currImageIdx++;
	if(currImageIdx >= photos.length)
		currImageIdx = 0;

	let xOrigin = getRandom(0, 100);
	let yOrigin = getRandom(0, 100);

	let photoDiv = $("<div class='photo'/>")
		.css("transform-origin", `${xOrigin}% ${yOrigin}%`)
		.appendTo($(document.body));

	let label =  $().add(
		$("<label/>")
			.addClass(`pos${currImageIdx % 3}`)
			.html(`${photo.title} <br> ${photo.credit} <br> ${photo.date}`)
			.appendTo($(document.body))
	)

	$("<img/>")
		.appendTo(photoDiv)
		.on("error", e =>
		{
			photoDiv.add(label).remove();
			loadNextImage(photos);
		})
		.on("load", e =>
		{
			photoDiv.add(label).addClass("visible");
		})
		.attr("src", photo.url);
}


// Since we are running in Electron, the "exports" global is undefined.
// Adding this line of code prevents TypeScript from generating the following statement that depends on "exports":
//    Object.defineProperty(exports, "__esModule", { value: true });
// See: https://github.com/Microsoft/TypeScript/issues/14351
export = {};
