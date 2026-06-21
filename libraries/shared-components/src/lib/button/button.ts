import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "lib-button",
  imports: [],
  templateUrl: "./button.html",
  styleUrl: "./button.scss",
})
export class ButtonComponent {
  @Input({ required: true }) label!: string;
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: string = "";
  @Input() iconPosition: "left" | "right" = "left";
  @Input() iconColor: string = "#000";
  @Input() iconBackgroundColor: string = "#fff";
  @Input() backgroundColor: string = "#000";
  @Input() textColor: string = "#fff";
  @Output() onClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.backgroundColor = this.disabled ? "#ccc" : this.backgroundColor;
    this.textColor = this.disabled ? "#666" : this.textColor;
  }

  handleClick(): void {
    if (this.disabled || this.loading) return;
    this.onClick.emit();
  }
}
