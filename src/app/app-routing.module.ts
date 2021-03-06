import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComicListComponent } from './comic/comic-list/comic-list.component';
import { ComicReaderComponent } from './comic/comic-reader/comic-reader.component';
import { ComicDetailComponent } from './comic/comic-detail/comic-detail.component';
import { ComicUploadComponent } from './comic/comic-upload/comic-upload.component';
import { CreateComicComponent } from './comic/create-comic/create-comic.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { VerifyEmailComponent } from './user/verify-email/verify-email.component';
import { ResetPasswordComponent } from './user/reset-password/reset-password.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { ProfileComponent } from './user/profile/profile.component';
import { AccountSettingsComponent } from './user/account-settings/account-settings.component';

const routes: Routes = [
    { path: '', component: ComicListComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: 'account', component: AccountSettingsComponent },
    { path: 'verify/:token', component: VerifyEmailComponent },
    { path: 'reset/:token', component: ResetPasswordComponent },
    { path: 'messages', component: MessageListComponent },
    { path: 'comics', component: ComicListComponent },
    { path: 'comics/create', component: CreateComicComponent },
    { path: 'comic/:comicURL/upload', component: ComicUploadComponent },
    { path: 'comic/:comicURL', component: ComicDetailComponent },
    { path: 'comic/:comicURL/:page', component: ComicReaderComponent },
    { path: 'comic/:comicURL/:chapter/:page', component: ComicReaderComponent },
    { path: 'comic/:comicURL/:volume/:chapter/:page', component: ComicReaderComponent },
    { path: 'profile/:profileUrl', component: ProfileComponent },
    { path: '**', redirectTo: 'comics' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
