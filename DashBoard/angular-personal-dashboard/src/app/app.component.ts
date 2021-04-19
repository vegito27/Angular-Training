import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {transition,trigger,style, animate,query} from '@angular/animations'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnim',[

      transition('*=>*',[
        query(':enter',[
          style({
            background:'wheat',
            display:"block",
            height:"100%"
          }),
          animate(1000,style({
            background:'transparent',
            height:'auto'
          }))
        ],{optional:true}),
        style({
          background:'blue'
        }),
        animate(1000,style({
          background:'violet'
        })),
        animate(1000)
      ])



    ])


  ]
})
export class AppComponent {
  title = 'angular-personal-dashboard';

  prepareRoute(outlet:RouterOutlet){
    if(outlet.isActivated)
    return outlet.activatedRoute.snapshot.url
  }




}
