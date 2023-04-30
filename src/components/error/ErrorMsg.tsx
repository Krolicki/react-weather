export const ErrorMsg = ({message} : {message : string}) => {
    return(
        <div className="error-container">
            <h1>Coś poszło nie tak!</h1>
            <p>{message}</p>
        </div>
    )
}