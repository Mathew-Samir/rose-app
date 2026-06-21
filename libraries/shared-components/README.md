# Shared Components Library

A centralized library containing reusable UI components used across the application.

# Installation

Import components directly from the shared library:

```ts
import {
  ButtonComponent,
  InputComponent,
  ErrorMessageComponent
} from '@rose/shared-components';
```

---

# Components

## Button Component

### Selector

```html
<lib-button></lib-button>
```

### Description

Reusable button component supporting different variants and states.

### Inputs

| Input    | Type                    | Default | Description        |
| -------- | ----------------------- | ------- | ------------------ |
| label    | string                  | ''      | Button text        |
| type     | button | submit | reset | button  | HTML button type   |
| disabled | boolean                 | false   | Disable button     |
| loading  | boolean                 | false   | Show loading state |

### Example

```html
<lib-button
  label="Save">
</lib-button>
```

### Features

* Reusable
* Accessible
* Supports disabled state
* Supports loading state

---

## Input Component

### Selector

```html
<lib-input></lib-input>
```

### Description

Reusable form input built using Angular ControlValueAccessor (CVA).

Compatible with:

* Reactive Forms
* Template Driven Forms

### Inputs

| Input       | Type   | Default | Description      |
| ----------- | ------ | ------- | ---------------- |
| label       | string | ''      | Input label      |
| placeholder | string | ''      | Placeholder text |
| type        | string | text    | Input type       |

### Reactive Forms Example

Component:

```ts
form = new FormGroup({
  email: new FormControl('', [
    Validators.required,
    Validators.email,
  ]),
});
```

Template:

```html
<form [formGroup]="form">

  <lib-input
    formControlName="email"
    label="Email"
    placeholder="user@example.com">
  </lib-input>

</form>
```

### Template Driven Example

```html
<lib-input
  [(ngModel)]="email"
  name="email">
</lib-input>
```

### Features

* ControlValueAccessor implementation
* Reactive Forms support
* Template Driven Forms support
* Reusable and configurable

---

## Error Message Component

### Selector

```html
<lib-error-message></lib-error-message>
```

### Description

Displays validation messages for Angular form controls.

### Inputs

| Input   | Type            | Description          |
| ------- | --------------- | -------------------- |
| control | AbstractControl | Angular form control |

### Supported Validations

* required
* email
* minlength
* maxlength
* pattern

### Example

```html
<lib-error-message
  [control]="form.controls.email">
</lib-error-message>
```

### Display Logic

Error message is displayed when:

```ts
control.invalid &&
(control.touched || control.dirty)
```

### Features

* Automatic validation messages
* Reactive Forms integration
* Accessible error state

---
