import { LightningElement, track } from 'lwc';
import page1 from './templates/page1.html';
import page2 from './templates/page2.html';
import page3 from './templates/page3.html';

export default class App extends LightningElement {
    @track pageNumber = 1;

    @track userName = '';
    @track catName = '';

    goToNextPage() {
        this.pageNumber++;
        this._pushState();
    }

    goToPreviousPage() {
        this.pageNumber--;
        this._pushState();
    }
    
    render() {
        switch(this.pageNumber) {
            case 1: return page1;
            case 2: return page2;
            case 3: return page3;
            default: throw new Error();
        }
    }

    connectedCallback() {
        this._setOnPopStateHandler();
        this._syncInitialState();
    }

    _setOnPopStateHandler() {
        window.onpopstate = (ev) => {
            const state = ev.state;

            if(state && state.pageNumber) {
                this.pageNumber = state.pageNumber;
            }
        };
    }

    _syncInitialState() {
        if(history.state && history.state.pageNumber) {
            this.pageNumber = history.state.pageNumber;
        } else {
            this._replaceState();
        }
    }

    _pushState() {
        const state = Object.assign({}, history.state);
        state.pageNumber = this.pageNumber;
        history.pushState(state, '');
    }

    _replaceState() {
        const state = Object.assign({}, history.state);
        state.pageNumber = this.pageNumber;
        history.replaceState(state, '');
    }

    nameChangeHandler(event) {
        this.userName = event.target.value;
        this._replaceState();
    }

    catNameChangeHandler(event) {
        this.catName = event.target.value;
        this._replaceState();
    }
}
