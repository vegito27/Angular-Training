import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {transition,trigger,style, animate,query,group} from '@angular/animations'
import { Observable, timer } from 'rxjs';
import {map} from 'rxjs/operators'


const baseStyles = style({
  // display: 'block',
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%'
})


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations:[
    trigger('routeAnim', [
      transition(':increment', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(-50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition(':decrement', [
        style({
          position: 'relative',
          overflow: 'hidden'
        }),

        query(':enter, :leave', [
         
        ], { optional: true }),

        // query(':enter', [
        //   style({ opacity: 0 })
        // ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'translateX(50px)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'translateX(-50px)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'translateX(0)'
            }))
          ], { optional: true })
        ])

      ]),

      transition('* => secondary', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
         
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(0.8)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(1.2)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ]),

      transition('secondary => *', [
        style({
          position: 'relative',
          // overflow: 'hidden'
        }),

        query(':enter, :leave', [
          baseStyles
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-in', style({
              opacity: 0,
              transform: 'scale(1.25)'
            }))
          ], { optional: true }),

          query(':enter', [
            style({
              transform: 'scale(0.8)',
              opacity: 0
            }),
            animate('250ms 120ms ease-out', style({
              opacity: 1,
              transform: 'scale(1)'
            }))
          ], { optional: true })
        ])
      ])

    ]),

    trigger('bgAnim', [
      transition(':leave', [
        animate(1000, style({
          opacity: 0
        }))
      ])
    ]),

    trigger('fadeAnim', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(250, style({
          opacity: 1
        }))
      ]),

      transition(':leave', [
        animate(250, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  dateTime:Observable<Date>

  ngOnInit(): void {

    this.dateTime=timer(0,1000).pipe(map(()=>{
      return new Date()
    }))
  }

  title = 'angular-personal-dashboard';

  backgrounds:string[]=['https://images.unsplash.com/photo-1616707477649-fe201fdf3e6a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max']
  
  loadingBgImage:boolean

  prepareRoute(outlet:RouterOutlet){
    if(outlet.isActivated){
      const tab= outlet.activatedRouteData['tab']
      if(!tab) return 'secondary'
      return tab
    }
  }

  async changeBgImage(){

    this.loadingBgImage=true
    
   const result= await fetch('https://source.unsplash.com/random/1920x1080',{
      method:'HEAD'
    })
    const alreadyGot=this.backgrounds.includes(result.url)
    if(alreadyGot){
      return this.changeBgImage()
    }
    this.backgrounds.push(result.url)

  }

  onBGImageLoad(imgEvent:Event){

    const imgElement=imgEvent.target as HTMLImageElement
    const src=imgElement.src
    this.backgrounds=this.backgrounds.filter(b=>b===src)
    this.backgrounds=[src]
    this.loadingBgImage=false

  }
}
