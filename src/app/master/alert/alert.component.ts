import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string='your message';
  @Input() title: string='Alert !';
  constructor() { }

  ngOnInit() {
  }

}
