import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() currentPage: any;
  @Input() hasNextPage: any;
  @Input() hasPreviousPage: any;
  @Input() nextPage: any;
  @Input() previousPage: any;
  @Input() lastPage: any;

  constructor() { }

  ngOnInit(): void {
    this.lastPage = Math.ceil(this.lastPage);
  }

}
