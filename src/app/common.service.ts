import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from "../environments/environment";

@Injectable()
export class CommonService {
  //getting api url based on environment 
  public apiURl = environment.apiUrl;
  public showSpinner: boolean = false;
  public auth: boolean = false;
  public fetch: boolean = false;
  public error : boolean = false;

  constructor(public http: Http) { }

  //first post call to server for validating header 
  postCall() {
    var header = {
      "headers": {
        "content-type": "application/x-www-form-urlencoded",
      }, "grant_type": "password",
      "scope": "user",
      "client_id": "4874eafd0f7a240625e59b2b123a142a669923d5b0d31ae8743f6780a95187f5",
      "client_secret": "908f6aee4d4cb27782ba55ae0c814bf43419f3220d696206212a29fe3a05cd88",
      "auth_token": "azd4jXWWLagyb9KzgfDJ"
    };
    return this.http.post(this.apiURl + '/oauth/token.json', header)
      .map(response => {
        this.showSpinner = true;
        this.auth = true;
        this.fetch = false;

        setTimeout(function () {
          let result = response.json();

          //set retrived access token to browser's local storag
          window.localStorage.setItem('access_token', result.access_token);
        }, 10000);

        return true;
      })
      .catch(this.handleError)
  }

  // get current user based on access token we have in our local storage
  getUser() {
    let headers = new Headers();
    let token = window.localStorage.getItem('access_token');
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('content-type', 'application/json');

    let Hdata = new RequestOptions({ headers: headers })

    return this.http.get(this.apiURl + '/users/current.json', Hdata)
      .map(response => {
        this.showSpinner = true;
        this.auth = false;
        this.fetch = true;
        return true;
      })
      .catch(this.handleError);
  }

  // get case study object
  getCaseStudy() {
    let headers = new Headers();
    let token = window.localStorage.getItem('access_token');
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('content-type', 'application/json');

    let Hdata = new RequestOptions({ headers: headers })

    return this.http.get(this.apiURl + '/case_study/companies/58cba141ba169e0eab2657c9/company_case_studies/595c859eba169ec47e4f20d4/user_company_case_studies/595ce021ba169edb9c733e90?include[company_case_study][include]=questions', Hdata)
      .map(response => {
        this.showSpinner = false;
        this.fetch = false;
        this.auth = false;
        return response.json()
      })
      .catch(this.handleError);
  }

  // global error handling
  private handleError(error:Response) {
    return Observable.throw(
       alert('Error in Fetching Data')   
    )
  }
}
