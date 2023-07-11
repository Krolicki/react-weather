import './Loader.css'
import {IoSunny} from 'react-icons/io5'

export const Loader = () => {
    return(
        <div className='loader-container'>
            <div>
                <span>
                    <IoSunny size={50} className="loader-icon"/>
                </span>
                <p>Pobieranie danych...</p>
            </div>
        </div>
    )
}