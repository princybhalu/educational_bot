import NotificationWrapper from './components/notifiction/Notifiction';

function App() {
  console.log('hi');
  console.log(process.env);

  console.log(process.env.REACT_APP_API_BASIC_URL);

  return (
    <>
      <div className="App">eduction ai</div>
      <NotificationWrapper />
    </>
  );
}

export default App;
