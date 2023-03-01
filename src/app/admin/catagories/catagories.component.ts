import { Component, inject, Optional, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, map, of } from 'rxjs';
import { Catagory } from 'src/app/shared/interfaces/catagory';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';
import { AdminCatagoryService } from '../services/admin-catagory.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.scss'],
  providers: [MessageService]
})
export class CatagoriesComponent {
  @ViewChild('fileUpload') fileUpload: FileUpload;
  private adminCatagoryService = inject(AdminCatagoryService);
  Catagories: Observable<any>;
  displayCatagoryForm: boolean = false;
  CatagoryForm: FormGroup
  searchKeyword: FormControl = new FormControl(null);

  constructor(@Optional() private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.CreateForm()
    this.GetCatagories()
  }
  GetCatagories() {
    this.Catagories = this.adminCatagoryService.GetCatagories().pipe(map((res:any) => res?.data))
  }


  OpenForm(catagory: any) {
    if (catagory) {
      this.CatagoryForm.patchValue(catagory);
      this.displayCatagoryForm = true
    } else {
      this.displayCatagoryForm = true
    }

  }

  imageChangeHandler(event: any) {
    if (event.currentFiles) {
      let that = this
      let image = event.currentFiles[0];
      console.log(image)
      var extension = image?.type?.replace(/(.*)\//g, '');
      if (extension === 'jpeg' || extension === 'png' || extension == 'webp') {
        var reader: any = new FileReader();
        reader.onloadend = function () {
          that.CatagoryForm.get('catagoryImage').setValue(reader?.result)
          that.CatagoryForm.get('catagoryImageType').setValue(image['type'])
        }
        reader.readAsDataURL(image);
      }
    } else {
      return
    }
  }

  CreateForm() {
    this.CatagoryForm = new FormGroup({
      _id: new FormControl(null),
      catagoryName: new FormControl(null, [Validators.required]),
      catagoryImage: new FormControl(null, [Validators.required]),
      catagoryImageType: new FormControl(null, [Validators.required])
    })
  }

  SaveCatagory() {
    validateAllFormFields(this.CatagoryForm)
    if (this.CatagoryForm.valid) {
      if (this.CatagoryForm.get('_id').value) {
        this.adminCatagoryService.UpdateCatagory(this.CatagoryForm.value).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'Catagory updated!' });
            this.displayCatagoryForm = false
            this.CatagoryForm.reset()
            this.GetCatagories()
          }

        })
      } else {
        const formValue = this.CatagoryForm.value;
        delete formValue._id
        this.adminCatagoryService.SaveCatagory(formValue).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'Catagory added!' });
            this.displayCatagoryForm = false
            this.CatagoryForm.reset()
            this.GetCatagories()
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
        this.GetCatagories()
      }
    })
  }

  clear() {
    this.CatagoryForm.get('catagoryImageType').reset(null)
    this.CatagoryForm.get('catagoryImage').reset(null)
    this.fileUpload.clear()
  }


}
