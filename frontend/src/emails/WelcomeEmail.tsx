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

export const WelcomeEmail = () => (
  <Html>
    <Head />
    <Preview>
      AddInvoices will get in touch with you as soon as possible.
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/assets/cima-logo-og.png`}
          width="200"
          alt="Logo"
          style={logo}
        />
        <Text style={paragraph}>Hi,</Text>
        <Text style={paragraph}>
          Thank you for your interest in AddInvoices. We will launch the product
          soon and you will be the first to know. Also, you will be able to get
          early access to discounts, new features and exclusive offers for
          AddInvoices.
        </Text>
        <Hr style={hr} />
        <Text style={footer}>AddInvoicesai.com</Text>
      </Container>
    </Body>
  </Html>
);

export default WelcomeEmail;

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
