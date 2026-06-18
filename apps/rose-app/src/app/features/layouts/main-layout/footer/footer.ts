import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { TranslationService } from "@rose/shared-services";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-footer",
  imports: [CommonModule, InputTextModule, TranslateModule],
  templateUrl: "./footer.html"
})
export class Footer {
  protected readonly translationService = inject(TranslationService);

  get isRtl(): boolean {
    return this.translationService.currentLang() === 'ar';
  }
}
