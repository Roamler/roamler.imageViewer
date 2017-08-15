# roamler.imageViewer
Cross Platform (iOS &amp; Android) widget for viewing and zooming images

This image viewer is a Facebook-like image viewer to be able to view an image full screen with zoom capabilities. You can dismiss the image just like on Facebook by swiping it away in any direction you want.

## Dependencies
There is only one dependency, which is for Android. You'll need [TiTouchImageView](https://github.com/iotashan/TiTouchImageView) to get this to work. Just download that module and add it to your app.

## Installation

To install this widget, unzip the latest version in the `app/widget` directory (create the widget directory if it doesn't exist) and then add the widget to `config.json` file.

    "dependencies": {
        "roamler.imageViewer": "1.0"
    }


## Implementation

The implementation is really simple. You basically only need one line of code in your controller

    Alloy.createWidget('roamler.imageViewer').openImageViewer(image);

But be aware, the `image` has to be a blob, remote images don't work. I would recommend using [To.ImageView](https://github.com/Topener/To.ImageCache) to fetch remote images properly including a callback in which you can insert this module, like below

    require('To.ImageCache').cache('http://example.com/image.jpg', 25000, function(blob){
        Alloy.createWidget('roamler.imageViewer').openImageViewer(blob);
    });

## iOS Screenshot
![Simulator Screenshot](https://user-images.githubusercontent.com/1898949/29319843-a8b17a5e-81d5-11e7-9e10-af100a508394.png)
