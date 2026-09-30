import { Component, signal } from '@angular/core';
import { ChatService } from '../../../core/services/chat.services';
import { FormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChatMessage } from '../../models/models';
import { AIModel, botStatus } from '../../data/data';
import { Header } from '../../shared/header/header';
import { ChatBox } from '../chat-box/chat-box';
import { formatAIResponse } from '../../../core/services/response.services';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',     
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, Header, ChatBox],
  standalone: true
})

export class ChatComponent {

    //Global Variables
    prompt='';
    model='';
    loading = false;
    isEmptyField = false;
    responseHtml: any = signal('');

    //Fetch MOdels
    modelsList = signal<string[]>([...AIModel]);
    selectedModel = signal<string>('');

    // Using Signals
    messages = signal<ChatMessage[]>([]);

    // Default to "Online"
    botStatus = signal(botStatus[0]); 

    constructor(private chatService: ChatService) { }
  
    //Message to ChatMessage Array
    private addMessage(message: ChatMessage): void {
       this.messages.update(messages => [...messages, message]);
    }

    //Form sbumit function
    send() {

      //Sanitize the prompt
      const question = this.prompt.trim();
      const model = this.selectedModel();

      // Validations 
      if (!question || !model) {
        this.isEmptyField = true;
        return;
      }
      
      //Reset field
      this.isEmptyField = false;

      //Action Start time 
      const start = performance.now();

      // User Message added to observable
      this.addMessage({
        id: Date.now(),
        type: 'user',
        message: question,
        createdAt: new Date(),
        performanceTime: ''
      });

      //Loding msg
      this.loading = true;

      // Call the chat service
      this.chatService
      .chat(question,model)
      .pipe(
        finalize(() => {
          // Stop loading
          this.loading = false;
          
        })
      )
      .subscribe({
        next: (res: any) => {
          // Add assistant message to the chat
          const performanceTime = `${((performance.now() - start) / 1000).toFixed(2)}s`;

          //Actual Response
          // console.log('Response:', res);
          
          //FOrmat Response to HTML
          this.responseHtml.set(
              formatAIResponse(res.response)
          );

          //Update Response 
          this.addMessage({
            id: Date.now() + 1,
            type: 'assistant',
            message: this.responseHtml(),
            createdAt: new Date(),
            performanceTime: performanceTime
          });
          
          // Clear the input
          this.prompt = '';

          //Chat History Message List Array 
          console.log(this.messages());
        },
        error: (err) => {
          //Log Error
          console.error(err);

          //Set BOt Status to Offline
          this.botStatus.set(botStatus[1]); // Set to "Offline"

          //Bind Error Message 
          this.addMessage({
            id: Date.now(),
            type: 'assistant',
            message: 'Something went wrong. Please try again.',
            createdAt: new Date(),
            performanceTime: "00.00s"
          });

          // Clear the input
          this.prompt = '';
        }
      });
    }
}