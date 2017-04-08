/**
 * Created by Chris H. 4/8/17
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-sandbox',
    templateUrl: './app/components/sandbox/sandbox.component.html'
})

export class SandboxComponent {

    constructor(
        private router: Router) { }
}
