import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Recipe } from '../entities'

@Component({
    selector: 'app-recipe-view',
    templateUrl: './recipe-view.component.html',
    styleUrls: ['./recipe-view.component.scss']
})
export class RecipeViewComponent implements OnInit {

    @Input() recipe: Recipe = new Recipe();

    @Output() closeView = new EventEmitter<boolean>();

    constructor(private modalService: NgbModal) { }

    ngOnInit(): void {
    }

    closeViewClicked() {
        this.closeView.emit(true);
    }
}
