import React, { ReactElement, useEffect, useState } from "react";

import { deleteTask, getTasks } from "../../api/TaskAPI";
import { userAuthSubject } from "../../api/UserAPI";
import InfoCard from "../../components/InfoCard";
import Select from "../../components/Select";
import Spinner from "../../components/Spinner";
import Text from "../../components/Text";
import { Task } from "../../models/Task";
import { removeToken } from "../../storage";
import { Priority } from "../../types/Priority";
import firstUpperCase from "../../utils/firstUpperCase";
import StyledHeader from "./components/StyledHeader";
import StyledPriority from "./components/StyledPriority";
import StyledTasks from "./components/StyledTasks";
import AddTaskModal from "./components/TaskModal";
import Container from "./components/Container";

type SortBy = "date" | "priority" | "none";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEditingTask, setCurrentEditingTask] = useState<Task>();
  const [sortBy, setSortBy] = useState<SortBy>("date");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    setIsLoading(true);
    getTasks()
      .then((data) => {
        setIsLoading(false);
        setTasks(data);
      })
      .catch((e) => {
        setError(e);
        setIsLoading(false);
        console.log(e);
      });
  }, []);

  function getTasksFromState() {
    let copiedTasks = tasks.slice();

    function getIntValueOfPriority(priority: Priority) {
      switch (priority) {
        case "high":
          return 3;
        case "medium":
          return 2;
        case "low":
          return 1;
      }
    }

    return copiedTasks.sort((taskA, taskB) => {
      switch (sortBy) {
        case "date":
          if (taskA.createdOn > taskB.createdOn) {
            return -1;
          } else return 1;
        case "priority":
          return (
            getIntValueOfPriority(taskB.priority) -
            getIntValueOfPriority(taskA.priority)
          );
        default:
          return 1;
      }
    });
  }

  const onDelete = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteTask(id);
      setIsLoading(false);

      setTasks(tasks.filter((task) => task.getId() !== id));
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  const openTaskModal = () => {
    setShowModal(true);
  };

  const closeTaskModal = () => {
    setShowModal(false);
  };

  const onAddClick = () => {
    setCurrentEditingTask(undefined);
    openTaskModal();
  };

  const editOrViewTask = (task: Task) => {
    setCurrentEditingTask(task);
    setShowModal(true);
  };

  const onTaskAddOrEditSuccess = (task: Task) => {
    if (!currentEditingTask) setTasks(tasks.concat(task));
    else {
      setTasks(tasks.map((e) => (e.id === task.id ? task : e)));
    }
    closeTaskModal();
  };

  const signOut = () => {
    removeToken();
    userAuthSubject.next("");
  };

  const getFormattedDateTime = (date: Date) => {
    return date.toDateString() + ", " + date.toLocaleTimeString();
  };

  const switchAccordingToTasks = (
    loadingElement: ReactElement<any, any>,
    noTaskElement: ReactElement<any, any>,
    apiErrorElement: ReactElement<any, any>,
    tasksElement: ReactElement<any, any>
  ) => {
    if (isLoading) {
      return loadingElement;
    } else if (error) {
      return apiErrorElement;
    } else if (!tasks.length) {
      return noTaskElement;
    } else {
      return tasksElement;
    }
  };

  return (
    <Container>
      <AddTaskModal
        task={currentEditingTask}
        show={showModal}
        onClose={closeTaskModal}
        onSuccess={onTaskAddOrEditSuccess}
      ></AddTaskModal>
      <StyledHeader>
        <Text>Tasks</Text>

        <div className="add-task" onClick={onAddClick}>
          <span className="iconify" data-icon="carbon:add-filled"></span>
        </div>
        <p className="sign-out" onClick={signOut}>
          Signout
        </p>
        <Select
          className="sort-by"
          label="Sort by"
          options={["date", "priority"]}
          value={sortBy}
          onChange={($event) => {
            setSortBy($event.target.value as SortBy);
          }}
        ></Select>
      </StyledHeader>

      {switchAccordingToTasks(
        <Spinner />,
        <InfoCard className="info">Add task by clicking + icon above</InfoCard>,
        <InfoCard className={error ? "error" : ""}>
          {error?.response?.data ?? "Error occured please try again later"}
        </InfoCard>,
        <StyledTasks>
          {getTasksFromState().map((task) => (
            <div className="container-task" key={task.getId()}>
              <div className="top-section">
                <p className="content" onClick={() => editOrViewTask(task)}>
                  {task.content}
                </p>
                <button
                  className="btn-done"
                  onClick={() => onDelete(task.getId())}
                >
                  <span
                    className="iconify"
                    data-icon="teenyicons:tick-outline"
                  ></span>
                </button>
              </div>

              <h6 className="created-on">
                {getFormattedDateTime(task.createdOn)}
              </h6>
              <StyledPriority className={task.priority}>
                <p>{firstUpperCase(task.priority)}</p>
              </StyledPriority>
            </div>
          ))}
        </StyledTasks>
      )}
    </Container>
  );
}
