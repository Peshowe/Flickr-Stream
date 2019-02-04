import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { PhotoComponent } from './photo/photo.component';


@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private flickrUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';  //URL to Flickr API

  constructor(private http: HttpClient) { }

  /** GET photos from the API, using a JSONP callback */
  getPhotos(tags?) : Observable<any>{
    var urlTags = 'safe'; //always include the 'safe' tag
    //add any other tags if provided
    if(tags) {
      tags = tags.replace(/ /g, ","); //replace whitespaces with commas
      urlTags = urlTags + ',' + tags;
    }
    const url = encodeURI(`${this.flickrUrl}?format=json&tags='${urlTags}'&jsoncallback=JSONP_CALLBACK`);
    return this.http.jsonp(url, "JSONP_CALLBACK").pipe(
      catchError(this.handleError('getPhotos', []))
    );
  }


 /**
 * Handle jsonp callback that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
