import React, {useMemo, useState} from "react";
import {useDropzone} from 'react-dropzone';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import PublishIcon from '@material-ui/icons/Publish';
import Builtwithfirebase from '../../assets/builwithfirebase2.png';

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
    const [img, setImg] = useState("");


    const onDropAccepted = (acceptedFile) => {
        if (acceptedFile) {
            let file = acceptedFile[0]
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                console.log(event.target.result);
                setImg(event.target.result)
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
      } = useDropzone({accept: 'image/*', maxFiles:1, onDropAccepted});
    
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
    

    return(
        <>
        <Grid container>
            <Grid item xs={12} style={{marginTop: "20px"}}>
                <Typography variant="h2" style={{marginLeft: "20px"}}>FireMoji</Typography>
            </Grid>
            <Grid container item xs={12} justify="center">
                <div>
                    <div {...getRootProps({style})}>
                        <Grid container item justify="center">
                            <PublishIcon style={{fontSize: "150px", marginTop: "20px"}}/>
                        </Grid>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12}>
                    <img alt="BuiltwithFirebase" src={Builtwithfirebase} style={{height:"100px", width:"220px", marginLeft: "20px", marginTop: "20px"}}></img>
            </Grid>
            {/* {img && <img src={`${img}`}/>} */}
        </Grid>
        </>
    );
}

export default Uploadmain