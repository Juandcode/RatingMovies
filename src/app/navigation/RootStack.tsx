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
export type RootStackParamList = {
    Loading: undefined;
    Movies: undefined;
    Detail: { movie: movie };
};
