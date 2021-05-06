import { Component } from '@angular/core';
import {ActivatedRoute,ParamMap,Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'routing-app';
  routerLinkActive:boolean | undefined
  name:string | undefined


  constructor(private route:ActivatedRoute){}

  

  ngOnInit(){
    this.route.queryParams.subscribe(params=>{
      this.name=params['name']
    })
    
  }


  // console.log(routerLinkActive);
  
}
