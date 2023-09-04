const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs') ;// 이건 자동으로 설치되어 있음 갖다붙여넣기만 하면됨 파일을 읽을수도,쓸 수도 있음
//fs 모듈활용-readFileSync():읽기,writeFileSync():쓰기
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/abc', function (req, res) { 
  const jsonData = fs.readFileSync('./test.json'); // readFileSync 비동기처리 할 필요가 없음. 
  res.send(JSON.parse(jsonData)); //res.send(이곳에다가 무엇을 보내주느냐가 중요!)
})//JSON.parse()깨뜨리기




app.get('/abc/:id', function (req, res) { //abc뒤에 어떤 값이 존재 한다면 그 값을 찾아서 보내주는 것! 
  const jsonData = fs.readFileSync('./test.json');  
  const data = JSON.parse(jsonData);
  const {id} = req.params;
  //http://localhost:3030/abc/2 {id:2}
  const aaa = data.filter(n => n.id ==id)
  res.send(aaa);  //뒤에 id 값을 넣어주면 id와 일치하는 놈 한놈씩 화면에 출력이 되어야 함 
})



app.post('/insert',function(req,res){
  console.log(req.body);
  fs.writeFileSync('./test.json',JSON.stringify(req.body)); //글을 쓰는 부분이기 때문에 뒤에 내용을 넣어주면 된다! 
  res.send('성공');
})
//JSON.stringify() Json형식으로 문서를 만들어주는 함수 성공시 test.json에 내용 들어옴


app.listen(3030) //포트번호



