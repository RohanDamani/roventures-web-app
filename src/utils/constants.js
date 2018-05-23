export const MAIN = {
    INITIAL_ALBUM: 'Seychelles',
    ROVENTURES: 'RoVentures',
    ABOUT_ROUTE: '/About'
};

export const VIEWER = {
    PHOTOS: 'Photos',
    VIDEOS: 'Videos',
    ABOUT: 'About',
    SINGLES: 'Singles',
    MULTIPLE: 'Multiple',
    ALBUMS: 'Albums',
    SCROLL: 'scroll',
    NO_PHOTOS: 'No photos here, check out the',
    NO_VIDEOS: 'No videos here, check out the'
};

export const ABOUT = {
    WEBSITE: 'rohandamani.com',
    LINK: 'http://rohandamani.com',
    P_1: 'Welcome to the channel for RoVentures. I am planning to sail around the world - my photos, videos, location, and crew requests will be updated here.',
    P_2: 'I wanted a way to store and share my photos and videos, with the ability to control all aspects, no ads, and the cheapest storage rates, so I built this serverless storage viewer.',
    P_3: 'The viewer itself is a mobile-responsive SPA built with JavaScript - ReactJS, React Router, Redux, Thunk, et al. The SPA is hosted with Route53 on S3 as a static website, using Amazon Cognito to authenticate to a S3 bucket containing all the media.  The email capture is a custom serverless solution, using Lambda, SES, and DynamoDB',
    P_4: 'The core of RoVentures is to share the experience and knowledge gained from traveling.  If you would like to contribute, you may contact me at info@roventures.tv',
    P_5: 'Add your email to participate in RoVentures, and receive occasional updates on new uploads and sailing opportunities.',
};
