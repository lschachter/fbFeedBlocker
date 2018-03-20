

function removeUnwantedEls() {
	let stories = $("#stories_pagelet_rhc");
	let vids = $("#pagelet_video_home_watch_list_rhc");
	let ego = $("#pagelet_ego_pane");

	let removals = [stories, vids, ego];

	removals.forEach((el) => {
		el.remove();
	});
}

removeUnwantedEls();

$.ajax({
	method: 'GET',
	url: 'https://unsplash.it/list',
	success: function(result) {
		replaceFeed(result);
	},
	error: function(err) {
		console.log('error: ' + err);
	}
});

function replaceFeed(result) {
	let parental = getFeedParent();
	setInspText(parental);

	let srcBase = 'https://unsplash.it/1200/800?image=';
	let inspImg = setInitialImg(parental, srcBase, result);
	
	setNewImage(result, inspImg, srcBase);
}

function getFeedParent() {
	let feed = $("#topnews_main_stream_408239535924329");
	let parental = feed.parent();
	feed.remove();
	return parental;
}

function setInspText(parental) {
	let inspText = $("<h1>You can go for 5 more minutes, I swear!!!</h1>");
	inspText.addClass('beautText');
	parental.append(inspText);
}

function setInitialImg(parental, srcBase, pics) {
	let index = Math.floor(Math.random() * pics.length);
	let image = pics[index];
	let src = srcBase + image.id;
	let inspImg = buildImageElement(parental, src);
	return inspImg;
}

function setNewImage(pics, inspImg, srcBase) {
	function cycleImages() {
		let i = Math.floor(Math.random() * pics.length);
		$(inspImg).attr('src', srcBase + pics[i].id);
	}
	setInterval(cycleImages, 10000); 
}

// createLocalImgs();

function createLocalImgs() {
	let inspURL = buildLocalImageURL();
	let inspImg = buildImageElement(parental,inspURL);

	let pics = [];
	for (let i = 0; i < 7; i++) {
		inspURL = buildLocalImageURL();
		pics.push(inspURL);
	}
	
	setNewLocalImage(pics, inspImg);
}

function setNewLocalImage(pics, inspImg) {
	let i = 0;
	function cycleImages() {
		$(inspImg).attr('src', pics[i]);
		i = (i + 1) % pics.length;
	}
	setInterval(cycleImages, 10000); 
}

function buildLocalImageURL() {
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
