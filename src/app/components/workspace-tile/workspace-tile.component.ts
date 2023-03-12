import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common/common.service';

@Component({
  selector: 'app-workspace-tile',
  templateUrl: './workspace-tile.component.html',
  styleUrls: ['./workspace-tile.component.scss'],
})
export class WorkspaceTileComponent implements OnInit {
  @Input('data') data: any;

  constructor(private _router: Router, private _commonService: CommonService) {}

  ngOnInit(): void {
    this._commonService.clearSelectedProject();
  }

  openDetails(event: any): void {
    console.log(this.data.ws_kuid);
    this._router.navigate(
      ['workspace/workspace-management/workspace-settings'],
      {
        queryParams: {
          id: this.data.ws_kuid,
        },
      }
    );
    event.stopPropagation();
  }
  selectWorkspace(): void {
    console.log(this.data.ws_kuid);
    localStorage.setItem('lastVisited_workspace', JSON.stringify(this.data));
    this._router.navigate(['/']);
  }
}
