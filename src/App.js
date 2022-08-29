
function App() {
  const toBase64 = async (url) => {
    try {
      const dataUrl = await toDataURL(url);
      if (typeof dataUrl !== "string") return;
      return dataUrl.replace(/(data:[^]*;base64,)/g, "");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const makeImagePromise = async (base64) => {
    const response = await fetch(
    );
    return await response.blob(base64);
  };

  const handleClick = () => {
    const base64url = toBase64("https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png")

    navigator.clipboard
      .write([new ClipboardItem({ "image/png": makeImagePromise(base64url) })])
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
