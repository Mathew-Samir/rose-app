import { Component, signal } from "@angular/core";
import { ForgetPassword } from "./components/forget-password/forget-password";
import { ResetLinkReceived } from "./components/reset-link-received/reset-link-received";

@Component({
  selector: "app-reset-password",
  imports: [ForgetPassword, ResetLinkReceived],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.scss",
})
export class ResetPassword {
  isEmailSent = signal(false);
  sentEmail = signal("");

  onEmailSent(email: string) {
    this.sentEmail.set(email);
    this.isEmailSent.set(true);
  }
}
