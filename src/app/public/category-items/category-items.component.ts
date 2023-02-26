import { Component, OnInit, OnDestroy,inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { debounceTime, map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { FetchCatagoryItems, initializeFetchCatagoryItems } from 'src/app/shared/interfaces/fetch-catagory-items';
import { CatagoryService } from '../services/catagory.service';
import { Form, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { IloggedUser } from 'src/app/shared/interfaces/auth';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.scss'],
  providers:[MessageService]
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
  private messageService= inject(MessageService);
  displayAddItemDialog:boolean = false
  SelectedItem: any={};
  QuantityControl:FormControl = new FormControl(1);

  constructor(private catagoryService: CatagoryService, private activatedRoute: ActivatedRoute,
    private location: Location,private authService:AuthService,private cartService:CartService) {
    this.category = this.activatedRoute.snapshot.paramMap.get('category')
  }
  ngOnDestroy(): void {
    this.Destroy.next();
    this.Destroy.complete()
  }

  ngOnInit(): void {
    this.FetchModel.pageSize = Infinity;
    this.FetchModel.catagory = this.category
    this.GetCategories()
    this.GetItems()
    this.searchKeyword.valueChanges.pipe(debounceTime(500), takeUntil(this.Destroy), map((input: string) => this.SearchItem(input))).subscribe()
  }

  GetItems() {
    this.FilteredItems = this.catagoryService.GetCatagoryItems(this.FetchModel).pipe(map((res: any) => res?.data))
    this.Items = this.FilteredItems
  }
  GetCategories() {
    this.catagoryService.GetCatagories().subscribe(async (res: any) => {
      const catagories = await res?.data?.map((catagory: any) =>
        ({ thumbImage: catagory?.catagoryImage, title: catagory?.catagoryName, id: catagory?._id })
      )
      this.Categories = [this.Categories, ...catagories];
      this.categoryName = this.Categories.filter((category: any) => category?.id == this.category)[0]?.title;

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
    this.GetItems()
  }

  handleChange({ checked }) {
    if (checked) {
      this.FilteredItems = this.Items.pipe(map((items: Array<any>) => items?.filter((item: any) => item?.isVeg)))
    } else {
      this.FilteredItems = this.Items.pipe(map((items: Array<any>) => items?.filter((item: any) => !item?.isVeg)))
    }
  }

  SearchItem(keyword: string) {
    this.FilteredItems = this.Items.pipe(map((items: Array<any>) => items?.filter((item: any) => item?.itemName?.toLowerCase()?.includes(keyword?.toLowerCase()))))
  }

  OpenItemDialog(item){
    const regionSelected = this.authService?.SelectedRegion?.value;
    if(!regionSelected){
      this.messageService.add({ severity: 'warn', summary: 'Select region to continue',sticky:true });
      return
    }
    this.authService.LoggedInUser.subscribe((user:IloggedUser)=> {
      if(!user?.token){
        this.messageService.add({ severity: 'warn', summary: 'Signin to continue',life:6000 });
        return
      }
      this.SelectedItem = ({itemId:item?._id,itemName:item?.itemName,itemPrice:item?.itemPrice,count:1,itemDiscount:item?.itemDiscount,catagory:item?.catagory,isVeg:item?.isVeg?item?.isVeg:false})
      this.displayAddItemDialog = true
    })
  }

  AddToCart(SelectedItem:any){
    const user = this.authService?.LoggedInUser?.value?.user 
    this.cartService.AddCartItem(user,SelectedItem).subscribe((res:any)=>{
      if(res.statusCode ==200){
        this.messageService.add({ severity: 'success', summary: 'Item added to cart',life:3000 });
      }else{
        this.messageService.add({ severity: 'warn', summary: res?.message || 'already exists',life:3000 });
      }
    })
  }


}
