import SectionLayout from "./layout/SectionLayout";
import * as S from "./ProfileSection.style";

const ProfileSection = () => {
    return (
        <SectionLayout>
            <h3>프로필</h3>
            <S.ProfileContainer>
                <S.ProfileBorder/>
                <S.ProfileImg src='./scene/3/profile/profileImg.png' alt='profileImg'/>
            </S.ProfileContainer>
                <S.ProfileGreeting>
                    안녕하세요!<br/>
                    개발자 김대희입니다.<br/>
                </S.ProfileGreeting>
                <S.ProfileDescription>
                <ul>
                    <li>
                        좋은 코드를 위해서 동료들과
                        <br/>의견을 나누는 것을 좋아합니다.
                    </li>
                    <li>
                        좋은 서비스는 동료들과 함께 <br/>이뤄지는 것이라고 생각합니다.<br/>
                    </li>
                </ul>
            </S.ProfileDescription>

        </SectionLayout>
    )
}

export default ProfileSection;