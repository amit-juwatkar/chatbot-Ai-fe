import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/chat-view-template/chat.component').then(m => m.ChatComponent)    
    }
];
