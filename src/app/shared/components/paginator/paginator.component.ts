import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  PageNoControl:FormControl=new FormControl(null)
  @Input() CurrentPage:number=1
  @Input() TotalPages:number
  @Output() PageChange = new EventEmitter<number>();
  @Output() JumpTo = new EventEmitter<number>();
  @Input() TotalRecords:number
  constructor() { }

  ngOnInit(): void {
  }

  pageChanged(page:number){
    if(this.CurrentPage == 1 && page ==  -1){
      console.warn('Not Allowed to go below Page 1')
      return
    }
    if(this.CurrentPage == this.TotalPages && page ==  +1){
      console.warn('Not Allowed to go beyond total pages')
      return
    }
    this.CurrentPage = this.CurrentPage + page
    this.PageChange.emit(this.CurrentPage)
  }

  PageJumpTo(){
    if(this.PageNoControl?.valid && this.PageNoControl.value){
      if(this.CurrentPage == this.PageNoControl.value){
       return
      }else{
        this.JumpTo.emit(+this.PageNoControl.value)
      }
    }
  }

}
