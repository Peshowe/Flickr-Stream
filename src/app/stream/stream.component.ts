import { Component, OnInit } from '@angular/core';
import {PhotoComponent} from '../photo/photo.component';
import {PhotosService} from '../photos.service';
import {HostListener} from '@angular/core';
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  photos: any; //array of photos and their relevant details
  photosLoading: boolean; //when scrolling, makes sure only one request to the API is sent at a time (also shows a nice loading animation)

  modal; //a reference to a modal window, which shows images closer up
  modalPhoto; //the image that is being shown on the modal

  private searchUpdated: Subject<string> = new Subject(); //Subject used to handle typing in the search bar

  constructor(private photosService: PhotosService) {

    this.searchUpdated.asObservable()
         .debounceTime(200) //have a debounce time to prevent flooding API server with requests
          .distinctUntilChanged() //make sure we're searching for something relevant
            .subscribe(searchItem => this.getPhotos(searchItem)); //get new photos with the provided tags
  }

  /**
  * Get photos from the Flickr API and append them to the current array of photos
  */
  getPhotos(tags=""){

    if(!this.photosLoading){
      this.photosLoading = true; //set photosLoading flag to true to avoid more than one request at a time
      this.photosService.getPhotos(tags).subscribe(data => {
        //make the data nicer to use by transforming it with a map function
        data.items.map(item => {
          this.extractAuthor(item);
          this.extractDescription(item);
        });
        if(tags){
          this.photos = data.items; //if searching with tags, update the entire array
        }else{
          this.photos = this.photos.concat(data.items); //if simply scrolling, concatenate to already present array
        }
        this.photosLoading = false; //unset photosLoading flag
      });
    }
  }

  /**
  * Make a URL to the author's page and extract the author's name from the API response
  */
  extractAuthor(item){
    item.authorLink = `https://www.flickr.com/people/${item.author_id}`;

    //the author property from the API response in most cases includes an unneeded email address appended to the front, so just remove it if present
    if (item.author.startsWith("nobody@flickr.com")){
      item.author = item.author.slice(item.author.indexOf('("')+2, -2);
    }

  }

  /**
  * Extracts the description from the API response, taking in mind its weird formatting
  */
  extractDescription(item){
    const start = item.description.lastIndexOf("<p>")+3;
    const end = item.description.lastIndexOf("</p>");
    item.description = item.description.substring(start,end);
  }

  /**
  * Load more photos when the end of the page is reached
  */
  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.getPhotos();
    }
  }

  /**
  * Set the modal image and show the modal by changing a CSS property
  */
  showModal(photo){
    this.modalPhoto = photo.media.m;
    this.modal.style.display = "block";
  }

  /**
  * Unset the modal image and hide the modal
  */
  closeModal(){
    this.modalPhoto = undefined;
    this.modal.style.display = "none";
  }

  /**
  * Called when an event from a child photo box arrives
  */
  onPhotoEmitted(photo){
    this.showModal(photo);
  }

  /**
  * Called when something is typed in the search bar
  */
  onSearchChange(searchValue : string ) {
    this.searchUpdated.next(searchValue); //emit search typing event
  }


  ngOnInit() {
    this.photos = [];
    this.photosLoading = false;
    this.modal = document.getElementById('myModal');
    this.getPhotos();
  }

}
