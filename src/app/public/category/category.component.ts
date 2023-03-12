import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CatagoryService } from '../services/catagory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private catagoryService = inject(CatagoryService);

  catagories: Observable<any>
  constructor() { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.catagories = this.catagoryService.GetCatagories().pipe(map((res: any) => res?.data))
  }

}
