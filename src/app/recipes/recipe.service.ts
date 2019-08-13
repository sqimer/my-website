import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shader/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    recipes: Recipe[] = [
        new Recipe('Tasty Shnitzel', 'A super tasty', 'https://www.la-prova-del-cuoco-ricette.com/wp-content/uploads/la-prova-del-cuoco-ricette.jpg', [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]),
        new Recipe('Burger', 'Big burger', 'https://www.la-prova-del-cuoco-ricette.com/wp-content/uploads/la-prova-del-cuoco-ricette.jpg', [new Ingredient('Bread', 2), new Ingredient('Fries', 30)])
    ];

    constructor(private slService: ShoppingListService) {}

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
    }

    onAddIngredientToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}