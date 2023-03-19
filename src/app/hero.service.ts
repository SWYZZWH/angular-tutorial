import {Injectable} from '@angular/core';
import {Hero} from "./hero";
import {catchError, first, mergeAll, Observable, of, tap} from "rxjs";
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
    providedIn: 'root'
})
export class HeroService {

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl).pipe(
            tap(_ => this.log(`fetched heroes`)),
            catchError(this.handleError<Hero[]>('getHeroes', []))
        )
    }

    handleError<T>(operation = 'operation', result ?: T) {
        return (err: any): Observable<T> => {
            console.error(err)
            this.log(`${operation} failed: ${err.message}`)
            return of(result as T)
        }
    }

    getHero(id: Number): Observable<Hero> {
        return this.http.get<Hero[]>(this.heroesUrl + `/?id=${id}`).pipe(
            tap(_ => this.log(`fetched hero id=${id}`)),
            catchError(this.handleError<Hero[]>('getHero')),
            mergeAll(),
            first()
        )
    }

    searchHero(term: string): Observable<Hero[]> {
        return this.http.get<Hero[]>(this.heroesUrl + `/?name=${term}`).pipe(
            tap(_ => this.log(`fetched hero name contains ${term}`)),
            catchError(this.handleError<Hero[]>('searchHero', [])),
        )
    }

    updateHero(hero: Hero): Observable<Hero> {
        return this.http.put<Hero>(this.heroesUrl, hero).pipe(
            tap(_ => this.log(`updated hero id=${hero.id}`)),
            catchError(this.handleError<Hero>('updateHero')),
        )
    }

    deleteHero(id: number) {
        console.log(id)
        return this.http.delete(this.heroesUrl + `/${id}`).pipe(
            tap(_ => this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero')),
        )
    }

    private httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
            tap((newHero: Hero) => this.log(`added hero id=${newHero.id}`)),
            catchError(this.handleError<Hero>('addHero'))
        )
    }

    private log(message: string) {
        this.messageService.add(`HeroService: ${message}`);
    }

    private heroesUrl = 'api/heroes';

    constructor(private messageService: MessageService, private http: HttpClient) {
    }
}
