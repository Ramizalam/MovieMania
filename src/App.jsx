import React, { useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce, useSetState } from 'react-use';
import { updateSearchCount,getTrendingMovies } from './appwrite';


const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept : 'application/json',
    Authorization : `Bearer ${API_KEY}`
  }
}
const App = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [trendingListError, setTrendingListError] = useState('')
  
  useDebounce(()=>setDebouncedSearchTerm(searchTerm), 1000 , [searchTerm])

  const fetchMovies = async(query = ' ')=>{
    setIsLoading(true);
    setErrorMessage('')
    try {
      const endpoint = query? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
     : ` ${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
       if(data.Response=='false' ){
        setErrorMessage(data.Error || 'failed to fetch movies')
        setMovieList([])
        return;
       }
       setMovieList(data.results || [])
       if(query && data.results.length > 0){
         await updateSearchCount(query,data.results[0])
        }
   
      } catch (error) {
       console.log(`error fetching movies: ${error}`)
       setErrorMessage('Error fetching movies . please try again later')
    } finally{
      setIsLoading(false)
    }
  }
 const loadTrendingMovies = async()=>{
  try {
    const movies = await getTrendingMovies();
    console.log(movies)
    setTrendingMovies(movies)
    
  } catch (error) {
    console.log(`error fetching trending movies: ${error}`)
    setTrendingListError('Error fetching trending movies . please try again later')
  }
 }
  useEffect(() => {
   fetchMovies(debouncedSearchTerm)
    
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])
  

  return (
    <main>
      <div className="pattern"/>
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero-Banner" />
          <h1 className='border-1px-white'>Find  <span className='text-gradient'> Movies</span>  You'll  Enjoy Without The Hassel</h1>
        <Search searchTerm={searchTerm} setSearchTerm ={setSearchTerm} />
        </header>
        {trendingListError?(<p className='text-red-500 m-5 text-2xl text-center'>{trendingListError}</p>):(trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        ))}
        
 
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading?(
            <Spinner/>
          ): errorMessage?(
          <p className='text-red-500'> {errorMessage} </p>)
          :(
          <ul>
            {movieList. map((movie)=>(
              <MovieCard key={movie.id} movie={movie}/>
            ))} 
          </ul>
        )}
        </section>
      </div>

    </main>
  )
}

export default App