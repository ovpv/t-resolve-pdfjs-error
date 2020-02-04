import { Injectable } from "@angular/core";

declare let pdfjsLib: any;
/*
  Generated class for the PdfjsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PdfjsProvider {
  constructor() {
    console.log("Hello PdfjsProvider Provider");
  }

  renderPage(page, options, canvasContainer) {
    var viewport = page.getViewport(options.scale);
    var canvas = document.createElement("canvas");
    canvas.className = "canvas-wh";
    var ctx = canvas.getContext("2d");
    var renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    canvasContainer.appendChild(canvas);

    page.render(renderContext);
  }

  async renderPages(pdfDoc, options, canvasContainer) {
    for (var num = 1; num <= pdfDoc.numPages; num++) {
      let page = await pdfDoc.getPage(num);
      this.renderPage(page, options, canvasContainer);
    }
  }

  async renderPDF(
    url,
    options?: any,
    canvasContainer = document.createElement("DIV")
  ) {
    options = { scale: 1 };
    pdfjsLib.disableWorker = true;
    let pdfDoc = await pdfjsLib.getDocument(url).promise;
    this.renderPages(pdfDoc, options, canvasContainer);
    canvasContainer.style.overflow = "auto";
    return canvasContainer;
  }

  findAndReplacePdf(element) {
    let pdf = Array.from(element.getElementsByClassName("pdfemb-viewer"));
    pdf.forEach(async (pdfRender: any) => {
      let parent, pdfDom;
      parent = pdfRender.parentElement;
      pdfDom = await this.renderPDF(pdfRender.href);
      console.log("pdfDom", pdfDom);
      console.log("pdfRender", pdfRender);
      parent.replaceChild(pdfDom, pdfRender);
    });
  }
}
