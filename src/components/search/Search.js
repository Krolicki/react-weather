import { useState } from "react"
import './Search.css'

export const Search = ({onSearch, setLoading}) => {
    const [query, setQuery] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        onSearch(query)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
                placeholder="Wpisz miasto..."
                value={query}
                onChange={e=>{ setQuery(e.target.value)}}
                className="search-input"
            />
        </form>
    )
}