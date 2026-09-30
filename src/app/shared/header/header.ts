import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { AIModel } from '../../data/data';
import { FormsModule } from '@angular/forms';
import { ModelService } from '../../../core/services/model.service';

@Component({
  selector: 'app-header',
  imports: [NgClass, FormsModule],
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  //Frpm Parent
  botStatus = input.required<string>();

  //Fetch Models
  modelsList = signal<string[]>([...AIModel]);
  selectedModel = signal<string>('');

  //Inject Model Service
  modelService = inject(ModelService);

  //On Change event
  onModelChange(model: string): void {
    this.modelService.setSelectedModel(model); // Pass value to service to access accross components
    console.log('Selected Model:', model);
  }
}