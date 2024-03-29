import React, {RefObject, useEffect, useRef} from "react";
import debounce from "lodash/debounce";
import Background from "./background/Background";
import InfoMenu from "./menu/InfoMenu";
import SceneLayout from "../../common/components/sceneLayout/SceneLayout";
import * as S from "./InfoScene.style"
import SceneInfo from "./InfoScene.data";

const InfoScene = () => {
    const marioRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    usePointerUpMenuItem(navRef, sectionRef);
    useNavMarioMove(marioRef, sectionRef);
    useSwipeWindow(sectionRef);
    useNavMenuMotion(sectionRef, navRef);

    return (
        <>
            <SceneLayout isSceneFullSize={false}>
                <S.InfoContainer>
                    <InfoMenu marioRef={marioRef} navRef={navRef}/>
                    <S.InfoSectionContainer ref={sectionRef}>
                        {SceneInfo.map(sceneInfo => sceneInfo.section)}
                    </S.InfoSectionContainer>
                </S.InfoContainer>
            </SceneLayout>
            <Background/>
        </>
    )
};

// 메뉴 아이템 클릭 or 터치 시, 스크롤 이동
const usePointerUpMenuItem = (navRef: RefObject<HTMLDivElement>, sectionRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const nav = navRef.current;
        const section = sectionRef.current;
        if (nav && section) {
            const pointerUpEvent = (e: Event) => {
                let target = e.target as HTMLElement;
                if (target.childElementCount === 0 && target.parentElement) {
                    target = target.parentElement;
                }
                nav.childNodes.forEach((element, index) => {
                    if (element === target) {
                        section.scrollTo({left: section.clientWidth * index, behavior: "smooth"});
                    }
                });
            }
            nav.addEventListener('pointerup', pointerUpEvent);
            return () => nav.removeEventListener('pointerup', pointerUpEvent);
        }
    }, [])
}

// 스크롤바 이동 => 마리오 이동
const useNavMarioMove = (marioRef: RefObject<HTMLDivElement>, sectionRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const mario = marioRef.current;
        const section = sectionRef.current;
        if (section && mario) {
            let beforeScrollLeft = 0;
            const marioSize = mario.clientWidth;
            const scrollEvent = (e: Event) => {
                const {scrollLeft, scrollWidth, clientWidth} = e.target as HTMLDivElement;
                // 마리오 이동
                const locationPercent = Math.floor((scrollLeft / (scrollWidth - clientWidth)) * 100) / 100;
                mario.style.left = `${(clientWidth - marioSize) * locationPercent}px`
                // 마리오 방향
                // 오른쪽
                if (beforeScrollLeft - scrollLeft < 0) {
                    mario.classList.remove('left');
                    mario.classList.add('right');
                    // 왼쪽
                } else {
                    mario.classList.remove('right');
                    mario.classList.add('left');
                }
                beforeScrollLeft = scrollLeft;

            };
            section.addEventListener('scroll', scrollEvent);
            return () => section.removeEventListener('scroll', scrollEvent);
        }
    }, [])
}

//
const useSwipeWindow = (sectionRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        // if (isDesktop) {
        const section = sectionRef.current;
        if (section) {
            let downX = 0;
            const pointerDownEvent = (e: PointerEvent) => {
                downX = e.screenX;
            }
            const pointerUpEvent = (e: PointerEvent) => {
                const upX = e.screenX;
                const diff = downX - upX;
                if (Math.abs(diff) >= 100) {
                    section.scrollBy({left: diff, behavior: "smooth"});
                }
            }
            window.addEventListener('pointerdown', pointerDownEvent);
            window.addEventListener('pointerup', pointerUpEvent);
            return () => {
                window.removeEventListener('pointerdown', pointerDownEvent);
                window.removeEventListener('pointerup', pointerUpEvent);
            }

        }
        // }
    })
}

// 네비게이션 메뉴 선택
const useNavMenuMotion = (sectionRef: RefObject<HTMLDivElement>, navRef: RefObject<HTMLDivElement>) => {
    useEffect(() => {
        const scroll = sectionRef.current;
        const navMenu = navRef.current;
        if (scroll && navMenu) {
            const menus = navMenu.children;
            const menuLength = menus.length;
            menus.item(0)?.classList.add('select');

            const scrollEvent = debounce((e: Event) => {
                const target = e.target as HTMLDivElement
                const {scrollLeft, scrollWidth} = target;
                const menuIndex = Math.floor((scrollLeft + scrollWidth * 0.1) / scrollWidth * menuLength);
                for (let i = 0; i < menuLength; i++) {
                    const menu = menus.item(i);
                    if (menu) {
                        if (menuIndex === i) {
                            menu.classList.remove('unselect');
                            menu.classList.add('select');
                        } else {
                            if (menu.classList.contains('select')) {
                                menu.classList.remove('select');
                                menu.classList.add('unselect');
                            }
                        }
                    }
                }
            }, 20)

            scroll.addEventListener('scroll', scrollEvent);
            return () => scroll.removeEventListener('scroll', scrollEvent);
        }
    }, [])
}


export default React.memo(InfoScene);