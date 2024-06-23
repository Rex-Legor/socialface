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

const components = [
  HeaderComponent,
  CardComponent,
  CardTitleComponent,
  CardDescriptionComponent,
  CardAvatarDirective,
  PostComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IconsModule],
})
export class UIModule {}
