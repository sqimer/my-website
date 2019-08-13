import { Ingredient } from '../shader/ingredient.model';
import { Subject } from 'rxjs';


export class ShoppingListService {
    ingedientChanged = new Subject<Ingredient[]>();
    startingEdit = new Subject<number>();
    private ingredients: Ingredient[] = [
        // new Ingredient('Apples', 5),
        // new Ingredient('Bananas', 3) 
      ];

    setRecipes(ingredients: Ingredient[]) {
        this.ingredients = ingredients;
        this.ingedientChanged.next(this.ingredients.slice());
    }
    
    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingedientChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingedientChanged.next(this.ingredients.slice());
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingedientChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingedientChanged.next(this.ingredients.slice());
    }
}