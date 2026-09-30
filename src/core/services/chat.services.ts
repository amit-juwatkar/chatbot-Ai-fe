import { Injectable, Injector  } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable ({
  providedIn: 'root'
})

export class ChatService {

    apiUrl = environment.apiUrl;

    constructor(private http:HttpClient ) {}

    chat(prompt:string, model:string){
        return this.http.post(`${this.apiUrl}/chat`,
            {prompt:prompt, model:model}
        );
    }
}