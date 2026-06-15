import { Component } from "@angular/core";
import { SubNavbar } from "./sub-navbar/sub-navbar";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: "app-main-layout",
  imports: [Navbar, SubNavbar],
  templateUrl: "./main-layout.html"
})
export class MainLayout {}
