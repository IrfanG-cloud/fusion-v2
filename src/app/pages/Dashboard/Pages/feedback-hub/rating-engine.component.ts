import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'rating-engine',
    templateUrl: './rating-engine.component.html',
    styleUrls: ['./rating-engine.component.scss']
})
export class RatingEngineComponent implements OnInit {

    public startIntegration: boolean = false;
    public showRatingSetting: boolean = false;
    public customizedFeedback: boolean = true;
    public ratingNumber: number = 1;
    public ratingInputStyles: any;
    public ratingEnginScreens = [
        {
            id: 0,
            type: 'ratingThresholdSection',
            name: 'Rating Threshold',
            icon: '../../../../../assets/images/rating-engine/rating-icon.svg',
            title: 'Define threshold for rating your customer experience',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
            show: true

        },
        {
            id: 1,
            type: 'customerFeedbackSection',
            name: 'Customer Feedback',
            icon: '../../../../../assets/images/rating-engine/rating-icon.svg',
            title: 'What would you like to ask?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
            show: false,
            inputs: [
                {
                    id: '',
                    name: '',
                    value: '',
                }
            ]

        },
        {
            id: 2,
            type: 'appStoreRatingSection',
            name: 'App Store Rating',
            icon: '../../../../../assets/images/rating-engine/rating-icon.svg',
            title: 'Would you like to be rated on the app store?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
            show: false

        },
        {
            id: 3,
            type: 'occurancesSection',
            name: 'Occurances',
            icon: '../../../../../assets/images/rating-engine/rating-icon.svg',
            title: 'How often would you like to collect feedback?',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet urna quam. Donec sodales lectus erat.',
            show: false

        }
    ];
    public selectedRatingEnginScreens = this.ratingEnginScreens[0];

    constructor() { }

    ngOnInit(): void {
    }

    public inputRatingNumber(event: any) {
        this.ratingNumber = event.target.value;
        let width = this.ratingNumber == 1 ? 0 : this.ratingNumber == 2 ? 25 : this.ratingNumber == 3 ? 50 : this.ratingNumber == 4 ? 75 : 100;
        this.ratingInputStyles = {
            "background": `linear-gradient(to right, #4684f8 0%, #4684f8 ${width}%, #ececec ${width}%, #ececec 100%)`
        };
    }

    public counter(i: number) {
        return new Array(i);
    }

    public ratingEnginScreensNext(index: number) {
        // this is temp condition
        if (index == 4) { index = 0; }
        this.selectedRatingEnginScreens = this.ratingEnginScreens[index];
    }

    public addInput() {
        if (this.selectedRatingEnginScreens.inputs?.length != 5) {
            this.selectedRatingEnginScreens.inputs?.push({ id: '', name: '', value: '' });
        }
    }

    public removeInput(index: number) {
        if (this.selectedRatingEnginScreens.inputs) {
            this.selectedRatingEnginScreens.inputs.splice(index, 1);
        }
    }

    public drop(event: CdkDragDrop<string[]>) {
        if (this.selectedRatingEnginScreens.inputs) {
            moveItemInArray(this.selectedRatingEnginScreens.inputs, event.previousIndex, event.currentIndex);
        }
    }


}
