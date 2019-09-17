import { LightningElement, track } from 'lwc';
import page1 from './templates/page1.html';
import page2 from './templates/page2.html';
import page3 from './templates/page3.html';

export default class App extends LightningElement {
    @track pageNumber = 1;

    connectedCallback() {
        window.onpopstate = (ev) => {
            const state = ev.state;

            if(ev.state) {
                this.pageNumber = state.pageNumber;
            } else {
                this.pageNumber = 1;
            }
        };

        if(history.state && history.state.pageNumber) {
            this.pageNumber = history.state.pageNumber;
        } else {
            this.pageNumber = 1;
            this.pushPageNumberState();
        }
    }

    next() {
        this.pageNumber++;
        this.pushPageNumberState();
    }

    back() {
        this.pageNumber--;
        this.pushPageNumberState();
    }

    pushPageNumberState() {
        let state = history.state || {};
        state.pageNumber = this.pageNumber;
        history.pushState(state, '');
    }

    render() {
        switch(this.pageNumber) {
            case 1: return page1;
            case 2: return page2;
            case 3: return page3;
            default: throw new Error();
        }
    }
}
