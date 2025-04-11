
import { Movie } from "@/types";

// This is sample data for our demo
// In a real application, this would come from an API
export const sampleMovies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseDate: "1994-09-23",
    posterPath: "/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    voteAverage: 8.7,
    genres: ["Drama", "Crime"],
    duration: "2h 22m",
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: 2,
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseDate: "1972-03-14",
    posterPath: "/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    voteAverage: 8.7,
    genres: ["Drama", "Crime"],
    duration: "2h 55m",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan"]
  },
  {
    id: 3,
    title: "The Dark Knight",
    overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseDate: "2008-07-16",
    posterPath: "/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    voteAverage: 8.5,
    genres: ["Action", "Crime", "Drama", "Thriller"],
    duration: "2h 32m",
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 4,
    title: "Pulp Fiction",
    overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseDate: "1994-10-14",
    posterPath: "/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",
    voteAverage: 8.5,
    genres: ["Crime", "Thriller"],
    duration: "2h 34m",
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: 5,
    title: "Inception",
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseDate: "2010-07-15",
    posterPath: "/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg",
    voteAverage: 8.3,
    genres: ["Action", "Adventure", "Sci-Fi", "Thriller"],
    duration: "2h 28m",
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
  },
  {
    id: 6,
    title: "Interstellar",
    overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseDate: "2014-11-05",
    posterPath: "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    voteAverage: 8.4,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    duration: "2h 49m",
    director: "Christopher Nolan",
    cast: ["Matthew McConaughey", "Jessica Chastain", "Anne Hathaway"]
  },
  {
    id: 7,
    title: "Fight Club",
    overview: "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    releaseDate: "1999-10-15",
    posterPath: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
    voteAverage: 8.4,
    genres: ["Drama"],
    duration: "2h 19m",
    director: "David Fincher",
    cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
  },
  {
    id: 8,
    title: "The Matrix",
    overview: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseDate: "1999-03-30",
    posterPath: "/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    voteAverage: 8.2,
    genres: ["Action", "Sci-Fi"],
    duration: "2h 16m",
    director: "Lana Wachowski",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    id: 9,
    title: "Parasite",
    overview: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseDate: "2019-05-30",
    posterPath: "/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",
    voteAverage: 8.5,
    genres: ["Comedy", "Drama", "Thriller"],
    duration: "2h 12m",
    director: "Bong Joon-ho",
    cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
  },
  {
    id: 10,
    title: "Spirited Away",
    overview: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    releaseDate: "2001-07-20",
    posterPath: "/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg",
    voteAverage: 8.5,
    genres: ["Animation", "Family", "Fantasy"],
    duration: "2h 5m",
    director: "Hayao Miyazaki",
    cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]
  },
  {
    id: 11,
    title: "Joker",
    overview: "In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: the Joker.",
    releaseDate: "2019-10-02",
    posterPath: "/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    voteAverage: 8.2,
    genres: ["Crime", "Drama", "Thriller"],
    duration: "2h 2m",
    director: "Todd Phillips",
    cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"]
  },
  {
    id: 12,
    title: "Avengers: Endgame",
    overview: "After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    releaseDate: "2019-04-24",
    posterPath: "/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    voteAverage: 8.3,
    genres: ["Action", "Adventure", "Sci-Fi"],
    duration: "3h 1m",
    director: "Anthony Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"]
  }
];
