import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public gs:GlobalService,public router:Router) { }

  ngOnInit(): void {
    console.log('header component')

  }

  logOut(){
    this.gs.deleteLocalStorage('activeUser')
    this.gs.navigate('login')
  }

}
