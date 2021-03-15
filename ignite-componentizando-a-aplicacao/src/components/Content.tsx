import { MovieCard } from "../components/MovieCard";

interface Movie {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  movies: Movie[];
}

export function Content(props: ContentProps) {
  return (
    <div className="movies-list">
      {props.movies.map((movie) => (
        <MovieCard
          title={movie.Title}
          poster={movie.Poster}
          runtime={movie.Runtime}
          rating={movie.Ratings[0].Value}
        />
      ))}
    </div>
  );
}
