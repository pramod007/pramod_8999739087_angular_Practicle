import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public user = {
    email: 'admin@gmail.com',
    password: '123456'
  }

  public userUpdate = new Subject();

  constructor(public http: HttpClient, public router: Router, public toaster: ToastrService) { }


  async getEmployees() {
    try {
      let res: any = await this.http.get(environment.BASE_URL + 'employees').toPromise()
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log(error)
      throw error;

    }
  }

  async createEmployee(req) {
    try {
      let res:any = await this.http.post('http://dummy.restapiexample.com/api/v1/create', req).toPromise()
      if (res.status === 'success') {
        return res.data
      }
    } catch (error) {
      console.log(error)
      throw error;

    }
  }

  async getEmployeeDetails(id) {
    try {
      let res: any = await this.http.get(environment.BASE_URL + 'employee/' + id).toPromise()
      if (res.status === 'success') {
        return res.data
      }
      return res;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }


  async updateEmployee(req, id) {
    try {
      let res: any = await this.http.put(environment.BASE_URL + 'update/' + id, req).toPromise()
      if (res.status === 'success') {
        return res.data;
      }
    } catch (error) {
      console.log(error)
      throw error;

    }
  }

  async deleteEmployee(id) {
    try {
      await this.http.delete(environment.BASE_URL + 'delete/' + id).toPromise()

    } catch (error) {
      console.log(error)
      throw error;
    }
  }


  setLocalStorage(name, req) {
    try {
      localStorage.setItem(name, JSON.stringify(req))
    } catch (error) {
      console.log(error)
    }
  }

  getLocalStorage(name) {
    try {
      let obj = localStorage.getItem(name);
      return JSON.parse(obj)
    } catch (error) {
      console.log(error)
    }
  }

  deleteLocalStorage(name) {
    localStorage.removeItem(name)
  }

  isLogin() {
    let user = this.getLocalStorage('activeUser');
    if (!user) {
      return false
    }
    if (JSON.stringify(this.user) == JSON.stringify(user)) {
      console.log('true')
      return true
    } else {
      console.log('false')
      this.navigate('login')
      return false
    }
  }

  navigate(route) {
    this.router.navigate([route]);
  }

  showToast(type?, msg?) {
    // success/error/warning/info/show()
    if (msg) {
      this.toaster[type](msg)
    } else {
      this.toaster.error('Something went Wrong')
    }
  }

}
