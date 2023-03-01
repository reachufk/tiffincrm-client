import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { FetchCatagoryItems, initializeFetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { CatagoryService } from '../services/catagory.service';
import { FormControl } from '@angular/forms';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class CategoryItemsComponent implements OnInit, OnDestroy {

  Items: Observable<any>;
  Categories: Array<{ thumbImage: string, title: string, id: string }> = [
    { thumbImage: '', title: '', id: '' }
  ]
  category: string = '';
  categoryName: string = ''
  FetchModel: FetchCatagoryItems = initializeFetchCatagoryItems();
  totalRecords: number = 0;
  totalPages: number = 1;
  currentPage: number = 1;
  itemTypeControl: FormControl = new FormControl(false)
  searchKeyword: FormControl = new FormControl("")
  FilteredItems: Observable<any>;
  Destroy: Subject<void> = new Subject();
  private messageService = inject(MessageService);
  displayAddItemDialog: boolean = false
  SelectedItem: any = {};
  QuantityControl: FormControl = new FormControl(1);
  LoggedInUser: IloggedUser;
  AllCatagories:Array<any>=[];
  empty:boolean = false
  regionSelected = JSON.parse(localStorage.getItem('selectedRegion'))
  constructor(private catagoryService: CatagoryService, private activatedRoute: ActivatedRoute,
    private location: Location, private cartService: CartService,
    private confirmationService: ConfirmationService, private router: Router) {
    this.category = this.activatedRoute.snapshot.paramMap.get('category')
  }
  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntil(this.Destroy), map((data: any) => {
      this.LoggedInUser = data?.user
    })).subscribe()
    this.FetchModel.pageSize = Infinity;
    this.FetchModel.catagory = this.category
    this.GetCategories()
    this.GetItems()
  }

  GetItems() {
    this.FilteredItems = this.catagoryService.GetCatagoryItems(this.FetchModel).pipe(map((res: any) =>{
      if(!res?.data?.length){
        this.empty = true
        return
      }
      this.empty = false
      return res?.data
    }))
    this.Items = this.FilteredItems
  }
  GetCategories() {
    this.catagoryService.GetCatagories().subscribe(async (res: any) => {
      const catagories = await res?.data?.map((catagory: any) =>
        ({ thumbImage: catagory?.catagoryImage, title: catagory?.catagoryName, id: catagory?._id })
      )
      this.Categories = [this.Categories, ...catagories];
      this.AllCatagories = this.Categories
      this.categoryName = this.Categories.filter((category: any) => category?.id == this.category)[0]?.title;
      this.Categories = this.Categories.filter((catagory:any)=> catagory?.id !== this.category)
    })
  }

  catagoryClick(event: number) {
    const categorySelected = this.Categories[event];
    this.category = categorySelected['id'];
    const updatedUrl = this.location.path()?.replace(/category-items\/[^\/]*/, `category-items/${this.category}`);
    this.location.replaceState(updatedUrl);
    this.FetchModel.pageNo = 1
    this.FetchModel.catagory = this.category
    this.categoryName = this.Categories.filter((category: any) => category?.id == this.category)[0]?.title;
    this.Categories = this.AllCatagories.filter((catagory:any)=> catagory?.id !== this.category)
    this.GetItems()
  }

  handleChange({ checked }) {
    if (checked) {
      this.FilteredItems = this.Items.pipe(map((items: Array<any>) => items?.filter((item: any) => item?.isVeg)))
    } else {
      this.FilteredItems = this.Items.pipe(map((items: Array<any>) => items?.filter((item: any) => !item?.isVeg)))
    }
  }

  OpenItemDialog(item) {
    if (!this.LoggedInUser || !this.regionSelected) {
      this.NotSignedInConfirm()
      return
    }
    this.SelectedItem = ({
      itemId: item?._id, itemName: item?.itemName, itemPrice: item?.itemPrice,
      count: 1, itemDiscount: item?.itemDiscount, catagory: item?.catagory,itemInstructions:'',
      isVeg: item?.isVeg ? item?.isVeg : false, itemTypes: item?.itemTypes, selectedItemType: item?.itemTypes?.length ? item?.itemTypes[0] : {}
    })
    this.displayAddItemDialog = true
  }

  AddToCart(SelectedItem: any) {
    const user = this.LoggedInUser?.user
    this.cartService.AddCartItem(user, SelectedItem).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.messageService.add({ severity: 'success', summary: 'Item added to cart', life: 3000 });
      } else {
        this.messageService.add({ severity: 'warn', summary: res?.message || 'already exists', life: 3000 });
      }
      this.SelectedItem = {}
      this.displayAddItemDialog = false
    })
  }


  NotSignedInConfirm() {

    if(!this.LoggedInUser){
      this.confirmationService.confirm({
        message: 'Sign in to continue?',
        header: 'You are not logged in?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sign in',
        rejectLabel: 'Sign up',
        accept: () => {
          this.confirmationService.close()
          this.router.navigate(['/auth/login'])
        },
        reject: (type) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.confirmationService.close();
              this.router.navigate(['/auth/signup'])
              break;
            case ConfirmEventType.CANCEL:
              this.confirmationService.close()
              break;
          }
  
        }
      });
      return
    }

    if(!this.regionSelected){
      this.confirmationService.confirm({
        message: 'Select Region from above to continue?',
        header: "You haven't selected your region yet ?",
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Select region',
        rejectVisible:false,
        accept: () => {
          this.confirmationService.close()
          window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
          });
        }
      });
      return
    }

  }



}
