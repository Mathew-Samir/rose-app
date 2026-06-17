import { Component, inject, signal, PLATFORM_ID } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MsrAuth } from "msr-auth";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: "app-login",
  imports: [TranslateModule, RouterLink, ReactiveFormsModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(MsrAuth);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  loginForm = this.fb.nonNullable.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required, Validators.minLength(6)]],
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.auth.login(this.loginForm.getRawValue()).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.status) {
          if (isPlatformBrowser(this.platformId)) {
            const response = res as typeof res & { payload?: { token: string } };
            const token = response.payload?.token || response.data?.token;
            if (token) {
              localStorage.setItem("token", token);
            }
          }
          this.router.navigate(["/"]);
        } else {
          this.errorMessage.set(res.message);
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || "An error occurred during login");
      },
    });
  }
}
