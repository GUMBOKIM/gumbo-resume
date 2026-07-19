# Gumbo Planet — 김대희 포트폴리오

[https://introduce.daeheekim.dev](https://introduce.daeheekim.dev)

드래곤볼 계왕성처럼 작은 행성 위를 검보(검은보급)가 걸어다니며 이력서를 둘러보는 포트폴리오.

## 컨셉

- 행성 위에 건물 5채 = 이력서 섹션 5개
  - 집(프로필) · 오피스 빌딩(경력) · 작업실(기술) · 공장(업무경험) · 우체통(연락)
- 건물 앞에 서면 해당 섹션 패널이 열림. 메뉴 버튼을 누르면 자동으로 걸어감 (거리 비례 가속)
- 하늘은 **접속한 실제 시각** 기준으로 낮 / 노을 / 밤 전환 (해·달·별·유성·가로등 점등)
- 모든 그래픽은 이미지 파일 없이 코드로 렌더링 — 문자 그리드 → Canvas 도트 스프라이트
- 모바일: 화면 터치 버튼 지원

## 조작

| 입력 | 동작 |
|------|------|
| ◀ ▶ / A D | 걷기 |
| 스페이스 | 점프 |
| 메뉴 버튼 | 해당 건물로 자동 이동 |

## 기술

- React 19 + TypeScript + Vite
- 렌더링: Canvas 2D (라이브러리 없음), 엔진은 순수 TS 모듈(`src/engine/`)로 분리
- 폰트: DungGeunMo 서브셋 (243KB → 56KB)

## 구조

```
src/
├── engine/          # 캔버스 엔진 (React 비의존)
│   ├── sprites.ts   # 도트 스프라이트 데이터 + 그리기
│   ├── sky.ts       # 실시간 낮/밤 하늘
│   └── planet.ts    # 행성 렌더 루프, 이동/점프, 섹션 감지
├── data/
│   └── sections.ts  # 이력서 콘텐츠 (프로필/경력/기술/업무경험/연락)
├── components/
│   └── SectionPanel.tsx
├── App.tsx          # 메뉴/시계/패널/터치 컨트롤
└── main.tsx
```

## 개발

```bash
pnpm install
pnpm dev       # 개발 서버
pnpm build     # 타입체크 + 빌드 (dist/)
```

## 이전 버전

마리오 테마 2D 캔버스 버전은 [git 히스토리(6a1bb93)](https://github.com/GUMBOKIM/gumbo-resume/tree/6a1bb93) 참고.
