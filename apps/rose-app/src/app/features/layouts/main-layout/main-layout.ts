import { Component } from "@angular/core";
import { SubNavbar } from "./sub-navbar/sub-navbar";
import { Navbar } from "./navbar/navbar";
import { Footer } from "./footer/footer";

@Component({
  selector: "app-main-layout",
  imports: [Navbar, SubNavbar, Footer],
  templateUrl: "./main-layout.html"
})
export class MainLayout {}
