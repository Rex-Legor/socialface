import {
  argsToTemplate,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';

import { PostComponent } from './post.component';
import { fn } from '@storybook/test';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';
import { UIModule } from '../ui.module';

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

export default meta;
type Story = StoryObj<PostComponent>;

export const Base: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=3',
    title: 'This is my me',
    subtitle: 'This is a description',
    picture: 'https://picsum.photos/800',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
  },

  render: (args: PostComponent) => ({
    props: {
      ...args,
    },
    template: `<div style="width: 600px">
    <sf-post ${argsToTemplate(args)}>
    </sf-post>
    </div>`,
  }),
};

export const NoPicture: Story = {
  args: {
    avatar: 'https://i.pravatar.cc/150?img=4',
    title: 'This is another post',
    subtitle: 'This is a description',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    liked: true,
  },

  render: (args: PostComponent) => ({
    props: {
      ...args,
    },
    template: `<div style="width: 600px">
    <sf-post ${argsToTemplate(args)}>
    </sf-post>
    </div>`,
  }),
};
