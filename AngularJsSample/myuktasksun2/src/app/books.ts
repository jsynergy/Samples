//service for the details of the books
import { Injectable,OnInit } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { Component } from '@angular/core';

import { books } from './booksmodal';
import { IBooks } from './booksinterface';

@Injectable()
export class BookService {

  public BOOKS: any = [];

  constructor(private _http: Http) {
    this.BOOKS = [

      {
        id: 1,
        name: "Into the Water ",
        authors: "Paula Hawkins (Goodreads Author)",
        numberofpages: 1050,
        dateofpublication: "Jan 10th 2017"
      },
      {
        id: 2,
        name: "The Hate U Give ",
        authors: "Angie Thomas (Goodreads Author) ",
        numberofpages: 2000,
        dateofpublication: "March 11th 2017"
      },
      {
        id: 3,
        name: "Little Fires Everywhere ",
        authors: " Celeste Ng (Goodreads Author) ",
        numberofpages: "2050",
        dateofpublication: " Feb 14th 2017"
      },
      {
        id: 4,
        name: "Turtles All the Way Down ",
        authors: "John Green (Goodreads Author)",
        numberofpages: 1100,
        dateofpublication: " Aug 14th 2017"
      },
      {
        id: 5,
        name: "Norse Mythology ",
        authors: "Neil Gaiman (Goodreads Author) ",
        numberofpages: "2000",
        dateofpublication: "Sep 18th 2017"
      },
	  {
         id: 6,
		  Serial:12474,
         name: "Morse Mythology part2 ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "nov 18th 2017"
      },
	   {
         id: 7,
		  Serial:12374,
         name: "John Mythology ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "Sep 18th 2017"
      },
	   {
         id: 8,
		  Serial:121174,
         name: "Miller Mythology ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "Sep 8th 2017"
      },
	   {
         id: 9,
		  Serial:122374,
         name: "Alex Mythology ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "Sep 18th 2017"
      }, {
         id: 10,
		  Serial:1442374,
         name: "Flintoff Mythology 999 ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "Sep 19th 2017"
      },
	  {
         id: 11,
		  Serial:1442374,
         name: "Sachin Mythology ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "mar 18th 2017"
      },
	  {
         id: 12,
		  Serial:14423974,
         name: "Kohli Mythology33 ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "feb 18th 2017"
      },
	  {
         id: 13,
		  Serial:144374,
         name: "manoj Mythology5 ",
         authors: "Neil Gaiman (Goodreads Author) ",
         numberofpages: "2000",
        dateofpublication: "jan 18th 2017"
      }
    ];
  }

  

  private extractData(res: Response) {
      let body = res.json();
      return body.fields || { };
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
}

getBookList(): Observable<IBooks[]> {
      let headers = new Headers({'content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      return this.BOOKS
    
  }


}







    




