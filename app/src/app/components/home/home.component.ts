import {Component} from '@angular/core';
import {NbpDbService} from "../../services/nbp-db.service";
import {NbpExchangeService} from "../../services/nbp-exchange-api.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  public test: string = "Hello from"
  public data: any = []
  public table: any = []
  public rates: any = []

  constructor(private api: NbpExchangeService, private dbService: NbpDbService) {

  }


  ngOnInit() {
    this.api.getCurrencyRates().subscribe((res) => {
        this.table = res;
        this.dbService.storeAll(this.table[0].rates);
        this.dbService.getAll().subscribe(value => this.rates = value)
      }, error => {
        console.log("Display already stored data")
        this.dbService.getAll().subscribe(value => this.rates = value)
      }
    )

    this.test = "blabla"
  };

}
