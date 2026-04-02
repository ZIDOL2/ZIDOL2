const Button = ({children, text, color="balck"}) => {
  // 이벤트 객체
  const onClickBtn = (e) => {
    console.log(text);
    console.log(e);
  }

  return (
  <button 
    onClick={onClickBtn}
    // onMouseEnter={onClickBtn}
    style={{color: color}}>{text} - {color.toUpperCase()}
    {children}
  </button>
  );
};


export default Button;