import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Recipe } from './entities';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

    headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      });

    constructor(private http: HttpClient) { 
        
    }

    // Get all recipes
    getRecipes() {
        return this.http.get(`${environment.apiAddress}`).pipe(
          catchError(this.errorMgmt)
          );
    }
    
    createRecipe(recipe: Recipe) {
        let url = `${environment.apiAddress}/create`;

        var json = JSON.stringify(recipe);
        return this.http.post(url, json, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        );
    }

    deleteRecipe(recipeId: string) {
        let url = `${environment.apiAddress}/delete/${recipeId}`;

        return this.http.delete(url, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        );
    }

    updateRecipe(recipe: Recipe){
        let url = `${environment.apiAddress}/update/${recipe._id}`;

        var json = JSON.stringify(recipe);
        return this.http.put(url, json, { headers: this.headers }).pipe(
        catchError(this.errorMgmt)
        );
    }

    updateIngredients(recipe: Recipe) {
        let url = `${environment.apiAddress}/updateingredients/${recipe._id}`;

        var json = JSON.stringify(recipe.ingredients);
        return this.http.put(url, json, { headers: this.headers }).toPromise();
    }

    // Error handling 
    errorMgmt(error: HttpErrorResponse) {
        let errorMessage = ''; 
        if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
        } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        alert(errorMessage);
        console.log(errorMessage);
        return throwError(errorMessage);
    }
}

