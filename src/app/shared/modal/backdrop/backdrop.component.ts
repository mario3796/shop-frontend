import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent implements OnInit {
  @Input() show = false;
  @Output() clicked = new EventEmitter<null>();
  constructor() { }

  ngOnInit(): void {
  }

  hide() {
    this.clicked.emit()
  }

}
