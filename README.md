# Flickr Photo Stream

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

A Flickr Photo Stream web app, created using the Flickr API.
It covers the basic requirements of the task, has an infinite scroll, allows dynamic searching by tags and also allows images to pop up in a modal window, when clicked on.

The CSS styling was definitely not the top priority here, although the app is responsive and scales to various screen and window sizes (it scales well on mobile devices as well).

The app is deployed to GitHub Pages and can be accessed at: https://peshowe.github.io/Flickr-Stream/stream

## Brief code structure overview 

The code which uses the Flickr API is the Photos Service at src/app/photos.service.ts. It allows querring the API for images with and without tag parameters. 

The Photo Component at src/app/photo/ handles each image and its corresponding information individually and displays it as a box (which is also scrollable, although the scroll bar is hidden).

The Stream Component at src/app/stream/ groups all Photo Component boxes and displays them cohesively and orderly on the page. It supports searching by tags and uses the Photos Service to get the images from the API. It also handles the modal window, but which has to be envoked from a Photo Component box, by clicking on an image.   


Tested on Chrome, Firefox, Opera, Edge and IE11. 
