import {Component, OnInit} from '@angular/core';
import {from} from 'rxjs';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  windowWidth = '';
  showSplash = true;

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.windowWidth = '-' + window.innerWidth + 'px';

      setTimeout(() => {
        // this.showSplash = !this.showSplash;
        this.router.navigate(['sign-in']);
      }, 500);
    }, 3000);
  }
}
