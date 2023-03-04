import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminOrdersService } from 'src/app/admin/services/admin-orders.service';
import { Menu } from 'primeng/menu';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css'],
    providers:[MessageService,AdminOrdersService]
})
export class NavbarComponent implements OnInit {
    @ViewChild('menuNotifications',{static:false}) 
    menuNotifications:Menu
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    searchControl: FormControl = new FormControl(null)
    notificationItems: Array<any>= []
    userItems: { label: string; icon: string }[] = []
    constructor(location: Location, private element: ElementRef, private router: Router,
        private messageService:MessageService,private adminOrderService:AdminOrdersService) {
        this.location = location;
        this.sidebarVisible = false;
    }



    ngOnInit() {
        this.getNavbarItems()
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.router.events.subscribe((event) => {
            this.sidebarClose();
            var $layer: any = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
                this.mobile_menu_visible = 0;
            }
        });
        this.adminOrderService.connect();
        this.adminOrderService.FetchNewCreatedOrder().subscribe((order:any)=>{
            if(order){
                this.notificationItems.push({label:`${order?.userInfo?.username} orderd for ${order?.orderType}`})
                const currentDate  = new Date().toISOString().slice(0, 10);
                const deliveryDate = order?.orderDeliveryTime?.slice(0,10);
                if(currentDate == deliveryDate){
                    this.messageService.add({severity:'success',summary:`${order?.userInfo?.username?order?.userInfo?.username:'user'} has placed new nrder. check Latest Orders to process`,sticky:true,key:'notify'})
                }else{
                    this.messageService.add({severity:'success',summary:`${order?.userInfo?.username?order?.userInfo?.username:'user'} has placed new nrder. check Future Orders to process`,sticky:true,key:'notify'})
                }
               
            }
        })
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');
        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { //asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };



    getNavbarItems() {
        this.notificationItems = []
        this.userItems = [
            { label: 'Profile', icon: 'pi pi-fw pi-user' },
            { label: 'Change Password', icon: 'pi pi-fw pi-key' }
        ]
    }

}

