import { useRouteError } from "react-router-dom";

type ErrorT = {
  statusText?: string;
  message: string;
};

export const ErrorPage = () => {
  const error = useRouteError() as ErrorT;
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oulala!</h1>
      <p>Désolé la page demandé n'existe pas</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
