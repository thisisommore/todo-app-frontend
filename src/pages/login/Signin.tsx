import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { signIn, userAuthSubject } from "../../api/UserAPI";
import Button from "../../components/Button";
import Container from "../../components/Container";
import InfoCard from "../../components/InfoCard";
import Form from "../../components/Form";
import Input from "../../components/Input";
import Text from "../../components/Text";
import { setToken } from "../../storage";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

type FormValues = { username: string; password: string };
export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [error, setError] = useState<any>();
  const [isErrorCardVisible, setIsErrorCardVisible] = useState<any>(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const onSubmit = async (d: FormValues) => {
    try {
      setIsLoading(true);
      const { data: res } = await signIn(d.username, d.password);
      setIsLoading(false);
      setToken(res.token);
      userAuthSubject.next("");
      history.push("/home");
    } catch (error) {
      setIsLoading(false);
      setError(error);
      setIsErrorCardVisible(true);
      setTimeout(() => {
        setIsErrorCardVisible(false);
        setTimeout(() => {
          setError(undefined);
        }, 310);
      }, 4000);
    }
  };

  return (
    <MainContainer>
      <Container>
        <Text className="center">Signin</Text>
        <Form alignItemsCenter onSubmit={handleSubmit(onSubmit)}>
          <Input
            className={error?.username ? "invalid" : ""}
            {...register("username", { required: true, minLength: 4 })}
            type="text"
            placeholder="Username"
          ></Input>
          <InfoCard className={errors.username ? "error" : ""}>
            Minimum 4 charactors required
          </InfoCard>
          <Input
            className={error?.password ? "invalid" : ""}
            {...register("password", { required: true, minLength: 8 })}
            type="password"
            placeholder="Password"
          />
          <InfoCard className={errors.password ? "error" : ""}>
            Minimum 8 charactors required
          </InfoCard>
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
        </Form>
        <InfoCard className={isErrorCardVisible ? "error" : ""}>
          {error?.response?.data ?? "Error occured please try again later"}
        </InfoCard>
      </Container>
    </MainContainer>
  );
}
