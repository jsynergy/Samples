import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
 import { bookcomponent } from './bookcomponent';
import { BookService } from './books';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgTableComponent, NgTableFilteringDirective, NgTablePagingDirective, NgTableSortingDirective } from 'ng2-table/ng2-table';
 import { bookDetailsComponent } from './bookDetailsComponent';

 import { HttpClientModule } from '@angular/common/http';
  import { HttpModule } from '@angular/http';

 const appRoutes: Routes = [

   {path: 'bookcomponent' , children:[
    {path: '', component: bookcomponent},
    {path: 'bookDetailsComponent/:id', component: bookDetailsComponent}
    
]},


{ path: '', redirectTo: '/bookcomponent', pathMatch: 'full' }


];


@NgModule({
  declarations: [
    AppComponent, bookDetailsComponent, bookcomponent
  ],
  imports: [
    BrowserModule,
	NgxPaginationModule,
    FormsModule,   
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
