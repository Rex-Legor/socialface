import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import postsData from '../../../../../server/data/posts-data.json';
import { By } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { CardAvatarDirective } from '../card/card-avatar.directive';
import { CardDescriptionComponent } from '../card/card-description.component';
import { CardTitleComponent } from '../card/card-title.component';
import { IconsModule } from '../../icons/icons.module';
import { FormsModule } from '@angular/forms';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsModule, FormsModule],
      declarations: [
        PostComponent,
        CardComponent,
        CardAvatarDirective,
        CardDescriptionComponent,
        CardTitleComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the Post with all the Card components', () => {
    const post = postsData.posts[0];
    // expect(component).toBeTruthy();
    component.post = {
      ...post,
      id: '1',
      userData: {
        ...postsData.posts[0].userData,
        id: '2',
      },
    };

    fixture.detectChanges();

    const cardPicture = fixture.debugElement.query(
      By.css('.sf-post .sf-card .sf-card__section > img'),
    );

    const cardTitle = fixture.debugElement.query(
      By.css('.sf-post .sf-card .sf-card__section sf-card-title > h3'),
    );

    const cardSubTitle = fixture.debugElement.query(
      By.css('.sf-post .sf-card .sf-card__section sf-card-description > p'),
    );

    const postText = fixture.debugElement.query(
      By.css('.sf-post .sf-post__body > p'),
    );

    const postPicture = fixture.debugElement.query(
      By.css('.sf-post .sf-post__body > img'),
    );

    expect((cardPicture.nativeElement as HTMLImageElement).src).toBe(
      post.userData.profilePicture,
    );

    expect((cardTitle.nativeElement as HTMLTitleElement).innerHTML).toBe(
      `${post.userData.firstName} ${post.userData.lastName}`,
    );

    expect(
      (cardSubTitle.nativeElement as HTMLParagraphElement).innerHTML,
    ).toContain('2023');

    expect((postText.nativeElement as HTMLParagraphElement).innerHTML).toBe(
      post.description,
    );

    expect((postPicture.nativeElement as HTMLImageElement).src).toBe(
      post.picture,
    );
  });

  it('should handle Post interactions', () => {
    const postComment = 'This is a test comment';

    jest.spyOn(component.likeChange, 'emit');
    jest.spyOn(component.commentChange, 'emit');

    const likeButton = fixture.debugElement.query(
      By.css('.sf-post .sf-post__footer__actions > button:nth-child(1)'),
    );

    const commentInput = fixture.debugElement.query(
      By.css('.sf-post .sf-post__footer__comment > input'),
    );

    const commentButton = fixture.debugElement.query(
      By.css('.sf-post .sf-post__footer__comment > button'),
    );

    (likeButton.nativeElement as HTMLInputElement).click();
    fixture.detectChanges();

    expect(component.likeChange.emit).toHaveBeenCalledTimes(1);

    (commentInput.nativeElement as HTMLInputElement).value = postComment;

    (commentInput.nativeElement as HTMLInputElement).dispatchEvent(
      new Event('input'),
    );

    expect(component.commentText).toBe(postComment);

    (commentButton.nativeElement as HTMLInputElement).click();
    fixture.detectChanges();

    expect(component.commentChange.emit).toHaveBeenCalledWith(postComment);
  });
});
