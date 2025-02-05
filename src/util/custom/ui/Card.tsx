import { ReactNode } from "react";
interface CardProps {
  children: ReactNode;
  isCardShow: boolean;
}
function Card({ children, isCardShow }: CardProps) {
  return (
    <div
      className={`transition-all duration-[800ms] ${
        isCardShow ? "max-h-[200px]" : "max-h-0 opacity-0"
      }`}
    >
      {" "}
      {children}{" "}
    </div>
  );
}
export default Card;
