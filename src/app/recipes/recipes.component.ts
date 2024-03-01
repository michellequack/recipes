import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Recipe } from '../entities';
import { RecipeService } from '../recipe.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../environments/environment';
import { ActivatedRoute } from '@angular/router';

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

    @ViewChild('mymodal') public templateRef?: TemplateRef<any>;

    private subscriptions: any[] = [];

    coffeeSource = `${environment.assetPrefix}/assets/coffee.jpg`
  
    constructor(private recipeService: RecipeService,
        private modalService: NgbModal,
        private route: ActivatedRoute) {
      
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
      return this.recipeService.getRecipes().subscribe((data) => {

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

        this.subscriptions.push(this.route.params.subscribe(params => {
          const id = params['id'];

          if (id !== undefined) {
            let recipe = this.recipes.filter(r => r._id == id)[0] as Recipe;
          recipe.directions = recipe.directions.trim();
          this.currentRecipe= recipe;

          this.modalService.open(this.templateRef, {
          centered: true,
          backdrop: 'static'
          });
          }
       }));
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
