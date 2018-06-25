import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchService} from '../../services/search.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-search-view',
  templateUrl: './search-view.component.html',
  styleUrls: ['./search-view.component.scss']
})

export class SearchViewComponent {

  searchForm = new FormGroup({
    cityFrom: new FormControl('', Validators.required),
    cityTo: new FormControl('', Validators.required),
    date: new FormControl()
  });

  constructor(public searchService: SearchService, public  router: Router) {
  }

  setSearchData() {
    let stringDate: string = this.searchForm.get('date').value;
    let date: Date = null;
    if (stringDate != null && stringDate !== '') {
      date = new Date(stringDate);
    }
    this.searchService.setSearchData(this.searchForm.get('cityFrom').value, this.searchForm.get('cityTo').value, date);
    this.searchForm.reset();
    this.router.navigate(['/route-list']);
  }

}

