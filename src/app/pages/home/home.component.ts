import { Component, OnInit } from '@angular/core';
import {CountersService} from '../../shared/services/counters.service'

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

  constructor(private counterService: CountersService) { }

  ngOnInit(): void {
    this.counterService.countComments().subscribe(result => {
      console.log(result);
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
