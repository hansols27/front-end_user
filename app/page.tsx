import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // 모바일(sm: 375px 이상)에서는 빨간색, PC(xl: 1920px 이상)에서는 파란색
        backgroundColor: {
          xs: "#ffebee", // 아주 작은 화면
          sm: "#e3f2fd", // 모바일 기준 (375px~)
          xl: "#f3e5f5", // PC 기준 (1920px~)
        },
        p: { xs: 2, xl: 15 }, // 패딩도 기기별로 다름
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        피그마 설계 대응 테스트
      </Typography>
      <Typography variant="body1">
        현재 화면 크기에 따라 배경색과 여백이 바뀝니다.
      </Typography>
      
      <Box sx={{ 
        mt: 4, 
        p: 3, 
        bgcolor: 'white', 
        borderRadius: 2, 
        boxShadow: 1,
        width: { xs: '100%', xl: '1200px' } // PC에서는 최대 너비 고정
      }}>
        여기가 메인 컨텐츠 영역입니다.
      </Box>
    </Box>
  );
}