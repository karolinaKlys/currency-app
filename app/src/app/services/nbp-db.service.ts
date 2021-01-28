import {Injectable} from '@angular/core';
import {NgxIndexedDBService} from "ngx-indexed-db";
import {Observable} from "rxjs";
import {Rate} from "../Rate";

@Injectable({
  providedIn: 'root'
})
export class NbpDbService {

  private readonly storeName: string = "currency";

  constructor(private indexedDb: NgxIndexedDBService) {
  }

  storeAll(items: Rate[]) {
    console.log(items);
    items.forEach(item => this.indexedDb.update(this.storeName, item).subscribe());
  }

  getAll(): Observable<Rate[]> {
    return this.indexedDb.getAll(this.storeName)
  }
}
