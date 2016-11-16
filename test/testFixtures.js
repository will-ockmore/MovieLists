import { Map, OrderedSet, fromJS } from 'immutable';

export const MOVIE = Map({
  id: 123,
  title: 'The title',
  release_date: '1666-6-6',
  overview: 'Some overview of the movie',
  backdrop_path: 'good ruck kid'
});

export const CREDITS = fromJS({
  cast: [
    {
      cast_id: 1,
      character: 'Sauron',
      name: 'The big boy'
    },
    {
      cast_id: 2,
      character: 'Gandalf',
      name: 'Ian McKellen'
    },
    {
      cast_id: 3,
      character: 'Frodo',
      name: 'Elijah Wood'
    },
  ],
  crew: [
    {
      credit_id: 1,
      job: 'Camera',
      name: 'Chuck Norris'
    },
    {
      credit_id: 2,
      job: 'Lights',
      name: 'Chuck Norris'
    },
    {
      credit_id: 3,
      job: 'Action',
      name: 'Chuck Norris'
    },
  ]
})

export const MOVIE_DETAILS = Map({
  id: 123,
  title: 'The title',
  original_title: 'the original title',
  tagline: 'sick tagline bro',
  vote_average: 9.9,
  vote_count: 987,
  release_date: '1666-6-6',
  overview: 'Some overview of the movie',
  backdrop_path: 'good ruck kid',
  credits: CREDITS
});

export const DECADES = OrderedSet([
  '166',
  '167',
  '168',
  '169'
]);

export const GENRES = OrderedSet([
  'Action',
  'Comedy',
  'Horror',
  'Thriller'
]);

