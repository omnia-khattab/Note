import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  errorMsg="";
  isSuccess=true;
  constructor(private _AuthService:AuthService,private _Router:Router) { 
    if(this._AuthService.isLoggedIn()){
      this._Router.navigate(['/Myprofile'])
    }
  }

  signIn=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,10}$/)]),
  });

  FormData(){
    if(this.signIn.valid){
      this._AuthService.signIn(this.signIn.value).subscribe(response=>{

        if(response.message=="success"){
          this._Router.navigate(['/Myprofile']);
          localStorage.setItem("TOKEN",response.token);
          this.isSuccess=true;
        }
        else{
          this.isSuccess=false;
          this.errorMsg=response.message;
        }
        console.log(response);

      });
    }
  }

  ngOnInit(): void {
    $('#signIn').particleground();
  }

}
