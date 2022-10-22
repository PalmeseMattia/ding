import {useState} from "react";
import signInWithGoogle from "./firebase"

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <div className="App">
      <button onClick={signInWithGoogle}>
        sign in with google
      </button>
    </div>
  );
}

export default App;
