import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-project-tile',
  templateUrl: './project-tile.component.html',
  styleUrls: ['./project-tile.component.scss'],
})
export class ProjectTileComponent implements OnInit {
  @Input('data') data: any;

  constructor(private _router: Router, private _commonService: CommonService) {}

  ngOnInit(): void {
    this._commonService.clearSelectedProject();
  }

  openDetails(): void {
    console.log(this.data);
    this._commonService.setSelectedProject(this.data);
    this._router.navigate(['project/home']);
  }
}
