import { Component, OnInit } from '@angular/core';
import { CommonService } from "./common.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public disableMeNext = false;
  public disableMePrev = false;
  public questionArr: any[];
  public index = 0;
  public tempcasedata: any[];

  constructor(private service: CommonService) { }

  ngOnInit() {
    // post call to server
    this.service.postCall()
      .subscribe(result => {
        if (result) {
          this.getCurrentUser();
        }
      })
  }

  // get current user
  getCurrentUser() {
    this.service.getUser().subscribe(
      response => {
        if (response) {
          this.getCasestudy();
        }
      }
    )
  }

  // get CaseStudy 
  getCasestudy() {
    this.service.getCaseStudy().subscribe(
      response => {
        if (response) {
          this.questionArr = response.user_company_case_study.company_case_study.questions;
          console.log(this.questionArr);
          this.disableMeNext = true;
          this.tempcasedata = this.questionArr[this.index].body
        }
      })
  }

  //get next question 
  Nextbtn() {
    this.index++;
    if (this.index <= this.questionArr.length - 1) {
      this.tempcasedata = this.questionArr[this.index].body
      console.log(this.index)

      if (this.index === this.questionArr.length - 1) {
        this.disableMeNext = false;
      }
      else {
        this.disableMePrev = true;
      }
    }
  }

  //get previous question
  Privousbtn() {
    this.index--
    if (this.index <= this.questionArr.length && this.index >= 0) {
      this.tempcasedata = this.questionArr[this.index].body
      this.disableMeNext = true;
      if (this.index === 0) {
        this.disableMePrev = false;
      }
    } else {
      this.disableMePrev = false;
    }
  }
}
