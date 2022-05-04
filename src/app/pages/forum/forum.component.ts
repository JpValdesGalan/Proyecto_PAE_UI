import { Component, OnInit } from '@angular/core';

//ESTO NO SE QUEDA
export interface Posts {
  title: string;
  content: string;
  img: string;
  user: Users;
}

export interface Users {
  username: string;
  profile_picture: string;
  role: string;
  role_color: string;
}

export interface Forums {
  title: string;
  description: string;
  img: string;
}

export interface Comments {
  content: string;
  user: Users;
}
//HASTA ACA

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  //CAMBIAR ESTO
  forum: Forums = {
    title: "NombreForo",
    description: "Aqui va la descripcion del foro. Este es un foro de prueba.",
    img: "https://cdn-icons-png.flaticon.com/512/2312/2312493.png"
  }

  posts: Posts[] = [
    {
      title: "Post prueba",
      content: "me gustan las manzanas",
      img: "https://cdn.aarp.net/content/dam/aarp/health/healthy-living/2017/09/1140-3-reasons-apples-good-for-you-esp.jpg",
      user: {
        username: "usuario1",
        profile_picture: "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1651646310~hmac=1f9b43297bdf2e2802964de6ac5f73b4",
        role: "admin",
        role_color: "#ff0000"
      }
    },
    {
      title: "Prueba2",
      content: "Las peras son mejores!",
      img: "https://farmaciaribera.es/blog/wp-content/uploads/2020/01/Beneficios-de-comer-peras-1024x680.jpg",
      user: {
        username: "usuario2",
        profile_picture: "https://cdn-icons-png.flaticon.com/512/560/560216.png",
        role: "user",
        role_color: "#000000"
      }
    },
    {
      title: "Prueba3",
      content: "a puro p*ndejo le gustan las peras",
      img: "",
      user: {
        username: "usuario1",
        profile_picture: "https://cdn-icons.flaticon.com/png/512/2202/premium/2202112.png?token=exp=1651646310~hmac=1f9b43297bdf2e2802964de6ac5f73b4",
        role: "admin",
        role_color: "#ff0000"
      }
    },
  ]
  //HASTA ACA

  constructor() { }

  ngOnInit(): void {
  }

}
