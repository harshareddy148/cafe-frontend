import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { LoginComponent } from '../login/login.component';
import { SnackbarService } from '../snackbar.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  hide = true;
  loginForm:any = FormGroup;
  show = false;
  responseMessage:any; 
  password: string | undefined;
  constructor(private formBuilder:FormBuilder,
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    // public dialogRef:MatDialogRef<LoginComponent>,
    private ngxService:NgxUiLoaderService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:[null , [Validators.required , Validators.pattern(GlobalConstants.emailRegex)]],
      password:[null , Validators.required]
    })
    this.password = 'password';
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
 
  
  handleSubmit(){
    this.ngxService.start();
    var formDate = this.loginForm.value;
    var data = {
      email: formDate.email,
      password: formDate.password  
    }

    this.userService.login(data).subscribe((response:any)=>{
      this.ngxService.stop();
      localStorage.setItem('token' , response.token);
      // Message("Successfully Login");
      this.router.navigate(['/cafe/dashboard']);
      // this.snackBar.open('Successfully Login', 'close', { duration: 2000, panelClass: 'successSnack' });
      this.snackBar.open("Login Successful", "OK", {
        duration: 3000,
        panelClass: ['green-snackbar', 'login-snackbar'],
       });
    },(error)=>{
      this.ngxService.stop();
      if(error.error?.message){
        // this.responseMessage = error.error?.message;
        this.snackBar.open("Invalid Login Credentials", "Try again!", {
          duration: 3000,
          panelClass: ['red-snackbar','login-snackbar'],
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
    })

  }

}
