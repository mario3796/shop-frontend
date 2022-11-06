import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EmptyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
