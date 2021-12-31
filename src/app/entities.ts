export class Recipe {
    public _id: string = "";
    public recipeID: number = 0;
    public name: string = "";
    public category: string = "";
    public directions: string = "";
    public numberOfServings: string = "";
    public author: string = "";
    public ingredients: string[] = [];
}

export class Ingredient {
    public _id: string = "";
    public ingredientID: number = 0;
    public name: string = "";
    public recipeID: number = 0;
}