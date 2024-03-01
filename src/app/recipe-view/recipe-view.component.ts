import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../entities'
import { environment } from '../../environments/environment';
import { ToastService } from '../toast-service.service';

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

    @Input() recipe: Recipe = new Recipe();

    @Output() closeView = new EventEmitter<boolean>();

    showToastSuccess:boolean = false;
    showToastFailure:boolean = false;

    constructor(private modalService: NgbModal, 
      public toastService: ToastService) { }

    ngOnInit(): void {
    }

    closeViewClicked() {
        this.closeView.emit(true);
    }

    shareItemClicked() {
  
      let shareUrl = `${environment.baseAddress}/${this.recipe._id}`;

      // navigator.clipboard.writeText(shareUrl).then(() => {
      //   console.log('Address copied to clipboard');
      //   this.toastService.show('Address copied to clipboard', { classname: 'bg-success text-light', delay: 2000 });
      // },(err) => {
      //   this.toastService.show("Could not copy address to clipboard", { classname: 'bg-danger text-light', delay: 2000 });
      //   setTimeout(this.clearToastValues, 1300);
      // });
      
      this.copyToClipboard(shareUrl);
    }

    copyToClipboard(textToCopy: string) {
      // Navigator clipboard api needs a secure context (https)
      // if (navigator.clipboard && window.isSecureContext) {
      //   navigator.clipboard.writeText(textToCopy).then(() => {
      //     console.log('Address copied to clipboard');
      //     this.toastService.show('Address copied to clipboard', { classname: 'bg-success text-light', delay: 2000 });
      //   },(err) => {
      //     this.toastService.show("Could not copy address to clipboard", { classname: 'bg-danger text-light', delay: 2000 });
      //     setTimeout(this.clearToastValues, 1300);
      //   });
      // } else {
          // Use the 'out of viewport hidden text area' trick
          const textArea = document.createElement("textarea");
          textArea.value = textToCopy;
              
          // Move textarea out of the viewport so it's not visible
          textArea.style.position = "absolute";
          textArea.style.left = "-999999px";
              
          document.body.prepend(textArea);
          textArea.select();
  
          try {
              document.execCommand('copy');
              this.toastService.show('Address copied to clipboard', { classname: 'bg-success text-light', delay: 2000 });
          } catch (error) {
              console.error(error);
          } finally {
              textArea.remove();
          }
      // }
  }

    clearToastValues() {
      console.log('clearing values');
      this.showToastSuccess = false;
      this.showToastFailure = false;
    }
}
