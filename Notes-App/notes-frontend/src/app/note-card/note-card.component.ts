import { Component, ElementRef, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})

export class NoteCardComponent {

  @ViewChild('truncator') truncator:ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText:ElementRef<HTMLElement>;

  @Input() title:string;
  @Input() body:string;
  @Input() link:string;


  @Output('delete') deleteEvent:EventEmitter <void> = new EventEmitter <void>()

  constructor(private renderer:Renderer2) { }

  ngAfterViewInit(): void {

    console.log(this.truncator)
    // Work out if there is a text overflow and if so,then hide
    let style = window.getComputedStyle(this.bodyText.nativeElement,null);

    let viewableHeight = parseInt(style.getPropertyValue("height"),10)

    if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
      // if there is no text overflow ,show the fade out truncator
      this.renderer.setStyle(this.truncator.nativeElement,'display','block')

    }else{
    // else (there is a text overflow)
      this.renderer.setStyle(this.truncator.nativeElement,'display','none')

    }
  }


  onXButtonClick(){
    this.deleteEvent.emit()
  }

}
