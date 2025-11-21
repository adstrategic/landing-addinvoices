import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

const baseUrl = "https://addinvoicesai.com";

interface NewUserProps {
  email: string;
}
export const NewUser = ({ email }: NewUserProps) => (
  <Html>
    <Head />
    <Preview>New client submitted form!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/assets/cima-logo-og.png`}
          width="200"
          alt="Logo"
          style={logo}
        />
        <Text style={paragraph}>
          A new client submitted the form from the AddInvoices website and wants
          to get in contact with you!
        </Text>
        <Text style={paragraph}>
          <strong>Client Email:</strong> {email}
        </Text>

        <Hr style={hr} />
        <Text style={footer}>AddInvoicesai.com</Text>
      </Container>
    </Body>
  </Html>
);

NewUser.PreviewProps = {
  email: "mail@gmail.com",
} as NewUserProps;

export default NewUser;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
