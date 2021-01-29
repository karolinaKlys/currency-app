import {Component, OnInit} from '@angular/core';
import {NbpDbService} from "../../services/nbp-db.service";
import {NbpExchangeService} from "../../services/nbp-exchange-api.service";
import { Observable, Observer } from 'rxjs';
import {Picture} from "../../Picture";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public table: any = []
  public rates: any = []
  base64Image: any;

  constructor(private api: NbpExchangeService, private dbService: NbpDbService) {}

  ngOnInit() {
    let proxyurl = "https://cors-anywhere.herokuapp.com/";
    let imageUrl = 'https://economictimes.indiatimes.com/thumb/msid-79562766,width-1200,height-900,resizemode-4,imgsize-367625/currencies.jpg?from=mdr';


    this.dbService.getImageBase64(imageUrl)
    .subscribe(value => {
      if (value == undefined) {
        console.log("Download image")
        this.getBase64ImageFromURL(proxyurl + imageUrl).subscribe(base64data => {
          this.base64Image = 'data:image/jpg;base64,' + base64data;
          this.dbService.storeImageBase64(new Picture(imageUrl, this.base64Image))
          this.dbService.getImageBase64(imageUrl).subscribe(value => this.base64Image = value.base64)
        })
      } else {
        console.log("Use already stored image");
        this.base64Image = value.base64;
      }
    })

    this.api.getCurrencyRates().subscribe((res) => {
        this.table = res;
        this.dbService.storeAll(this.table[0].rates);
        this.dbService.getAll().subscribe(value => this.rates = value)
      }, error => {
        console.log("Display already stored data")
        this.dbService.getAll().subscribe(value => this.rates = value)
      }
    )
  };

  getBase64ImageFromURL(url: string) {
    return Observable.create((observer: Observer<string>) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = url;
      if (!img.complete) {
        img.onload = () => {
          observer.next(this.getBase64Image(img));
          observer.complete();
        };
        img.onerror = (err) => {
          observer.error(err);
        };
      } else {
        observer.next(this.getBase64Image(img));
        observer.complete();
      }
    });
  };

  getBase64Image(img: HTMLImageElement) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  };

}




