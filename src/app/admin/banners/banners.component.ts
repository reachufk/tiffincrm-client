import { Component, inject, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, map } from 'rxjs';
import { BannerService } from 'src/app/shared/services/banner.service';
import { validateAllFormFields } from 'src/app/shared/utils/formUtils';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class BannersComponent {

  @ViewChild('fileUpload') fileUpload: FileUpload;
  private bannerService = inject(BannerService);
  Banners: Observable<any>;
  displayBannerForm: boolean = false;
  BannerForm: FormGroup
  searchKeyword: FormControl = new FormControl(null);

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.CreateForm()
    this.GetBanners()
  }
  GetBanners() {
    this.Banners = this.bannerService.GetBanners().pipe(map((res: any) => res?.data))
  }


  OpenForm(banner: any) {
    if (banner) {
      this.BannerForm.patchValue(banner);
      this.displayBannerForm = true
    } else {
      this.displayBannerForm = true
    }

  }

  imageChangeHandler(event: any) {
    if (event.currentFiles) {
      let that = this
      let image = event.currentFiles[0];
      var extension = image?.type?.replace(/(.*)\//g, '');
      if (extension === 'jpeg' || extension === 'png' || extension == 'webp') {
        var reader: any = new FileReader();
        reader.onloadend = function () {
          that.BannerForm.get('bannerImage').setValue(reader?.result)
          that.BannerForm.get('bannerImageType').setValue(image['type'])
        }
        reader.readAsDataURL(image);
      }
    } else {
      return
    }
  }

  CreateForm() {
    this.BannerForm = new FormGroup({
      _id: new FormControl(null),
      bannerName: new FormControl(null, [Validators.required]),
      bannerImage: new FormControl(null, [Validators.required]),
      bannerImageType: new FormControl(null, [Validators.required])
    })
  }

  SaveBanner() {
    validateAllFormFields(this.BannerForm)
    if (this.BannerForm.valid) {
      if (this.BannerForm.get('_id').value) {
        this.bannerService.UpdateBanner(this.BannerForm.value).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'banner updated!' });
            this.displayBannerForm = false
            this.BannerForm.reset()
            this.fileUpload.clear()
            this.GetBanners()
          }

        })
      } else {
        const formValue = this.BannerForm.value;
        delete formValue._id
        this.bannerService.SaveBanner(formValue).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'banner added!' });
            this.displayBannerForm = false
            this.BannerForm.reset()
            this.fileUpload.clear()
            this.GetBanners()
          }
        })
      }
    }
    return
  }


  DeleteBanner(ID: string) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Banner?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.bannerService.DeleteBanner(ID).subscribe((res: any) => {
          if (res?.statusCode == 200) {
            this.messageService.add({ severity: 'success', summary: 'banner deleted!' });
            this.GetBanners()
          }
        })
      },
      reject: () => {
        return;
      }
    });
  }

  clear() {
    this.BannerForm.get('bannerImageType').reset(null)
    this.BannerForm.get('bannerImage').reset(null)
    this.fileUpload.clear()
  }
  onHide() {
    this.BannerForm.reset();
    this.fileUpload.clear()
  }

}
