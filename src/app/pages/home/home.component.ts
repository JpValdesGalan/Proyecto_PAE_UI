import { Component, OnInit } from '@angular/core';
import {CountersService} from '../../shared/services/counters.service';
import {HomeforumsService} from '../../shared/services/homeforums.service';
import { ForumService } from 'src/app/shared/services/forum.service';
import {Forum} from '../../shared/interfaces/forum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numberForums: Number = 0;
  numberUsers: Number = 0;
  numberReplies: Number = 0;
  numberTopics: Number = 0;

  forums: Forum[] = [];
  filteredForums: Forum[] = [];

  searchTimeout: any;
  searchValue: string = '';

  selectedForum: Forum = {
    _id: '',
    title: '',
    description: '',
    picture: '',
    id_author: ''
  };

  constructor(private counterService: CountersService,
                     private homeforumsService: HomeforumsService,
                     private forumService: ForumService,
                     private router: Router) {}

  ngOnInit(): void {
    this.homeforumsService.getForums().subscribe(result => {
      this.forums = result;
      this.filteredForums = this.forums;
    });
    this.counterService.countComments().subscribe(result => {
      this.numberReplies = result.count;
    });
    this.counterService.countForums().subscribe(result => {
      this.numberForums = result.count;
    });
    this.counterService.countTags().subscribe(result => {
      this.numberTopics = result.count;
    });
    this.counterService.countUsers().subscribe(result => {
      this.numberUsers = result.count;
    });
  }

  doSearch(){
    if(this.searchTimeout){
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      const searchValue = this.searchValue.toLowerCase();
      this.filteredForums = this.forums.filter(forum => {
        return forum.title.toLowerCase().includes(searchValue);
      });
    }, 200);
  }

  seeForum(id: string){
    this.forumService.getForum(id);
    this.forumService.forumObservable.subscribe((result: Forum) => {
      this.selectedForum = result;
      this.router.navigate([`forum/${this.selectedForum.title}`]);
    });
  }
}
