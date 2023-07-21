import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from '../shared/global-constants';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm:any = FormGroup;
  responseMessage:any;
  
  registerSucess:boolean = false;
  isButtonVisible = true;

  constructor(private formBulider:FormBuilder, 
    private userService:UserService , 
    private ngxService:NgxUiLoaderService,
    // public dialogRef:MatDialogRef<ForgotPasswordComponent> ,
    private snackbarService:SnackbarService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBulider.group({
      email:[null,[Validators.required , Validators.pattern(GlobalConstants.emailRegex)]]
    });
   
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.forgotPasswordForm.value;
    var data = {
      email:formData.email
    }
    
    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxService.stop();
      // this.dialogRef.close();
      localStorage.setItem('token' , response.token);
      // alert("Check your email for credentials");
      // this.responseMessage = response?.message;
      // this.snackbarService.openSnackBar(this.responseMessage,"");
      this.snackBar.open("Check your email for credentials", "OK", {
        duration: 3000,
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        // this.responseMessage = error.error?.message;
        this.snackBar.open("Something went wrong. pleases try again later ", "OK", {
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
      this.snackbarService.openSnackBar(this.responseMessage , GlobalConstants.error);
    })
    
  }
}
