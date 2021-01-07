import React, { useState, useEffect} from 'react';
import {post } from 'axios';
import Grid from '@material-ui/core/Grid';



const CustomerAdd = ({cusmtomName}) => {

    const [file, setfile] = useState("");
    const [userName, setuserName] = useState(cusmtomName ? cusmtomName : "");
    const [birthday, setbirthday] = useState("");
    const [gender, setgender] = useState("");
    const [job, setjob] = useState("");
    const [fileName, setfileName] = useState("");

   
    useEffect(() => {
            setuserName(cusmtomName);
    }, [cusmtomName])


    const handleFormSubmit = (e) => {
        e.preventDefault() // 데이터가 서버에 전달할때 오류가 발생하지 않도록
        this.addCustomer()
        .then((response) => {
            console.log=(response.data);
        }) 
        
        setfile(null);
        setuserName("");
        setbirthday("");
        setgender("");
        setjob("");
        setfileName("");

        window.location.reload();
    }

    const handleFileChange = (e) => {
        setfile(e.target.files[0]); // 파일업로드할때, 파일중에 첫번째 값을 받음. ( 하나만 올리기 때문 )
        setfileName(e.target.value); // 파일명
    }

   

 
    const addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.file);
        formData.append('fileName', this.fileName);
        formData.append('name', this.userName);
        formData.append('birthday', this.birthday);
        formData.append('gender', this.gender);
        formData.append('job', this.job);
        // 전송대상에 파일이 있을경우, 아래와 같이 추가.
        const config = {
            headers: {
                'content-type' : 'multipart/form-data'
            }
        }
        
        // 포트스방식으로 전송.a
        return post(url, formData, config);
    }


    
    return(
        <div>
            <Grid>
                <form onSubmit={handleFormSubmit}>
                    <h1>고객추가</h1>
                    프로필 이미지: <input type="file" name="file" file={file} value={fileName} onChange={handleFileChange} /><br/>
                    이름 : <input type="text" name="userName" value={userName} onChange={({ target: { value } }) => setuserName(value)} /><br/>
                    생년월일: <input type="text" name="birthday" value={birthday} onChange={({ target: { value } }) => setbirthday(value)} /><br/>
                    성별: <input type="text" name="gender" value={gender} onChange={({ target: { value } }) => setgender(value)} /><br/>
                    직업: <input type="text" name="job" value={job} onChange={({ target: { value } }) => setjob(value)} /><br/>
                    <button type="submit">추가하기</button>
                </form>
            </Grid>
        </div>
    );
}


export default CustomerAdd;
