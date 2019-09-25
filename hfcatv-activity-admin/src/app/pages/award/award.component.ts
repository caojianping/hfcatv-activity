import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-award',
  templateUrl: './award.component.html',
  styleUrls: ['./award.component.less']
})
export class AwardComponent implements OnInit {
  awards: Array<any> = [
    {name: '测试一', type: 1},
    {name: '测试二', type: 2},
    {name: '测试三', type: 3},
    {name: '测试四', type: 4},
    {name: '测试五', type: 5}
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.url.subscribe(url => {
      console.log("Award:", url);
    });
  }

  ngOnInit() {
  }

}
