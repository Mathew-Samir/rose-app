import { Component } from "@angular/core";
import { ButtonComponent } from '@rose/shared-components';
import { InputComponent } from "@rose/shared-components";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [ButtonComponent, InputComponent],
  templateUrl: "./register.html",
  styleUrl: "./register.scss",
})
export class Register {}
