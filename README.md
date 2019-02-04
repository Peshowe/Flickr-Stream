# Flickr Photo Stream

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

A Flickr Photo Stream web app, created using the Flickr API.
It covers the basic requirements of the task, has an infinite scroll, allows dynamic searching by tags and also allows images to pop up in a modal window, when clicked on.

The CSS styling was definitely not the top priority here, although the app is responsive to various screen and window sizes.


## How to run

To run the app, an install of the [Angular CLI](https://angular.io/guide/quickstart#prerequisites) is required. Angular requires Node.js version 8.x or 10.x, and the npm client command line interface.

To install Angular simply run:
```
 npm install -g @angular/cli
```

Run `ng serve --open` inside the top directory of the repository for a dev server. The web app will be opened at `http://localhost:4200/`.


## Brief code structure overview 

The code which uses the Flickr API is the Photos Service at src/app/photos.service.ts. It allows querring the API for images with and without tag parameters. 

The Photo Component at src/app/photo/ handles each image and its corresponding information individually and displays it as a box.

The Stream Component at src/app/stream/ groups all Photo Component boxes and displays them cohesively and orderly on the page. It supports searching by tags and uses the Photos Service to get the images from the API. It also handles the modal window, but which has to be envoked from a Photo Component box, by clicking on an image.   
