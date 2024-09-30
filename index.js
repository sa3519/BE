const express = require("express");
const path = require("path"); // path 모듈을 불러오기
const cors = require("cors"); // CORS 패키지 불러오기
const app = express();
const port = 3030;

// CORS 미들웨어 설정
app.use(cors()); // 모든 도메인에서의 요청을 허용

// JSON 데이터 처리를 위한 미들웨어
app.use(express.json()); // JSON 형태의 요청 본문을 파싱하기 위해

// 정적 파일 제공 설정 (프론트엔드 파일 위치)
app.use(express.static(path.join(__dirname, "public")));

// 데이터 저장을 위한 배열 선언
let items = []; // 데이터를 저장할 임시 배열

// 데이터 조회(Read) 엔드포인트
app.get("/items", (req, res) => {
  res.json(items); // 배열에 저장된 데이터 반환
});

// 데이터 추가(Create) 엔드포인트
app.post("/items", (req, res) => {
  const newItem = req.body; // 요청 본문에서 새 데이터 가져오기
  items.push(newItem); // 배열에 새 데이터 추가
  res.status(201).json(newItem); // 응답으로 추가된 데이터 반환
});

// 메인 페이지 요청 처리
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html")); // index.html은 친구의 메인 파일
});

// 서버 실행
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
