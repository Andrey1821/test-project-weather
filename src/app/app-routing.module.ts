import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'weather', pathMatch: 'full'},
  {
    path: 'weather',
    loadChildren: () => import('./features/weather-page/weather-page.module').then(m => m.WeatherPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
