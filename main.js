let feed = $("#topnews_main_stream_408239535924329");

let stories = $("#stories_pagelet_rhc");
let vids = $("#pagelet_video_home_watch_list_rhc");
let ego = $("#pagelet_ego_pane");

let removals = [stories, vids, ego];

removals.forEach((el) => {
	el.remove();
});

let parental = feed.parent();
feed.remove();

let inspText = $("<h1>You can go for 5 more minutes, I swear!!!</h1>");
inspText.addClass('beautText');
parental.append(inspText);

let inspURL = buildImageURL();
let inspImg = buildImageElement(parental,inspURL);

let pics = [];

for (let i = 0; i < 7; i++) {
	inspURL = buildImageURL();
	let img = new Image().src = inspURL;
	pics.push(img);
}

setNewImage(pics, inspImg);

function setNewImage(pics, inspImg) {
	let i = 0;
	function cycleImages() {
		$(inspImg).attr('src', pics[i]);
		i = (i + 1) % pics.length;
	}
	setInterval(cycleImages, 10000); 
};



function buildImageURL() {
	let index = Math.floor(Math.random()*23) + 1;
	let imgURL = chrome.extension.getURL('positive_pics/images-'+index+'.jpg');
	return imgURL;
}

function buildImageElement(parental, imgURL) {
	let inspImg = $("<img src=\""+imgURL+"\">");
	inspImg.addClass('inspImage');
	parental.append(inspImg);
	return inspImg;
}

 
