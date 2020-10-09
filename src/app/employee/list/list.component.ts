import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/global.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public list: any = [];
  public backupList: any = []
  public params: any = {}


  constructor(public gs: GlobalService, public ar: ActivatedRoute, public route: Router) { }

  ngOnInit() {

    this.setParams()

    this.gs.userUpdate.subscribe((data: any) => {
      this.updateList(data)
    })

    this.route.events.subscribe(data => {
      this.setParams()
    })

    this.getEmployees()
  }

  setParams() {
    if(this.route.url.includes('add') || this.route.url.includes('update') ){
      if (this.ar.snapshot.firstChild && this.ar.snapshot.firstChild.params) {
        this.params = this.ar.snapshot.firstChild.params
      }
    }else{
      this.params={}
    }
   
  }

  updateList(data) {
    if (data.index) {
      this.list[data.index] = data.data
    } else {
      this.list.unshift(data.data)
    }
    this.setPagination()
  }


  async getEmployees() {
    try {
      this.list = await this.gs.getEmployees()
      let temp = [...this.list]
      this.backupList = this.list
      this.setPagination()
    } catch (error) {
      console.log(error)
    }
  }

  public serachKey: any
  search() {
    if (!this.serachKey) {
      this.list = this.backupList;
      return
    }
    this.list = this.backupList.filter(data => {
      if (JSON.stringify(data).includes(this.serachKey)) {
        return data;
      }
    })
    this.setPagination()
  }

  edit(id, index) {
    this.gs.navigate('employee/update/' + id + '/' + index)
  }

  async delete(id, index?) {
    if (confirm('Do you want to delete this employee ?')) {
      try {
        await this.gs.deleteEmployee(id)
        this.gs.showToast('success', 'Employee Deleted')
        this.list.splice(index, 1)
        this.setPagination()
        this.params = {}
        this.gs.navigate('employee')

      } catch (error) {
        this.gs.showToast()
        console.log(error)
      }
    }
  }

  logout() {
    this.gs.deleteLocalStorage('activeUser')
    this.gs.navigate('login')
  }

  add() {
    this.gs.navigate('employee/add')
  }


  pages: number;
  activePage: number = 1;
  perPage = 5;
  setPagination() {
    let pages = this.list.length / this.perPage;
    let l = parseInt(pages.toString());
    this.pages = l >= pages ? l : l + 1;
  }

  setActivePage(page) {
    this.activePage = page
  }



}
