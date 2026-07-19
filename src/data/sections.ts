export type SectionKey = 'profile' | 'career' | 'skill' | 'experience' | 'contact';

export const SECTION_ORDER: { key: SectionKey; title: string; panelTitle?: string }[] = [
  { key: 'profile', title: '프로필' },
  { key: 'career', title: '경력', panelTitle: '경력사항' },
  { key: 'skill', title: '기술', panelTitle: '기술 스택' },
  { key: 'experience', title: '경험', panelTitle: '업무 경험' },
  { key: 'contact', title: '연락' },
];

/* ----- 프로필 ----- */
export const PROFILE = {
  greeting: '안녕하세요!\n개발자 김대희입니다.',
  points: [
    '좋은 코드를 위해서 동료들과 의견을 나누는 것을 좋아합니다.',
    '좋은 서비스는 동료들과 함께 이뤄지는 것이라고 생각합니다.',
  ],
};

/* ----- 경력 (교육/경력 연혁) ----- */
export interface HistoryItem {
  name: string;
  content?: string;
  startDate: string;
  endDate: string;
}
export const HISTORY: { kind: string; histories: HistoryItem[] }[] = [
  {
    kind: '경력',
    histories: [
      { name: '스켈터랩스', content: 'Fullstack', startDate: '2023.08', endDate: '' },
      { name: '티맥스A&C', content: 'Front', startDate: '2022.03', endDate: '2023.08' },
      { name: '씽소프트', content: 'Backend', startDate: '2021.08', endDate: '2022.03' },
      { name: 'HL그린파워', content: '비개발 직군', startDate: '2019.04', endDate: '2020.11' },
    ],
  },
  {
    kind: '교육',
    histories: [
      { name: '쌍용교육센터', content: 'SW 개발자 과정', startDate: '2020.12', endDate: '2021.05' },
      { name: '건국대학교', content: '기계공학부', startDate: '2012.03', endDate: '2019.02' },
      { name: '광문고등학교', startDate: '2008.03', endDate: '2011.02' },
    ],
  },
];

/* ----- 기술 스택 ----- */
export const SKILLS: { kind: string; skills: string[] }[] = [
  { kind: '언어', skills: ['JavaScript', 'TypeScript', 'Java'] },
  { kind: '백엔드', skills: ['Spring Boot', 'NestJS'] },
  { kind: '프론트엔드', skills: ['React', 'Lit Element'] },
];

/* ----- 업무 경험 ----- */
export interface Project {
  role: string;
  title: string;
  period: string;
  techStack: string;
  description: string;
}
export const EXPERIENCE: { companyName: string; projects: Project[] }[] = [
  {
    companyName: '스켈터랩스',
    projects: [
      {
        role: 'Software Engineer',
        title: 'Bella',
        period: '2023.08-',
        techStack: 'ReactJS, NestJS, Lit-element',
        description:
          'Frontend\n\n- 디자인 시스템 도입 (MUI 기반)\n- lit-element 기반 Chatbot 개발\n\n' +
          'Backend\n\n- Jest 테스트 속도 개선\n- 모듈화 작업\n\n' +
          'Infra\n\n- deprecated된 bazel rule 교체 작업\n- Kubernetes를 이용한 어플리케이션 배포',
      },
    ],
  },
  {
    companyName: '티맥스 와플',
    projects: [
      {
        role: 'Frontend Developer',
        title: 'SupperApp',
        period: '2022.08-2023.08',
        techStack: 'ReactJS',
        description:
          'Frontend\n\n- Hierachy 구조의 데이터를 node 구조로 성능 개선\n- 조직도 관리 DND 기능 구현\n' +
          '- 대량의 dom element로 인한 성능 이슈를 해결하기 위한 Virtual Window 사용',
      },
      {
        role: 'FullStack Developer',
        title: 'Wapl',
        period: '2022.03-2022.08',
        techStack: 'ReactJS, ProObject',
        description:
          'Frontend\n\n- 파일 업로드 및 다운로드 서비스 모듈화\n- Javascript 코드 Typescript로 전환\n' +
          '- 번들링 사이즈 최적화를 위한 코드 스플리팅\n\n' +
          'Backend\n\n- CSAP 인증을 위한 개인정보 마스킹 기능',
      },
    ],
  },
  {
    companyName: '씽소프트',
    projects: [
      {
        role: 'Backend Developer',
        title: 'CanB',
        period: '2021.08-2022.03',
        techStack: 'SpringBoot',
        description:
          'Backend\n\n- Redis-Session을 사용한 인증인가 기능 개발\n- 여러 파일 시스템을 지원하는 파일 업로드 기능 개발\n' +
          '- 프로시저의 재사용성을 높이기 위한 모듈화\n- 통계 기능 개선',
      },
      {
        role: 'Backend Developer',
        title: 'EggSchool',
        period: '2021.08-2021.10',
        techStack: 'Tsoa',
        description: 'Backend\n\n- 앱 Push 기능 개발\n- 문자 및 메일, Slack 연동',
      },
    ],
  },
];

/* ----- 연락 ----- */
export interface ContactLink {
  name: string;
  href: string;
}
export const CONTACT: { email: string; links: ContactLink[] } = {
  email: 'dae4805@naver.com',
  links: [
    { name: 'GitHub', href: 'https://github.com/GUMBOKIM' },
    { name: 'Tistory 블로그', href: 'https://gum-equal-supply.tistory.com/' },
    { name: '전화', href: 'tel:010-9929-4805' },
    { name: '문자', href: 'sms:010-9929-4805' },
    { name: '카카오톡', href: 'http://qr.kakao.com/talk/BPlXC40l1V3ar3EZ08auO3mO7bs-' },
  ],
};
