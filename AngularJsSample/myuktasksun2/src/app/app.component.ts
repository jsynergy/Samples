import { Component } from '@angular/core';
import { bookcomponent } from './bookcomponent';
import { bookDetailsComponent } from './bookDetailsComponent';
import { ActivatedRoute } from '@angular/router';
import { BookService } from './books';
import { books} from './booksmodal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
}
