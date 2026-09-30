import { AfterViewInit, Component, effect, input, signal, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChatMessage } from '../../models/models';
import { data } from '../../data/data';

@Component({
  selector: 'app-chat-box',
   standalone: true,
  imports: [NgScrollbar],
  templateUrl: './chat-box.html',
  styleUrl: './chat-box.css',
})
export class ChatBox implements AfterViewInit {
  //Frpm Parent
  messages = input.required<ChatMessage[]>();

  //Signals
  msgArray = signal<ChatMessage[]>([...data]);

  // ViewChild to access the scrollbar 
  @ViewChild('scrollbar') scrollbar!: NgScrollbar;

  //View Controls
  private viewInitialized = false;

  constructor() {
    // Runs whenever messages change
    effect(() => {
      //Log New Message
      const messages = this.messages();
      // console.log('Messages:', messages);

      //Update SIgnals
      this.msgArray.update(() => [
        ...data,
        ...this.messages()
      ]);

      // Scroll to bottom if view is initialized
      if (messages.length && this.viewInitialized) {
        this.scrollToBottom();
      }
    });
  }

  //Lifecycle Hooks
  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    queueMicrotask(() => {
      this.scrollbar?.scrollTo({
        bottom: 0,
        duration: 300
      });
    });
  }
}