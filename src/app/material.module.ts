import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  exports: [
    MatSidenavModule,
    MatListModule
  ],
  imports: [
    MatSidenavModule,
    MatListModule
  ]
})
export class MaterialModule { }
