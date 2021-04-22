import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router, RouterEvent } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-edit-bookmark',
  templateUrl: './edit-bookmark.component.html',
  styleUrls: ['./edit-bookmark.component.scss']
})
export class EditBookmarkComponent implements OnInit {


  bookmark:Bookmark;

  constructor(private bookMarkService:BookmarkService,
    private route:ActivatedRoute,private router:Router,private notificationService:NotificationService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      const bookmarkId=paramMap.get('id')
      console.log(bookmarkId)
      this.bookmark=this.bookMarkService.getBookmark(bookmarkId)
    })
  }


  addBookMark(form:NgForm){
    const {name,url}=form.value
    this.bookMarkService.updateBookmark(this.bookmark.id,{
      name,
      url:new URL(url)
    })

    this.notificationService.show('Bookmarks updated!')
    // this.router.navigateByUrl('/bookmarks')
  }

  delete(){
    this.bookMarkService.deleteBookMark(this.bookmark.id)
    this.router.navigate(['../'],{relativeTo:this.route})
    this.notificationService.show('Bookmark deleted!')
  }
}


