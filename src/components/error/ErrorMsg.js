export const ErrorMsg = ({message}) => {
    return(
        <div className="error-container">
            <h1>Coś poszło nie tak!</h1>
            <p>{message}</p>
        </div>
    )
}