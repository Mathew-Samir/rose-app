import { Component, inject, signal, OnInit, DestroyRef, PLATFORM_ID } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { MsrAuth } from "msr-auth";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { PasswordModule } from "primeng/password";
import { isPlatformBrowser } from "@angular/common";
import { PasswordRules } from "../../../../../../../shared/components/ui/password-rules/password-rules";

@Component({
  selector: "app-new-password",
  imports: [ReactiveFormsModule, TranslateModule, RouterLink, PasswordModule, PasswordRules],
  templateUrl: "./new-password.html",
  styleUrl: "./new-password.scss",
})
export class NewPassword implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(MsrAuth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  token = signal<string>("");
  showPasswordRules = signal(false);

  newPasswordForm = this.fb.nonNullable.group({
    newPassword: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/),
      ],
    ],
    confirmPassword: ["", [Validators.required, Validators.minLength(8)]],
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  ngOnInit() {
    this.route.queryParams.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((params) => {
      const tokenFromUrl = params["token"];
      if (tokenFromUrl) {
        this.token.set(tokenFromUrl);
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem("token", tokenFromUrl);
        }
      }
    });
  }

  onSubmit() {
    if (this.newPasswordForm.invalid) {
      this.newPasswordForm.markAllAsTouched();
      return;
    }

    const { newPassword, confirmPassword } = this.newPasswordForm.getRawValue();

    if (newPassword !== confirmPassword) {
      this.errorMessage.set("Passwords do not match");
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    this.auth
      .resetPassword({
        token: this.token(),
        newPassword,
        confirmPassword,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.isLoading.set(false);
          if (res.status) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.removeItem("token");
            }
            this.router.navigate(["/auth-layout/login"]);
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
