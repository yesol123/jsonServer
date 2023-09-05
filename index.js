const express = require('express')
const app = express()
const cors = require('cors');
const fs = require('fs') ;// 이건 자동으로 설치되어 있음 갖다붙여넣기만 하면됨 파일을 읽을수도,쓸 수도 있음
//fs 모듈활용-readFileSync():읽기,writeFileSync():쓰기
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// 예시 data안에 들어있는 함수를 실행시켜서 더 간단하게 코드 볼 수 있도록 ! 
const data = {
  select : function(){ 
    return JSON.parse( fs.readFileSync('./test.json') );
  },
  insert: function(newObj){
    const jsonData = data.select();
    const newData = [...jsonData, {id:jsonData.length+1, ...newObj  }]
    fs.writeFileSync('./test.json',JSON.stringify(newData) );
    return newData;
  },
  update:function(){},
  delete:function(
    

  ){}
}

app.get('/abc', function (req, res) {  
  res.send( data.select() )
})



app.delete('/abc/:id', function (req, res) {
  const jsonData = data.select();
  const {id} = req.params;
  const delData = jsonData.filter(n=>n.id != id);
  
  fs.writeFileSync('./test.json',JSON.stringify(delData) );
  res.send(  delData  )
  
})

app.post('/insert', function (req, res) {
  res.send(data.insert(req.body));
});



// app.get('/abc', function (req, res) { 
//   const jsonData = fs.readFileSync('./test.json'); // readFileSync 비동기처리 할 필요가 없음. 
//   res.send(JSON.parse(jsonData)); //res.send(이곳에다가 무엇을 보내주느냐가 중요!)
// })//JSON.parse()깨뜨리기




// app.get('/abc/:id', function (req, res) { //abc뒤에 어떤 값이 존재 한다면 그 값을 찾아서 보내주는 것! 
//   const jsonData = fs.readFileSync('./test.json');  


//   const data = JSON.parse(jsonData);
//   const {id} = req.params;
//   //http://localhost:3030/abc/2 {id:2}
//   const aaa = data.filter(n => n.id ==id)
//   res.send(aaa);  //뒤에 id 값을 넣어주면 id와 일치하는 놈 한놈씩 화면에 출력이 되어야 함 
// })



// app.post('/insert',function(req,res){
//   const jsonData = JSON.parse(fs.readFileSync('./test.json'));  

//   //{id:0,...req.body} req.body ={ msg:'aefawefawdf'}중괄호 포함
//   let data = [...jsonData,{id:jsonData.length+1,...req.body}]
//   //...jsonData = 배열을 주는 게 아니라 jsonData안에 있는 객체들을 주는것! 그래서 []로 배열을 만들어줘야한다

//   fs.writeFileSync('./test.json',JSON.stringify(data)); //글을 쓰는 부분이기 때문에 뒤에 내용을 넣어주면 된다! 
//   res.send(data);
// })
// //JSON.stringify() Json형식으로 문서를 만들어주는 함수 성공시 test.json에 내용 들어옴


app.listen(3000) //포트번호



