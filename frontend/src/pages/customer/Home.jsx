import Button from "../../components/Button/Button";

function Home() {
  return (
    <div>
      <h1>Farmer Marketplace System</h1>
       <Button>Login</Button>

    <Button variant="primary">
        Register
    </Button>

    <Button variant="danger">
        Delete
    </Button>

    <Button disabled>
        Loading...
    </Button>
    </div>
  );
}

export default Home;