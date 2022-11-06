import { Component, ElementRef, Input, AfterViewChecked, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ModalComponent implements AfterViewChecked {
  @Input() content: any
  @Input() show = false
  @ViewChild('modalBody') modalBody?: ElementRef<HTMLDivElement>
  modalHeader = 'Alert!'
    
  constructor(private modalService: ModalService) {}
 
  ngAfterViewChecked(): void {
    this.modalBody?.nativeElement.append(this.content)
  }

  hide() {
    this.modalService.hideModal()
  }

}
