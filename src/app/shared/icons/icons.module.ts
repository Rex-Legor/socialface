import { NgModule } from '@angular/core';
import {
  Eye,
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Eye,
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
