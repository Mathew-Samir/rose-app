import { Component, ChangeDetectionStrategy, input, computed } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-password-rules",
  imports: [TranslateModule],
  templateUrl: "./password-rules.html",
  styleUrl: "./password-rules.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordRules {
  password = input<string>("");

  hasMinLength = computed(() => this.password().length >= 8);
  hasLowercase = computed(() => /[a-z]/.test(this.password()));
  hasUppercase = computed(() => /[A-Z]/.test(this.password()));
  hasNumber = computed(() => /[0-9]/.test(this.password()));
  hasSpecialChar = computed(() => /[^a-zA-Z0-9]/.test(this.password()));

  strengthPercentage = computed(() => {
    let count = 0;
    if (this.hasMinLength()) count++;
    if (this.hasLowercase()) count++;
    if (this.hasUppercase()) count++;
    if (this.hasNumber()) count++;
    if (this.hasSpecialChar()) count++;
    return (count / 5) * 100;
  });

  strengthClass = computed(() => {
    const pct = this.strengthPercentage();
    if (pct <= 40) return "strength-weak";
    if (pct <= 80) return "strength-medium";
    return "strength-strong";
  });
}
