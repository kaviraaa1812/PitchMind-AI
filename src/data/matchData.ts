export const miSquad = [
  { id: 'mi1', name: 'Rohit Sharma', role: 'Batter', img: 'RS', form: 'STABLE' },
  { id: 'mi2', name: 'Ishan Kishan', role: 'Wicketkeeper', img: 'IK', form: 'GOOD' },
  { id: 'mi3', name: 'Suryakumar Yadav', role: 'Batter', img: 'SKY', form: 'PEAK' },
  { id: 'mi4', name: 'Tilak Varma', role: 'Batter', img: 'TV', form: 'GOOD' },
  { id: 'mi5', name: 'Hardik Pandya', role: 'All-rounder', img: 'HP', form: 'STABLE' },
  { id: 'mi6', name: 'Tim David', role: 'Batter', img: 'TD', form: 'GOOD' },
  { id: 'mi7', name: 'Romario Shepherd', role: 'All-rounder', img: 'RS', form: 'GOOD' },
  { id: 'mi8', name: 'Gerald Coetzee', role: 'Bowler', img: 'GC', form: 'PEAK' },
  { id: 'mi9', name: 'Piyush Chawla', role: 'Bowler', img: 'PC', form: 'STABLE' },
  { id: 'mi10', name: 'Jasprit Bumrah', role: 'Bowler', img: 'JB', form: 'EXCELLENT' },
  { id: 'mi11', name: 'Nuwan Thushara', role: 'Bowler', img: 'NT', form: 'GOOD' },
];

export const cskSquad = [
  { id: 'csk1', name: 'Ruturaj Gaikwad', role: 'Batter', img: 'RG', form: 'PEAK' },
  { id: 'csk2', name: 'Rachin Ravindra', role: 'All-rounder', img: 'RR', form: 'GOOD' },
  { id: 'csk3', name: 'Ajinkya Rahane', role: 'Batter', img: 'AR', form: 'STABLE' },
  { id: 'csk4', name: 'Daryl Mitchell', role: 'All-rounder', img: 'DM', form: 'GOOD' },
  { id: 'csk5', name: 'Shivam Dube', role: 'All-rounder', img: 'SD', form: 'PEAK' },
  { id: 'csk6', name: 'Ravindra Jadeja', role: 'All-rounder', img: 'RJ', form: 'EXCELLENT' },
  { id: 'csk7', name: 'Sameer Rizvi', role: 'Batter', img: 'SR', form: 'STABLE' },
  { id: 'csk8', name: 'MS Dhoni', role: 'Wicketkeeper', img: 'MSD', form: 'PEAK' },
  { id: 'csk9', name: 'Deepak Chahar', role: 'Bowler', img: 'DC', form: 'GOOD' },
  { id: 'csk10', name: 'Tushar Deshpande', role: 'Bowler', img: 'TD', form: 'GOOD' },
  { id: 'csk11', name: 'Matheesha Pathirana', role: 'Bowler', img: 'MP', form: 'EXCELLENT' },
];

export const players = [...miSquad, ...cskSquad];

export const matchSituations = [
  {
    id: 'final-over-defense',
    title: 'Final Over Defense',
    description: 'MI need to defend 12 runs against CSK. MS Dhoni is on strike.',
    bowler: 'Jasprit Bumrah',
    batter: 'MS Dhoni',
    runsToDefend: 12,
    ballsRemaining: 6,
    difficulty: 'Hard',
  },
  {
    id: 'powerplay-collapse',
    title: 'Powerplay Collapse',
    description: 'MI are 24/3 in 4 overs. Stabilize the innings against Pathirana.',
    bowler: 'Matheesha Pathirana',
    batter: 'Hardik Pandya',
    targetScore: 180,
    currentOver: 4,
    difficulty: 'Medium',
  }
];
