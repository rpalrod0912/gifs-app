import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'UJS7ArvrctL0Et9WNXnJScxLRbN1HXSl';

@Injectable({ providedIn: 'root' })
export class GifsService {
  public gifList: Gif[] = [];

  private _tagsHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready');
  }

  get tagsHistory() {
    debugger;
    console.log([...this._tagsHistory]);
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    //Borra el tag anterior
    tag = tag.toLowerCase();
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }
    //E inserta el nuevo al inicio
    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    if (!localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);
    this.searchTag(this._tagsHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);
    /*const resp = await fetch(
      'https://api.giphy.com/v1/gifs/search?api_key=UJS7ArvrctL0Et9WNXnJScxLRbN1HXSl&q=valorant&limit=10'
    );


    const data = await resp.json();
    console.log(data);
    */
    const params = new HttpParams()
      .set('api_key', GIPHY_API_KEY)
      .set('limit', '10')
      .set('q', tag);

    this.http
      .get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe((resp) => {
        this.gifList = resp.data;
      });
  }
}
