import { Component, inject, signal, PLATFORM_ID, DestroyRef } from "@angular/core";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { RouterLink, Router } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MsrAuth } from "msr-auth";
import { isPlatformBrowser } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PasswordModule } from "primeng/password";
import { MessageService } from "primeng/api";
import { HttpErrorResponse } from "@angular/common/http";
import { toastControl } from "../../../../../core/interceptors/api-response/api-response-interceptor";

@Component({
  selector: "app-login",
  imports: [TranslateModule, RouterLink, ReactiveFormsModule, PasswordModule],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(MsrAuth);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private _messageService = inject(MessageService);
  private _translate = inject(TranslateService);

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

    toastControl.skipNext();
    this.auth
      .login(this.loginForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
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
            this._messageService.add({
              severity: "success",
              detail: res.message || this._translate.instant("messagesToast.loginSuccess"),
              life: 5000,
            });
            this.router.navigate(["/"]);
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error?.message || "An error occurred during login");
          const message = this._translate.instant("messagesToast.loginFailed");
          this._messageService.add({
            severity: "error",
            detail: message,
            life: 5000,
          });
        },
      });
  }
}
