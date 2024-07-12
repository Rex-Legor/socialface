import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { PostComponent } from './post.component';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';
import { UIModule } from '../ui.module';
import postsData from '../../../../../server/data/posts-data.json';

const meta: Meta<PostComponent> = {
  title: 'UI/Post',
  component: PostComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {},
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IconsModule, UIModule],
    }),
  ],
};

const postToTest = {
  ...postsData.posts[0],
  id: '1',
  userData: {
    ...postsData.posts[0].userData,
    id: '2',
  },
};

export default meta;
type Story = StoryObj<PostComponent>;

export const Base: Story = {
  args: {
    post: postToTest,
  },
};

export const Liked: Story = {
  args: {
    post: {
      ...postToTest,
      liked: true,
    },
  },
};
