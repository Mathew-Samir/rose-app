import { Component, input } from "@angular/core";
import { TranslateModule } from "@ngx-translate/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-reset-link-received",
  imports: [TranslateModule, RouterLink],
  templateUrl: "./reset-link-received.html",
  styleUrl: "./reset-link-received.scss",
})
export class ResetLinkReceived {
  email = input<string>("");
}
