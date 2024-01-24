import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ToeflTests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss']
})

export class ToeflTests implements OnInit {
    ourTest: string = ''
    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.ourTest = this.route.snapshot.paramMap.get('test') ?? '';
    }

    conent: any = {
        'toefl-itp' : {
            'text': "Welcome to the world of TOEFL ITP, the ultimate English-language assessment tool designed specifically for universities and colleges! With TOEFL ITP, academic establishments can administer the test themselves or opt for an authorized testing center. This not only adds credibility to their testing process but also ensures the validity of grades obtained. \n" + 
                        "One of the most remarkable features of TOEFL ITP is its ability to track student progress. This means that both students and administrators can easily monitor and evaluate their language development over time. It's like having a personal English coach by your side!\n" +
                        "TOEFL ITP comes in two levels: Level 1 and Level 2. These levels can be used for a variety of purposes, such as placement testing for courses or classes, evaluations, and even exit testing to track progress. The possibilities are endless!\n" +
                        "After completing the exam, students receive four scores: one for each of the three sections and a total score. These scores are not only informative but are also mapped to the CEFR (European Language Framework), providing a comprehensive understanding of language proficiency.\n" +
                        "So, whether you're an institution looking to enhance your testing capabilities or a student seeking to showcase your English skills, TOEFL ITP is the powerful tool you've been waiting for. Get ready to unlock your potential and embark on a journey of language excellence!\n" +
                        "The TOEFL ITP tests are incredibly versatile and can be used for a wide range of important purposes. Whether you're aiming to enter university, graduate with flying colors, land your dream job, or even secure a scholarship, these tests are your ticket to success. They not only help you stay on track with your English skills but also boost your confidence in real-world situations. So, why wait? Embrace the power of the TOEFL ITP tests and unlock your full potential. With these tests by your side, you'll be unstoppable! Get ready to conquer the world with your English skills!\n",
            'slogan': 'The fastest and easiest way to achieve your dreams'
        },
        'toefl-ibt': {
            'text': 'Discover limitless possibilities for international education in over 160 countries, including the USA, UK, Canada, Europe, Japan, and Malaysia, by conquering the TOEFL iBT® test and gain access to more than 12,000 prestigious universities worldwide!',
            'slogan': 'Open the doors to endless opportunities'
        },
        'toeic': {
            'text': 'Elevate your English-language skills to global standards recognized and trusted by over 14,000 prestigious organizations in 160+ countries with the renowned TOEIC® programme – open doors to limitless career opportunities today!',
            'slogan': 'Boost your career and secure your dream job'
        }
    }

}