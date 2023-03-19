import {Component, Input} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {Location} from "@angular/common";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
    @Input() hero ?: Hero;

    ngOnInit() {
        this.getHero()
    }

    getHero(): void {
        const id = Number(this.activatedRoute.snapshot.paramMap.get('id'))
        this.heroService.getHero(id).subscribe(hero => this.hero = hero)
    }

    goBack(): void {
        this.location.back()
    }

    save(hero: Hero): void {
        this.heroService.updateHero(hero).subscribe(() => this.goBack())
    }

    delete(id: number): void {
        this.heroService.deleteHero(id).subscribe(() => this.goBack());
    }

    constructor(private heroService: HeroService, private location: Location, private activatedRoute: ActivatedRoute) {
    }
}
