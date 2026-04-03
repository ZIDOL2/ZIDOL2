import {useState} from "react";

/*
  간단한 회원가입 폼
  1. 이름
  2. 생년월일
  3. 국적
  4. 자기소개
*/

const Register=() =>{
  const [name, setName] = useState("");
  const [birth, setBirth] = useState("");
  const [cntry, setCntry] = useState("");
  const [bio, setBio] = useState("");

  const onChgName = (e) => {
    setName(e.target.value);
  };

  const onChgBirth = (e) => {
    setBirth(e.target.value);
  };

  const onChgCntry = (e) => {
    setCntry(e.target.value);
  };

  const onChgBio = (e) => {
    setBio(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChgName} placeholder={"이름"} />
      </div>
      <div>
        <input value={birth} type="date" onChange={onChgBirth}/>
      </div>
      <div>
        <select value={cntry} onChange={onChgCntry}>
          <option value="default"></option>
          <option value="KO">한국</option>
          <option value="US">미국</option>
          <option value="UK">영국</option>
        </select>
      </div>

      <div>
        <textarea value={bio} onChange={onChgBio} placeholder='자기소개 입력'></textarea>
      </div>
    </div>

  )
}

export default Register;