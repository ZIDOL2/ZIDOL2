import { useState, useRef } from 'react';

/*
  간단한 회원가입 폼
  1. 이름
  2. 생년월일
  3. 국적
  4. 자기소개
*/

// 객체 형태로 만들어서 하나의 state로 관리
const Register = () => {
  const [input, setInput] = useState({
    name: '',
    birth: '',
    cntry: '',
    bio: '',
  });

  const cntRef = useRef(0);
  const inputRef = useRef();

  const onChange = (e) => {
    cntRef.current++;
    console.log(cntRef.current);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (input.name === '') {
      // 이름을 입력하는 DOM 요소 포커스
      inputRef.current.focus();
    }
  };
  return (
    <div>
      <div>
        <input
          ref={inputRef}
          name="name"
          value={input.name}
          onChange={onChange}
          placeholder={'이름'}
        />
      </div>
      <div>
        <input
          name="birth"
          value={input.birth}
          type="date"
          onChange={onChange}
        />
      </div>
      <div>
        <select name="cntry" value={input.cntry} onChange={onChange}>
          <option value="default"></option>
          <option value="KO">한국</option>
          <option value="US">미국</option>
          <option value="UK">영국</option>
        </select>
      </div>

      <div>
        <textarea
          name="bio"
          value={input.bio}
          onChange={onChange}
          placeholder="자기소개 입력"></textarea>
      </div>

      <button onClick={onSubmit}>제출</button>
    </div>
  );
};

export default Register;
