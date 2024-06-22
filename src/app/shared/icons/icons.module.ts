import { NgModule } from '@angular/core';
import { Eye, Search } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Eye,
  Search,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
