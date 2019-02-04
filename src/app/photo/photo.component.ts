import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {

  @Input() photo: any; //photo and relevant details to be shown
  @Output() photoEmitted = new EventEmitter<any>(); //event emitter for showing photos in a fullscreen modal

  /**
  * Emit photo to parent container, to show it in a modal
  */
  showModal(){
    this.photoEmitted.emit(this.photo);
  }

  constructor() { }

  ngOnInit() {
  }

}
