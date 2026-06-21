import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: "lib-error-message",
  imports: [],
  templateUrl: "./error-message.html",
  styleUrl: "./error-message.scss",
})
export class ErrorMessageComponent {
  @Input({ required: true })
  control!: AbstractControl | null;

  get shouldShow(): boolean {
    return !!(
      this.control &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty)
    );
  }

  get errorMessage(): string {
    if (!this.control?.errors) {
      return '';
    }

    const errors = this.control.errors;

    if (errors['required']) {
      return 'This field is required';
    }

    if (errors['email']) {
      return 'Please enter a valid email address';
    }

    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength}`;
    }

    return 'Invalid value';
  }
}
