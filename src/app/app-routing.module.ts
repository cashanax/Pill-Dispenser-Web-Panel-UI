import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { HistoryComponent } from '../history/history.component';
import { SettingsComponent } from '../settings/settings.component';

export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Default route
  {path: 'dashboard', component: DashboardComponent},
  {path: 'gallery', component: GalleryComponent },
  {path: 'schedule', component: ScheduleComponent },
  {path: 'history', component: HistoryComponent },
  {path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
