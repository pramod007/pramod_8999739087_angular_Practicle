import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/global.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup
  public isProcessing = false;
  public params: any

  constructor(public fb: FormBuilder, public gs: GlobalService, public router: Router, public ar: ActivatedRoute
  ) { }

  ngOnInit() {
    this.initializeForm()
    if (this.router.url.includes('update')) {
      this.ar.params.subscribe(params => {
        this.params = params
        this.getDetails(params.id)
      })
    } else {
      this.isError = false
    }
  }



  initializeForm() {
    this.form = this.fb.group({
      employee_name: ['', Validators.required],
      employee_salary: [null, Validators.required],
      employee_age: [null, Validators.required],
      id: [undefined]
    })
  }

  async create() {
    try {
      if (!this.checkValidation()) {
        return
      }
      this.isProcessing = true
      let res = await this.gs.createEmployee(this.form.value)
      this.gs.showToast('success', 'Employee Created')
      this.gs.userUpdate.next({ data: res })
      this.isProcessing = false
      this.form.reset()
    } catch (error) {
      this.gs.showToast()
      this.isProcessing = false
    }
  }

  async update() {
    try {
      if (!this.checkValidation()) {
        return
      }
      this.isProcessing = true
      let req: any = { ...this.form.value };
      await this.gs.updateEmployee(this.form.value, this.params.id)
      this.isProcessing = false
      this.gs.userUpdate.next({ index: this.params.index, data: req })
      this.gs.showToast('success', 'Updated Succefully')
    } catch (error) {
      console.log(error)
      this.gs.showToast()
      this.isProcessing = false
    }
  }

  public isError: any = false;
  async getDetails(id) {
    try {
      this.isError = false
      let data = await this.gs.getEmployeeDetails(id)
      this.form.patchValue(data)
    } catch (error) {
      console.log(error)
      if (error.status == 429) {
        this.gs.showToast('error', error.statusText)
      }
      this.isError = error.statusText;
      this.form.reset()
    }
  }

  checkValidation() {
    if (!this.form.valid) {
      Object.keys(this.form.value).forEach(control => {
        this.form.controls[control].markAsDirty()
      })
      return false
    } else {
      return true
    }
  }

}
