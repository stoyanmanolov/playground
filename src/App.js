function App() {
  const toDataURL = (src, callback, outputFormat) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
      var canvas = document.createElement("CANVAS");
      var ctx = canvas.getContext("2d");
      var dataURL;
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src =
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }

  const toBase64 = (url) => {
    return new Promise(resolve => {
      toDataURL(url, (data) => {
        resolve(data);
      });
    });
  };

  const makeImageBlobPromise = async (base64url) => {
    const response = await fetch(base64url);
    return await response.blob();
  };

  const copyToClipboard = (base64url) => {
    navigator.clipboard
      .write([
        new ClipboardItem({ "image/png": makeImageBlobPromise(base64url) }),
      ])
      .then(function () {
        console.log("Slide is copied to clipboard");
      })
      .catch(function (error) {
        console.log("Slide copying was unsuccessful");
        console.log(error);
      });
  };

  const getFileFromBase64 = async (base64, fileName) => {
    const base64url = base64;

    const blob = await makeImageBlobPromise(base64url);
    const file = new File([blob], fileName || "image.png", {
      type: blob.type,
    });

    return file;
  };

  const getFileFromMedia = async (media, fileName) => {
    const base64 = await toBase64(media.fileUrl);
    const file = await getFileFromBase64(base64, fileName);
    return file;
  };

  const shareImage = async (fileUrl, base64) => {
    let file;
    let base64url;

    if (fileUrl) {
      const mediaBase64 = await toBase64(fileUrl);
      // file = await getFileFromMedia({ fileUrl });
      base64url = mediaBase64;
    } else {
      // file = await getFileFromBase64(base64);
      // base64url = base64;
    }
    console.log(file, base64url)

    if (
      // navigator.share &&
      // navigator.canShare({
      //   files: [file],
      // })
      false
    ) {
      navigator
        .share({
          files: [file],
        })
        .then(() => {})
        .catch((e) => {
          if (e.name === "NotAllowedError") {
            base64url && copyToClipboard(base64url);
          }
        });
    } else {
      base64url && copyToClipboard(base64url);
    }
  };

  const handleClick = () => {
    shareImage(
      "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
    );
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Hey</button>
    </div>
  );
}

export default App;
