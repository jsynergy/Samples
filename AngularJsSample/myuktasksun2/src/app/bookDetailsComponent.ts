import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './books';
import { books } from './booksmodal';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { IBooks } from './booksinterface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgForm } from '@angular/forms';

@Component({
  selector: 'bookDetails',
  templateUrl: './bookDetailsComponent.html',
  styleUrls: ['./bookDetailsComponent.css']
})
export class bookDetailsComponent{
   public cuurentBookinfoo: any = new books();
   public routerPos: any = 0;
   private sub: Subscription;
   routeID: any;
   cuurentBookinfo :IBooks;
   isDisabled: boolean = false;

   private id;

   constructor(private route: ActivatedRoute, private bookService:BookService, public router: Router) {
   }

   ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
      
          let id = +params['id'];

          this.routeID = id;

         this.cuurentBookinfo =   this.bookService.BOOKS.filter(x => x.id == this.routeID);
        this.id = this.cuurentBookinfo.id;

      this.cuurentBookinfo = JSON.parse(JSON.stringify(this.bookService.BOOKS[this.routeID-1]));

  })

   }
   private ngOnDestroy() {
    this.sub.unsubscribe();
  }


   save() {    

      this.bookService.BOOKS[this.routeID - 1] = this.cuurentBookinfo;   
      this.router.navigate(['/bookcomponent']); 
     }

   edit() {     
     this.isDisabled = true;
   }

   cancel() {
   //on cancel this router navigate to default component
    this.router.navigate(['/bookcomponent']);
       
    }

}


