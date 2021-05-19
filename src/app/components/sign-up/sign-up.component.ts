import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ResponseMessage="";
  isUniuqeEmailMessage="";
  isUniuqeEmail=false;
  isSuccess=false;
  isClicked=false;
  constructor(private _AuthService:AuthService,public _Router:Router) {

  }

  signUp=new FormGroup({
    first_name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    last_name:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+[,.]?[ ]?|[a-z]+['-]?)+$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    age:new FormControl('',Validators.required),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
  });

  FormData(){
    if(this.signUp.valid){

      this._AuthService.signUP(this.signUp.value).subscribe(response=>{

        if(response.message=="success"){

        this.isClicked=false;
        this.isSuccess=true;
        this.ResponseMessage=response.message;
        this.isUniuqeEmail=false;
        this.signUp.reset();
        this._Router.navigate(['/signin'])
        }

        else{

          this.isClicked=true;
          this.isSuccess=false;
          this.isUniuqeEmailMessage=response.errors.email.message
          this.isUniuqeEmail=true;

        }
        console.log(response);
      });
    }
  }
  
  ngOnInit(): void {
    $('#signUp').particleground();
  }

  

  

}
