import { Component, inject, signal, output, DestroyRef } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";
import { MsrAuth } from "msr-auth";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-forget-password",
  imports: [ReactiveFormsModule, TranslateModule, RouterLink],
  templateUrl: "./forget-password.html",
  styleUrl: "./forget-password.scss",
})
export class ForgetPassword {
  private fb = inject(FormBuilder);
  private auth = inject(MsrAuth);
  private destroyRef = inject(DestroyRef);

  emailSent = output<string>();

  forgotPasswordForm = this.fb.nonNullable.group({
    email: ["", [Validators.required, Validators.email]],
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const email = this.forgotPasswordForm.getRawValue().email;

    this.auth
      .forgotPassword({
        email,
        redirectUrl: "http://localhost:4200/auth-layout/reset-password/new-password",
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.status) {
            this.emailSent.emit(email);
          } else {
            this.errorMessage.set(res.message);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || "An error occurred");
        },
      });
  }
}
