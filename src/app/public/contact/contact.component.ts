import { Component, OnInit } from '@angular/core';
import { CatagoryService } from '../services/catagory.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class Contact implements OnInit {
  catagory: any[] = [];

  constructor(private catagoryService: CatagoryService) { }

  ngOnInit(): void {
    this.catagoryService.GetCatagories().subscribe();
  }

}
