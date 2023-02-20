import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, map } from 'rxjs';
import { FetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AdminCatagoryService } from '../services/admin-catagory.service';

@Component({
  selector: 'app-catagory-items',
  templateUrl: './catagory-items.component.html',
  styleUrls: ['./catagory-items.component.scss'],
  providers: [MessageService]
})
export class CatagoryItemsComponent {

  private adminCatagoryService = inject(AdminCatagoryService);
  CatagoryItems: Observable<any>;
  displayCatagoryItemForm: boolean = false;
  CatagoryItemForm: FormGroup
  searchKeyword: FormControl = new FormControl(null);
  catagoryID: string;
  FetchModel: FetchCatagoryItems = { pageNo: 1, pageSize: 10, keyword: '', catagory: '' }
  CurrentPage: number=1;
  TotalPages: number;
  TotalRecords: number
  catagoryName: string;
  constructor(private messageService: MessageService, private activatedRoute: ActivatedRoute) {
    this.catagoryID = this.activatedRoute.snapshot.paramMap.get('catagory');
    this.catagoryName = this.activatedRoute.snapshot.queryParamMap.get('catagoryName');
    this.FetchModel.catagory = this.catagoryID
  }

  ngOnInit(): void {
    this.CreateForm()
    this.GetCatagoryItems()
  }
  GetCatagoryItems() {
    this.CatagoryItems = this.adminCatagoryService.GetCatagoryItems(this.FetchModel).pipe(map((res: { items: Array<any>, statusCode: number, totalPages: number, totalCount: number }) => {
      this.TotalPages = res?.totalPages
      this.TotalRecords= res?.totalCount
      return res?.items
    }))
  }

  pageChanged(page: number) {
    this.FetchModel.pageNo = page;
    this.CurrentPage = page;
    this.GetCatagoryItems()
  }


  OpenForm(catagory: any) {
    if (catagory) {
      this.CatagoryItemForm.patchValue(catagory);
      this.displayCatagoryItemForm = true
    } else {
      this.displayCatagoryItemForm = true
    }

  }

  CreateForm() {
    this.CatagoryItemForm = new FormGroup({
      _id: new FormControl(null),
      catagory: new FormControl(this.catagoryID, [Validators.required]),
      itemName: new FormControl(null, [Validators.required]),
      itemPrice: new FormControl(null, [Validators.required]),
      itemDiscount: new FormControl(null)
    })
  }

  SaveItem() {
    validateAllFormFields(this.CatagoryItemForm)
    if (this.CatagoryItemForm.valid) {
      if (this.CatagoryItemForm.get('_id').value) {
        this.adminCatagoryService.UpdateCatagoryItem(this.CatagoryItemForm.value).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'Catagory updated!' });
            this.displayCatagoryItemForm = false
            this.CatagoryItemForm.reset()
            this.GetCatagoryItems()
          }

        })
      } else {
        const formValue = this.CatagoryItemForm.value;
        delete formValue._id
        this.adminCatagoryService.SaveCatagoryItem(formValue).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'Catagory added!' });
            this.CatagoryItemForm.reset()
            this.displayCatagoryItemForm = false
            this.GetCatagoryItems()
          }
        })
      }
    }
    return
  }

  DeleteCatagory(ID: string) {
    this.adminCatagoryService.DeleteCatagory(ID).subscribe((res: any) => {
      if (res?.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'Catagory deleted!' });
        this.GetCatagoryItems()
      }
    })
  }
}
