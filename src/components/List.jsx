import { useContext, useMemo, useState } from "react";
import { TodoStateContext } from "../App";
import "./List.css";
import TodoItem from "./TodoItem";

const List = () => {
  const todos = useContext(TodoStateContext);
  const [search, setSearch] = useState("");
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const filteredTodos = getFilteredData();

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="List">
      <div className="list_header">
        <h4>💪 Todo List</h4>

        <div className="list_summary">
          <span>
            {doneCount} / {totalCount}
          </span>
        </div>

        <div className="progress_bar_wrapper">
          <div
            className="progress_bar_fill"
            style={{
              width: `${totalCount === 0 ? 0 : (doneCount / totalCount) * 100}%`,
            }}
          >
            {totalCount > 0 && `${Math.round((doneCount / totalCount) * 100)}%`}
          </div>
        </div>
      </div>
      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="할 일 검색"
      />
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </div>
    </div>
  );
};
export default List;
