export const MAIN = {
    INITIAL_ALBUM: 'Seychelles',
    ROVENTURES: 'RoVentures',
};

export const VIEWER = {
    PHOTOS: 'Photos',
    VIDEOS: 'Videos',
    INFO: 'Info',
    SINGLES: 'Singles',
    MULTIPLE: 'Multiple',
    ALBUMS: 'Albums',
    SCROLL: 'scroll',
    PUBLISHED: 'Published',
    RECORDED: 'Recorded',
    MORE_INFORMATION: 'More INFO'
};

export const PATH = {
    PHOTOS: '/photos',
    VIDEOS: '/videos',
    INFO: '/info',
    PHOTO_PARAM: '/:photo',
    VIDEO_PARAM: '/:video',
    INFO_PARAM: '/:info',
    WELCOME_PARAM: '/Welcome',
    PRIVACY_POLICY: '/privacy-policy'
};

export const VIEW_MORE = {
    VIDEO_TITLE: 'VIDEOS',
    PHOTO_TITLE: 'PHOTOS',
};


export const INFO = {
    WEBSITE: 'rohandamani.com',
    LINK: 'http://rohandamani.com',
    P_2: 'I wanted a way to store and share my photos and videos, with the ability to control all aspects, no ads, and the cheapest storage rates, so I built this serverless storage viewer.',
    P_3: 'The viewer itself is a mobile-responsive Single Page Application, built with JavaScript - ReactJS, React Router, Redux, Thunk, et al. The SPA is hosted with Route53 on S3 as a static website, using Amazon Cognito to authenticate to a S3 bucket containing all the media.  The email capture is a custom serverless solution, using Lambda, SES, and DynamoDB',
    P_4: 'The core of RoVentures is to share the experience and knowledge gained from traveling.',
    P_4_1: 'If you would like to participate, contact me at info@roventures.tv',
    P_5: 'Add your email to receive occasional updates on sailing opportunities and new uploads.',
    P_6: 'Next time, I\'ll bring my own sailboat and some real cameras!',
    // P_6: 'REACT',
    // P_6: 'AWS',
};
