import Navbar from "../../component/client/Nav";
import Login from "../../component/client/Auth/Login";


const LoginPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <Navbar />
      </div>
      <div>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
