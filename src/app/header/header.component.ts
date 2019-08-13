import { Component } from '@angular/core';
import { DataStorageService } from '../shader/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
   
    constructor(private dataStorageService: DataStorageService) {}

    onSaveData() {
        this.dataStorageService.storeRecipe().subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
   }

   onFetchData() {
       this.dataStorageService.getRecipes();
   }
   
}