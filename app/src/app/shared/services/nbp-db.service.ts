import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {Observable} from 'rxjs';
import {Rate} from '../model/rate';
import {Picture} from '../model/Picture';

@Injectable({
  providedIn: 'root'
})
export class NbpDbService {

  private readonly currencyStore: string = 'currency';
  private readonly imageStore: string = 'image';

  constructor(private indexedDb: NgxIndexedDBService) {
  }

  storeAll(items: Rate[]) {
    items.forEach(item => this.indexedDb.update(this.currencyStore, item).subscribe());
  }

  getAll(): Observable<Rate[]> {
    return this.indexedDb.getAll(this.currencyStore);
  }

  storeImageBase64(picture: Picture) {
    this.indexedDb.update(this.imageStore, picture).subscribe();
  }

  getImageBase64(url: string): Observable<Picture> {
    return this.indexedDb.getByID(this.imageStore, url);
  }

}
