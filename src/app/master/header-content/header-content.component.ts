import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-content',
  templateUrl: './header-content.component.html',
  styleUrls: ['./header-content.component.css']
})
export class HeaderContentComponent implements OnInit {
@Input() private title = "dash";
  constructor() { }

  ngOnInit() {
    
  }

}
