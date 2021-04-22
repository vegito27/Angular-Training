import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-add-bookmark',
  templateUrl: './add-bookmark.component.html',
  styleUrls: ['./add-bookmark.component.scss']
})
export class AddBookmarkComponent implements OnInit {


  

  constructor(
    private bookmarkService:BookmarkService,
    private router:Router,
    private route:ActivatedRoute,
    private notificationService:NotificationService) { }

  ngOnInit(): void {
  }

  addBookMark(form:NgForm){

    const {name,url}=form.value

    const bookmark=new Bookmark(name,url)
    this.bookmarkService.addBokmark(bookmark)
    this.notificationService.show('Created Bookmark!')
    this.router.navigateByUrl('/bookmarks')
  }

}
