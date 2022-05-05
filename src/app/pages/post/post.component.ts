import { Component, OnInit } from '@angular/core';
import {Comments, Forums, Posts} from "../forum/forum.component";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

    post: Posts = {
    title: "Post prueba",
    content: "me gustan las manzanas",
    img: "https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2017/09/1140-3-reasons-apples-good-for-you-esp.jpg",
    user: {
      username: "usuario1",
      profile_picture: "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1651646310~hmac=1f9b43297bdf2e2802964de6ac5f73b4",
      role: "admin",
      role_color: "#ff0000"
    }
  }

  comments: Comments[] = [
    {
      content: "Que rico manzanas",
      user: {
        username: "usuario3",
        profile_picture: "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1651646310~hmac=1f9b43297bdf2e2802964de6ac5f73b4",
        role: "admin",
        role_color: "#ff0000"
      }
    },
    {
      content: "Ew... las peras son mejores",
      user: {
        username: "usuario2",
        profile_picture: "https://cdn-icons-png.flaticon.com/512/560/560216.png",
        role: "user",
        role_color: "#000000"
      }
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
