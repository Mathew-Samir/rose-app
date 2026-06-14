import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { DarkModeService, TranslationService } from "@rose/shared-services";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-auth-layout",
  imports: [RouterOutlet, TranslateModule],
  templateUrl: "./auth-layout.html",
  styleUrl: "./auth-layout.scss",
})
export class AuthLayout {
  protected readonly darkService = inject(DarkModeService);
  protected readonly translationService = inject(TranslationService);
}
