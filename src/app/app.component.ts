import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as util from './app.util';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/startWith';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  input = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam nulla alias, excepturi, numquam sequi labore, modi accusamus, cum dolor nisi necessitatibus facilis ea veniam? Architecto natus adipisci laborum ex magnam cupiditate voluptates sequi ipsam commodi nemo ullam obcaecati 
  odio assumenda soluta, omnis velit earum minima sit necessitatibus repudiandae. Sit consequatur ea quia, quos, fugiat, cum animi voluptate sequi doloribus praesentium perferendis tempora! Doloribus qui vitae voluptas. Fugiat cupiditate fuga alias fugit ipsa impedit maiores dolor quia, quae animi, 
  maxime cumque quasi amet neque porro itaque sapiente, expedita est possimus, eligendi nesciunt. Ea excepturi, reprehenderit. Odio dolores officiis, quidem. Quaerat, nulla?`;
  inputText: FormControl = new FormControl(this.input);
  collection;

  constructor() {
    // here we watch the input in the UI so we can create a concordance real time
    this.inputText.valueChanges
      .debounceTime(200)
      .startWith(this.input)
      .subscribe(
        val => {
          this.input = val;
          // START CONCORDANCE LOGIC
          const JSONinput = JSON.stringify(this.input);

          const bodySplitByLine = util.splitBodyByLine(JSONinput);

          const wordsByLine = bodySplitByLine.map((line, idx) =>
            util.getWords(line)
              .map(word => ({ word: word, line: idx })));

          const flatWordsWithLinesArr = util.flattenArr(wordsByLine);

          const resultObj = util.createConcordance(flatWordsWithLinesArr);

          const resultArr = Object.keys(resultObj).map(k => resultObj[k]);

          this.collection = resultArr.sort((a, b) => {
            const wordA = String(a.word).toLowerCase();
            const wordB = String(b.word).toLowerCase();
            return (wordA < wordB) ? -1 : (wordA > wordB) ? 1 : 0;
          });
          // END CONCORDANCE LOGIC
        }
    );


  }
  
}

