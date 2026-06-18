import { Component, ChangeDetectionStrategy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Toaster } from "./shared/components/ui/toaster/toaster";

@Component({
  imports: [RouterOutlet, Toaster],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}

