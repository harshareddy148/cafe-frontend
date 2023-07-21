import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  
  signupForm:any = FormGroup;
  responseMessage:any;
  password=true;
  confirmPassword=true;
  constructor(private formBuilder:FormBuilder,
      private router:Router,
      private userService:UserService,
      private snackbarService:SnackbarService,
      // public dialogRef:MatDialogRef<SignupComponent>,
      private ngxService:NgxUiLoaderService,private snackBar: MatSnackBar
    ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:[null , [Validators.required]],
      email:[null , Validators.required],
      contactNumber:[null , [Validators.required]],
      password:[null , Validators.required],
      confirmPassword:[null , [Validators.required]]
    })
    

  }
  
   validateSubmit(){
    if(this.signupForm.controls['password'].value != this.signupForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxService.start();
    var formDate = this.signupForm.value;
    var data = {
      name: formDate.name,
      email: formDate.email,
      contactNumber: formDate.contactNumber,
      password: formDate.password,
    }

    this.userService.signup(data).subscribe((response:any)=>{
      this.ngxService.stop();
      // this.dialogRef.close();
      // this.responseMessage = response?.message;
      // this.snackbarService.openSnackBar(this.responseMessage,"");
      // alert("Successfully Login");
      this.router.navigate(['/login']);
      this.snackBar.open("Successfully signin You need to wait for admin approval to Login ", "OK", {
        duration: 3000,
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        // this.responseMessage = error.error?.message;
        this.snackBar.open("Email already exists ", "OK", {
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
         });
      }else{
        // this.responseMessage = GlobalConstants.genericError;
        this.snackBar.open("Something went wrong. pleases try again later ", "OK", {
          duration: 3000,
          panelClass: ['red-snackbar', 'login-snackbar'],
         });
      }
      // alert(this.responseMessage +" " +GlobalConstants.error);
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    },
    )
  }
}
