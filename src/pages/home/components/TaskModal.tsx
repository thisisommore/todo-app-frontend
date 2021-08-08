import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components";
import { addTask, updateTask, UpdateTaskBody } from "../../../api/TaskAPI";
import Button from "../../../components/Button";
import Select from "../../../components/Select";
import Text from "../../../components/Text";
import TextArea from "../../../components/TextArea";
import { Task } from "../../../models/Task";
import { Priority } from "../../../types/Priority";

const Container = styled.div`
  padding-top: 20px;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: #ffffffa9;
  backdrop-filter: blur(14px);
  transform: translateY(100%);
  transition: 0.4s ease-out;

  &.shown {
    transform: translateY(0%);
  }
`;
const Form = styled.form`
  padding: 0px 20px;
  .select {
    margin: 20px 0;
  }
`;

type TProps = {
  show: boolean;
  onClose?: () => void;
  onSuccess: (task: Task) => void;
  task?: Task;
};

type FormValue = {
  content: string;
  priority: Priority;
};

const TaskModal = function ({ show, onClose, onSuccess, task }: TProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      content: "",
      priority: "medium",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (task) {
      setValue("content", task.content);
      setValue("priority", task.priority);
    } else {
      setValue("content", "");
      setValue("priority", "medium");
    }
  }, [setValue, task]);

  useEffect(() => {
    const eventListnerCallBack = (event: KeyboardEvent) => {
      if (show && event.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", eventListnerCallBack);
    return () => {
      document.removeEventListener("keydown", eventListnerCallBack);
    };
  }, [show, onClose]);

  const onSubmit = async (value: FormValue) => {
    if (task) {
      let copiedValue = { ...value } as UpdateTaskBody;

      if (task.content === value.content) {
        delete copiedValue.content;
      }
      if (task.priority === value.priority) {
        delete copiedValue.priority;
      }
      copiedValue.id = task.getId();
      try {
        setIsLoading(true);
        await updateTask(copiedValue);
        setIsLoading(false);
        let updatedTaskLiteralObj = { ...task, ...copiedValue };
        onSuccess(
          new Task(
            updatedTaskLiteralObj.content,
            updatedTaskLiteralObj.priority,
            updatedTaskLiteralObj.createdOn,
            updatedTaskLiteralObj.id
          )
        );
      } catch (error) {
        setIsLoading(false);
      }
    } else {
      const newTask = new Task(value.content, value.priority);
      try {
        setIsLoading(true);

        const { data } = await addTask(newTask);
        setIsLoading(false);

        newTask.setId(data.id);
        onSuccess(newTask);
      } catch (error) {
        setIsLoading(false);

        console.error(error);
      }
    }
    reset({
      content: "",
      priority: "high",
    });
  };
  return (
    <Container className={show ? "shown" : ""}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Text>{task ? "View" : "Add"} Task</Text>
        <TextArea
          className={errors.content ? "invalid" : ""}
          placeholder="content"
          {...register("content", { required: true })}
        />
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              label="Priority"
              className="select"
              options={["high", "medium", "low"]}
            ></Select>
          )}
        ></Controller>

        <div>
          <Button isLoading={isLoading} type="submit">
            Submit
          </Button>
          <Button type="button" style={{ marginLeft: 10 }} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
};
export default TaskModal;
