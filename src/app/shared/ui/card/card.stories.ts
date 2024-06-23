import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { CardComponent } from './card.component';
import { fn } from '@storybook/test';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';
import { UIModule } from '../ui.module';

const meta: Meta<CardComponent> = {
  title: 'UI/Card',
  component: CardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {},
  decorators: [
    moduleMetadata({
      imports: [UIModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Base: Story = {
  args: {},
};
