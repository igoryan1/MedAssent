
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Nation } from '../model/nation';
import {trigger, style, animate, transition, state} from '@angular/animations';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // could not get this fade to work, only appears to work for new item, not the updated. Tried a few ideas but wasnt succesful
  animations: [
    trigger('fade', [ 
        transition('void => *', [
            style({ opacity: 0 }), 
            animate(2000, style({opacity: 1}))
          ]) 
    ])
  ]
})
export class HomeComponent implements OnInit,OnDestroy
{
    nations: Nation[] = [];
    hilitedName = '...';
    nationName = '';
    nativeName = '';
    capital = '';
    latitude: number = 0;
    longtitue: number = 0;
    flag = '';
   // imageVisible = false;

    constructor(
        private http:HttpClient,
        private changeDetectorRef:ChangeDetectorRef,
        private location: Location ,
        private router: Router) { this.location = location; }

    ngOnInit(): void {
        this.http.get<Nation[]>( 'assets/data.json' )
            .pipe()
            .subscribe( (nations:Nation[]) => {
                this.nations = nations ? nations : [];
                this.changeDetectorRef.detectChanges();
            } );
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.changeDetectorRef.detectChanges();
    }

    populateDetails( nation:Nation ) {
        this.nationName = nation.name;
        this.nativeName = nation.nativeName;
        this.capital = nation.capital;
        this.latitude = nation.latlng[0];
        this.longtitue = nation.latlng[1];
        this.flag = nation.flag;  
        this.changeDetectorRef.detectChanges();
        this.location.go(this.router.url + "/" + nation.alpha3Code)
    }
    

    ngOnDestroy(): void {
    }
}
