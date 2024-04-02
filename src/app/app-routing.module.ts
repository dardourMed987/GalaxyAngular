import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './login/login.component';
import { FormationComponent } from './formation/formation.component';
import { UtilisateursComponent } from './gestion/utilisateurs/utilisateurs.component';
import { AddUtlisateurComponent } from './gestion/utilisateurs/add-utlisateur/add-utlisateur.component';
import { RoleComponent } from './gestion/role/role.component';
import { AddRoleComponent } from './gestion/role/add-role/add-role.component';
import { SujetComponent } from './projets/sujet/sujet.component';
import { AfficherSujetComponent } from './projets/sujet/afficher-sujet/afficher-sujet.component';
import { AffecterSujetComponent } from './projets/sujet/affecter-sujet/affecter-sujet.component';
import { AddSujet2Component } from './projets/sujet/add-sujet2/add-sujet2.component';
import { NotificationComponent } from './projets/notification/notification.component';
import { LivrableComponent } from './projets/livrable/livrable.component';
import { AddLivrableComponent } from './projets/livrable/add-livrable/add-livrable.component';
import { SujetSuppComponent } from './projets/sujet/sujet-supp/sujet-supp.component';
import { CritereComponent } from './gestion/evaluation/critere.component';
import { EvaluerLivrableComponent } from './projets/livrable/evaluer-livrable/evaluer-livrable.component';
import { ModifierEvaluationComponent } from './projets/livrable/modifier-evaluation/modifier-evaluation.component';
import { UpdatePasswordComponent } from './gestion/utilisateurs/update-password/update-password.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { ClientComponent } from './gestion/client/client.component';
import { AddClientComponent } from './gestion/client/add-client/add-client.component';
import { DiscussionComponent } from './gestion/discussion/discussion.component';
import { EditUtilisateurComponent } from './gestion/utilisateurs/edit-utilisateur/edit-utilisateur.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'admin',
        component: AppLayoutComponent,
        canActivate: [AuthenticationGuard],
        children: [
          { path: 'discussions', component: DiscussionComponent },
          { path: 'updatePassword', component: UpdatePasswordComponent },
          { path: 'formation', component: FormationComponent },
          { path: 'utilisateurs', component: UtilisateursComponent },
          { path: 'adduser', component: AddUtlisateurComponent },
          { path: 'role', component: RoleComponent },
          { path: 'addrole', component: AddRoleComponent },
          { path: 'sujet', component: SujetComponent },
          { path: 'affichersujet/:id', component: AfficherSujetComponent },
          { path: 'affectersujet', component: AffecterSujetComponent },
          { path: 'addsujet2', component: AddSujet2Component },
          { path: 'notifications', component: NotificationComponent },
          { path: 'livrable', component: LivrableComponent },
          { path: 'addlivrable', component: AddLivrableComponent },
          { path: 'sujetSupp', component: SujetSuppComponent },
          { path: 'critere', component: CritereComponent },
          { path: 'clients', component: ClientComponent },
          { path: 'addClient', component: AddClientComponent },
          { path: 'evaluerLivrable/:id', component: EvaluerLivrableComponent },
          { path: 'modifierEvaluation/:id', component: ModifierEvaluationComponent },
          { path: 'edituser/:username', component: EditUtilisateurComponent },
        ],
      },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule {
}
