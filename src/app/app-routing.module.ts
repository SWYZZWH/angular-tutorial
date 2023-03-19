import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HeroesComponent} from "./heroes/heroes.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: "full"},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'heroes', component: HeroesComponent},
    {path: 'detail/:id', component: HeroDetailComponent},
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)], // forRoot stands for base dir is root of the project
    exports: [RouterModule]
})
export class AppRoutingModule {
}
