import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { HeaderComponent } from './header.component';
import { fn } from '@storybook/test';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';

const meta: Meta<HeaderComponent> = {
  title: 'UI/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IconsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Base: Story = {
  args: {},
};
