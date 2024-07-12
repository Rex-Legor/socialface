import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  Bookmark,
  Briefcase,
  Calendar,
  Eye,
  Globe,
  Heart,
  Home,
  LogOut,
  MapPin,
  Menu,
  MessageCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingCart,
  Star,
  ThumbsUp,
  Users,
} from 'angular-feather/icons';

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
  RefreshCw,
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconsModule {}
