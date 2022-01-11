import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {DropzoneArea} from 'material-ui-dropzone'
import axios from 'axios'
import fs from 'fs'
import FormData from 'form-data'
export const UploadDropZone = ({uploadFile, setUploadFile}: {uploadFile: boolean, setUploadFile: Function}) => {
  
  useEffect(()=>{
    if(!uploadFile){
      return
    }

    if(file){
      const sendImage = async () => {
        var data = new FormData();
        data.append('file', file);
        data.append('comment', 'Hellow world');

        axios({
          method: 'post',
          url: 'http://localhost:4000/image/',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
          data : data
        })
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      }
      sendImage()
    }

    if(ref&&ref.current&&ref.current.value){
      ref.current.value = "";
    }

    setUploadFile(false)
  }, [uploadFile, setUploadFile])

  const [file, upload] = useState<File>()
  const ref = useRef<any>(null)
  return (
    <input
    ref={ref}
    type={'file'}
    onChange={e=>{
      if(e.target.files && e.target.files.length){
        upload(e.target.files[0])
      }
    }}>
    </input>
  )
}