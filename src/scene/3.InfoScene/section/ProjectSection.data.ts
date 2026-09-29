import {ProjectInfoProps} from "./ProjectSection.style";

const ProjectSectionData: ProjectInfoProps[] = [
    {
        companyName: "유닛블랙",
        projects: [
            {
                role: 'Fullstack Developer',
                title: '세이브(SAVE)',
                period: '2026.01-',
                techStack: 'React, NestJS, Capacitor',
                description: '소상공인 세무·장부 서비스\n' +
                    '\n' +
                    'Frontend\n' +
                    '\n' +
                    '- 서비스 프론트엔드 0→1 구축 및 정식 출시\n' +
                    '- 홈·장부·세무·전체 탭 화면, 라우팅·상태관리 구조 설계\n' +
                    '- 디자인 시스템(SDS) 컴포넌트 설계 및 전 화면 적용\n' +
                    '\n' +
                    'App\n' +
                    '\n' +
                    '- Capacitor 기반 iOS·Android 앱 전환 및 스토어 출시\n' +
                    '- FCM 푸시, 딥링크·앱링크 연동\n' +
                    '- Android 백 버튼, iOS swipe back 등 네이티브 내비게이션\n' +
                    '\n' +
                    'DX\n' +
                    '\n' +
                    '- TestFlight·Play Console 배포 파이프라인, OTA 업데이트\n' +
                    '- MSW 시나리오 목킹 + Playwright·AI 에이전트 자동 검증 환경'
            }
        ],
    },
    {
        companyName: "스켈터랩스",
        projects: [
            {
                role: 'Product Engineer',
                title: 'Bella',
                period: '2023.08-2025.09',
                techStack: 'React, NestJS, Lit-element',
                description: 'LLM 챗봇 플랫폼 및 Backoffice\n' +
                    '\n' +
                    'Frontend\n' +
                    '\n' +
                    '- MUI 기반 디자인 시스템 도입\n' +
                    '- 스트리밍 응답 이미지 깜빡임 제거 (세션 단위 캐싱)\n' +
                    '- Lit-element 기반 챗봇 클라이언트 SDK 개발\n' +
                    '\n' +
                    'Backend\n' +
                    '\n' +
                    '- Jest 워커별 DB 병렬화로 통합 테스트 70% 단축 (1517s → 431s)\n' +
                    '- 멀티 모듈 구조로 리팩토링\n' +
                    '\n' +
                    'Infra\n' +
                    '\n' +
                    '- Bazel 빌드 마이그레이션\n' +
                    '- Kubernetes 기반 애플리케이션 배포'
            },
            {
                role: 'Fullstack Developer',
                title: '고객사 AI 프로젝트',
                period: '2023.08-2025.09',
                techStack: 'Spring Boot, Vue, Python',
                description: '- 채용 도메인: LLM으로 비정형 이력서·공고를 정형 데이터로 추출\n' +
                    '- 금융권 온프레미스 챗봇: RAG 데이터 마이그레이션, 응답 품질 자동 평가\n' +
                    '- 대기업·금융권 POC 대응'
            }
        ],
    },
    {
        companyName: "티맥스 와플",
        projects: [
            {
                role: 'Fullstack Developer',
                title: 'SuperApp',
                period: '2022.10-2023.08',
                techStack: 'React, Java',
                description:
                    'Frontend\n' +
                    '\n' +
                    '- 조직도 Nested Object 구조를 트리 모델로 전환\n' +
                    '- 조직도 관리 DND 기능 구현\n' +
                    '- Virtual Window 도입으로 DOM 5,000+개 → 약 30개, 스크롤 60fps\n' +
                    '- MSW·Jest 기반 프론트엔드 테스트 환경 구축'
            },
            {
                role: 'Fullstack Developer',
                title: 'Wapl',
                period: '2022.03-2022.10',
                techStack: 'React, ProObject',
                description:
                    'Frontend\n' +
                    '\n' +
                    '- 파일 업로드 및 다운로드 서비스 모듈화\n' +
                    '- JavaScript 코드 TypeScript로 전환\n' +
                    '- 번들 크기 최적화를 위한 코드 스플리팅\n' +
                    '\n' +
                    'Backend\n' +
                    '\n' +
                    '- CSAP 인증을 위한 개인정보 마스킹 및 데이터 마이그레이션\n'
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
                techStack: 'Spring Boot',
                description:
                    "Backend\n" +
                    '\n' +
                    "- 야간 배치 사전 집계로 통계 조회 40초 → 0.5초\n" +
                    "- Redis Session 기반 인증·인가 기능 개발\n" +
                    "- 여러 파일 시스템을 지원하는 파일 업로드 기능 개발\n" +
                    "- Jenkins 빌드·배포 자동화\n"
            },
            {
                role: 'Backend Developer',
                title: 'EggSchool',
                period: '2021.08-2021.10',
                techStack: 'Express, Tsoa',
                description: "Backend\n" +
                    "\n" +
                    "- 앱 Push 기능 개발\n" +
                    "- 문자, 메일, Slack 알림 연동\n"
            }
        ],
    },
    {
        companyName: "개인 프로젝트",
        projects: [
            {
                role: '1인 풀스택',
                title: '물류 WMS',
                period: '2025.07-2025.12',
                techStack: 'React, NestJS, Electron, PWA',
                description: '- 20인 규모 물류 회사의 수기·엑셀 업무를 웹 시스템으로 전환\n' +
                    '- 안드로이드 PWA 바코드 스캐너 (일 평균 10,000박스 입출하)\n' +
                    '- 고객사 VAN 시스템 자동화 Electron 앱 (인당 업무 하루 1시간 단축)'
            }
        ],
    },
]

export default ProjectSectionData;
