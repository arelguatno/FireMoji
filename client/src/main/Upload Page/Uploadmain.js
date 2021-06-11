import React, { useMemo, useState } from "react";
import { useDropzone } from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import CircularProgress from '@material-ui/core/CircularProgress';
import Builtwithfirebase from '../../assets/builwithfirebase2.png';
import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAY7B8AOkwgEmhDhGEwNeYR0lvnkfnM0yI",
  authDomain: "firemojiph.firebaseapp.com",
  projectId: "firemojiph",
  storageBucket: "firemojiph.appspot.com",
  messagingSenderId: "919658342342",
  appId: "1:919658342342:web:c7fb763733c9607c4734c7",
  measurementId: "G-W1T330QB41"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '60px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const Uploadmain = () => {
  const [original, setOriginal] = useState("");
  const [processed, setProcessed] = useState("");
  const [hide, setHide] = useState(0);
  const [hide1, setHide1] = useState(0);


  const onDropAccepted = (acceptedFile) => {
    if (acceptedFile) {
      let file = acceptedFile[0]
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        let strImage = event.target.result
        let base64String = strImage.replace(/^data:image\/[a-z]+;base64,/, "");
        setOriginal(base64String)

        // Save Result to Firestore
        db.collection("process_image").doc("ARJz6gWVWslNCBwQzAgb").set({
          raw: base64String,
          result: ""
        })
          .then(() => {
            console.log("Document successfully written!");
            setHide(1)
            setTimeout(() => {
              let doc = db.collection('process_image').doc('ARJz6gWVWslNCBwQzAgb');
              doc.onSnapshot(docSnapshot => {
                setProcessed(docSnapshot.data().raw)
                // ...
              }, err => {
                console.log(`Encountered error: ${err}`);
              });
              setHide1(1)
            }, 8000)
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    }
  }

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: 'image/*', maxFiles: 1, onDropAccepted });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);


  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Typography variant="h2" style={{ marginLeft: "20px", color: "#757575"}}><strong>SparkyMoji</strong></Typography>
        </Grid>
        {hide == 0 && <Grid container item xs={12} justify="center" style={{ marginTop: "20px" }}>
          <div>
            <div {...getRootProps({ style })}>
              <Grid container item justify="center">
                <PublishIcon style={{ fontSize: "150px", marginTop: "20px" }} />
              </Grid>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </Grid>
        }
        {hide == 1 && hide1 == 0 && <Grid container item xs={12} justify="center" style={{ marginTop: "20px" }}>
          <CircularProgress size={300} style={{color: '#039BE5'}}/>
        </Grid>
        }
        {hide == 1 && hide1 == 0 && <Grid container item xs={12} justify="center">
          <Typography variant="h6" style={{color: "#E17177"}}>Sparkyfying!</Typography>
        </Grid>
        }
        {hide1 == 1 && <Grid container item xs={12} style={{ marginTop: "20px" }}>
          <Grid container item xs={5} justify="center">
            <img src={`data:image/jpeg;base64,${original}`} style={{height:"300px", width: "400px"}}/>
          </Grid>
          <Grid container item xs={2} justify="center" alignItems = "center">
            <ArrowRightAltIcon style={{ fontSize: "60px", marginTop: "40px" }}/>
          </Grid>
          <Grid container item xs={5} justify="center">
            <img src={`data:image/jpeg;base64,${processed}`} style={{height:"300px", width: "400px"}}/>
          </Grid>
          <Grid container item xs={12} justify="center">
            <Button size="large" variant="contained" onClick={() => { window.location.reload(); }} style={{ color:"#ECEFF1", backgroundColor:"#039BE5"}}>Sparkify Again!</Button>
          </Grid>
        </Grid>}
        <Grid item xs={12} style={{  position: "fixed", left: "0", bottom: "0", width: "100%"}}>
          <img alt="BuiltwithFirebase" src={Builtwithfirebase} style={{ height: "100px", width: "220px", marginLeft: "20px", marginTop: "20px" }}></img>
        </Grid>
        {/* {img && <img src={`${img}`}/>} */}
      </Grid>
    </>
  );
}

export default Uploadmain
