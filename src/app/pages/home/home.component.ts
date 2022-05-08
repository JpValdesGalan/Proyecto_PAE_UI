import { Component, OnInit } from '@angular/core';
import {CountersService} from '../../shared/services/counters.service';
import {HomeforumsService} from '../../shared/services/homeforums.service';
import {Forum} from '../../shared/interfaces/forum';

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

  constructor(private counterService: CountersService, private homeforumsService: HomeforumsService) { }

  ngOnInit(): void {
    this.homeforumsService.getForums().subscribe(result => {
      this.forums = result;
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

}
