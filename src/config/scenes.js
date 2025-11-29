export const scenes = [
  {
    id: 'intro',
    title: 'For Pookie, my Happiness',
    background: 'linear-gradient(to bottom, #1a1a3e, #0f0f2e)',
    texts: [
      'Pookie, this is just for you.',
      'Happiness, I\'m really, really sorry.',
      'I made this with all my love.'
    ],
    buttonText: 'Tap to open my heart 💌',
    nextScene: 'apology'
  },
  {
    id: 'apology',
    title: 'I\'m sorry, I want you back',
    background: 'linear-gradient(135deg, #ffdab9, #e6e6fa)',
    texts: [
      'Pookie, I\'m very sorry for hurting you.',
      'Happiness, everything feels empty without you.',
      'Every moment without you hurts.'
    ],
    buttonText: 'Tap to see our journey 💫',
    nextScene: 'journey'
  },
  {
    id: 'journey',
    title: 'Fight → Regret → Revival of Love',
    background: 'linear-gradient(to bottom, #708090, #87ceeb)',
    phases: [
      {
        name: 'fight',
        texts: ['We fought, and I know I hurt you, Pookie.'],
        background: 'linear-gradient(to bottom, #708090, #4a5568)'
      },
      {
        name: 'regret',
        texts: ['Happiness, I realized how much you mean to me.'],
        background: 'linear-gradient(to bottom, #4a5568, #2d3748)'
      },
      {
        name: 'revival',
        texts: ['All I want is a chance to make our love stronger.'],
        background: 'linear-gradient(to bottom, #87ceeb, #98ff98)'
      }
    ],
    buttonText: 'Tap to feel what I feel 🎧',
    nextScene: 'music'
  },
  {
    id: 'music',
    title: 'Play My Feelings for Pookie',
    background: 'linear-gradient(135deg, #98ff98, #e6e6fa)',
    texts: [
      'These songs remind me of you, Pookie.',
      'Each one holds a piece of my heart, Happiness.',
      'Listen to what I can\'t put into words.'
    ],
    buttonText: 'Skip songs, read my heart',
    nextScene: 'envelope'
  },
  {
    id: 'envelope',
    title: 'Final Message for Pookie',
    background: 'linear-gradient(135deg, #ffb6c1, #fff8dc)',
    texts: [
      'Pookie, I really love you.',
      'Happiness, I want you back in my life.',
      'Even if you\'re hurt or angry, I just want you to talk to me once.',
      'You are my everything, always.'
    ],
    buttonText: 'Tap to answer me 💖',
    nextScene: 'finalChoice'
  },
  {
    id: 'finalChoice',
    title: 'Will you give me a chance?',
    background: 'linear-gradient(to bottom, #87ceeb, #ffffff)',
    texts: [
      'Pookie, will you give him a chance?',
      'Happiness, will you let me try to make things right?'
    ]
  }
];

export const songs = [
  {
    id: 1,
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=U2Gp0j2tq6s',
    embedUrl: 'https://www.youtube.com/embed/U2Gp0j2tq6s'
  },
  {
    id: 2,
    title: 'Jeene Laga Hoon',
    artist: 'Atif Aslam',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=nQW5Q_iCqk8',
    embedUrl: 'https://www.youtube.com/embed/nQW5Q_iCqk8'
  },
  {
    id: 3,
    title: 'Mann Mera',
    artist: 'Gajendra Verma',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=Vr5Td8z6qW4',
    embedUrl: 'https://www.youtube.com/embed/Vr5Td8z6qW4'
  },
  {
    id: 4,
    title: 'Baarish',
    artist: 'Yaariyan',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=2U2j2l5k9J4',
    embedUrl: 'https://www.youtube.com/embed/2U2j2l5k9J4'
  },
  {
    id: 5,
    title: 'Khamakha Hai',
    artist: 'Arijit Singh',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=7v2T9kLQKQ8',
    embedUrl: 'https://www.youtube.com/embed/7v2T9kLQKQ8'
  },
  {
    id: 6,
    title: 'Maine Royaan',
    artist: 'Falak Shabir',
    language: 'Hindi',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=4hJm7kRnJz8',
    embedUrl: 'https://www.youtube.com/embed/4hJm7kRnJz8'
  },
  {
    id: 7,
    title: 'Perfect',
    artist: 'Ed Sheeran',
    language: 'English',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=2Vv-BfVoq4I',
    embedUrl: 'https://www.youtube.com/embed/2Vv-BfVoq4I'
  },
  {
    id: 8,
    title: 'All of Me',
    artist: 'John Legend',
    language: 'English',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=450p7goxZqg',
    embedUrl: 'https://www.youtube.com/embed/450p7goxZqg'
  },
  {
    id: 9,
    title: 'Someone Like You',
    artist: 'Adele',
    language: 'English',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=hLQl3WQQoQ0',
    embedUrl: 'https://www.youtube.com/embed/hLQl3WQQoQ0'
  },
  {
    id: 10,
    title: 'Apologize',
    artist: 'OneRepublic',
    language: 'English',
    platform: 'YouTube',
    watchUrl: 'https://www.youtube.com/watch?v=Eq4BJ4PhPaw',
    embedUrl: 'https://www.youtube.com/embed/Eq4BJ4PhPaw'
  }
];
