import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PaginationPipe } from './pipe/pagination.pipe';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, PaginationPipe],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    PaginationPipe
  ]
})
export class SharedModule { }
