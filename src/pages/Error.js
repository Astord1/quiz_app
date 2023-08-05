import {Link} from "react-router-dom";

export default function Error(){
    return(
        <main className = "quiz-container">
            <div className = "error-container">
                <h1 className = "error-header-h1">Oops!</h1>
                <h2 className = "error-header-h2">Something went wrong</h2>
                <p className="error-message">Its probably that the database couldn't satisfy the parameters you entered. Maybe try something else?</p>
                <Link to = ".." className="btn">← Go back</Link>
            </div>
        </main>
        )
}