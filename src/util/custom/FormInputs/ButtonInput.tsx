interface btnType {
  btnText?: string;
  onAction?: (e: any) => void;
  isEnableForAction: boolean;
  style?: string;
  btnType?: "button" | "submit" | "reset";
  icon?: any;
}

const ButtonInput: React.FC<btnType> = ({ isEnableForAction, btnType = "button", btnText, style, onAction, icon }) => {
  return (
    <button type={btnType} className={style} onClick={isEnableForAction === true ? onAction : undefined}>
      {icon ? icon : btnText}
    </button>
  );
};

export default ButtonInput;
