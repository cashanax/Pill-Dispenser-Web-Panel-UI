import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { HistoryComponent } from '../history/history.component';
import { SettingsComponent } from '../settings/settings.component';
import { AuthGuard } from '../auth.guard';
import { LoginComponent } from '../login/login.component'; // Import LoginComponent


export const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // Default route
  {path: 'login', component: LoginComponent}, // Add this line
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard]  },
  {path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard]  },
  {path: 'history', component: HistoryComponent, canActivate: [AuthGuard]  },
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
