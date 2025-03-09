import React from "react";
import { Container, Typography, Box } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        About This Project
      </Typography>
      <Typography variant="body1" paragraph>
        This project is built using React and Material-UI. It provides a simple and elegant interface for searching and displaying images.
      </Typography>
      <Typography variant="h4" gutterBottom>
        About Me
      </Typography>
      <Typography variant="body1" paragraph>
        Hello my name is Rezi Gaprindashvili I am 16 years old and I made this project in 2 weeks.I have been interested with programming from the age of 12.
        I have learnt Python, HTML, CSS, JavaScript, WordPress, Figma, Unity - C++ and currently learning React
        I tend to become proffessional developer one day. Projects like this helps me to improve and move forward.
        Thanks for this opportunity.
      </Typography>
      <Typography variant="body1" paragraph>
        Check out the my GitHub for my other codes!
      </Typography>

      
      <Box mt={2}>
        <a
          href="https://github.com/ReziGaprindashvili"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
            width="120"
            height="120"
            style={{ cursor: "pointer" }}
          />
        </a>
      </Box>
    </Container>
  );
};

export default AboutPage;
