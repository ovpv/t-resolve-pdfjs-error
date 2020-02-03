import { PdfjsProvider } from "./../../providers/pdfjs/pdfjs";
import { Component, ViewChild } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  @ViewChild("pdfContainer") pdfContainer;
  constructor(public navCtrl: NavController, public pdfpr: PdfjsProvider) {}
  ionViewDidLoad() {
    this.pdfpr.findAndReplacePdf(this.pdfContainer.nativeElement);
  }
}
