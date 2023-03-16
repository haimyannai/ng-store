import {
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/product/services/product.service';
import { IProduct } from 'src/app/shared/models';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  public products: IProduct[] = [];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  public dataSource = new MatTableDataSource<IProduct>();
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'description',
    'category',
    'image',
    'rating',
    'star',
  ];

  constructor(private productService: ProductService) {}

  // ngAfterViewInit() {
  //   if (this.paginator) this.dataSource.paginator = this.paginator;

  //   if (this.sort) this.dataSource.sort = this.sort;
  // }

  ngOnInit() {
    console.log(this.productService.getProducts());
    this.productService.getProducts().subscribe((data) => {
      console.log('all products', data);
      this.products = data;
      this.dataSource = new MatTableDataSource(data);
      if (this.sort) this.dataSource.sort = this.sort;

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  ngOnDestroy(): void {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  ngAfterViewInit() {
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
  }
}
