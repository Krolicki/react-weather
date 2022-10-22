import debounce from "lodash.debounce"
import { useMemo, useState } from "react"
//import { AsyncPaginate } from "react-select-async-paginate"
import './Search.css'

export const Search = ({onSearch}) => {
    const [query, setQuery] = useState("")

    const changeValue = (value) => {
        onSearch(value)
    }

    const handleTyping = useMemo(
        () => debounce(changeValue, 3000)
    ,[])

    return (
        <input 
            placeholder="Wpisz miasto..."
            //debounceTimeout={1000}
            value={query}
            onChange={e=>{handleTyping(e.target.value); setQuery(e.target.value)}}
            className="search-input"
        />
    )
}