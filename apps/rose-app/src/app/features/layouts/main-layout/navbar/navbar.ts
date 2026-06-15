import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '@rose/shared-services';

@Component({
  selector: "app-navbar",
  imports: [CommonModule, FormsModule, InputTextModule, BadgeModule, TranslateModule],
  templateUrl: "./navbar.html"
})
export class Navbar {
  protected readonly translationService = inject(TranslationService);
}
