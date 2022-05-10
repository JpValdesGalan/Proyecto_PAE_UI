import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/shared/services/signup.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  created: boolean = false;

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm: ['', [Validators.required, Validators.minLength(8)]]
    }, {
      Validators: this.matchPasswords.bind(this)
    })
  }

  ngOnInit(): void {
  }

  sendData() {
    if(this.form.valid) {
      this.signupService.register(this.form.value).subscribe(response => {
        if(!response.error) this.router.navigate(['/login']);
        else this.created = true;
      });
    }
  }

  matchPasswords() {
    if(!this.form) return;
    const { password, confirm } = this.form.getRawValue();
    if(password === confirm) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

}
