import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../model/product';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  
  constructor(
    private productService: ProductService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
  ) {  
      productService.getProducts().subscribe(result => {
      this.products = result;
    });

  }

  oneProduct: Product;
  products: Product[] = [];
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) : void => {
    const id = params.id;
    
    this.productService.getOneProduct(id).subscribe(result => {
    this.oneProduct = result;
    });
    })
  }

  @Output()
  addToBasket = new EventEmitter<Product>();

  updateBasket(event: Product): void {
    this.customerService.addProduct(event);
    this.productService.decreaseStock(event);
  }

  isTheLast(product: Product): boolean {
    return this.productService.isTheLast(product);
  }

  isAvailable(product: Product): boolean {
    return this.productService.isAvailable(product);
  }





}

