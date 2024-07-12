import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IconsModule } from '../icons/icons.module';
import { CardComponent } from './card/card.component';
import { CardAvatarDirective } from './card/card-avatar.directive';
import { CardDescriptionComponent } from './card/card-description.component';
import { CardTitleComponent } from './card/card-title.component';
import { HeaderComponent } from './header/header.component';
import { PostComponent } from './post/post.component';
import { PostPlaceholderComponent } from './post/post.placeholder.component';
import { PostRefreshComponent } from './post/post.refresh.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const components = [
  HeaderComponent,
  CardComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardAvatarDirective,
  PostComponent,
  PostPlaceholderComponent,
  PostRefreshComponent,
  SidebarComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    RouterModule,
  ],
})
export class UIModule {}
