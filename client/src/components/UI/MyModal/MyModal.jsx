const MyModal = ({ children, visible, setVisible }) => {
  const handleModalOffClick = (e) => {
    e.stopPropagation();
  };

  
  return visible ? (
    <div
      onClick={() => setVisible(false)}
      className="flex fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-30 items-center justify-center"
    >
      <div
        onClick={handleModalOffClick}
        className=" rounded-[20px] w-max justify-center items-center flex"
      >
        {children}
      </div>
    </div>
  ) : (
    <div className="fixed top-0 bottom-0 left-0 right-0 hidden bg-black bg-opacity-30">
      <div className="p-[25px] bg-white border-[16px] min-w-[20px]">
        {children}
      </div>
    </div>
  );
};

export default MyModal;
