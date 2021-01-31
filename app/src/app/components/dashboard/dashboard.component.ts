import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';
import {NbpExchangeService} from '../../shared/services/nbp-exchange-api.service';
import {NbpDbService} from '../../shared/services/nbp-db.service';
import {Observable, Observer} from 'rxjs';
import {Picture} from '../../shared/model/Picture';
import {CurrencyDisplayPipe} from '../../shared/services/currency.pipe';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { NbpModel } from 'src/app/shared/model/nbpModel';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public table: any = [];
  public rates: any = [];
  base64Image: any;
  isSymbolsVisible = false;

  constructor(private api: NbpExchangeService,
              private dbService: NbpDbService,
              public authService: AuthService,
              private notificationService: NotificationService,
              public currencyDisplayPipe: CurrencyDisplayPipe) {
  }

  ngOnInit() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const imageUrl = 'https://economictimes.indiatimes.com/thumb/msid-79562766,width-1200,height-900,resizemode-4,imgsize-367625/currencies.jpg?from=mdr';

    this.dbService.getImageBase64(imageUrl)
      .subscribe(value => {
        console.log('działa z value', value)
        if (value === undefined) {
          console.log('Download image');
          this.getBase64ImageFromURL(proxyUrl + imageUrl).subscribe((base64data: string) => {
            this.base64Image = 'data:image/jpg;base64,' + base64data;
            this.dbService.storeImageBase64(new Picture(imageUrl, this.base64Image));
            // tslint:disable-next-line:no-shadowed-variable
            this.dbService.getImageBase64(imageUrl).subscribe(value => this.base64Image = value.base64);
          });
        } else {
          console.log('Use already stored image');
          this.base64Image = value.base64;
        }
      });

    // this.dbService.getImageBase64(imageUrl).pipe(
    //   switchMap(value => {
    //     console.log('działa z value', value)
    //     if (value === undefined) {
    //       return this.getBase64ImageFromURL(proxyUrl + imageUrl);
    //     }else{
    //       this.base64Image = value.base64;
    //       console.log('end')
    //       //throw new Error("Ready");
    //     }
    //   }),
    //   switchMap(base64data => {
    //     this.base64Image = 'data:image/jpg;base64,' + base64data;
    //     this.dbService.storeImageBase64(new Picture(imageUrl, this.base64Image));
    //     return this.dbService.getImageBase64(imageUrl);
    //   }),
    //   map(value => {
    //     console.log('robi')
    //     this.base64Image = value.base64
    //   })
    // )
     
    this.api.getCurrencyRates().subscribe((res) => {
        this.table = res;
        this.checkIfIsNotificationNeeded(res)
        this.dbService.storeAll(this.table[0].rates);
        this.dbService.getAll().subscribe(value => this.rates = value);
      }, error => {
        console.log('Display already stored data');
        this.dbService.getAll().subscribe(value => this.rates = value);
      }
    );
  }

  checkIfIsNotificationNeeded = (res: NbpModel[]): void=> {
    const dolar = res[0].rates.find(({code}) => code === 'USD');
    if(dolar && dolar.mid > 3 ){
      this.notificationService.addNewNotification('Dolar is > 3 zl')
    }
  }

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
          console.log(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  }

  getBase64Image(img: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx!.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
  }

  toggleSymbolVisibility() {
    this.isSymbolsVisible = !this.isSymbolsVisible;
  }
}

