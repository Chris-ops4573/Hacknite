import {getDatabase, ref, set} from "firebase/database" 
import {app} from "./firebase/firebase"
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import SignupPage from "./pages/signup"

const auth = getAuth(app)

const db = getDatabase(app);

function App() {

  return (
    <div>
      <SignupPage />
    </div>
  );
}

export default App;
