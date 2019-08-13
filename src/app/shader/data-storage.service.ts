import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private shoppingService: ShoppingListService) { }

  storeRecipe() {
    return this.http.put('https://ng-recipe-book-a7646.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get('https://ng-recipe-book-a7646.firebaseio.com/recipes.json')
      .pipe(
        map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }),
        tap((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        })
      )
      .subscribe();
    // .subscribe((recipes: Recipe[]) => {
    //   this.recipeService.setRecipes(recipes);
    // });
  }


  getIngredient() {
    this.http.get('https://ng-ingredients-list.firebaseio.com/ingredient.json')
    .pipe(
      map((ingredient: Ingredient[]) => {
        for (const ingredientList of ingredient) {
          if (!ingredientList['ingredient']) {
            ingredientList['ingredient'] = [];
          }
        }
        return ingredient;
      }),
      tap((ingredients: Ingredient[]) => {
        this.shoppingService.setRecipes(ingredients);
      })
    )
    .subscribe();
    
  }

  storeIngredient() {
    return this.http.put('https://ng-ingredients-list.firebaseio.com/ingredient.json', this.shoppingService.getIngredients());
  }
}