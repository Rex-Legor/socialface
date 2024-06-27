import { NgModule } from '@angular/core';
import {
  Eye,
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
  Home,
  Users,
  Bookmark,
  Star,
  ShoppingCart,
  Menu,
  Settings,
  LogOut,
  MapPin,
  Globe,
  Calendar,
  Briefcase,
  Heart,
  Send,
} from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';

const icons = {
  Eye,
  Search,
  ThumbsUp,
  MessageCircle,
  Share2,
  Home,
  Users,
  ShoppingCart,
  Bookmark,
  Star,
  Menu,
  Settings,
  LogOut,
  MapPin,
  Globe,
  Calendar,
  Briefcase,
  Heart,
  Send,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
