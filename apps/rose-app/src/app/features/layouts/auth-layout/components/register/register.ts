import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonComponent, ErrorMessageComponent } from '@rose/shared-components';
import { InputComponent } from "@rose/shared-components";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputComponent, ErrorMessageComponent, ReactiveFormsModule],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });
}
