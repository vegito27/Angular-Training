import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private _userservice:UserService) { }

  @Input('user') user:any

  userArray:User[]=[]
  datesArray=[]
  UserCount={day1:0,day2:0,day3:0,day4:0,day5:0,day6:0,day7:0}

  currentDate=new Date()

  getLastDayOfweek(){
    let lastdate=new Date()
    lastdate.setDate(lastdate.getDate()-7)
    return lastdate
  }

  setDates(){
    for(let i=0;i<7;i++){
      let date=new Date()
      date.setDate(date.getDate()-i)

      let month=date.getMonth()+1
      let day=date.getDate()
      let year=date.getFullYear()

      let format=`${day}/${month}/${year}`

      this.datesArray.push(format)

    }
  }

  isLastWeekUser(providedDate:any){

    let todaysDate=new Date()
    console.log(providedDate);
    
    providedDate=new Date(providedDate)

    // providedDate.setDate(providedDate.getDate()-7)


    let x=Math.abs(todaysDate.valueOf()-providedDate.valueOf())/(60*60*24*1000)


    // console.log(Math.abs(providedDate-todaysDate))

    return x
  }



  ngOnInit(): void {
    this._userservice.getUser().subscribe(response=>{

      
     this.userArray=response
     this.userArray.forEach(user=>{

      let d=this.isLastWeekUser(user.date)

      if(d>=0 && d<=1){
        this.UserCount.day1++
      }
      if(d>=1 && d<=2){
        this.UserCount.day2++
      }
      if(d>=2 && d<=3){
        this.UserCount.day3++
      }
      if(d>=3 && d<=4){
        this.UserCount.day4++
      }
      if(d>=4 && d<=5){
        this.UserCount.day5++
      }
      if(d>=5 && d<=6){
        this.UserCount.day6++
      }
      if(d>=6 && d<=7){
        this.UserCount.day7++
      }
          
    })

    this.setDates()

    console.log(this.UserCount)


  })
}

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [this.UserCount.day1, this.UserCount.day2, this.UserCount.day3, this.UserCount.day4, this.UserCount.day5,this.UserCount.day6, this.UserCount.day7], label: 'Users Count' }
  ];

  public chartLabels: Array<any> = this.datesArray

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(105,105,105,0.8)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(105,105,105,1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
