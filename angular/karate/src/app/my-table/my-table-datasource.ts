import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface MyTableItem {
  id: number;
  licenceFFK: number;
  nom: string;
  prenom: string;
  dateNaissance: string;
  genre: string;
  categorie: string;
  adresse:string;
  tlphn1:string;
  tlphn2:string;
  email:string;
  activites:string;
  nbInscritsFamille: number;
  
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: MyTableItem[] = [
  {id: 1, licenceFFK:2332, nom: 'Hydrogen',prenom:'Z',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 2, licenceFFK:5332, nom: 'Aydrogen',prenom:'G',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:1},
  {id: 3, licenceFFK:332, nom: 'Bydrogen',prenom:'H',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:33},
  {id: 4, licenceFFK:88332, nom: 'Cydrogen',prenom:'Y',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:55},
  {id: 5, licenceFFK:232, nom: 'Drogen',prenom:'T',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 6, licenceFFK:1332, nom: 'Eydrogen',prenom:'A',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:0},
  {id: 7, licenceFFK:32, nom: 'Hydrogen',prenom:'J',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 8, licenceFFK:22332, nom: 'Hydrogen',prenom:'I',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 9, licenceFFK:238832, nom: 'Hydrogen',prenom:'Q',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 10, licenceFFK:32332, nom: 'Hydrogen',prenom:'P',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 11, licenceFFK:21132, nom: 'Hydrogen',prenom:'VV',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 12, licenceFFK:23332, nom: 'Rydrogen',prenom:'N',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 13, licenceFFK:24332, nom: 'Wydrogen',prenom:'Z',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  {id: 14, licenceFFK:323332, nom: 'Oydrogen',prenom:'U',dateNaissance:'23/10/1992',genre:'Homme',categorie:'C1',adresse:'2 rue blabla',tlphn1:'0623234345',tlphn2:'0623234345',email:'mail@gmail.com',activites:'karate',nbInscritsFamille:2},
  
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<MyTableItem> {
  data: MyTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MyTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: MyTableItem[]): MyTableItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: MyTableItem[]): MyTableItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'nom': return compare(a.nom, b.nom, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'prenom': return compare(a.prenom, b.prenom, isAsc);
        case 'licenceFFK': return compare(+a.licenceFFK, +b.licenceFFK, isAsc);
        case 'nbInscritsFamille': return compare(+a.nbInscritsFamille, +b.nbInscritsFamille, isAsc);

        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
