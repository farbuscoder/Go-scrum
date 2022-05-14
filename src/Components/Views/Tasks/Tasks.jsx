import react, { useState, useEffect } from "react";

//Components
import { Header } from "../../Header/Header";
import { TasksForm } from "../../TasksForm/TasksForm";

//Css
import "./Tasks-styles.css";
import "react-loading-skeleton/dist/skeleton.css";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  getTasks,
  deleteTask,
  editCardStatus,
} from "../../../store/actions/tasksActions";

//Libraries
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import debounce from "lodash.debounce";
import { ToastContainer, toast } from "react-toastify";

const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    createdAt,
    deletd,
    deletedAt,
    description,
    importance,
    modifiedAt,
    status,
    teamId,
    title,
    user: { userName },
    _id,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const limitString = (str) => {
    if (str.length > 170) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    } else {
      return { string: str, addButton: false };
    }
  };

  const dateTime = new Date(createdAt).toLocaleString();

  return (
    <>
      <div className="card">
        <div className="close" onClick={() => deleteCard(_id)}>
          x
        </div>
        <h3>{title}</h3>
        <h6>{dateTime}</h6>
        <h5>{userName}</h5>
        <button
          type="button"
          className={
            status === "IN PROGRESS" || status === "NEW"
              ? "progress"
              : "finished"
          }
          onClick={() => {
            editCardStatus(data);
          }}
        >
          {status.toLowerCase()}
        </button>
        <button
          type="button"
          className={
            importance === "MEDIUM" || importance === "HIGH" ? "medium" : "low"
          }
        >
          {importance.toLowerCase()}
        </button>

        {showMore ? (
          <>
            <p>{description}</p>
            <button
              type="button"
              style={{
                cursor: "pointer",
                backgroundColor: "lightgray",
                color: "black",
              }}
              onClick={() => setShowMore(false)}
            >
              Ver menos
            </button>
          </>
        ) : (
          <p>{limitString(description).string}</p>
        )}
        {!showMore && limitString(description).addButton ? (
          <button
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => setShowMore(true)}
          >
            Ver mas
          </button>
        ) : null}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tasksFromWho, setTasksFromWho] = useState("ALL");
  const [isPhone, setisPhone] = useState(
    window.innerWidth < 900 ? true : false
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks(tasksFromWho === "ME" ? "/me" : ""));
  }, [tasksFromWho]);

  const { loading, error, tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  useEffect(() => {
    if (tasks?.length) {
      setList(tasks);
      setRenderList(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (searchTerm) {
      setRenderList(list.filter((data) => data.title.startsWith(searchTerm)));
    } else {
      setRenderList(list);
    }
  }, [searchTerm]);

  //console.log(list);

  const handleReSize = () => {
    if (window.innerWidth < 900) {
      setisPhone(true);
    } else {
      setisPhone(false);
    }
  };

  useEffect(() => {
    handleReSize();
    window.addEventListener("resize", handleReSize);

    return () => window.removeEventListener("resize", handleReSize);
  });

  const renderAllCards = () => {
    return renderList?.map((data) => {
      return (
        <Card
          editCardStatus={handlerEditCardStatus}
          deleteCard={handlerDeleteCard}
          key={data._id}
          data={data}
        />
      );
    });
  };

  const renderColumnCards = (text) => {
    return renderList
      ?.filter((data) => data.status === text)
      .map((data) => {
        return (
          <Card
            editCardStatus={handlerEditCardStatus}
            deleteCard={handlerDeleteCard}
            key={data._id}
            data={data}
          />
        );
      });
  };

  const handleChangeImportance = (e) => {
    if (e.currentTarget.value === "ALL") {
      setRenderList(list);
    } else {
      setRenderList(
        list.filter((data) => data.importance === e.currentTarget.value)
      );
    }
  };

  const handlerEditCardStatus = (data) => dispatch(editCardStatus(data));

  const handlerDeleteCard = (id) => dispatch(deleteTask(id));

  const handlerSearch = debounce((e) => {
    setSearchTerm(e?.target?.value);
  }, 1000);

  return (
    <>
      <div>
        <Header />
        <main id="tasks">
          <TasksForm />
          <section className="wrapper_list">
            <div className="list_header">
              <div>
                <h2>Mis tareas</h2>
              </div>
              <div className="filters">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    onChange={(e) => setTasksFromWho(e.currentTarget.value)}
                  >
                    <FormControlLabel
                      value="ALL"
                      control={<Radio />}
                      label="Todas"
                    />
                    <FormControlLabel
                      value="ME"
                      control={<Radio />}
                      label="Mis tareas"
                    />
                  </RadioGroup>
                </FormControl>
                <select name="importance" onChange={handleChangeImportance}>
                  <option value="">Seleccionar una prioridad</option>
                  <option value="ALL">Todas</option>
                  <option value="LOW">Baja</option>
                  <option value="MEDIUM">Media</option>
                  <option value="HIGH">Alta</option>
                </select>
                <input
                  type="text"
                  placeholder="Buscar por titulo..."
                  onChange={handlerSearch}
                />
              </div>
            </div>
            {isPhone ? (
              !renderList?.length ? (
                <div>No hay tareas creadas</div>
              ) : loading ? (
                <>
                  <Skeleton height={50} count={10} />
                  <Skeleton height={50} count={10} />
                  <Skeleton height={50} count={10} />
                </>
              ) : (
                <div className="list phone">{renderAllCards()}</div>
              )
            ) : (
              <div className="group_list">
                {!renderList?.length ? (
                  <div>No hay tareas creadas</div>
                ) : loading ? (
                  <>
                    <Skeleton count={3} />
                  </>
                ) : (
                  <>
                    <div className="list">
                      <h4>Nuevas</h4>
                      {renderColumnCards("NEW")}
                    </div>
                    <div className="list">
                      <h4>En proceso</h4>

                      {renderColumnCards("IN PROGRESS")}
                    </div>
                    <div className="list">
                      <h4>Finalizadas</h4>
                      {renderColumnCards("FINISHED")}
                    </div>
                  </>
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};
