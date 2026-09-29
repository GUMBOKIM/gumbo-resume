import {SkillProps} from "./SkillSection.style";

const SkillSectionData: SkillProps[] = [
    {
        kind: '언어',
        skills: [
            {name: 'Java Script', src: 'language/javascript.png'},
            {name: 'Type Script', src: 'language/typescript.png'},
            {name: 'Java', src: 'language/java.png'}
        ]
    }, {
        kind: '백엔드',
        skills: [
            {name: 'Spring Boot', src: 'backend/springboot.png'},
            {name: 'NestJs', src: 'backend/nestjs.png'},
        ]
    }, {
        kind: '프론트엔드',
        skills: [
            {name: 'React', src: 'frontend/react.png'},
            {name: 'TanStack Query', src: 'frontend/reactquery.png'},
            {name: 'Lit Element', src: 'frontend/lit-element.png'},
        ]
    },

]

export default SkillSectionData;