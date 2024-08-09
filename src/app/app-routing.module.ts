import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
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
import { TechnologieComponent } from './gestion/technologie/technologie.component';
import { FormationsComponent } from './gestion/formations/formations.component';
import { AddFormationComponent } from './gestion/formations/add-formation/add-formation.component';
import { ModulesComponent } from './gestion/modules/modules.component';
import { DocumentsComponent } from './gestion/documents/documents.component';
import { AddDocumentComponent } from './gestion/documents/add-document/add-document.component';
import { UpdateDocumentComponent } from './gestion/documents/update-document/update-document.component';
import { AddModuleComponent } from './gestion/modules/add-module/add-module.component';
import { UpdateModuleComponent } from './gestion/modules/update-module/update-module.component';
import { ShowFormationComponent } from './gestion/formations/show-formation/show-formation.component';


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
          { path: 'modules', component: ModulesComponent },
          { path: 'addformation', component: AddFormationComponent },
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
          { path: 'technologies', component: TechnologieComponent },
          { path: 'evaluerLivrable/:id', component: EvaluerLivrableComponent },
          { path: 'modifierEvaluation/:id', component: ModifierEvaluationComponent },
          { path: 'edituser/:username', component: EditUtilisateurComponent },
          { path: 'formations', component: FormationsComponent },
          { path: 'editdocument/:id', component: UpdateDocumentComponent },
          { path: 'documents', component: DocumentsComponent },
          { path: 'addDocument', component: AddDocumentComponent },
          { path: 'addmodule', component: AddModuleComponent },
          { path: 'updatemodule/:id', component: UpdateModuleComponent },
          { path: 'showformation/:id', component: ShowFormationComponent },
          
         
          
        ],
      },
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
export class AppRoutingModule {
}
