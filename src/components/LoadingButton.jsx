import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

// El prop ...rest permite pasar cualquier otro prop que Button acepte
function LoadingButton({ onClickPromise, buttonText, buttonLoadingText = "Procesando...", ...rest }) {

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    try {
      setIsLoading(true);

      await Promise.resolve(onClickPromise());

    } catch (error) {
      console.error("Error en onClickPromise:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    console.log("isLoading cambió a:", isLoading);
  }, [isLoading]);

  return (
    <Button
      variant="primary"
      disabled={isLoading}
      onClick={handleClick}
      {...rest}
    >
      {isLoading ? buttonLoadingText : buttonText}
    </Button>
  );

}

export default LoadingButton;