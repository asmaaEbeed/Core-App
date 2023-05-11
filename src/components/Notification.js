import ReactDom from 'react-dom';

const Notification = (props) => {
    const { title, message, status } = props;
    //  className={`center-content md:py-8 md:px-7 py-5  px-5  ${
    //     bookShelfName === "currentlyReading" ? "bg-blue-dark" : ""
    //   }`}
    
    return ReactDom.createPortal ((
        <div className={`items-center text-gray-200 bg-gray-700 p-5 fixed shadow shadow-zinc-600 h-16 right-0 md:top-11 top-8 rounded-tl-lg rounded-bl-lg md:w-96 w-60 md:text-base text-sm transition-all md:py-2 md:px-7 py-2 px-2 z-10 ${
            status === "success" ? "bg-green-400 text-gray-900" : status === "pending" ? "bg-yellow-200 text-gray-800": ""
          }`}>
          <h2>{title}</h2>
          <p>{message}</p>
        </div>
      ), document.getElementById('notifications'))
      ;
}

export default Notification
