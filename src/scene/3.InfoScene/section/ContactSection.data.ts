import {ContactIconProps} from "./ContactSection.style";

export const ContactData: ContactIconProps[] = [
    {
        type: "link",
        name: "Blog",
        location: "scene/3/contact/blog.svg",
        destination: "https://blog.daeheekim.dev"
    },
    {
        type: "phone",
        name: "phone-call",
        location: "scene/3/contact/phone-call.png",
        destination: "tel:010-9929-4805"
    },
    {
        type: "phone",
        name: "kakao",
        location: "scene/3/contact/kakao.png",
        destination: "http://qr.kakao.com/talk/BPlXC40l1V3ar3EZ08auO3mO7bs-"
    },
    {
        type: "phone",
        name: "phone-message",
        location: "scene/3/contact/phone-message.png",
        destination: "sms:010-9929-4805"
    }
]