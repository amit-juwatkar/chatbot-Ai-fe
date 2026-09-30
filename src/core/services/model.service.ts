import { Injectable, signal  } from "@angular/core";

@Injectable ({
  providedIn: 'root'
})

export class ModelService {

  private readonly STORAGE_KEY = 'selectedModel';

  readonly selectedModel = signal<string>(
    localStorage.getItem(this.STORAGE_KEY) ?? ''
  );

  //Set Signals and localstorage
  setSelectedModel(model: string): void {
    this.selectedModel.set(model);
    localStorage.setItem(this.STORAGE_KEY, model);
  }

  //Clear Signals and localstorage
  clearSelectedModel(): void {
    this.selectedModel.set('');
    localStorage.removeItem(this.STORAGE_KEY);
  }
}