import { Component, OnInit } from '@angular/core';
import { Recipe } from '../entities';
import { RecipeService } from '../recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

    recipes: Recipe[] = [];

    appetizerRecipes: Recipe[] = [];
    breadRecipes: Recipe[] = [];
    breakfastRecipes: Recipe[] = [];
    dessertRecipes: Recipe[] = [];
    entreeRecipes: Recipe[] = [];
    miscellaneousRecipes: Recipe[] = [];
    sauceRecipes: Recipe[] = [];
    sideDishRecipes: Recipe[] = [];
    soupRecipes: Recipe[] = [];

    currentRecipe: Recipe = new Recipe;
  
    constructor(private recipeService: RecipeService,
        private modalService: NgbModal) {
      
    }
  
    ngOnInit() {
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

        this.recipes = unsortedRecipes.sort(this.compare);
        this.entreeRecipes = this.recipes.filter(r => r.category === 'Entree');
        this.sauceRecipes = this.recipes.filter(r => r.category === 'Sauce');
        this.miscellaneousRecipes = this.recipes.filter(r => r.category === 'Miscellaneous');
        this.dessertRecipes = this.recipes.filter(r => r.category === 'Dessert');
        this.breadRecipes = this.recipes.filter(r => r.category === 'Bread');
        this.soupRecipes = this.recipes.filter(r => r.category === 'Soup');
        this.sideDishRecipes = this.recipes.filter(r => r.category === 'Side Dish');
        this.appetizerRecipes = this.recipes.filter(r => r.category === 'Appetizer');
        this.breakfastRecipes = this.recipes.filter(r => r.category === 'Breakfast');
      })
    }

    getRecipesInCategory(category: String) {
        return this.recipes.filter(r => r.category === category);
    }

    closeView() {
        this.modalService.dismissAll();
    }

    openModal(targetModal: any, id: string) {
        let recipe = this.recipes.filter(r => r._id == id)[0] as Recipe;
        recipe.directions = recipe.directions.trim();
        this.currentRecipe= recipe;

        this.modalService.open(targetModal, {
         centered: true,
         backdrop: 'static'
        });
    }

}
