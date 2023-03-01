import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/shared/services/banner.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {

  constructor(private bannerService: BannerService) {
  }
  width: string = '100%';
  Banners: Array<object> = [
  ];

  ngOnInit() {
    this.GetBanners();
    if (window.innerWidth < 768) {
      this.width = '100%';
    } else {
      this.width = '25%';
    }
  }

  GetBanners() {
    this.bannerService.GetBanners().subscribe(async (res: any) => {
      const banners = await res?.data?.map((banner: any) =>
        ({ thumbImage: banner?.bannerImage, title: banner?.bannerName, id: banner?._id })
      )
      this.Banners = [this.Banners, ...banners];
    })
  }


}