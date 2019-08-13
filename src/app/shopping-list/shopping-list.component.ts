import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shader/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { DataStorageService } from '../shader/data-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  filtered: any;
  private subscription: Subscription;

  constructor(private slService: ShoppingListService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getIngredient();

    this.subscription = this.slService.ingedientChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.filtered = ingredients.filter(ingr => {
          return ingr.amount % 2 === 0;
          }
        )
        this.ingredients = this.filtered;

      });
  }

  onEditItem(index: number) {
    this.slService.startingEdit.next(index);
  }

  onSentList() {
    this.dataStorageService.storeIngredient().subscribe(
      (response: Response) => {
        console.log(response);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
