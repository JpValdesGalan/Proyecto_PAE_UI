import { Component, OnInit } from '@angular/core';
import {Forums} from "../forum/forum.component";
import {Posts} from "../post/post.component";

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  forum: Forums = {
    title: "NombreForo",
    description: "Aqui va la descripcion del foro. Este es un foro de prueba.",
    img: "https://cdn-icons-png.flaticon.com/512/2312/2312493.png"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
