

export default function Notification({ notificationMessage:message ,setNotificationMessage }) {
    // Automatically remove the Nofication component from the screen after 2.5 seconds
    setTimeout(() => {
        setNotificationMessage("");
    },2500)
    

    return (
        <div className="notification">
            <p>{message}</p>
        </div>
    )
}
