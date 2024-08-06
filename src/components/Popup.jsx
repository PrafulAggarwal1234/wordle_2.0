

const Popup = ({setIsOpen,setFlag}) => {

  const togglePopup = () => {
    setIsOpen(false);
    setFlag(false);
  };

  return (
    <div className="modal">
        <div>
            <h1>Invalid Word</h1>
            <button onClick={togglePopup}>Close</button>
        </div>
    </div>
  );
};

export default Popup;
