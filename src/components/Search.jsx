import React from 'react'

const Search = ({searchTerm,setSearchTerm}) => {
  return (
    <div className='search'>
      <div>
        <img src="./search.svg" alt="" srcSet="" />
        <input 
        onChange={(e)=>{
            setSearchTerm(e.target.value)

        }}
         type="text"    value={searchTerm}  placeholder="Search Thousand of Movies " />
      </div>
    </div>
)
}

export default Search