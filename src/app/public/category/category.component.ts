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

  catagories: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.catagoryService.GetCatagories().subscribe((category: any[]) => {
      this.catagories = category;
    })
  }
}
