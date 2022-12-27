import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    content: any = null
    private renderer: Renderer2
    private modalShowListener = new Subject<boolean>();
    private modalContentListener = new Subject<any>();

    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null)
    }

    getModalShowListener() {
        return this.modalShowListener.asObservable()
    }

    getModalContentListener() {
        return this.modalContentListener.asObservable();
    }
    
    setModal(action: string, payload?: any) {
        let closeButton: HTMLButtonElement = this.renderer.createElement('button');
        this.renderer.appendChild(closeButton, this.renderer.createText('OK'));
        closeButton.addEventListener('click', () => this.hideModal())
        this.content = this.renderer.createElement('div');
        this.renderer.addClass(this.content, 'content')
        
        console.log(action)
        let note = this.renderer.createElement('h3')
        let text;
        switch(action) {
            case 'PRODUCT_ADDED': 
                text = this.renderer.createText('Product Added!')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)
                this.renderer.appendChild(this.content, closeButton)
                break;

            case 'PRODUCT_UPDATED':
                text = this.renderer.createText('Product Updated!')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)
                this.renderer.appendChild(this.content, closeButton);
                break;

            case 'PRODUCT_DELETED':
                text = this.renderer.createText('Product Deleted!')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)
                this.renderer.appendChild(this.content, closeButton);
                break;
                
            case 'SIGN_IN':
                text = this.renderer.createText('You Successfully Signed in!')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)
                this.renderer.appendChild(this.content, closeButton);
                break;

            case 'CHECKOUT':
                text = this.renderer.createText('Are you sure that you want to checkout?')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)
                
                let checkout: HTMLInputElement = this.renderer.createElement('button');
                this.renderer.appendChild(checkout, this.renderer.createText('Checkout'))
                checkout.addEventListener('click', () => {
                    payload.addOrder();
                    this.hideModal();
                });
                this.renderer.appendChild(this.content, checkout);

                closeButton = this.renderer.createElement('button');
                this.renderer.appendChild(closeButton, this.renderer.createText('Cancel'))
                closeButton.addEventListener('click', () => this.hideModal())
                this.renderer.appendChild(this.content, closeButton);
                break;

            case 'CLEAR':
                text = this.renderer.createText('Are you sure that you want to clear the cart?')
                this.renderer.appendChild(note, text)
                this.renderer.appendChild(this.content, note)

                let clear: HTMLInputElement = this.renderer.createElement('button');
                this.renderer.appendChild(clear, this.renderer.createText('Clear'))
                clear.addEventListener('click', () => {
                    payload.clearCart();
                    this.hideModal();
                });
                this.renderer.appendChild(this.content, clear)
                
                closeButton = this.renderer.createElement('button');
                this.renderer.appendChild(closeButton, this.renderer.createText('Cancel'))
                closeButton.addEventListener('click', () => this.hideModal())
                this.renderer.appendChild(this.content, closeButton);
                break;
            }
        
        this.modalContentListener.next(this.content)
        this.modalShowListener.next(true)
    }

    hideModal() {
        this.modalShowListener.next(false)
    }
}