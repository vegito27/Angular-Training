import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';

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

  public chartDatasets: Array<any>=[{data:[0,0,0,0,0,0,0]}]

  currentDate=new Date()


  setDates(){
    for(let i=0;i<7;i++){

      let date=new Date()

      // console.log(date)
      date.setDate(date.getDate()-i)

      let month=date.getMonth()+1
      let day=date.getDate()
      let year=date.getFullYear()

      let format=`${day}/${month}/${year}`

      this.datesArray.push(format)

    }
  }

  isLastWeekUser(providedDate:any){

    let todaysDate=new Date().getDate()
    
    providedDate=new Date(providedDate).getDate()

    // console.log(providedDate)

    // let x=Math.abs(todaysDate.valueOf()-providedDate.valueOf())/(60*60*24*1000)

    // console.log(x)

    return todaysDate-providedDate
  }


  setData(userArray){

    this.UserCount.day1=0
    this.UserCount.day2=0
    this.UserCount.day3=0
    this.UserCount.day4=0
    this.UserCount.day5=0
    this.UserCount.day6=0
    this.UserCount.day7=0
   
 
    this.userArray.forEach(user=>{


      let d=this.isLastWeekUser(user.date)

      // console.log(d)

      if(d<=7){

        switch(d){
          case 0:
            this.UserCount.day1++
            break;

          case 1:
            this.UserCount.day2++
            break;

          case 2:
            this.UserCount.day3++
            break;

          case 3:
            this.UserCount.day4++
            break;

          case 4:
            this.UserCount.day5++;
            break;

          case 5:
            this.UserCount.day6++
            break;

          case 6:
            this.UserCount.day7;
            break;
          
          default :
             break;
            
        }
      
      this.chartDatasets=[
        { data: [
          this.UserCount.day1, 
          this.UserCount.day2, 
          this.UserCount.day3,
          this.UserCount.day4, 
          this.UserCount.day5,
          this.UserCount.day6, 
          this.UserCount.day7], label: 'Users Count' 
      }]  


      // console.log(this.UserCount)
      
      
      }
    })
  }


  ngOnInit(): void {
  
    this._userservice.getUser().subscribe(response=>{

     this.userArray=response
     this.setData(this.userArray)
  })

    this.setDates()

    // console.log(this.UserCount)

  }

  ngOnChanges(){

    this._userservice.getUser().subscribe(response=>{

      this.userArray=response
      this.setData(this.userArray)
  
  })
 }

  public chartType: string = 'bar';


  public chartLabels: Array<any> = this.datesArray

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(153, 102, 255, 0.8)',
        'rgba(255, 159, 64, 0.8)',
        'rgba(105,105,105,0.8)',
        'rgba(255, 99, 132, 0.8)',
        'rgba(54, 162, 235, 0.8)',
        'rgba(255, 206, 86, 0.8)',
        'rgba(75, 192, 192, 0.8)',
      ],
      borderColor: [
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(105,105,105,1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)', 
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
            scale: {
                    ticks: {
                        beginAtZero:true,
                        max:5
                      }
                    },
    
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: 'black',
            },
        },
      ],
    }
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

}
