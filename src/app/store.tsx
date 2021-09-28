import {configureStore} from "@reduxjs/toolkit";
import moviesReducer from "../feature/movies/moviesSlice";

export default configureStore({
    reducer: {
        movies: moviesReducer
    }
});
