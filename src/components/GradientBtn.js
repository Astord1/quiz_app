
export default function GradientBtn({children, onClick}){
    return(
        <div className="bg-container">
            <button className="btn" onClick={onClick}>{children}</button>
        </div>
    )
}