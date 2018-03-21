
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
		replaceFeedWithLocalImages();
	}
});

function replaceFeed(result) {
	const srcBase = 'https://unsplash.it/1200/800?image=';
	const inspImg = getCleanedImgElement(srcBase, result);
	
	setNewImage(inspImg, srcBase, result);
}

function getCleanedImgElement(srcBase, pics) {
	const parental = getFeedParent();
	setInspText(parental);
	const inspImg = setInitialImg(parental, srcBase, pics);
	return inspImg;
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
	let src = (srcBase === "") ? image : srcBase + image.id;
	let inspImg = buildImageElement(parental, src);
	return inspImg;
}

function setNewImage(inspImg, srcBase, pics) {
	let i;
	let newSrc;
	function cycleImages() {
		i = Math.floor(Math.random() * pics.length);
		$(inspImg).fadeTo(1000, 0.0, () => {
			newSrc = (srcBase === "") ? pics[i] : srcBase + pics[i].id;
			$(inspImg).attr('src', newSrc);
		}).fadeTo(1000, 1.0);
	}
	setInterval(cycleImages, 10000); 
}

function buildImageElement(parental, imgURL) {
	let inspImg = $("<img>", { src: imgURL });
	inspImg.addClass('inspImage');
	parental.append(inspImg);
	return inspImg;
}

// local image creation

function replaceFeedWithLocalImages() {
	const numPics = 24;
	let pics = buildLocalImageArray(numPics);

	let inspImg = getCleanedImgElement("", pics);

	setNewImage(inspImg, "", pics);
}

function buildLocalImageArray(numPics) {
	let pics = [];
	for (let i = 1; i <= numPics; i++) {
		let inspURL = chrome.extension.getURL('positive_pics/images-'+i+'.jpg');
		pics.push(inspURL);
	}
	return pics;
}
