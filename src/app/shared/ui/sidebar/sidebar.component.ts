import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

import { IUser } from '../../models/user.model';

/**
 * UI smart component used to display the left and right sidebars on a page.
 *
 * * @author Ricardo Legorreta Mendoza
 */
@Component({
  selector: 'sf-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  /** if true this will display the right sidebar only, if not it will display the left sidebar only. */
  @Input() displayRightComponent = false;

  /** User needed for displaying the user groups list. */
  @Input() user: IUser | null = null;

  constructor(public router: Router) {}
}
