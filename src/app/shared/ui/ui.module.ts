import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { CardTitleComponent } from './card/card-title.component';
import { CardDescriptionComponent } from './card/card-description.component';
import { CardAvatarDirective } from './card/card-avatar.directive';
import { IconsModule } from '../icons/icons.module';
import { PostComponent } from './post/post.component';
import { PostPlaceholderComponent } from './post/post.placeholder.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { PostRefreshComponent } from './post/post.refresh.component';

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
