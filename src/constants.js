export const MAIN = {
    INDIA: 'India',
    ROVENTURES: 'RoVentures',
    ABOUT_ROUTE: '/About'
};

export const VIEWER = {
    PHOTOS: 'Photos',
    VIDEOS: 'Videos',
    ABOUT: 'About',
    SINGLE: 'Single',
    MULTIPLE: 'Multiple',
    ALBUMS: 'Albums',
    SCROLL: 'scroll'
};

export const ABOUT = {
    WEBSITE: 'rohandamani.com',
    LINK: 'http://rohandamani.com',
    P_1: 'I wanted a way to store my photos and videos with the ability to view, share, and control all aspects - automating compression, resizing, and other effects on upload - so, I built this serverless viewer.',
    P_2: 'The viewer itself is a mobile-responsive single page application (SPA) built with JavaScript (ReactJS - React Router, Redux, Thunk, et al). The SPA is hosted on AWS S3 as a static website, using Amazon Cognito to authenticate to a S3 bucket containing all the media.',
    P_3: 'This is an initial (unreleased) version, plenty more features to come. Next will be upload hooks with lambda, email notifications, user authenticated sections, and more! Please send me an email at damanirohan@gmail.com for more information, or visit the link at the bottom.',
}
