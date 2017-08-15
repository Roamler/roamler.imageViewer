function openImageViewer(image) {
	if (!image) {
		return;
	}
	if (OS_IOS) {
		$.image.image = image;
	} else {
		var imageView = require('org.iotashan.TiTouchImageView').createView({
			'image' : image,
			'width' : Ti.UI.FILL,
			'height' : Ti.UI.FILL
		});
		$.imageWrapper.add(imageView);
		$.closeButton.zIndex = 100;
		$.closeButtonClickArea.zIndex = 101;
	}
	$.shadow.animate({
		duration : 200,
		opacity : 1
	});
	$.closeButtonClickArea.animate({
		duration : 200,
		opacity : 1
	});

	$.imageViewerWindow.open();
	image = null;
}

function closeImageViewer(direction) {
	if (direction.x) {
		direction = "up_left";
	}

	currently_closing = true;
	var animation = {
		duration : 200
	};

	if (direction == "right") {
		animation.left = "100%";
	} else if (direction == "up") {
		animation.bottom = "100%";
	} else if (direction == "up_left") {
		animation.bottom = "100%";
		animation.right = "100%";
	} else if (direction == "left") {
		animation.right = "100%";
	} else if (direction == "down") {
		animation.top = "100%";
	} else if (direction == "down_left") {
		animation.top = "100%";
		animation.right = "100%";
	} else if (direction == "down_right") {
		animation.top = "100%";
		animation.left = "100%";
	} else if (direction == "up_right") {
		animation.bottom = "100%";
		animation.left = "100%";
	}

	if (OS_IOS) {
		$.container.animate(animation);
	} else {
		$.imageWrapper.animate(animation);
	}
	$.shadow.animate({
		duration : 400,
		opacity : 0
	});
	$.closeButtonClickArea.animate({
		duration : 400,
		opacity : 0
	});
	setTimeout(function() {
		$.imageViewerWindow.close();
	}, 450);
}

var zooming = false;
function imageClick() {
	if (current_zoomScale > 1.02) {
		if (!zooming) {
			zooming = true;
			setTimeout(function() {
				zooming = false;
			}, 500);
			zoom('out');
			$.closeButtonClickArea.animate({
				duration : 400,
				opacity : 1
			});
		}
	}
}

function imageDoubleClick() {
	if (current_zoomScale < 1.02) {
		if (!zooming) {
			zooming = true;
			setTimeout(function() {
				zooming = false;
			}, 500);
			zoom('in');
			$.closeButtonClickArea.animate({
				duration : 400,
				opacity : 0
			});
		}
	}
}

function zoom(type) {
	if (type == "in") {
		if (current_zoomScale < 2.5) {
			$.container.setZoomScale(current_zoomScale + 0.15);
			setTimeout(function() {
				zoom(type);
			}, 1);
		}
	} else {
		if (current_zoomScale > 1.02) {
			$.container.setZoomScale(current_zoomScale - 0.15);
			setTimeout(function() {
				zoom(type);
			}, 1);
		}
	}
}

var current_x = 0;
var current_y = 0;
var current_zoomScale = 1.01;
var currently_closing = false;

function scroll(e) {
	current_x = parseInt(e.x);
	current_y = parseInt(e.y);
	current_zoomScale = e.curZoomScale;

	if (current_zoomScale > 1.02) {
		if ($.closeButtonClickArea.opacity == 0) {
			$.closeButtonClickArea.animate({
				duration : 400,
				opacity : 1
			});
		}
	} else {
		if ($.closeButtonClickArea.opacity == 1) {
			$.closeButtonClickArea.animate({
				duration : 400,
				opacity : 0
			});
		}
	}

	if (current_zoomScale < 1.02 && !currently_closing) {
		var newOpacity = 1;
		if (current_x < 0) {
			if (newOpacity > 1 + (current_x * 0.006)) {
				newOpacity = 1 + (current_x * 0.006);
			}
		}
		if (current_x > 0) {
			if (newOpacity > 1 - (current_x * 0.006)) {
				newOpacity = 1 - (current_x * 0.006);
			}
		}
		if (current_y < 0) {
			if (newOpacity > 1 + (current_y * 0.006)) {
				newOpacity = 1 + (current_y * 0.006);
			}
		}
		if (current_y > 0) {
			if (newOpacity > 1 - (current_y * 0.006)) {
				newOpacity = 1 - (current_y * 0.006);
			}
		}
		$.shadow.opacity = newOpacity;
		$.closeButtonClickArea.opacity = newOpacity;
	}
}

function dragend(e) {
	if (current_zoomScale < 1.02) {
		if (current_x > 50 && current_y < -50) {
			closeImageViewer('down_left');
		} else if (current_y < -50 && current_x < -50) {
			closeImageViewer('down_right');
		} else if (current_y > 50 && current_x < -50) {
			closeImageViewer('up_right');
		} else if (current_x > 50 && current_y > 50) {
			closeImageViewer('up_left');
		} else if (current_x < -50) {
			closeImageViewer('right');
		} else if (current_y < -50) {
			closeImageViewer('down');
		} else if (current_y > 50) {
			closeImageViewer('up');
		} else if (current_x > 50) {
			closeImageViewer('left');
		}
	}
}

function onOpenWindow() {
	if (OS_ANDROID) {
		if ($.imageViewerWindow.activity) {
			$.imageViewerWindow.activity.actionBar.hide();
		}
	}
}

function closeWindow() {
	$.off();
	$.destroy();
}

exports.openImageViewer = openImageViewer;
