import {Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'blogs-component',
    templateUrl: './blogs.component.html',
    styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
    public blog: string | null = null;
    public displayBlogTitle: string = ''
    public displayBlogTextList: string[] = [];
    public sourceImg: string = ''
JSON: any;
    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.blog = this.route.snapshot.paramMap.get('blog');
        this.displayBlogTitle = this.blog ? this.blogs[this.blog].title : '';
        this.displayBlogTextList = (this.blog ? this.blogs[this.blog].text : []).map((text: any) => `<p>${text}</p>`).join('');
        this.sourceImg = `assets/img/blog/${this.blog}`;
        console.log(this.displayBlogTextList);
    }

    private blogs: any = {
        'blog-7.jpg': {
            title: 'ETS Global has authorised TOEFL TEST CENTER to become an Authorised Test Center.',
            text: [
                'Our organisation has met all the requirements established by ETS and is hereby authorised to distribute the following ETS products and services in Uzbekistan:',
                '🔹TOEFL ITP',
                '🔸TOEFL Junior',
                '🔹TOEFL Primary',
                '🔸TOEIC',
                'About Educational Testing Service (ETS)',
                'As a non-profit organisation, ETS advances quality and equity in education for people worldwide by creating assessments based on rigorous research. ETS serves individuals, educational institutions and government agencies by providing customized solutions for teacher certification, English-language learning, and elementary, secondary and post-secondary education, as well as conducting education research, analysis and policy studies. Founded in 1947, ETS develops, administers and scores more than 50 million tests annually — including the TOEIC® and TOEFL® tests, the GRE® test and The Praxis Series™ assessments — in over 180 countries at over 9,000 locations worldwide. For more info: www.ets.org                                   About TOEFL TEST CENTER (TTC)',
                `Working with international, regional and local partners, TTC provides assessment programs and services to improve educational opportunities and quality, strengthen local institutions, and develop language and professional skills for success in Uzbekistan's economy.`,
                'TOEFL Test Center is currently offering the TOEFL®ITP (TOEFL Institutional Testing Program) and TOEIC® (Test of English for International Communication) under an agreement signed on September 6, 2023. This agreement provides students, universities, and educational institutions in Uzbekistan with expanded access to world-recognised English tests for academic and professional purposes.'
            ],
        },
        'blog12.png': {
            title: 'A cooperation agreement was signed between the TOEFL TEST CENTER (TTC) and Tashkent State Transport University (TSTU).',
            text: [
                'Distinguished guests of ETS Global visited the university on October 18, 2023:',
                '🔹Dr Arum Perwitasari – Academic Relations Lead EMEA;',
                '🔸 Sholpan Yergaliyeva - Representative of ETS Global in Central Asia;',
                '🔹 Karina Anvarova - Senior Manager at ETS Global.',
                'Speakers conducted a question-and-answer seminar with teachers, students and participants sharing helpful information about TOEFL Junior, TOEFL ITP and TOEFL iBT tests.',
                'It was agreed that the TOEFL TEST CENTER will support the university in updating the syllabus of the Foreign Language Department by integrating the TOEFL Institutional testing program into the first year of the undergraduate level. Most importantly, English language teachers will receive comprehensive teacher training workshops about the TOEFL iBT tests from ETS Global experts to improve their teaching methods and receive valid certifications. ',
                'Within the TOEFL Test Center and Tashkent State Transport University agreement framework, an opportunity to take the TOEFL ITP & TOEFL iBT tests was created for employees, teachers and students at a special discount. Watch the video of the event: https://youtu.be/bWq6AtSHUxQ'
            ],
        },
        '1.jpg': {
            title: 'Everything you need to know',
            text: [
                'TOEFL iBT® Tests were presented at TSTU on November 27, 2023, titled “Everything you need to know”.',
                `TOEFL iBT is accepted by 12,500+ universities in more than 160 countries worldwide. That's more than any other English-language test! `,
                'ETS held a free online seminar for English teachers and students of the Tashkent State Transport University who are eager to learn more about TOEFL examinations. Participants were provided to join free webinars in future to learn all about the TOEFL iBT Experience and receive a special discount*.',
                'During the seminar, the participants had an opportunity to learn more about: ',
                '•	What is the TOEFL iBT test, and why do you need it?',
                '•	How to prepare and register?',
                '•	All about test results and their value',
                '•	Where to get support materials?',
                '•	What is the TOEFL iBT Home Edition',
                '•	Live Q&A session - an opportunity to get answers from the experts at ETS Global, the institution behind the test!',                
                'Honourable Speakers of the Webinar:',
                'Darya Nelidova',
                'ELT Coordinator at ETS Global',
                `Darya has vast experience in the sphere of education and management, inc. her roles as the Head of International Development, a language instructor and lecturer. She is an alumni of U.S. Department of State's FLEX program and European Union's Erasmus + program scholar.`,
                'Peter Westerhuis',
                'ELT Coordinator at ETS Global',
                'Originally from Vancouver, Peter is now based in Lyon. With over 12 years of teaching experience, he has taught English in Canada, South Korea, and France to students of all ages and proficiency levels. Currently, he supports and collaborates with English teachers across Europe, the Middle East, and Africa.',
                'After the webinar, three students demonstrating active participation were identified and awarded special vouchers for taking TOEFL ITP tests by Dilmurod Sharifov, the Founder of the TOEFL Test Center.',
                '1.	Djuraeva Samiya received a 100% discount ',
                '2.	Islomov Shakhrizod was provided a 50% discount',
                '3.	Ermaxammadov Xuzurbek was given a 50% discount '
            ]
        },
        'blog7.png': {
            title: 'Strategies to get B2 and C1 from TOEFL ITP',
            text: [
                'Meet our C1 Gold Certificate holder who scored the highest score on the TOEFL ITP test.  Azizabonu Juraeva was lucky to be the first candidate who took the TOEFL ITP test at the TOEFL TEST CENTER and received the C1-Gold Certificate with the highest score. 💵 As promised, we refunded 100% exam fee of 1,490,000 UZS as cashback.',
                '📹 By watching the exclusive video interview, you can find out: ',
                '- Detailed information about Azizabonu Jurayeva;',
                '- About her overall score she obtained from the TOEFL ITP test;',
                '- about how many months she prepared for an exam to achieve C1-level.',
                '🔗 YouTube link for full video: https://youtube.com/shorts/0wTCy6A0_4Q  '
            ]
        },
        'blog11.jpg': {
            title: 'Meet our C1 Gold Certificate holder who scored the highest score on the TOEFL ITP test.',
            text: [
                '📹 By watching the exclusive video interview, you can find out: ',
                '- Detailed information about Azizabonu Jurayeva;',
                '- About her overall score she obtained from the TOEFL ITP test;',
                '- about how many months she prepared for an exam to achieve C1-level.',
                '🔗 YouTube link for full video: https://youtube.com/shorts/0wTCy6A0_4Q',
            ]
        },
        'blog10.jpg': {
            title: 'We are starting Brand New Pre-TOEFL courses for Teacher Abdurahim from the USA',
            text: [
                'Mr.Abdurahim has many years of experience teaching English using the American teaching style. Here are the three facts about him: ',
                '🔹 4 diplomas from 3 universities in Uzbekistan;',
                '🔹Lived over 12 years in America and travelled to more than 30 states;',
                '🔹 English and Business subjects teaching experience at international universities in Uzbekistan.',
                `If you want to improve your language skills for the TOEFL exam, you can register for Mahkamov's online Pre-TOEFL courses.`,
                'Register for the course here: https://forms.gle/aKfim9EJjhsKbkrc8',
                'For more information: 📱 71-200-80-04'
            ]
        }
    }
}