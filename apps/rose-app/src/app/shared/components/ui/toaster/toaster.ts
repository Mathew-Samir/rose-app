import { Component, ChangeDetectionStrategy, inject } from "@angular/core";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-toaster",
  imports: [ToastModule],
  templateUrl: "./toaster.html",
  styleUrl: "./toaster.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toaster {
  public messageService = inject(MessageService);
}
