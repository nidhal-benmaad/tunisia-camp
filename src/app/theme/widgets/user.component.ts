import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@core';
import { AuthService, User } from '@core/authentication';
import { debounceTime, tap } from 'rxjs/operators';
import {SocialAuthService} from "@abacritt/angularx-social-login";

@Component({
  selector: 'app-user',
  template: `
    <button class="r-full" mat-button [matMenuTriggerFor]="menu">
      <img matButtonIcon class="avatar r-full" referrerpolicy="no-referrer" [src]="photoUrl ? photoUrl : '/assets/images/user.png'" width="24" alt="avatar" />
      <span class="m-x-8">{{ user.name }}</span>
    </button>

    <mat-menu #menu="matMenu">
      <button routerLink="admin/profile/overview" mat-menu-item>
        <mat-icon>account_circle</mat-icon>
        <span>{{ 'profile' | translate }}</span>
      </button>
      <button routerLink="/admin/profile/settings" mat-menu-item>
        <mat-icon>edit</mat-icon>
        <span>{{ 'edit_profile' | translate }}</span>
      </button>
      <button mat-menu-item (click)="restore()">
        <mat-icon>restore</mat-icon>
        <span>{{ 'restore_defaults' | translate }}</span>
      </button>
      <button mat-menu-item (click)="logout()">
        <mat-icon>exit_to_app</mat-icon>
        <span>{{ 'logout' | translate }}</span>
      </button>
    </mat-menu>
  `,
  styles: [
    `
      .avatar {
        width: 24px;
        height: 24px;
      }
    `,
  ],
})
export class UserComponent implements OnInit {
  user!: any;
  photoUrl: any;

  constructor(
    private router: Router,
    private auth: AuthService,
    private cdr: ChangeDetectorRef,
    private settings: SettingsService,
    private authService: SocialAuthService
  ) {
    this.photoUrl = localStorage.getItem('photoUrl')
  }

  // @ts-ignore
  ngOnInit(): void {
    this.auth
      .user()
      .pipe(
        tap(user => (
          this.user = user
          )
        ),
        debounceTime(10)
      )
      .subscribe(() => this.cdr.detectChanges());
  }

  logout() {
    this.authService.signOut();
    this.auth.logout().subscribe(() => this.router.navigateByUrl('/auth/login'));
  }

  restore() {
    this.settings.reset();
    window.location.reload();
  }
}
