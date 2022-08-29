
function App() {
  const handleClick = () => {
    const makeImagePromise = async () => {
      const response = await fetch(
        "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
      );
      return await response.blob();
    };

    navigator.clipboard
      .write([new ClipboardItem({ "image/png": makeImagePromise() })])
      .then(function () {
        console.log("copied");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Hey</button>
    </div>
  );
}

export default App;
