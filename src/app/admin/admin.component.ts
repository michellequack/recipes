import { Component, OnInit, HostListener } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../entities';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

    @HostListener('document:keypress', ['$event'])
        handleKeyboardEvent(event: KeyboardEvent) { 
        if (event.key === 'Enter' && this.mode)
        {
            this.addIngredient();
        }
        
    }

    allRecipes: Recipe[] = [];
    categories = [
        "Appetizer",
        "Bread",
        "Dessert",
        "Entree",
        "Miscellaneous",
        "Sauce",
        "Side Dish",
        "Soup"
    ];

    mode = '';

    currentCategory = 'Choose';
    currentRecipes: Recipe[] = [];

    // View
    currentRecipe: Recipe = new Recipe();

    // Add
    addIngredientName = "";

    message = "";

    constructor(private recipeService: RecipeService,
        private modalService: NgbModal) { }

    ngOnInit(): void {
        this.getRecipeList();
    }

    compare( a: Recipe, b: Recipe ) {
        if ( a.name < b.name ){
          return -1;
        }
        if ( a.name > b.name ){
          return 1;
        }
        return 0;
    }

    getRecipeList() {
        this.recipeService.getRecipes().subscribe((data) => {

        let unsortedRecipes = data as Recipe[];
        this.allRecipes = unsortedRecipes.sort(this.compare);
        this.currentRecipes = data as Recipe[];
        })
    }

    filterCategory() {
        if (this.currentCategory == "Choose")
        {
            this.currentRecipes = this.allRecipes;
        }
        else
        {
            this.currentRecipes = this.allRecipes.filter(r => r.category == this.currentCategory);
        }
    }

    addIngredient() {
        if (this.addIngredientName) {
            this.currentRecipe.ingredients.push(this.addIngredientName);
            this.addIngredientName = "";
        }
    }

    deleteIngredient(ingredient: string) {
        this.currentRecipe.ingredients = this.currentRecipe.ingredients.filter(i => i !== ingredient);
    }

    addRecipe(targetModal: any) {
        let recipe = new Recipe();

        recipe.name ="";
    }

    openViewModal(targetModal: any, id: string) {
        let recipe = this.allRecipes.filter(r => r._id == id)[0] as Recipe;
        recipe.directions = recipe.directions.trim();
        this.currentRecipe = recipe;

        this.modalService.open(targetModal, {
         centered: true,
         backdrop: 'static'
        });
    }

    closeView() {
        this.mode = '';
        this.modalService.dismissAll();
    }

    saveRecipe() {
        if (!this.validateRecipe())
        {
            return;
        }

        if (this.mode === 'Add') {
            this.recipeService.createRecipe(this.currentRecipe).subscribe(result => {
                alert('Recipe saved.');
                let newRecipe = result as Recipe;
                this.allRecipes.push(newRecipe);
                this.currentRecipes.unshift(newRecipe);
                this.mode = '';
                this.currentRecipe = new Recipe();
                this.modalService.dismissAll();
            });
        }
        else
        {
            this.recipeService.updateRecipe(this.currentRecipe).subscribe(result => {
                alert('Recipe saved.');
                let newRecipe = result as Recipe;

                let objIndex = this.allRecipes.findIndex(r => r._id === this.currentRecipe._id);
                this.copyRecipe(newRecipe, this.allRecipes[objIndex]);

                objIndex = this.currentRecipes.findIndex(r => r._id === this.currentRecipe._id);
                this.copyRecipe(newRecipe, this.currentRecipes[objIndex]);
                
                this.mode = '';
                this.currentRecipe = new Recipe();
                this.modalService.dismissAll();
            });
        }
    }

    copyRecipe(sourceRecipe: Recipe, targetRecipe: Recipe) {
        targetRecipe._id = sourceRecipe._id;
        targetRecipe.category = sourceRecipe.category;
        targetRecipe.directions = sourceRecipe.directions;
        targetRecipe.ingredients = sourceRecipe.ingredients;
        targetRecipe.name = sourceRecipe.name;
        targetRecipe.numberOfServings = sourceRecipe.numberOfServings;
    }

    validateRecipe() {

        if (!this.currentRecipe.name) {
            alert('You must specify a name for the recipe.');
            return false;
        }
        else if (this.currentRecipe.category === 'Choose') {
            alert('You must specify a category for the recipe.');
            return false;
        }
        else if (!this.currentRecipe.directions) {
            alert('You must specify directions for the recipe.');
            return false;
        }

        return true;
    }

    openAddModal(targetModal: any) {
        this.mode = 'Add';
        this.currentRecipe = new Recipe();
        this.currentRecipe.category = "Choose";

        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static'
            }).result.then((result) => {
                this.currentRecipe = new Recipe();
            this.mode = '';
        }, (reason) => {
            this.currentRecipe = new Recipe();
            this.mode = '';
        });
    }

    openEditModal(targetModal: any, id: string) {
        this.mode = 'Edit';
        let foundRecipe = this.allRecipes.find(r => r._id === id) as Recipe;

        // Make a copy so that if they cancel it doesn't overwrite the existing one.
        this.currentRecipe = new Recipe();
        this.copyRecipe(foundRecipe, this.currentRecipe);

        // this.currentRecipe._id = id;
        // this.currentRecipe.category = foundRecipe.category;
        // this.currentRecipe.directions = foundRecipe.directions;
        // this.currentRecipe.ingredients = foundRecipe.ingredients;
        // this.currentRecipe.name = foundRecipe.name;
        // this.currentRecipe.numberOfServings = foundRecipe.numberOfServings;

        this.modalService.open(targetModal, {
            centered: true,
            backdrop: 'static'
            }).result.then((result) => {
                this.currentRecipe = new Recipe();
                this.mode = '';
        }, (reason) => {
            this.currentRecipe = new Recipe();
            this.mode = '';
        });
    }

    deleteRecipe(recipe: Recipe) {
        if(confirm(`Are you certain you want to delete recipe: ${recipe.name}?`)) {
            this.recipeService.deleteRecipe(recipe._id).subscribe(response => {
                alert(`${recipe.name} deleted successfully.`);
                this.allRecipes = this.allRecipes.filter(r => r._id !== recipe._id);
                this.currentRecipes = this.currentRecipes.filter(r => r._id !== recipe._id);
            });
        }
    }
}


