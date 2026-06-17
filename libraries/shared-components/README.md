# Shared Components Library

This library provides reusable UI components used across the application to ensure consistency, scalability, and maintainability.

---

# 📦 Components

## 1. Input Component

### Selector

```html
<lib-input></lib-input>
```

---

### Description

A reusable form input component that supports Angular forms (Template-driven & Reactive) using ControlValueAccessor.

---

### Inputs

| Input       | Type    | Default | Description                              |
| ----------- | ------- | ------- | ---------------------------------------- |
| label       | string  | ''      | Input label text                         |
| type        | string  | 'text'  | Input type (text, email, password, etc.) |
| placeholder | string  | ''      | Placeholder text                         |
| disabled    | boolean | false   | Disable input                            |

---

### Usage (Template-driven)

```html
<lib-input
  label="Email"
  type="email"
  placeholder="Enter email"
  [(ngModel)]="email">
</lib-input>
```

---

### Usage (Reactive Forms)

```html
<lib-input formControlName="email"></lib-input>
```

---

### Features

* ControlValueAccessor support
* Works with Angular Forms
* Fully reusable
* Lightweight and accessible

---

---

## 2. Button Component

### Selector

```html
<lib-button></lib-button>
```

---

### Description

A reusable button component with support for different styles and states.

---

### Inputs

| Input    | Type    | Default   | Description                               |
| -------- | ------- | --------- | ----------------------------------------- |
| label    | string  | ''        | Button text                               |
| type     | string  | 'button'  | HTML button type                          |
| variant  | string  | 'primary' | Button style (primary, secondary, danger) |
| disabled | boolean | false     | Disable button                            |
| loading  | boolean | false     | Show loading state                        |

---

### Usage

```html
<lib-button
  label="Submit"
  variant="primary">
</lib-button>
```

---

### With Loading State

```html
<lib-button
  label="Saving..."
  [loading]="true">
</lib-button>
```

---

### Features

* Multiple variants support
* Loading state
* Disabled state
* Fully reusable across app

---

# 📌 Notes

* All components are standalone
* Import directly from shared library
* Designed for scalability and consistency

---

# 🚀 Import Example

```ts
import { InputComponent, ButtonComponent } from '@rose/shared-components';
```
