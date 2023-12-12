import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>Oops</h1>
        <p>Status: {error.status}</p>
        <p>{error.data.message}</p>
      </div>
    );
  }

  const errorMessage = (error as any)?.message || "Unknown error";

  return (
    <div>
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{errorMessage}</pre>
      {Object.getOwnPropertyNames(error)?.map((key) => (
        <pre key={key}>
          {typeof (error as any)[key] === "string" ? (error as any)[key] : ""}
        </pre>
      ))}
    </div>
  );
}
