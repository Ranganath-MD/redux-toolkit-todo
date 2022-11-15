import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLoginMutation } from "store/services/auth";
import { setUser } from "store/features/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [error, setError] = useState("");

  const ref = useRef();
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = ref.current.email.value;
    const password = ref.current.password.value;
    const username = ref.current.username.value;

    if (email === "" || password === "" || username === "") {
      setError("All fields are required");

      setTimeout(() => setError(""), 2000);
      return;
    }
    const { data } = await login({ email, password, username });

    if (data?.message) {
      setError(data.message);
      setTimeout(() => setError(""), 2000);
      return;
    }
    dispatch(setUser(data))
    ref.current.reset();
    replace("/user/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} ref={ref} className="login">
      <span>{error}</span>
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        autoComplete="off"
      />
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        autoComplete="off"
      />
      <input
        type="password"
        placeholder="Enter Password"
        name="password"
        autoComplete="off"
      />
      <input type="submit" disabled={isLoading} />
    </form>
  );
};

export default function Home() {
  return (
    <div className="login__container">
      <h1>Login</h1>
      <Login />
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const token = ctx.req?.cookies["token"];

  if (token) {
    return {
      redirect: {
        destination: "/user/dashboard",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
