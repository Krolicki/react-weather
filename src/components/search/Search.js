import { useState } from "react"
//import { AsyncPaginate } from "react-select-async-paginate"
import './Search.css'

export const Search = ({onSearch}) => {
    const [query, setQuery] = useState("")

    const handleTyping = (value) => {
        setQuery(value)
        onSearch(value)
    }

    return (
        <input 
            placeholder="Search weather..."
            //debounceTimeout={1000}
            value={query}
            onChange={e=>handleTyping(e.target.value)}
            className="search-input"
        />
    )
}