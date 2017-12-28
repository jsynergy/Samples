//Required imports for components
import { Component } from '@angular/core';
import { BookService } from './books';
import { books } from './booksmodal';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { IBooks } from './booksinterface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'Books',
  templateUrl: './bookcomponent.html',
  styleUrls: ['./bookcomponent.css']
})
@Pipe({ name: 'category' })
export class bookcomponent{
  listofbook: books;
  books:IBooks[];
  //sortBooks:IBooks[]=[];
  name: string = 'name';
  constructor(private bookService:BookService,public router: Router,private route:ActivatedRoute)
  {}
   selectmybook(book: books){
    this.listofbook = book;
   }
     sortType(sort){
      if(sort==='name'){
        this.bookService.BOOKS = this.bookService.BOOKS.sort(function(a, b) {
                                                                              var nameA = a.name.toUpperCase(); 
                                                                              var nameB = b.name.toUpperCase(); 
                                                                                if (nameA < nameB) {
                                                                                  return -1;
                                                                                }
                                                                                if (nameA > nameB) {
                                                                                  return 1;
                                                                                } 
                                                                                return 0;
                                                                            });
        
      } 
    }    

    


    index_i(p,index){
      var k = p?p:1;
      var kk = (k*5-5)+index+1;
      return kk;
    }

}

