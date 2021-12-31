import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { RecipesComponent } from './recipes/recipes.component';
import { FormsModule } from '@angular/forms';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    RecipesComponent,
    RecipeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
