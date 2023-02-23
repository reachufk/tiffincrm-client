import { Component, inject, OnInit } from '@angular/core';
import { CatagoryService } from '../services/catagory.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  private catagoryService = inject(CatagoryService);

  catagories: any[] = [];
  poweredByDate: number = Date.now();

  constructor() { }

  ngOnInit(): void {
    this.catagoryService.GetCatagories().subscribe((category: any[]) => {
      this.catagories = category;
    })
  }
}
