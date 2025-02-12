import {ProjectInfoProps} from "./ProjectSection.style";

const ProjectSectionData: ProjectInfoProps[] = [
    {
        companyName: "스켈터랩스",
        projects: [
            {
                role: 'Software Engineer',
                title: 'Bella',
                period: '2023.08-',
                techStack: 'ReactJS, NestJS, Lit-element',
                description: 'Frontend\n' +
                    '\n' +
                    '- 디자인 시스템 도입 (MUI 기반)\n' +
                    '- lit-element 기반 Chatbot 개발\n' +
                    '\n' +
                    'Backend\n' +
                    '\n' +
                    '- Jest 테스트 속도 개선\n' +
                    '- 모듈화 작업\n' +
                    '\n' +
                    'Infra\n' +
                    '\n' +
                    '- deprecated된 bazel rule 교체 작업\n' +
                    '- Kubernetes를 이용한 어플리케이션 배포'
            }
        ],
    },
    {
        companyName: "티맥스 와플",
        projects: [
            {
                role: 'Frontend Developer',
                title: 'SupperApp',
                period: '2022.08-2023.08',
                techStack: 'ReactJS',
                description:
                    'Frontend\n' +
                    '\n' +
                    '- Hierachy 구조의 데이터를 node 구조로 성능 개선\n' +
                    '- 조직도 관리 DND 기능 구현\n' +
                    '- 대량의 dom element로 인한 성능 이슈를 해결하기 위한 Virtual Window 사용'
            },
            {
                role: 'FullStack Developer',
                title: 'Wapl',
                period: '2022.03-2022.08',
                techStack: 'ReactJS, ProObject',
                description:
                    'Frontend\n' +
                    '\n' +
                    '- 파일 업로드 및 다운로드 서비스 모듈화\n' +
                    '- Javascript 코드 Typescript로 전환\n' +
                    '- 번들링 사이즈 최적화를 위한 코드 스플리팅\n' +
                    '\n' +
                    'Backend\n' +
                    '\n' +
                    '- CSAP 인증을 위한 개인정보 마스킹 기능\n'
            }
        ],
    },
    {
        companyName: "씽소프트",
        projects: [
            {
                role: 'Backend Developer',
                title: 'CanB',
                period: '2021.08-2022.03',
                techStack: 'SpringBoot',
                description:
                    "Backend\n" +
                    '\n' +
                    "- Redis-Session을 사용한 인증인가 기능 개발\n" +
                    "- 여러 파일 시스템을 지원하는 파일 업로드 기능 개발\n" +
                    "- 프로시저의 재사용성을 높이기 위한 모듈화\n" +
                    "- 통계 기능 개선\n"
            },
            {
                role: '백엔드',
                title: 'EggSchool',
                period: '2021.08-2021.10',
                techStack: 'Tsoa',
                description: "Backend\n" +
                    "\n" +
                    "- 앱 Push 기능 개발\n" +
                    "- 문자 및 메일, Slack 연동\n"
            }
        ],
    },
]

export default ProjectSectionData;