import {HistoryProps} from "./HistorySection.style";

const HistorySectionData: HistoryProps[] = [
    {
        kind: '교육',
        histories: [
            {name: '광문고등학교', startDate: '2008.03', endDate: '2011.02'},
            {name: '건국대학교', content: '기계공학부', startDate: '2012.03', endDate: '2019.02'},
            {name: '쌍용교육센터', content: 'SW 개발자 과정', startDate: '2020.12', endDate: '2021.05'}
        ]
    },
    {
        kind: '경력',
        histories: [
            {name: '스켈터랩스', content: 'Fullstack', startDate: '2023.08', endDate: ' '},
            {name: '티맥스A&C', content: 'Front', startDate: '2022.03', endDate: '2023. 08'},
            {name: '씽소프트', content: 'Backend', startDate: '2021.08', endDate: '2022.03'},
            {name: 'HL그린파워', content: '비개발 직군', startDate: '2019.04', endDate: '2020.11'},
        ]
    }
];


export default HistorySectionData;