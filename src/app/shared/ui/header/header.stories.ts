import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { provideMockStore } from '@ngrx/store/testing';

import { HeaderComponent } from './header.component';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../icons/icons.module';
import { RouterTestingModule } from '@angular/router/testing';

import usersData from '../../../../../server/data/users-data.json';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { authSelectorKey } from 'src/app/state/selectors/auth.selector';

const user = {
  birthDate: '',
  country: '',
  email: usersData.users[0].email,
  firstName: usersData.users[0].firstName,
  lastName: usersData.users[0].lastName,
  id: '123',
  profilePicture: usersData.users[0].profilePicture,
  notificationPreference: 'email',
};

const meta: Meta<HeaderComponent> = {
  title: 'UI/Header',
  component: HeaderComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: { user },

  decorators: [
    moduleMetadata({
      imports: [FormsModule, IconsModule, RouterTestingModule],
      providers: [
        provideMockStore({
          initialState: {
            [authSelectorKey]: {
              user,
              loading: false,
            },
          },
        }),
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<HeaderComponent>;

export const Base: Story = {
  args: {
    user,
  },
};
