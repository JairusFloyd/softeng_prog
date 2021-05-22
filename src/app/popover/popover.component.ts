import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {
  @Input('name') name: string;
  
  qty: number = 0;
  constructor() {
    
   }

  ngOnInit() {
    console.log("name: ", this.name);
  }

  add(){
    this.qty += 1;
    console.log();
  }

  minus(){
    if(this.qty != 0){
  
        this.qty -= 1;
        console.log();

    }
  }

}
