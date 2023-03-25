const MyModal = ({ children, visible, setVisible, setModal }) => {
  const handleModalOffClick = (e) => {
    e.stopPropagation();
  };

  return (
    visible && (
      <div
        onClick={() => setVisible(false)}
        className="flex fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 items-center justify-center"
      >
        <div
          onClick={handleModalOffClick}
          className="flex mt-[100px]"
        >
          {children}
        </div>
      </div>
    )
  );
};

export default MyModal;
