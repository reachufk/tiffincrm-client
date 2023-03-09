import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AdminUserService } from '../services/admin-user.service';
declare interface FetchUserPayload {
  keyword: string;
  pageNo: number,
  pageSize: number
}
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private adminUserService = inject(AdminUserService);
  Users: Observable<any>;
  searchKeyword: FormControl = new FormControl('')
  fetchPayload: FetchUserPayload = { keyword: this.searchKeyword.value, pageNo: 1, pageSize: 8 };
  TotalPages: number = 1;
  TotalRecords: number
  CurrentPage: number = 1
  ngOnInit(): void {
    this.GetUsers()
  }

  GetUsers() {
    this.fetchPayload.keyword = this.searchKeyword.value
    this.Users = this.adminUserService.getUsers(this.fetchPayload).pipe(map((res: { users: Array<any>, totalPages: number, totalCount: number }) => {
      this.TotalPages = res.totalPages;
      this.TotalRecords = res?.totalCount;
      return res?.users
    }))
  }

  pageChanged(page: number) {
    this.fetchPayload.pageNo = page;
    this.CurrentPage = page;
    this.GetUsers()
  }

}
