import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";
import * as SecureStore from 'expo-secure-store';
import {API_KEY} from "../../utils";

type movie = {
    id: number,
    poster_path: string,
    title: string,
    release_date: string,
    vote_average: string,
    backdrop_path: string,
    original_title: string,
    overview: string,

}

export const setMovieCache = createAsyncThunk('movies/setMovieCache', async (args: any, {dispatch}) => {
    //await SecureStore.deleteItemAsync('ratesMovies');
    let movies = JSON.parse(await SecureStore.getItemAsync('ratesMovies') as string);
    movies[args.id] = args.rate;
    await SecureStore.setItemAsync('ratesMovies', JSON.stringify(movies));
    return movies;
})

export const getMoviesCache = createAsyncThunk('movies/getMoviesCache', async (args, {dispatch}) => {
    //await SecureStore.deleteItemAsync('ratesMovies');
    let movies = await SecureStore.getItemAsync('ratesMovies');
    if (!movies) {
        await SecureStore.setItemAsync('ratesMovies', JSON.stringify({}));
        movies = await SecureStore.getItemAsync('ratesMovies');
    }
    // console.log(movies);
    return JSON.parse(movies as string);
})

export const getPopularMovies = createAsyncThunk('movies/getPopularMovies', async (page: number, {
    dispatch,
    getState
}) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)
    return {movies: (await response.json()).results as movie[], page: page}
});
export const getUpComingMovies = createAsyncThunk('movies/getUpComingMovies', async (page: number, {
    dispatch,
    getState
}) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`)
    return {movies: (await response.json()).results as movie[], page: page}
});


export const getNowPlayingMovies = createAsyncThunk('movies/getNowPlayingMovies', async (page: number, {
    dispatch,
    getState
}) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`)
    return {movies: (await response.json()).results as movie[], page: page}
});

const initialState: { popular: movie[], nowPlaying: movie[], upcoming: movie[], loading: boolean, moviesCache: any } = {
    popular: [],
    nowPlaying: [],
    upcoming: [],
    loading: false,
    moviesCache: {}
};

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        addMovie: (state, action: PayloadAction<any>) => {
            state.popular.push(action.payload);
        },
    },
    extraReducers: (builder) => {

        builder.addCase(setMovieCache.fulfilled, (state, {payload}) => {
            state.moviesCache = payload;
        })
        builder.addCase(getMoviesCache.fulfilled, (state, {payload}) => {
            state.moviesCache = payload;
        })
        builder.addCase(getPopularMovies.fulfilled, (state, {payload}) => {
            if (payload.page === 1) {
                state.popular = payload.movies;
            } else {
                state.popular = [...state.popular, ...payload.movies];
            }

            state.loading = false;
        })
        builder.addCase(getPopularMovies.pending, (state, {payload}) => {
            //console.log(payload);
            state.loading = true;
        })
        builder.addCase(getNowPlayingMovies.fulfilled, (state, {payload}) => {
            if (payload.page === 1) {
                state.nowPlaying = payload.movies;
            } else {
                state.nowPlaying = [...state.nowPlaying, ...payload.movies];
            }
        })
        builder.addCase(getUpComingMovies.fulfilled, (state, {payload}) => {
            //console.log(payload);
            if (payload.page === 1) {
                state.upcoming = payload.movies;
            } else {
                state.upcoming = [...state.upcoming, ...payload.movies];
            }
        })
    },
});

export const selectAllPopular = (state: { movies: { popular: movie[]; }; }) => state.movies.popular;
export const selectAllNowPlaying = (state: { movies: { nowPlaying: movie[]; }; }) => state.movies.nowPlaying;
export const selectAllUpComing = (state: { movies: { upcoming: movie[]; }; }) => state.movies.upcoming;
export const selectLoading = (state: { movies: { loading: boolean; }; }) => state.movies.loading;
export const selectmoviesCache = (state: { movies: { moviesCache: any; }; }) => state.movies.moviesCache;

export default moviesSlice.reducer;
