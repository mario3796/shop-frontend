import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { ModalService } from 'src/app/shared/modal/modal.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent implements OnInit {
  editing = false;
  isProduct = false;
  productForm = new FormGroup({
    _id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl({}, [Validators.required]),
    description: new FormControl('')
  })
  error: null | string = null
  isLoading = false

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private router: Router) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.editing = !!+params['editing']
      if (this.editing) {
        this.isLoading = true
        this.route.params.subscribe(params => {
          const id = params['id'];
          this.getProduct(id)
        })
      }
    });
  }

  getProduct(id: string) {
    this.productService.getProduct(id)
    .subscribe(product => {
      if (!product) {
        throw new Error('No such a product')
      }
      this.isProduct = true;
      this.productForm.patchValue({
        _id: product._id,
        title: product.title,
        price: '' + product.price,
        description: product.description
      });
      console.log(this.productForm);
      this.isLoading = false
    }, err => {
      this.isLoading = false;
      console.log(err)
    })
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files![0]
    this.productForm.patchValue({ image: file });
    this.productForm.get('image')?.updateValueAndValidity();
  }

  addProduct() {
    if(this.editing) {
      this.productService.editProduct({...this.productForm.value} as Product)
      .subscribe(_product => {
        this.modalService.setModal('PRODUCT_UPDATED')
        this.router.navigateByUrl('/')
      }, err => {
        console.log(err);
        err.error.message ? this.error = err.error.message
        : this.error = 'Something went Wrong!'
      });
      return;
    } 
    this.productService.addProduct({...this.productForm.value} as Product)
    .subscribe(_product => {
      this.modalService.setModal('PRODUCT_ADDED')
      this.router.navigateByUrl('/')
    }, err => {
      console.log(err);
      err.error.message ? this.error = err.error.message
      : this.error = 'Something went Wrong!'
    })
  }
}
