import { LightningElement, track } from 'lwc';
import page1 from './templates/page1.html';
import page2 from './templates/page2.html';
import page3 from './templates/page3.html';

export default class App extends LightningElement {
    
    /** Tracks which screen the wizard is on */
    @track pageNumber = 1;

    // fields used in the wizard
    @track userName = '';
    @track catName = '';

    /**
     * Moves to the next screen in the wizard
     */
    goToNextPage() {
        this.pageNumber++;
        this._pushState(); // push the new screen to the browser's history
    }

    /**
     * moves to the previous screen in the wizard
     */
    goToPreviousPage() {
        this.pageNumber--;
        this._pushState(); // push the new screen to the browser's history
    }
    
    /**
     * Lifecycle hook to render the appropiate wizard screen
     */
    render() {
        switch(this.pageNumber) {
            case 1: return page1;
            case 2: return page2;
            case 3: return page3;
            default: throw new Error();
        }
    }

    /**
     * Lifecycle hook to initialize the component
     */
    connectedCallback() {
        this._setOnPopStateHandler();
        this._syncInitialState();
    }

    /**
     * Sets a handler to handle browser Back and Forward button clicks, and
     * other browser navigation events. 
     */
    _setOnPopStateHandler() {
        window.onpopstate = (ev) => {

            // get the state for the history entry the user is going to be on
            const state = ev.state;

            if(state && state.pageNumber) {
                this.pageNumber = state.pageNumber;
            }
        };
    }

    /**
     * Responsible for syncing the `history.state` object with the wizard upon
     * page load.
     * 
     * Handles two situation:
     *   1. A `history.state` object exists with a page number, in which case
     *      that page number is used
     * 
     *   2. A `history.state` object does not exist or it exists but does not
     *      contain the page number. In this case `history.state` is replaced
     *      with a state object containing `state.pageNumber = 1`.
     */
    _syncInitialState() {
        if(history.state && history.state.pageNumber) {
            this.pageNumber = history.state.pageNumber;
        } else {
            this._replaceState();
        }
    }

    /**
     * Pushes the state of the component (the page number) as an entry to the 
     * browser's history.
     */
    _pushState() {
        
        /* The Lightning platform or other components may also be 
           using the state object. A copy is created so no existing data 
           is lost  */
        const state = Object.assign({}, history.state);

        state.pageNumber = this.pageNumber;
        history.pushState(state, '');
    }

    /**
     * Replaces the current history entry with an entry containing the
     * component's current state (the page number).
     */
    _replaceState() {

        /* The Lightning platform or other components may also be 
           using the state object. A copy is created so no existing data 
           is lost  */
        const state = Object.assign({}, history.state);

        state.pageNumber = this.pageNumber;
        history.replaceState(state, '');
    }

    /**
     * Handles changes to the user-name field
     */
    nameChangeHandler(event) {
        this.userName = event.target.value;
    }


    /**
     * Handles changes to the "cat name" field
     */
    catNameChangeHandler(event) {
        this.catName = event.target.value;
    }
}
