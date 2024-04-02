import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { FormationComponent } from './formation/formation.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DocumentsComponent } from './gestion/documents/documents.component';
import { AddFormationComponent } from './gestion/formations/add-formation/add-formation.component';
import { UpdateFormationComponent } from './gestion/formations/update-formation/update-formation.component';
import { FormationsComponent } from './gestion/formations/formations.component';
import { ModulesComponent } from './gestion/modules/modules.component';
import { AddModuleComponent } from './gestion/modules/add-module/add-module.component';
import { UpdateModuleComponent } from './gestion/modules/update-module/update-module.component';
import { RoleComponent } from './gestion/role/role.component';
import { AddRoleComponent } from './gestion/role/add-role/add-role.component';
import { UtilisateursComponent } from './gestion/utilisateurs/utilisateurs.component';
import { AddUtlisateurComponent } from './gestion/utilisateurs/add-utlisateur/add-utlisateur.component';
import { EditUtilisateurComponent } from './gestion/utilisateurs/edit-utilisateur/edit-utilisateur.component';
import { UpdatePasswordComponent } from './gestion/utilisateurs/update-password/update-password.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PanelModule } from 'primeng/panel';
import { SplitterModule } from 'primeng/splitter';
import { FieldsetModule } from 'primeng/fieldset';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { RatingModule } from 'primeng/rating';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ChipModule } from 'primeng/chip';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ToolbarModule } from 'primeng/toolbar';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SujetComponent } from './projets/sujet/sujet.component';
import { AfficherSujetComponent } from './projets/sujet/afficher-sujet/afficher-sujet.component';
import { AffecterSujetComponent } from './projets/sujet/affecter-sujet/affecter-sujet.component';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AddSujet2Component } from './projets/sujet/add-sujet2/add-sujet2.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NotificationComponent } from './projets/notification/notification.component';
import { LivrableComponent } from './projets/livrable/livrable.component';
import { AddLivrableComponent } from './projets/livrable/add-livrable/add-livrable.component';
import { SujetSuppComponent } from './projets/sujet/sujet-supp/sujet-supp.component';
import { CritereComponent } from './gestion/evaluation/critere.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { EvaluerLivrableComponent } from './projets/livrable/evaluer-livrable/evaluer-livrable.component';
import { AccordionModule } from 'primeng/accordion';
import { ModifierEvaluationComponent } from './projets/livrable/modifier-evaluation/modifier-evaluation.component';
import { ClientComponent } from './gestion/client/client.component';
import { AddClientComponent } from './gestion/client/add-client/add-client.component';
import { DiscussionComponent } from './gestion/discussion/discussion.component';
import { CalendarModule } from 'primeng/calendar';
import { MessagesModule } from 'primeng/messages';



@NgModule({
    declarations: [

        AppComponent,
        NotfoundComponent,
        LoginComponent,
        FormationComponent,
        DocumentsComponent,
        AddFormationComponent,
        UpdateFormationComponent,
        FormationsComponent,
        ModulesComponent,
        AddModuleComponent,
        UpdateModuleComponent,
        RoleComponent,
        AddRoleComponent,
        UtilisateursComponent,
        AddUtlisateurComponent,
        EditUtilisateurComponent,
        UpdatePasswordComponent,
        SujetComponent,
        AfficherSujetComponent,
        AffecterSujetComponent,
        AddSujet2Component,
        NotificationComponent,
        LivrableComponent,
        AddLivrableComponent,
        SujetSuppComponent,
        CritereComponent,
        EvaluerLivrableComponent,
        ModifierEvaluationComponent,
        ClientComponent,
        AddClientComponent,
        DiscussionComponent

    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        CheckboxModule,
        PasswordModule,
        ButtonModule,
        InputTextModule,
        CommonModule,
        MessageModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        NgxPaginationModule,
        PanelModule,
        SplitterModule,
        FieldsetModule,
		RatingModule,
		SliderModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		DropdownModule,
		ProgressBarModule,
		ToastModule,
        TagModule,
		BadgeModule,
		AvatarModule,
		ScrollPanelModule,
		TagModule,
		ChipModule,
		ButtonModule,
		SkeletonModule,
		AvatarGroupModule,
		ScrollTopModule,
        ToolbarModule,
        ListboxModule,
        RadioButtonModule,
        DialogModule,
        InputTextareaModule,
        AngularEditorModule,
        AngularEditorModule,
        DropdownModule,
        InputSwitchModule,
        AccordionModule,
        RatingModule,
        CalendarModule,
        MessagesModule
        
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
