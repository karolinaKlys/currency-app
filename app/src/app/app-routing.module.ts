import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./../app/components/home/home.component";
import { SplashScreenComponent } from "./../app/components/splash-screen/splash-screen.component";

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'home', component: HomeComponent}
];

// const routes: Routes = [
//   {
//     component: HomeComponent,
//     path: "home"
//   },
//   {
//     path: "",
//     redirectTo: "/home",
//     pathMatch: "full"
//   }
// ];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
