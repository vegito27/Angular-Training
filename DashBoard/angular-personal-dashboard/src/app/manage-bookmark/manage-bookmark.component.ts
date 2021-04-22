import { Component, OnInit } from '@angular/core';
import { Bookmark } from '../shared/bookmark.model';
import { BookmarkService } from '../shared/bookmark.service';

@Component({
  selector: 'app-manage-bookmark',
  templateUrl: './manage-bookmark.component.html',
  styleUrls: ['./manage-bookmark.component.scss']
})
export class ManageBookmarkComponent implements OnInit {

  bookmarks:Bookmark[]

  constructor(private bookMarkService:BookmarkService) { }

  ngOnInit(): void {
    this.bookmarks=this.bookMarkService.getBookmarks() 
  }

}
